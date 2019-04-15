const pageNum_y=5;//定义每页显示5条数据
var whichPageNum_y=0;//当前页的起点
var iSfirst_y=true;//定义一个Boolean值，判断表头是否第一次生成
var mypageNum_y=1;//第一个变量用于存当前页数
var pageCount_y;//定义一个变量用来存储共有多少页
var arrclassName_y=new Array();//所有班级名称数组(有重)
var new_arrclassName_y=new Array();////新的班级名称数组(去重)
var sInfo2_y = sessionStorage.getItem("teacher_info");//获取缓存
var departmentLocal = JSON.parse(sInfo2_y);
//开除
function delContent(obj){
    for(let i=0 ;i<departmentLocal.length;i++){
        var CON = $(obj).parent().parent().parent().parent().parent().children()[1].innerHTML; //遍历找到需要删除的节点
        if(CON==departmentLocal[i].teacherId){
            $(obj).parent().parent().parent().parent().parent().remove();
            departmentLocal.splice(i,1);
            var temp = JSON.stringify(departmentLocal);
            sessionStorage.setItem("teacher_info",temp);
        }
    }}
function delAll(obj){
    var laiHongMei =  $("input[type='checkbox']")
    for(let i =0;i<laiHongMei.length;i++){
        console.log(laiHongMei[i].checked)
        if(laiHongMei[i].checked){
            $(laiHongMei[i]).parent().parent().remove()
            console.log(i)
            departmentLocal.splice(i,1);
        }
    }
}




function addDepartmentLocal() {
    $("#tNo").val();//编号input框的值
    $("#tName").val();//姓名input框的值
    $("#tSex  option:selected").text();;;//性别input框的值
    $("#tClass  option:selected").text()//班级input框的值
    $("#tAge").val();//年龄input框的值
    $("#tWork").val();//职务input框的值
    var duixiang = {
        teacherId:$("#tNo").val(),
        teacherName: $("#tName").val(),
        teacherAge: $("#tAge").val(),
        teacherSex:$("#tSex  option:selected").text(),
        grade:$("#tClass  option:selected").text(),
        job:$("#tWork").val()
    };
    departmentLocal.push(duixiang);
    $("#tNo").val(" ");//编号input框的值
    $("#tName").val(" ");//姓名input框的值
    $("#tAge").val(" ");//年龄input框的值
    $("#tWork").val(" ");//职务input框的值
    $("#tBirthday").val(" ");//职务input框的值
    var sInfo1 = JSON.stringify(departmentLocal);
    sessionStorage.setItem("teacher_info",sInfo1)

}


$("#input").on("focus", function () {
    var that = $(this);
    //显示列表
    $(".myTbody").show();
    //输入实时查询事件，propertychange是IE的输入监听事件，input是其它浏览器
    $("#input").on("input propertychange", function () {
        $("#myTr ")
            .hide()
            .filter(":contains('" + that.val().toLocaleLowerCase() + "')")//小写
            .show();
    });
});








$(document).ready(function(){
    //第一次加载时生成数据表
    paging("#tInfor_thead",whichPageNum_y,departmentLocal,iSfirst_y);
    iSfirst_y=false;
    //生成分页按钮
    pageBtn("#tInfor_pageNum",departmentLocal);
    $(".tInfor__tNumberStrong").html(departmentLocal.length);
    //点击页数按钮
    $("#tInfor_pageNum").on("click",".pageNumClick_y",function () {
        mypageNum_y =parseInt($(this).text());//将当前页数赋值给mypageNum_y
        $(".pageNumClick_y").removeClass("pageActive");
        $(this).addClass("pageActive");
        whichPageNum_y=(mypageNum_y-1) * pageNum_y;
        paging("#tInfor_thead tr",whichPageNum_y,departmentLocal,iSfirst_y);
    });
    //点击上一页和下一页
    $(".tInfor_pages").on("click",".tInfor_btnComm",function(){
        //点击上一页时需要判断是否是第一页
        if($(this).text()=="上一页"){
            if(mypageNum_y==1){
                alert("已经是第一页了");
            }else{
                mypageNum_y-=1;
                commFun(mypageNum_y);
            }
        }else if($(this).text()=="下一页"){
            if(mypageNum_y>=pageCount_y){
                alert("已经是最后一页了");
            }else{
                mypageNum_y+=1;
                commFun(mypageNum_y);
            }
        }
    });
    function commFun(mypageNum_y){
        whichPageNum_y=(mypageNum_y-1) * pageNum_y;
        paging("#tInfor_thead tr",whichPageNum_y,departmentLocal,iSfirst_y);
        $(".pageNumClick_y").removeClass("pageActive");
        $(".pageNumClick_y").eq(mypageNum_y-1).addClass("pageActive");
    }
    //生成搜索查询班级中的班级名字
    className_option();
    ///渲染搜索查询班级中的班级名字
    function className_option(){
        for(let i=0;i<className(student).length;i++){
            $("#stuInfor_selectClass").append(
                ` <option value="">${className(student)[i]}</option>`
            );
        }
    }
    $("#tInfor_selectClass").on("click",".tInfor_searchOption",function(){
    });
});
//分页上的数据生成函数
function paging(table,whichPageNum_y,arrTeacher,iSfirst_y){
    //判断表头是否是第一次生成
    if(iSfirst_y){
        $(table).html(
            `<tr>
                <th></th>
                <th class='tdentIdTh'>教职工编号</th>
                <th id="myName">姓名</th>
                <th>年龄</th>
                <th>性别</th>
                <th>班级</th>
                <th>职务</th>
                <th>操作</th>
            </tr>`
        )
    }
    //在渲染数据前先清空表格
    $("#teacher_mytable tbody").html("");
    //根据哪一页渲染显示5条数据
    for(let i=whichPageNum_y;i<whichPageNum_y+pageNum_y;i++){
        if(i<arrTeacher.length){
            $("#teacher_mytable tbody").append(
                ` <tr id="myTr">
                    <td><input id =" checkBox "type="checkbox" /></td>
                    <td>${arrTeacher[i].teacherId}</td>
                    <td>${arrTeacher[i].teacherName}</td>
                    <td>${arrTeacher[i].teacherAge}</td>
                    <td>${arrTeacher[i].teacherSex}</td>
                    <td>${arrTeacher[i].grade}</td>
                    <td>${arrTeacher[i].job}</td>
                    <td class="tdOperation">
                        <div class="dropdown">
                            <button class="tInfor_moreActions btn btn-default dropdown-toggle" type="button" id="dropdownMenu1" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">
                                更多
                                <span class="caret"></span>
                            </button>
                            <ul class="dropdown-menu" aria-labelledby="dropdownMenu1">
                                <li><a  class="tInfor_dropOut del" onclick="delContent(this)"  href="#">开除</a></li>
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
function pageBtn(oBtn,arrTeacher){
    pageCount_y=Math.ceil(arrTeacher.length/pageNum_y);
    for(let i=0;i<pageCount_y;i++){
        if(i==0){
            $(oBtn).append(`<button class="pageNumClick_y pageActive">${i+1}</button>`);
        }else{
            $(oBtn).append(`<button class="pageNumClick_y">${i+1}</button>`);
        }
    }
}

//获取班级名称
function className(arrTeacher){
    for(let i=0;i<arrTeacher.length;i++){
        arrclassName_y.push($(arrTeacher[i].grade).selector);
    }
    for(let i=0;i<arrclassName_y.length;i++) {
        var items=arrclassName_y[i];
        //判断元素是否存在于new_arrclassName_y中，如果不存在则插入到new_arrclassName_y中
        if($.inArray(items,new_arrclassName_y)==-1) {
            new_arrclassName_y.push(items);
        }
    }
    return new_arrclassName_y;
}