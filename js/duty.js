var pageNum=5;//控制每一页显示多少条数据
var dutyPageCount;//定义一个变量用来存储共有多少页
var dutyPageNum=1;//第一个变量用于存当前页数
//获取缓存中的字符串
//把字符串变为数组
var duty_departmentLocal=JSON.parse(sessionStorage.getItem("duty_info"));
/*
     table:需要渲染数据的表格
     startNum：渲染数据开始的位置
     date:需要渲染的数据
 */
function pageContent(table,startNum,date){
    $("#duty_count").html(date.length)
    //如果表头有内容，则不添加
    // console.log($(table+">thead>tr").html().length)
    // console.log($(table+">thead>tr").html())
    if($(table+">thead>tr").html().length==0 ){
        //渲染表头部分
        for(let item in date[0]){
            if(item=="studentId"){
                $(table+">thead>tr").append("<th>学号</th>")
            }else if(item=="studentName"){
                $(table+">thead>tr").append("<th>姓名</th>")
            }else if(item=="studentGrade"){
                $(table+">thead>tr").append("<th>班级</th>")
            } else if(item=="studentTeacher"){
                $(table+">thead>tr").append("<th>教师</th>")
            }else if(item=="relation"){
                $(table+">thead>tr").append("<th>关系</th>")
            }else if(item=="parentName"){
                $(table+">thead>tr").append("<th>父母姓名</th>")
            }else if(item=="parentEmail"){
                $(table+">thead>tr").append("<th>家长邮箱</th>")
            }else if(item=="inTime"){
                $(table+">thead>tr").append("<th>入园时间</th>")
            }else if(item=="outTime"){
                $(table+">thead>tr").append("<th>出园时间</th>")
            }else if(item=="studentAttend"){
                $(table+">thead>tr").append("<th>考勤</th>")
            }
        }
        $(table+">thead>tr").append("<th>操作</th>")
    }

    //先清空原有的内容
    $("#duty_table>tbody").html("");
    //渲染表格身体部分
    for(let i=startNum;i<startNum+pageNum;i++){
        if(i<date.length){
            $(table+">tbody").append(`
               <tr>
                    <td class="duty_class_id">${date[i].studentId}</td>
                    <td>${date[i].studentName}</td>
                    <td>${date[i].studentGrade}</td>
                    <td>${date[i].studentTeacher}</td>
                    <td>${date[i].relation}</td>
                    <td>${date[i].parentName}</td>
                    <td class="vacaEmail">${date[i].parentEmail}</td>
                    <td>${date[i].inTime}</td>
                    <td>${date[i].outTime}</td>
                    <td class="duty_duty">${date[i].studentAttend}</td>
                    <td class="duty_operation">
                        <span class="duty_look" data-toggle="modal" data-target="#duty_ViewDetails">查看</span>
                        <span class="duty_leave">请假</span>
                    </td>
               </tr>                   
            `)
        }else{
            break;
        }
    }
    //判断当前的出勤状态
    let duty_duty_temp=$("#duty_table>tbody>tr .duty_duty");
    for(let i=0;i<duty_duty_temp.length;i++){
        if($(duty_duty_temp[i]).text()=="请假"){
            //设置该按钮样式
            $(duty_duty_temp[i]).next().children(".duty_leave").css("backgroundColor","#999")
            $(duty_duty_temp[i]).next().children(".duty_leave").on("click",duty_vaca_reason)
        }else{
            $(duty_duty_temp[i]).next().children(".duty_leave").on("click",duty_vacation)
        }
    }
}
//弹出请假详情
function duty_vaca_reason() {
    $(this).attr({
        "data-toggle":"modal",
        "data-target":"#duty_viewVacation"
    })
    duty_vacaModel($(this))
}
function duty_vacation() {
    $(this).attr({
        "data-toggle":"modal",
        "data-target":"#duty_viewVacation"
    })
    $(this).parent().prev().html("请假");
    $(this).css("backgroundColor","#999");
    let duty_vace_id=$(this).parent().parent().children(".duty_class_id").html()
    for(let i=0;i<duty_departmentLocal.length;i++){
        if(duty_departmentLocal[i].studentId==duty_vace_id){
            duty_departmentLocal[i].studentAttend="请假";
        }
        duty_vacaModel($(this))
    }
}

// 渲染模态框数据
function duty_vacaModel(obj) {
    let duty_vace_id=obj.parent().parent().children(".duty_class_id").html()
    for(let i=0;i<duty_departmentLocal.length;i++){
        if(duty_departmentLocal[i].studentId==duty_vace_id){
            let duty_ema=obj.parent().siblings(".vacaEmail").html()
            $("#duty_vaca_email").html(duty_ema)
            $("#duty_vaca_time").html(new Date().toLocaleDateString())
            $("#duty_vaca_text").html(duty_departmentLocal[i].vacationreason)
            duty_departmentLocal[i].vacationreason.$("#duty_vaca_text").html()
        }
    }
}

//渲染需要多少个分页按钮
/*element:jQuery对象
date:需要渲染的数据*/
function pageBtn(element,date) {
    dutyPageCount=Math.ceil(date.length/pageNum);
    //先清空原有的内容
    $(element).html("");
    for(let i=0;i<dutyPageCount;i++){
        $(element).append(`
            <span class="dutyBtnList">${i+1}</span>
        `)
    }
    $(".dutyBtnList:eq(0)").addClass("duty_click_active");
    //点击分页
    function dutyPageClick(obj){
        let duty_page=obj.text();
        pageContent("#duty_table",(duty_page-1)*pageNum,duty_departmentLocal)
        obj.addClass("duty_click_active").siblings().removeClass("duty_click_active")
    }
    $("#duty_pageNum").on("click",".dutyBtnList",function () {
        dutyPageClick($(this));
        dutyPageNum=$(this).index()+1
    })
    //点击上一页/下一页
    $(".duty_pages").on("click",".duty_paging",function () {
        //点击上一页时需要判断是否是第一页
        if($(this).text()=="上一页"){
            if(dutyPageNum!=1){
                dutyPageNum-=1;
                console.log(dutyPageNum)
                $(".dutyBtnList:eq("+(dutyPageNum-1)+")").addClass("duty_click_active").siblings().removeClass("duty_click_active")
                dutyPageClick($(".dutyBtnList:eq("+(dutyPageNum-1)+")"))

            }
        }else if($(this).text()=="下一页"){
            if(dutyPageNum<dutyPageCount){
                dutyPageNum+=1;
                console.log(dutyPageNum)
                $(".dutyBtnList:eq("+(dutyPageNum-1)+")").addClass("duty_click_active").siblings().removeClass("duty_click_active")
                dutyPageClick($(".dutyBtnList:eq("+(dutyPageNum-1)+")"))


            }
        }
    })
}

//显示班级列表
function duty_class_list(){
    ///渲染搜索查询班级中的班级名字

    for(let i=0;i<dutyClassName(student).length;i++){
        $("#duty_option").append(
            ` <li>${dutyClassName(student)[i]}</li>`
        );
    }
    //获取班级名称列表
    function dutyClassName(duty_classlist){
        let duty_className=[];//存放所有的班级名
        let duty_newclassName=[];//存放不重复的班级名
        for(let i=0;i<duty_classlist.length;i++){
            duty_className.push(duty_classlist[i].studentGrade);
        }
        for(let i=0;i<duty_className.length;i++) {
            var duty_items=duty_className[i];
            //判断元素是否存在于new_arrclassName中，如果不存在则插入到new_arrclassName中
            if($.inArray(duty_items,duty_newclassName)==-1) {
                duty_newclassName.push(duty_items);
            }
        }
        return duty_newclassName;
    }
}

// 模拟班级列表下拉列表框
$("#duty_option").on("click","li",function () {
    let duty_text=$(this).html()
    duty_departmentLocal=[];
    $(this).parent().prev().prev().html(duty_text);
    for(let i=0;i<student.length;i++){
        if(student[i].studentGrade==duty_text||duty_text=="全部"){
            duty_departmentLocal.push(student[i])
        }
    }
    pageContent("#duty_table",0,duty_departmentLocal);
    //重新渲染按钮
    dutyPageCount=Math.ceil(duty_departmentLocal.length/pageNum);
    //先清空原有的内容
    $("#duty_pageNum").children().remove();
    for(let i=0;i<dutyPageCount;i++){
        $("#duty_pageNum").append(`
            <span class="dutyBtnList">${i+1}</span>
        `)
    }
    $(".dutyBtnList:eq(0)").addClass("duty_click_active");
    $(".duty_input_text").val("")
})

//模糊查询函数
// duty_Stu:输入的学生信息
// student：数据表
// duty_class_html：输入的班级
function duty_indexSelect(duty_Stu,student,duty_class_html){
    const duty_arr = student.filter( res => {
        if(duty_class_html=="全部"||duty_class_html=="请选择班级"){
            return res.studentId.indexOf(duty_Stu) > -1 || res.studentName.indexOf(duty_Stu) > -1||res.studentAttend.indexOf(duty_Stu) > -1;
        }else{
            return res.studentGrade.indexOf(duty_class_html) > -1 && (res.studentId.indexOf(duty_Stu) > -1 || res.studentName.indexOf(duty_Stu) > -1||res.studentAttend.indexOf(duty_Stu) > -1);
        }
    })
    return duty_arr;
}
// 模拟点击搜索学生
$(".duty_input_text").on("keyup",function (e) {
    let duty_Stu=$(".duty_input_button").prev().prev().val()
    duty_departmentLocal=duty_indexSelect(duty_Stu,student,$("#duty_mySelect").html())
    pageContent("#duty_table",0,duty_departmentLocal);
    //重新渲染按钮
    dutyPageCount=Math.ceil(duty_departmentLocal.length/pageNum);
    //先清空原有的内容
    $("#duty_pageNum").children().remove();
    for(let i=0;i<dutyPageCount;i++){
        $("#duty_pageNum").append(`
            <span class="dutyBtnList">${i+1}</span>
        `)
    }
    $(".dutyBtnList:eq(0)").addClass("duty_click_active");

})

//点击查看详情
$("#duty_table>tbody").on("click",".duty_look",function () {
    let duty_class_id=$(this).parent().parent().children(".duty_class_id").html();
    for(let i=0;i<student.length;i++){
        if(student[i].studentId==duty_class_id){
            console.log(student[i].studentId)
            $("#duty_name").html(student[i].studentName);
            $("#duty_sex").html(student[i].studentSex);
            $("#duty_num").html(student[i].studentId);
            $("#duty_da").html(student[i].studentBirth);
            $("#duty_tea").html(student[i].studentTeacher);
            $("#duty_class").html(student[i].studentGrade);
            $("#duty_rel").html(student[i].relation);
            $("#duty_par").html(student[i].parentName);
            $("#duty_tel").html(student[i].ParentPhone);
            $("#duty_out").html(student[i].outTime);
            $("#duty_str").html(student[i].studentAddress);
            $("#duty_ema").html(student[i].parentEmail);
            $("#duty_in").html(student[i].inTime);
            $("#duty_att").html(student[i].studentAttend);
        }
    }
})





$(document).ready(function () {
    pageContent("#duty_table",0,student)
    pageBtn("#duty_pageNum",student)
    duty_class_list();
})


//导出表格
$("#out_table3").click(function () {
    $("#duty_table").table2excel({
        exclude  : ".not", //过滤位置的 css 类名
        filename : "考勤管理"+".xls" //文件名称
    });
});