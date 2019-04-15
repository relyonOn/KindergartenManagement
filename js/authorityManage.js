const pageAvageNum=5;//定义每页显示5条数据 
var whichPageNum=0;//当前页的起点
var iSfirst=true;//定义一个Boolean值，判断表头是否第一次生成
var mypageNum=1;//第一个变量用于存当前页数
var pageCount;//定义一个变量用来存储共有多少页
var arrclassName=new Array();//所有班级名称数组(有重)
var new_arrclassName=new Array();////新的班级名称数组(去重)
var adminOld=[...admin];//将所有管理员数据复制给另一数组
var teacherOld=[...teacher];//将所有管理员数据复制给另一数组
var selValue;//获取班级名字
var studentId_alone;//操作单个学生信息时获取该学生学号的value值
var studentGrade_alone;//操作单个学生信息时获取该学生所在的班级名称
var newJson = null; //搜索结果
var newJson_newArr;
var sInfo1;
var stuInforLocal=null;
var  accountNumber=null;

$(document).ready(function(){
    //第一次加载时生成数据表
    var newArr=admin.concat(teacher);
    paging("#stuInfor_thead",whichPageNum,newArr,iSfirst);
    iSfirst=false;
    //生成分页按钮
    pageBtn("#stuInfor_pageNum",newArr);
    $(".stuInfor__stuNumberStrong").html(newArr.length);
    //点击页数按钮
    $("#stuInfor_pageNum").on("click",".stuInfor_pageNumClick",function () {
        mypageNum =parseInt($(this).text());//将当前页数赋值给mypageNum
        $(".stuInfor_pageNumClick").removeClass("stuInfor_pageActive");
        $(this).addClass("stuInfor_pageActive");
        whichPageNum=(mypageNum-1) * pageAvageNum;
        paging("#stuInfor_thead tr",whichPageNum,newArr,iSfirst);
    }); 
    //点击上一页和下一页
    $(".stuInfor_pages").on("click",".stuInfor_btnComm",function(){
        //点击上一页时需要判断是否是第一页
        if($(this).text()=="上一页"){
           if(mypageNum==1){
                alert("亲，已经是第一页哦！");
           }else{
                mypageNum-=1;
                commFun(mypageNum);     
           }
        }else if($(this).text()=="下一页"){
            if(mypageNum>=pageCount){
                alert("亲，已经是最后一页哦！");
            }else{
                mypageNum+=1;
                commFun(mypageNum);
            }
        }
    });
    //点击上一页和下一页共用
    function commFun(mypageNum){
        whichPageNum=(mypageNum-1) * pageAvageNum;
        paging("#stuInfor_thead tr",whichPageNum,newArr,iSfirst);
        $(".stuInfor_pageNumClick").removeClass("stuInfor_pageActive");
        $(".stuInfor_pageNumClick").eq(mypageNum-1).addClass("stuInfor_pageActive");    
    }
    //根据姓名进行模糊查询
    $(".stuInfor_inputText").keyup( 
        function(){ 
            var inputTxt=$.trim($(".stuInfor_inputText").val()); 
            newJson = indexSelect(inputTxt,newArr);         
            pageBtn('#stuInfor_pageNum', newJson);
            whichPageNum=0;
            paging("#stuInfor_thead tr",whichPageNum,newJson,iSfirst);
            $(".stuInfor__stuNumberStrong").html(newJson.length);
        }
    )
     //添加管理员信息
     $(".stuInfo_addBtn").click(function(){
        //先清空上一次输入的内容
        $(".stuInfor_add_headPortraitImg").attr('src','../images/stuInfor_images/add_stuImg.png');
        $(".stuInfor_usrReallyName").val("");
        $(".stuInfor_usrName").val("");
        $(".stuInfor_usrPsd").val("");
        $(".stuInfor_usrPsdChecked").val("");
        $(".stuInfor_usrDuty").val("");
        $(".stuInfor_accessLevel").val("");
    });  
    //上传图片
    $("#chooseImage").on('change',function(){
        var filePath = $(this).val(),         //获取到input的value，里面是文件的路径
        fileFormat = filePath.substring(filePath.lastIndexOf(".")).toLowerCase(),
        src = window.URL.createObjectURL(this.files[0]); //转成可以在本地预览的格式
        //检查是否是图片
        if(!fileFormat.match(/.png|.jpg|.jpeg/)){
            alert('上传错误,文件格式必须为：png/jpg/jpeg');
            return;  
        }
        //显示图片
        $('.stuInfor_add_headPortraitImg').attr('src',src);
    });
    // 添加管理员信息确认点击事件
    $(".stuInfor_addStudent").click(function(){
        //获取照片路径
        let stuInfor_addStuImg=$(".stuInfor_add_headPortraitImg").attr('src');
        //获取输入的名字
        let stuInfor_addUsrReallyName;
        if($(".stuInfor_usrReallyName").val()!=""){
            stuInfor_addUsrReallyName=$(".stuInfor_usrReallyName").val();
        }else{
            alert("请输入名字");
            return false;
        }
        //获取输入的账号
        let stuInfor_addUsrName;
        if($(".stuInfor_usrName").val()!=""){
            stuInfor_addUsrName=$(".stuInfor_usrName").val();
            for(let j=0;j<newArr.length;j++){
                if( newArr[j].username ==stuInfor_addUsrName || newArr[j].teacherId ==stuInfor_addUsrName){
                    alert("你输入的账号已被注册，请重新输入");
                    $(".stuInfor_usrName").val("");
                    return false;
                }   
            }
        }else{
            alert("请输入账号");
            return false;
        }
        //获取输入的密码
        let stuInfor_addUsrPsd;
        if($(".stuInfor_usrPsd").val()!=""){
            stuInfor_addUsrPsd=$(".stuInfor_usrPsd").val();
        }else{
            alert("请输入密码");
            return false;
        }
        //获取输入的确认密码
        let stuInfor_addUsrPsdChecked;
        if($(".stuInfor_usrPsdChecked").val()!=""){
            stuInfor_addUsrPsdChecked=$(".stuInfor_usrPsdChecked").val();
            if(stuInfor_addUsrPsdChecked!=stuInfor_addUsrPsd){
                alert("确认密码错误，请重新输入");
                $(".stuInfor_usrPsdChecked").val("");
                return false;
            }
        }else{
            alert("请输入确认密码");
            return false;
        }
        //获取输入的职务
        let stuInfor_addUsrDuty;
        if($(".stuInfor_usrDuty").val()!=""){
            stuInfor_addUsrDuty=$(".stuInfor_usrDuty").val();
        }else{
            alert("请输入职务");
            return false;
        }
        //获取输入的权限等级
        let stuInfor_addAccessLevel;
        if($(".stuInfor_accessLevel").val()!=""){
            stuInfor_addAccessLevel=$(".stuInfor_accessLevel").val();
            let patternAccessLevel = /^[1-9]\d*|0$/;
            if(!patternAccessLevel.test(stuInfor_addAccessLevel)){
                alert("权限等级必须为数字");
                return false;
            }
        }else{
            alert("请输入权限等级");
            return false;
        }
        let json={
            adminName:stuInfor_addUsrReallyName,
            photo:stuInfor_addStuImg,                   
            username:stuInfor_addUsrName,
            password:stuInfor_addUsrPsd,
            job:stuInfor_addUsrDuty,
            power:stuInfor_addAccessLevel,
        };
        adminOld.push(json);
        newArr = newArr.filter(function(item) {
            return item.departmentIsOk === "已激活";
        })
        //刷新数据
        refreshData();
        alert("添加管理员信息成功！");
        admin=adminOld;
        //数据缓存
        stuInforLocal=student;
        sInfo1 = JSON.stringify(stuInforLocal);   //将对象"序列化"为JSON数据(字符串格式)
        sessionStorage.setItem("info", sInfo1);   //以字符串格式存储信息
    });
    //编辑管理员信息
    $("tbody").on("click",".manageEditBtn",function(){
         //获取管理员的账号
         accountNumber=($(this).parents("tr").find(".accountNumber").html());
         //根据账号值获取对应信息
         for(let i=0;i<newArr.length;i++){
            if(newArr[i].username==accountNumber || newArr[i].teacherId==parseInt(accountNumber)){
                $(".stuInfor_add_headPortraitImg").attr('src',"../"+newArr[i].photo);

                $(".stuInfor_usrReallyName").val(newArr[i].adminName || newArr[i].teacherName);
                $(".stuInfor_usrName").val(newArr[i].username || newArr[i].teacherId);
                $(".stuInfor_usrPsd").val(newArr[i].password);
                $(".stuInfor_usrPsdChecked").val("");
                $(".stuInfor_usrDuty").val(newArr[i].job);
                $(".stuInfor_accessLevel1").val(newArr[i].power);
            }
        }
    });  
    // 编辑管理员信息确认点击事件
    $(".stuInfor_manageEdit").click(function(){
        //获取输入的权限等级
        let stuInfor_addAccessLevel;
        if($(".stuInfor_accessLevel1").val()!=""){
            stuInfor_addAccessLevel=$(".stuInfor_accessLevel1").val();
            let patternAccessLevel = /^[1-9]\d*|0$/;
            if(!patternAccessLevel.test(stuInfor_addAccessLevel)){
                alert("权限等级必须为数字");
                return false;
            }
            if(parseInt(stuInfor_addAccessLevel)>=10){
                alert("权限等级必须低于超级管理员的权限等级");
                $(".stuInfor_accessLevel1").val("");
                return false;
            }
        }else{
            alert("请输入权限等级");
            return false;
        }
        for(let i=0;i<newArr.length;i++){
            if(accountNumber=="admin"){
                alert("不能更改超级管理员的权限哦！");
                return false;
            }else{
                if(newArr[i].username==accountNumber || newArr[i].teacherId==parseInt(accountNumber)){
                    newArr[i].power=stuInfor_addAccessLevel
                }
            }
        }
        newArr = newArr.filter(function(item) {
            return item.departmentIsOk === "已激活";
        })
        //刷新数据
        refreshData();
        alert("更改权限成功！");
        //数据缓存
        stuInforLocal=newArr;
        sInfo1 = JSON.stringify(stuInforLocal);   //将对象"序列化"为JSON数据(字符串格式)
        sessionStorage.setItem("info", sInfo1);   //以字符串格式存储信息

        $(".stuInfor_add_headPortraitImg").attr('src','../images/stuInfor_images/add_stuImg.png');
        $(".stuInfor_usrReallyName").val("");
        $(".stuInfor_usrName").val("");
        $(".stuInfor_usrPsd").val("");
        $(".stuInfor_usrPsdChecked").val("");
        $(".stuInfor_usrDuty").val("");
        $(".stuInfor_accessLevel").val("");
    });
    $("tbody").on("click",".mangaDelateBtn",function(){
        //获取管理员的账号
        accountNumber=($(this).parents("tr").find(".accountNumber").html());
    });
    //删除管理员
    $(".deleteMange_btn").click(function(){
        for(let i=0;i<newArr.length;i++){
            if(accountNumber=="admin"){
                alert("超级管理员不能删除哦！");
                return false;
            }else{
                if(newArr[i].username==accountNumber || newArr[i].teacherId==parseInt(accountNumber)){
                    newArr[i].departmentIsOk="已撤销";
                }
            }
        }
        newArr = newArr.filter(function(item) {
            return item.departmentIsOk === "已激活";
        })
        console.log(newArr);
        //刷新数据
        refreshData();
        alert("该管理员已经删除。");
        //数据缓存
        stuInforLocal=newArr;
        sInfo1 = JSON.stringify(stuInforLocal);   //将对象"序列化"为JSON数据(字符串格式)
        sessionStorage.setItem("info", sInfo1);   //以字符串格式存储信息
    });
     //刷新数据公用
     function refreshData(){
        pageBtn('#stuInfor_pageNum', newArr);
        whichPageNum=0;
        paging("#stuInfor_thead",whichPageNum,newArr,iSfirst);
        $(".stuInfor__stuNumberStrong").html(newArr.length);
    } 
})
//表格上的数据生成函数
function paging(table,whichPageNum,arrStu,iSfirst){
    //判断表头是否是第一次生成
    if(iSfirst){
        $(table).html(
            `<tr>
                <th>姓名</th>
                <th>账号</th>
                <th>职务</th>
                <th>权限等级</th>
                <th>操作</th>
            </tr>`
        )
    }
    //在渲染数据前先清空表格
    $("#stuInfor_mytable tbody").html("");
    //根据哪一页渲染显示5条数据
    for(let i=whichPageNum;i<whichPageNum+pageAvageNum;i++){
        if(i<arrStu.length){
            $("#stuInfor_mytable tbody").append(
            ` <tr>
                <td>${arrStu[i].adminName || arrStu[i].teacherName}</td>
                <td class="accountNumber">${arrStu[i].username || arrStu[i].teacherId}</td>
                <td>${arrStu[i].job}</td>
                <td>${arrStu[i].power}</td>
                <td class="tdOperation">
                    <button type="button" class="manageEditBtn stu_lookBtn btn" data-toggle="modal" data-target="#stuInfor_editManageModal">编辑</button>
                    <button type="button" class="mangaDelateBtn btn btn-danger" data-toggle="modal" data-target="#delate_manage">删除</button>
                </td>
            </tr>`
            )
        }else{
            break;
        }
    }
}
//渲染一共有多少个分页按钮函数
function pageBtn(oBtn,arrStu){
    $(oBtn).html('');
    pageCount=Math.ceil(arrStu.length/pageAvageNum);
    for(let i=0;i<pageCount;i++){
        if(i==0){
            $(oBtn).append(`<button class="stuInfor_pageNumClick stuInfor_pageActive">${i+1}</button>`);
        }else{
            $(oBtn).append(`<button class="stuInfor_pageNumClick">${i+1}</button>`);
        }
    }
}
//模糊查询函数
function indexSelect(inputChar,stuArr){
    const arr = stuArr.filter( res => {
        name=res.adminName || res.teacherName
        return name.indexOf(inputChar) > -1;
    })
    return arr;
}