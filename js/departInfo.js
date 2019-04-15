const pageAvrageNum=5;//定义每页显示5条数据
var whichPageNum=0;//当前页的起点
var isFirst=true;//定义一个Boolean值，判断表头是否第一次生成
var mypageNum=1;//第一个变量用于存当前页数
var pageCount;//定义一个变量用来存储共有多少页
var departmentLocal = JSON.parse(sessionStorage.getItem("info"));
var teacherLocal = JSON.parse(sessionStorage.getItem("teacher_info"));
var this_i;
// var departmentLocal = department;
var table;
$(document).ready(table = function(){
    //第一次加载时生成数据表
    paging("#stuInfor_thead",whichPageNum,departmentLocal,isFirst);

    //生成分页按钮
    pageBtn("#stuInfor_pageNum",departmentLocal,isFirst);
    isFirst=false;
    $(".stuInfor__stuNumberStrong").html(departmentLocal.length);
    //点击页数按钮
    $("#stuInfor_pageNum").on("click",".stuInfor_pageNumClick",function () {
        mypageNum =parseInt($(this).text());//将当前页数赋值给mypageNum
        $(".stuInfor_pageNumClick").removeClass("stuInfor_pageActive");
        $(this).addClass("stuInfor_pageActive");
        whichPageNum=(mypageNum-1) * pageAvrageNum;
        paging("#stuInfor_thead tr",whichPageNum,departmentLocal,isFirst);
    }); 
    //点击上一页和下一页
    $(".stuInfor_pages").on("click",".stuInfor_btnComm",function(){
        //点击上一页时需要判断是否是第一页
        if($(this).text()==="上一页"){
           if(mypageNum===1){
                alert("已经是第一页！");
           }else{
                mypageNum-=1;
                commFun(mypageNum);     
           }
        }else if($(this).text()==="下一页"){
            if(mypageNum>=pageCount){
                alert("已经是最后一页！");
            }else{
                mypageNum+=1;
                commFun(mypageNum);
            }
        }
    });
    function commFun(mypageNum){
        whichPageNum=(mypageNum-1) * pageAvrageNum;
        paging("#stuInfor_thead tr",whichPageNum,departmentLocal,isFirst);
        $(".stuInfor_pageNumClick").removeClass("stuInfor_pageActive");
        $(".stuInfor_pageNumClick").eq(mypageNum-1).addClass("stuInfor_pageActive");    
    }
    $("#modal_btn").click(addDepartments);
    $(".stuInfo_addBtn").click(clear_modal);
});
//分页上的数据生成函数

function paging(table,whichPageNum,arrStu,isFirst){
    //判断表头是否是第一次生成
    if(isFirst){
        $(table).html(
            `<tr>
                <th></th>
                <th class='studentIdTh'>部门编号</th>
                <th>部门名称</th>
                <th>部门简介</th>
                <th>部门人数</th>
                <th>操作</th>
            </tr>`
        )
    }
    //在渲染数据前先清空表格
    $("#stuInfor_mytable>tbody").html("");
    //根据哪一页渲染显示5条数据
    // changePersons();
    for(let i=whichPageNum;i<whichPageNum+pageAvrageNum;i++){
        if(i<arrStu.length){
            $("#stuInfor_mytable tbody").append(
            ` <tr id="department_tr">
                    <td>${i+1}</td>
                    <td>${arrStu[i].departmentId}</td>
                    <td>${arrStu[i].departmentName}</td>               
                    <td>${arrStu[i].departmentContent}</td>
                    <td>${arrStu[i].persons}</td>
                    <td class="tdOperation">
                        <button type="button" class="stu_lookBtn btn" onclick="look_up(this)" data-toggle="modal" data-target="#look_modal">查看</button>
                        <div class="dropdown">
                            <button class="stuInfor_moreActions btn btn-default dropdown-toggle" type="button" id="dropdownMenu1" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">
                                更多操作
                                <span class="caret"></span>
                            </button>
                            <ul class="dropdown-menu" aria-labelledby="dropdownMenu1">
                                <li><a id="edit_department" href="#" onclick="edit_department(this)" data-toggle="modal" data-target="#department_edit">编辑</a></li>
                                <li><a href="#" onclick="del(this)">删除</a></li>
                            </ul>
                        </div>
                    </td>
            </tr>`
            )
        }else{
            break;
        }
    }
}
//渲染一共有多少个分页按钮
function pageBtn(oBtn,arrStu,isFirst){
    $(oBtn).html("");
    pageCount=Math.ceil(arrStu.length/pageAvrageNum);
    for(let i=0;i<pageCount;i++){
        if(i===0&&isFirst){
            $(oBtn).append(`<button class="stuInfor_pageNumClick stuInfor_pageActive">${i+1}</button>`);
        }else{
            $(oBtn).append(`<button class="stuInfor_pageNumClick">${i+1}</button>`);
        }
    }
}
//添加部门数据
function clear_modal() {
    $("#departInfo1").val("");
    $("#departInfo2").val("");
    $("#departInfo3").val("");
    $("#departInfo4").val("");
}
function addDepartments(){
    var addDepartInfo1=$("#departInfo1").val();
    var addDepartInfo2=$("#departInfo2").val();
    var addDepartInfo3=$("#departInfo3").val();
    var addDepartInfo4=$("#departInfo4").val();
    // console.log(addDepartInfo1);
    // $("#departInfo1").bind('input propertychange', function() {
    //     addDepartInfo1 = $("#departInfo1").val();
    //     $("#departInfo1").val("");
    // });
    // $("#departInfo2").bind('input propertychange', function() {
    //     addDepartInfo2 = $("#departInfo2").val();
    //     $("#departInfo2").val("");
    // });
    // $("#departInfo3").bind('input propertychange', function() {
    //     addDepartInfo3 = $("#departInfo3").val();
    //     $("#departInfo3").val("");
    // });
    // $("#departInfo4").bind('input propertychange', function() {
    //     addDepartInfo4 = $("#departInfo4").val();
    //     $("#departInfo4").val("");
    // });
    if(addDepartInfo2===""||addDepartInfo3===""){
        alert("请输入部门名称和部门描述！");
    }else {
        var duixiang = {
            departmentId: addDepartInfo1,
            departmentName: addDepartInfo2,
            departmentContent: addDepartInfo3,
            persons: addDepartInfo4
        };
        departmentLocal.push(duixiang);
        // console.log(department);
        var sInfo1 = JSON.stringify(departmentLocal);   //将对象"序列化"为JSON数据(字符串格式)
        sessionStorage.setItem("info", sInfo1);   //以字符串格式存储信息
        // var sInfo2 = sessionStorage.getItem("info");
        // departmentLocal = JSON.parse(sInfo2);
        $("#stuInfor_addStuModal").modal('hide');
        pageBtn("#stuInfor_pageNum",departmentLocal,isFirst);
        paging("#stuInfor_thead",whichPageNum,departmentLocal,isFirst);
        $(".stuInfor__stuNumberStrong").html(departmentLocal.length);
        // table();
    }
}
//删除表格行
function del(e) {
    for(let i=0;i<departmentLocal.length;i++){
        let id = $(e).parent().parent().parent().parent().parent().children()[1].innerHTML;
        // console.log(id);
        if(departmentLocal[i].departmentId===id){
            if(departmentLocal[i].persons==0){
                $(e).parent().parent().parent().parent().parent().remove();
                departmentLocal.splice(i,1);
                let temp = JSON.stringify(departmentLocal);
                sessionStorage.setItem("info",temp);
                alert("删除成功！");
            }else {
                alert("该部门仍有成员，删除失败！");
            }
        }
    }
}
//编辑表格行，弹出模态框，模态框获取表格行数据，用户修改后保存数据
function edit_department(e) {
    let idNode = $(e).parent().parent().parent().parent().parent().children()[1].innerHTML;
    for(let i=0;i<departmentLocal.length;i++){
        if(departmentLocal[i].departmentId===idNode){
            $("#departInfo01").val(departmentLocal[i].departmentId);
            $("#departInfo02").val(departmentLocal[i].departmentName);
            $("#departInfo03").val(departmentLocal[i].departmentContent);
            $("#departInfo04").val(departmentLocal[i].persons);
            this_i=i;
            // console.log($("#departInfo01").val())
        }
    }
}
$("#modal_btn01").click(function () {
    let addDepartInfo01=$("#departInfo01").val();
    let addDepartInfo02=$("#departInfo02").val();
    let addDepartInfo03=$("#departInfo03").val();
    let addDepartInfo04=$("#departInfo04").val();
    console.log(addDepartInfo01);
    if(addDepartInfo02===""||addDepartInfo03===""){
        alert("请输入部门名称和部门描述！");
    }else {
        var duixiang = {
            departmentId: addDepartInfo01,
            departmentName: addDepartInfo02,
            departmentContent: addDepartInfo03,
            persons: addDepartInfo04
        };
        departmentLocal.splice(this_i,1,duixiang);
        // console.log(department);
        var sInfo1 = JSON.stringify(departmentLocal);   //将对象"序列化"为JSON数据(字符串格式)
        sessionStorage.setItem("info", sInfo1);   //以字符串格式存储信息
        // var sInfo2 = sessionStorage.getItem("info");
        // departmentLocal = JSON.parse(sInfo2);
        $("#department_edit").modal('hide');
        pageBtn("#stuInfor_pageNum",departmentLocal,isFirst);
        paging("#stuInfor_thead",whichPageNum,departmentLocal,isFirst);
        $(".stuInfor__stuNumberStrong").html(departmentLocal.length);
        // table();
    }
});
// /****模糊查询****/
// $("#search_department").on("focus", function () {//获取焦点时输入框
//     let that = $(this);
//     //显示列表
//     $(".department_tbody").show();
//     //输入实时查询事件，propertychange是IE的输入监听事件，input是其它浏览器
//     $("#search_department").on("input propertychange", function () {
//         $("#department_tr ").hide().filter(":contains('" + that.val().toLocaleLowerCase() + "')").show();
//     });
// });
//查看成员
var arr=[];
function look_up(e) {
    // $("#depart_persons").children().remove();
    let look = $(e).parent().parent().children()[1].innerHTML;
    for(let i=0;i<teacherLocal.length;i++){
        if(teacherLocal[i].department===look){
            arr.push(teacherLocal[i])
        }
    }
    // $("#depart_persons").children().remove();
    for(let j=0;j<arr.length;j++){
        $("#depart_persons").append(
            `
                <div class="modal-body row">
                    <div class="stuInfor_addStu row">
                        <div class="depart_person col-md-2 col-lg-2">成员名称：</div>
                        <div class="depart_person col-md-2 col-lg-2">${arr[j].teacherName}</div>

                        <div class="depart_person col-md-2 col-lg-2">成员手机：</div>
                        <div class="depart_person col-md-2 col-lg-2">${arr[j].teacherPhone}</div>

                        <div class="depart_person col-md-2 col-lg-2">激活状态：</div>
                        <div class="depart_person col-md-2 col-lg-2">${arr[j].departmentIsOk}</div>
                    </div>
                </div>
            `)
    }
    arr=[];
    // console.log($("#depart_persons").children().remove());
    console.log(arr);
}
$("#close_modal").click(function () {
    $("#depart_persons").children().remove();
    // console.log($("#depart_persons").children());
});





//根据学生姓名或学号进行模糊查询
$("#search_department").keyup(
    function(){
        var inputTxt=$.trim($("#search_department").val());
        newJson = indexSelect(inputTxt,departmentLocal);
        pageBtn('#stuInfor_pageNum', newJson,isFirst);
        whichPageNum=0;
        paging("#stuInfor_thead",whichPageNum,newJson,isFirst);
        $(".stuInfor__stuNumberStrong").html(newJson.length);
        $("#stuInfor_selectClass option:not(:first)").remove();
        className_option("#stuInfor_selectClass");

        // pageBtn("#stuInfor_pageNum",departmentLocal,isFirst);
        // paging("#stuInfor_thead",whichPageNum,departmentLocal,isFirst);
        // $(".stuInfor__stuNumberStrong").html(departmentLocal.length);
    }
);
//模糊查询函数
function indexSelect(inputChar,stuArr){
    const arr = stuArr.filter( res => {
        return res.departmentId.indexOf(inputChar) > -1 || res.departmentName.indexOf(inputChar) > -1;
    });
    return arr;
}
//导出表格
$("#out_table").click(function () {
    $("#stuInfor_mytable").table2excel({
        exclude  : ".not", //过滤位置的 css 类名
        filename : "部门管理"+".xls" //文件名称
    });
});
//部门人数更改
// function changePersons() {
//     departmentLocal.persons=0;
//     for(i=0;i<teacherLocal.length;i++){
//         if(teacherLocal.department===2018001){
//             departmentLocal.persons++;
//         }
//     }
// }