const pageAvageNum=5;//定义每页显示5条数据 
var whichPageNum=0;//当前页的起点
var iSfirst=true;//定义一个Boolean值，判断表头是否第一次生成
var mypageNum=1;//第一个变量用于存当前页数
var pageCount;//定义一个变量用来存储共有多少页
var arrclassName=new Array();//所有班级名称数组(有重)
var new_arrclassName=new Array();////新的班级名称数组(去重)
var studentOld=[...student];//将所有学生数据复制给另一数组
var selValue;//获取班级名字
var studentId_alone;//操作单个学生信息时获取该学生学号的value值
var studentGrade_alone;//操作单个学生信息时获取该学生所在的班级名称
var newJson = null; //搜索结果
var sInfo1;
var stuInforLocal = null;
var newJson_newArr;

$(document).ready(function(){
    //第一次加载时生成数据表
    paging("#stuInfor_thead",whichPageNum,studentOld,iSfirst);
    iSfirst=false;
    //生成分页按钮
    pageBtn("#stuInfor_pageNum",studentOld);
    $(".stuInfor__stuNumberStrong").html(studentOld.length);
    //点击页数按钮
    $("#stuInfor_pageNum").on("click",".stuInfor_pageNumClick",function () {
        mypageNum =parseInt($(this).text());//将当前页数赋值给mypageNum
        $(".stuInfor_pageNumClick").removeClass("stuInfor_pageActive");
        $(this).addClass("stuInfor_pageActive");
        whichPageNum=(mypageNum-1) * pageAvageNum;
        paging("#stuInfor_thead tr",whichPageNum,newJson||studentOld,iSfirst);
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
        paging("#stuInfor_thead tr",whichPageNum,newJson||studentOld,iSfirst);
        $(".stuInfor_pageNumClick").removeClass("stuInfor_pageActive");
        $(".stuInfor_pageNumClick").eq(mypageNum-1).addClass("stuInfor_pageActive");    
    }
    //生成搜索查询班级中的班级名字
    className_option("#stuInfor_selectClass");
    //根据班级名字显示对应班级学生信息
    $("#stuInfor_selectClass").change(function(e){
        //选择班级名字时先清空输入的学生姓名或学号
        $("#studentInput").val("");
        selValue = e.target.value;//获取班级名字
        //过滤将相同班级名字的班级放入一个新的数组
        newJson = student.filter(function(item) {
            return item.studentGrade === selValue && item.studentStatus === true;
        })
        if(selValue=="all"){
            newJson = student.filter(function(item) {
                return item.studentStatus === true;
            })
        }
        pageBtn('#stuInfor_pageNum', newJson);
        whichPageNum=0;
        paging("#stuInfor_thead",whichPageNum,newJson,iSfirst);
        $(".stuInfor__stuNumberStrong").html(newJson.length);
        //将选择后的班级学生信息存放在新数组
        newJson_newArr=newJson;
    });
    //根据学生姓名或学号进行模糊查询
    $(".stuInfor_inputText").keyup(
        function(){
            var inputTxt=$.trim($(".stuInfor_inputText").val());
            newJson = indexSelect(inputTxt,newJson_newArr || studentOld);
            pageBtn('#stuInfor_pageNum', newJson);
            whichPageNum=0;
            paging("#stuInfor_thead",whichPageNum,newJson,iSfirst);
            $(".stuInfor__stuNumberStrong").html(newJson.length);
        }
    )
    //批量删除学生信息
    $(".stuInfor_delateAllStu_btn").on("click","#stuInfor_deleteBatches",function(){
        if(checkDelatefun().length==0){
            alert("请选中要删除的数据");
        }else{
            for(let i=0;i<checkDelatefun().length;i++){
                for(let j=0;j<studentOld.length;j++){
                    if(parseInt(studentOld[j].studentId)==parseInt(checkDelatefun()[i])){
                        studentOld[j].studentStatus=false;
                    }
                }
            } 
            studentOld = studentOld.filter(function(item) {
                return item.studentStatus === true;
            })
            //刷新数据
            refreshData();
            alert("删除成功！");
            //数据缓存
            stuInforLocal=studentOld;
            sInfo1 = JSON.stringify(stuInforLocal);   //将对象"序列化"为JSON数据(字符串格式)
            sessionStorage.setItem("info", sInfo1);   //以字符串格式存储信息
        }
    });
    //更多操作中的点击事件
    $("#stuInfor_mytable").on("click",".moreOperationLi",function(){
        //获取该学生学号的value值
        studentId_alone=($(this).parents("tr").find(".studentId").attr("value"));
        //获取该学生所在的班级名称
        studentGrade_alone=($(this).parents("tr").find(".studentGrade").attr("value"));
        if($(this).text()=="退学"){
            $(".modal-content1").find(".modal-title").text("是否退学？");
        }else if($(this).text()=="删除"){
            $(".modal-content1").find(".modal-title").text("是否删除？");
        }else if($(this).text()=="转班"){
            //生成需要转入的班级名字,生成前先清空已有的班级名字
            $(".stuInfor_changeClass_select option:not(:first)").remove();
            className_option(".stuInfor_changeClass_select");
        }else if($(this).text()=="编辑"){
            //根据该学生学号的value值获取对应信息
            for(let i=0;i<studentOld.length;i++){
                if(studentOld[i].studentId==studentId_alone){
                    $(".stuInfor_add_headPortraitImg").attr('src',studentOld[i].studentPhoto);
                    $(".stuInfor_stuName2").val(studentOld[i].studentName);
                    $(".stuInfor_stuSex2").val(studentOld[i].studentSex);
                    $(".stuInfor_stuAge2").val(studentOld[i].studentAge);
                    $(".stuInfor_stuGrade2").val(studentOld[i].studentGrade);
                    $(".stuInfor_stuId2").val(studentOld[i].studentId);
                    $(".stuInfor_stuBridth2").val(studentOld[i].studentBirth);
                    $(".stuInfor_teacherName2").val(studentOld[i].studentTeacher);
                    $(".stuInfor_stuIntime2").val(studentOld[i].inTime);
                    $(".stuInfor_praentName2").val(studentOld[i].parentName);
                    $(".stuInfor_relation2").val(studentOld[i].relation);
                    $(".stuInfor_parentPhone2").val(studentOld[i].ParentPhone);
                    $(".stuInfor_parentEmial2").val(studentOld[i].parentEmail);
                    $(".stuInfor_address2").val(studentOld[i].studentAddress);
                    $(".stuInfor_studentStatus2").val(studentOld[i].studentStatus);
                }
            }
        }
    });
    //出生日期日历弹出框
    laydate({
        elem: '#stuInfor_stuBridth',  
    });
    //入园时间日历弹出框
    laydate({
        elem: '#stuInfor_stuIntime',
    });
    // 添加学生信息
    $(".stuInfo_addBtn").click(function(){
        //先清空上一次输入的内容
        $(".stuInfor_add_headPortraitImg").attr('src','../images/stuInfor_images/add_stuImg.png');
        $(".stuInfor_stuName").val("");
        $(".stuInfor_stuAge").val("");
        $(".stuInfor_stuId").val("");
        $(".stuInfor_stuBridth").val("");
        $(".stuInfor_teacherName").val("");
        $(".stuInfor_stuIntime").val("");
        $(".stuInfor_praentName").val("");
        $(".stuInfor_relation").val("");
        $(".stuInfor_parentPhone").val("");
        $(".stuInfor_parentEmial").val("");
        $(".stuInfor_address").val("");
        $(".stuInfor_studentStatus").val("")
        // 生成搜索查询班级中的班级名字
        $("#stuInfor_selectClassAdd option:not(:first)").remove();
        className_option("#stuInfor_selectClassAdd");
        // 自动添加学号
        $(".stuInfor_stuId").val(parseInt(student[student.length-1].studentId)+1); 
    });
    //上传学生图片
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
    // 添加学生信息确认点击事件
    $(".stuInfor_addStudent").click(function(){
        //获取照片路径
        let stuInfor_addStuImg=$(".stuInfor_add_headPortraitImg").attr('src');
        //获取输入的名字
        let stuInfor_addStuName
        if($(".stuInfor_stuName").val()!=""){
            stuInfor_addStuName=$(".stuInfor_stuName").val();
            let patternName = /^[\u4e00-\u9fa5]+$/;
            if(!patternName.test(stuInfor_addStuName)){
                alert("学生名称必须为中文");
                return false;
            }
        }else{
            alert("请输入学生名字");
            return false;
        }
        //获取性别
        let stuInfor_addStuSex=$(".stuInfor_addStu_sex option:selected").text();
        //获取年龄
        let stuInfor_addStuAge=$(".stuInfor_stuAge").val();
        let patternAge = /^[1-9]\d*|0$/;
        if(!patternAge.test(stuInfor_addStuAge)){
            alert("请正确输入年龄");
            return false;
        }
        //获取所选班级
        let stuInfor_addStuClass;
        if($(".stuInfor_addStu_class2 option:selected").val()!=""){
            stuInfor_addStuClass=$(".stuInfor_addStu_class2 option:selected").val();
        }else{
            alert("请选择学生班级");
            return false;
        }
        //获取学号
        let stuInfor_addStuId=$(".stuInfor_stuId").val();
        //获取出生日期
        let stuInfor_addStuBirth;
        if($(".stuInfor_stuBridth").val()!=""){
            stuInfor_addStuBirth=$(".stuInfor_stuBridth").val();
        }else{
            alert("请输入学生出生日期");
            return false;
        }
        //获取班级老师姓名
        let stuInfor_addTeacherName;
        if($(".stuInfor_teacherName").val()!=""){
            stuInfor_addTeacherName=$(".stuInfor_teacherName").val();
        }else{
            alert("请输入学生班级老师的姓名");
            return false;
        }
         //获取入园时间
        let stuInfor_addIntime;
        if($(".stuInfor_stuIntime").val()!=""){
            stuInfor_addIntime=$(".stuInfor_stuIntime").val();
        }else{
            alert("请输入学生入园时间");
            return false;
        }
        //获取家长名字
        let stuInfor_addStuPraentName;
        if($(".stuInfor_praentName").val()!=""){
            stuInfor_addStuPraentName=$(".stuInfor_praentName").val();
            let patternParentName = /^[\u4e00-\u9fa5]+$/;
            if(!patternParentName.test(stuInfor_addStuPraentName)){
                alert("家长名称必须为中文");
                return false;
            }
        }else{
            alert("请输入学生家长名字");
            return false;
        }
        //获取学生与家长关系
        let stuInfor_addRelation
        if($(".stuInfor_relation").val()!=""){
            stuInfor_addRelation=$(".stuInfor_relation").val();
            let patternRelation = /^[\u4e00-\u9fa5]+$/;
            if(!patternRelation.test(stuInfor_addRelation)){
                alert("请正确输入关系");
                return false;
            }
        }else{
            alert("请输入学生与家长关系");
            return false;
        }
        //获取家长电话
        let stuInfor_addStuParentPhone;
        if($(".stuInfor_parentPhone").val()!=""){
            stuInfor_addStuParentPhone=$(".stuInfor_parentPhone").val();
            let patternStuParentPhone = /0?(13|14|15|18)[0-9]{9}/;
            if(!patternStuParentPhone.test(stuInfor_addStuParentPhone)){
                alert("请正确输入家长号码");
                return false;
            }
        }else{
            alert("请输入学生家长电话");
            return false;
        }
        //获取家长邮箱
        let stuInfor_addStuParentEmial=$(".stuInfor_parentEmial").val();
        let patternStuParentEmial =/^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/;
        if(!patternStuParentEmial.test(stuInfor_addStuParentEmial)){
            alert("邮箱格式不对");
            return false;
        }
        //获取家庭住址
        let stuInfor_addStuAddress=$(".stuInfor_address").val();
        //获取学籍状态
        let stuInfor_addStuStatus=Boolean($(".stuInfor_studentStatus").val());
        let json={
            studentId:stuInfor_addStuId,
            studentPhoto:stuInfor_addStuImg,                    //头像
            studentName:stuInfor_addStuName,
            studentGrade:stuInfor_addStuClass,
            studentTeacher:stuInfor_addTeacherName,
            studentAge:stuInfor_addStuAge,
            studentBirth:stuInfor_addStuBirth,
            studentSex:stuInfor_addStuSex,
            studentAddress:stuInfor_addStuAddress,
            relation:stuInfor_addRelation,
            parentName:stuInfor_addStuPraentName,
            parentEmail:stuInfor_addStuParentEmial,
            ParentPhone:stuInfor_addStuParentPhone,             //账号手机号
            password:"878787",                                  //密码手机号后六位
            inTime:stuInfor_addIntime,                          //入园时间
            outTime:"",                                         //出园时间
            studentAttend:true,                                 //出席
            studentStatus:stuInfor_addStuStatus,                //被删除前的状态为true
        };
        studentOld.push(json);
        studentOld = studentOld.filter(function(item) {
            return item.studentStatus === true;
        })
        //刷新数据
        refreshData();
        alert("添加学生信息成功！");
        student=studentOld;
        //数据缓存
        stuInforLocal=student;
        sInfo1 = JSON.stringify(stuInforLocal);   //将对象"序列化"为JSON数据(字符串格式)
        sessionStorage.setItem("info", sInfo1);   //以字符串格式存储信息
    });
    $("#chooseImage_edit").on('change',function(){
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
    //编辑学生信息
    $(".stuInfor_editStudent").click(function(){
        //获取照片路径
        let stuInfor_addStuImg=$(".stuInfor_add_headPortraitImg").attr('src');
        //获取输入的名字
        let stuInfor_addStuName=$(".stuInfor_stuName2").val();
        //获取性别
        let stuInfor_addStuSex=$(".stuInfor_stuSex2").val();
        //获取年龄
        let stuInfor_addStuAge=$(".stuInfor_stuAge2").val();
        let patternAge = /^[1-9]\d*|0$/;
        if(!patternAge.test(stuInfor_addStuAge)){
            alert("请正确输入年龄");
            return false;
        }
        //获取所选班级
        let stuInfor_addStuClass=$(".stuInfor_stuGrade2").val();
        //获取学号
        let stuInfor_addStuId=$(".stuInfor_stuId2").val();
        //获取出生日期
        let stuInfor_addStuBirth=$(".stuInfor_stuBridth2").val();
        //获取班级老师姓名
        let stuInfor_addTeacherName;
        if($(".stuInfor_teacherName2").val()!=""){
            stuInfor_addTeacherName=$(".stuInfor_teacherName2").val();
        }else{
            alert("请输入学生班级老师的姓名");
            return false;
        }
        //获取入园时间
        let stuInfor_addIntime=$(".stuInfor_stuIntime2").val();
        //获取家长名字
        let stuInfor_addStuPraentName;
        if($(".stuInfor_praentName2").val()!=""){
            stuInfor_addStuPraentName=$(".stuInfor_praentName2").val();
            let patternParentName = /^[\u4e00-\u9fa5]+$/;
            if(!patternParentName.test(stuInfor_addStuPraentName)){
                alert("家长名称必须为中文");
                return false;
            }
        }else{
            alert("请输入学生家长名字");
            return false;
        }
        //获取学生与家长关系
        let stuInfor_addRelation;
        if($(".stuInfor_relation2").val()!=""){
            stuInfor_addRelation=$(".stuInfor_relation2").val();
            let patternRelation = /^[\u4e00-\u9fa5]+$/;
            if(!patternRelation.test(stuInfor_addRelation)){
                alert("请正确输入关系");
                return false;
            }
        }else{
            alert("请输入学生与家长关系");
            return false;
        }
        //获取家长电话
        let stuInfor_addStuParentPhone;
        if($(".stuInfor_parentPhone2").val()!=""){
            stuInfor_addStuParentPhone=$(".stuInfor_parentPhone2").val();
            let patternStuParentPhone = /0?(13|14|15|18)[0-9]{9}/;
            if(!patternStuParentPhone.test(stuInfor_addStuParentPhone)){
                alert("请正确输入家长号码");
                return false;
            }
        }else{
            alert("请输入学生家长电话");
            return false;
        }
        //获取家长邮箱
        let stuInfor_addStuParentEmial=$(".stuInfor_parentEmial2").val();
        let patternStuParentEmial =/^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/;
        if(!patternStuParentEmial.test(stuInfor_addStuParentEmial)){
            alert("邮箱格式不对");
            return false;
        }
        //获取家庭住址
        let stuInfor_addStuAddress=$(".stuInfor_address2").val();
        //获取学籍状态
        let stuInfor_addStuStatus=Boolean($(".stuInfor_studentStatus2").val());
        for(let i=0;i<studentOld.length;i++){
            if(studentOld[i].studentId==studentId_alone){
                studentOld[i].studentId=stuInfor_addStuId,
                studentOld[i].studentPhoto=stuInfor_addStuImg,                    //头像
                studentOld[i].studentName=stuInfor_addStuName,
                studentOld[i].studentGrade=stuInfor_addStuClass,
                studentOld[i].studentTeacher=stuInfor_addTeacherName,
                studentOld[i].studentAge=stuInfor_addStuAge,
                studentOld[i].studentBirth=stuInfor_addStuBirth,
                studentOld[i].studentSex=stuInfor_addStuSex,
                studentOld[i].studentAddress=stuInfor_addStuAddress,
                studentOld[i].relation=stuInfor_addRelation,
                studentOld[i].parentName=stuInfor_addStuPraentName,
                studentOld[i].parentEmail=stuInfor_addStuParentEmial,
                studentOld[i].ParentPhone=stuInfor_addStuParentPhone,             //账号手机号
                studentOld[i].inTime=stuInfor_addIntime,                          //入园时间
                studentOld[i].studentStatus=stuInfor_addStuStatus              //被删除前的状态为true
            }
        }
        studentOld = studentOld.filter(function(item) {
            return item.studentStatus === true;
        })
        //刷新数据
        refreshData();
        alert("学生信息编辑成功！");
        //数据缓存
        stuInforLocal=studentOld;
        sInfo1 = JSON.stringify(stuInforLocal);   //将对象"序列化"为JSON数据(字符串格式)
        sessionStorage.setItem("info", sInfo1);   //以字符串格式存储信息
        //编辑成功后清空所输入的内容
        $(".stuInfor_add_headPortraitImg").attr('src','../images/stuInfor_images/add_stuImg.png');
        $(".stuInfor_stuName").val("");
        $(".stuInfor_stuAge").val("");
        $(".stuInfor_stuId").val("");
        $(".stuInfor_stuBridth").val("");
        $(".stuInfor_teacherName").val("");
        $(".stuInfor_stuIntime").val("");
        $(".stuInfor_praentName").val("");
        $(".stuInfor_relation").val("");
        $(".stuInfor_parentPhone").val("");
        $(".stuInfor_parentEmial").val("");
        $(".stuInfor_address").val("");
        $(".stuInfor_studentStatus").val("")
    });
    //查看学生信息
    $("#stuInfor_mytable").on("click",".stu_lookBtn",function(){
        //获取该学生学号的value值
        studentId_alone=($(this).parents("tr").find(".studentId").attr("value"));
        //根据该学生学号的value值获取对应信息
        for(let i=0;i<studentOld.length;i++){
            if(studentOld[i].studentId==studentId_alone){
               $(".stuInfor_view_headPortraitImg").attr('src',studentOld[i].studentPhoto);
               $(".stuInfor_stuName").val(studentOld[i].studentName);
               $(".stuInfor_stuSex").val(studentOld[i].studentSex);
               $(".stuInfor_stuAge").val(studentOld[i].studentAge);
               $(".stuInfor_stuGrade").val(studentOld[i].studentGrade);
               $(".stuInfor_stuId").val(studentOld[i].studentId);
               $(".stuInfor_stuBridth").val(studentOld[i].studentBirth);
               $(".stuInfor_teacherName").val(studentOld[i].studentTeacher);
               $(".stuInfor_stuIntime").val(studentOld[i].inTime);
               $(".stuInfor_praentName").val(studentOld[i].parentName);
               $(".stuInfor_relation").val(studentOld[i].relation);
               $(".stuInfor_parentPhone").val(studentOld[i].ParentPhone);
               $(".stuInfor_parentEmial").val(studentOld[i].parentEmail);
               $(".stuInfor_address").val(studentOld[i].studentAddress);
               $(".stuInfor_studentStatus").val(studentOld[i].studentStatus);
            }
        }
    });
    //单独删除学生信息或退学
    $(".stuInfor_delete").click(function(){
        let txt=$(this).parents(".modal-content").find(".modal-title").text();
        for(let j=0;j<studentOld.length;j++){
            if(parseInt(studentOld[j].studentId)==parseInt(studentId_alone)){
                studentOld[j].studentStatus=false;
            }
        }
        studentOld = studentOld.filter(function(item) {
            return item.studentStatus === true;
        })
        //刷新数据
        refreshData();
        if( txt=="是否删除？"){
            alert("删除成功！");
        }else if(txt=="是否退学？"){
            alert("该同学已作退学处理。");
        }
        //数据缓存
        stuInforLocal=studentOld;
        sInfo1 = JSON.stringify(stuInforLocal);   //将对象"序列化"为JSON数据(字符串格式)
        sessionStorage.setItem("info", sInfo1);   //以字符串格式存储信息
    });
    //转班处理
    $(".stuInfor_changeClass_btn").click(function(){
        //获取班级名字
        selValue = $(".stuInfor_changeClass_select").val();
        if(studentGrade_alone==selValue){
            alert("不能转到自己的班级，请重新操作");
            return false;
        }
        //过滤将不同于此班级名字的班级放入一个新的数组
        studentOld = studentOld.filter(function(item) {
            return item.studentGrade !== selValue && item.studentStatus === true;
        })
        for(let j=0;j<studentOld.length;j++){
            if(parseInt(studentOld[j].studentId)==parseInt(studentId_alone)){
                studentOld[j].studentGrade=selValue;
            }
        }
        studentOld = student.filter(function(item) {
            return item.studentStatus === true;
        })
        //刷新数据
        refreshData();
        $("#stuInfor_selectClass option:not(:first)").remove();
        className_option("#stuInfor_selectClass");
        //数据缓存
        stuInforLocal=studentOld;
        sInfo1 = JSON.stringify(stuInforLocal);   //将对象"序列化"为JSON数据(字符串格式)
        sessionStorage.setItem("info", sInfo1);   //以字符串格式存储信息
    });
    // 导出数据
    paging2("#stuInfor_exportTable",student);
    // 导出数据
    $('#export').click(function(){
        $("#stuInfor_exportTable").table2excel({
            exclude: ".noExl",
            name: "Excel Document Name",
            // filename: "stuInformation",
            filename : "学生管理"+".xls", //文件名称
            exclude_img: true,
            exclude_links: true,
            exclude_inputs: true
        });
    })

    //刷新数据公用
    function refreshData(){
        pageBtn('#stuInfor_pageNum', studentOld);
        whichPageNum=0;
        paging("#stuInfor_thead",whichPageNum,studentOld,iSfirst);
        $(".stuInfor__stuNumberStrong").html(studentOld.length);
    } 
});
//表格上的数据生成函数
function paging(table,whichPageNum,arrStu,iSfirst){
    //判断表头是否是第一次生成
    if(iSfirst){
        $(table).html(
            `<tr>
                <th></th>
                <th class='studentIdTh'>学号</th>
                <th>姓名</th>
                <th>年龄</th>
                <th>性别</th>
                <th>班级</th>
                <th>班级老师</th>
                <th>操作</th>
            </tr>`
        )
    }
    //在渲染数据前先清空表格
    $("#stuInfor_mytable tbody").html("");
    //根据哪一页渲染显示5条数据
    for(let i=whichPageNum;i<whichPageNum+pageAvageNum;i++){
        if(i<arrStu.length && arrStu[i].studentStatus==true){
            $("#stuInfor_mytable tbody").append(
            ` <tr>
                <td><input type="checkbox" value='${arrStu[i].studentId}'/></td>
                <td class="studentId" value='${arrStu[i].studentId}'>${arrStu[i].studentId}</td>
                <td>${arrStu[i].studentName}</td>
                <td>${arrStu[i].studentAge}</td>
                <td>${arrStu[i].studentSex}</td>
                <td class="studentGrade" value='${arrStu[i].studentGrade}'>${arrStu[i].studentGrade}</td>
                <td>${arrStu[i].studentTeacher}</td>
                <td class="tdOperation">
                    <button type="button" class="stu_lookBtn btn" data-toggle="modal" data-target="#stuInfor_ViewDetails">查看</button>
                    <div class="dropdown">
                        <button class="stuInfor_moreActions btn btn-default dropdown-toggle" type="button" id="dropdownMenu1" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">
                            更多操作
                            <span class="caret"></span>
                        </button>
                        <ul class="dropdown-menu" aria-labelledby="dropdownMenu1">
                            <li class="moreOperationLi" data-toggle="modal" data-target="#stuInfor_editStuInfo"><a href="#">编辑</a></li>
                            <li class="moreOperationLi" data-toggle="modal" data-target="#stuInfor_delateStuModal"><a href="#">删除</a></li>
                            <li class="moreOperationLi" data-toggle="modal" data-target="#stuInfor_changeClassModal"><a href="#">转班</a></li>
                            <li class="moreOperationLi" data-toggle="modal" data-target="#stuInfor_delateStuModal"><a class="stuInfor_dropOut" href="#">退学</a></li>
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
//导出数据生成函数
function paging2(table,arrStu){
    //渲染表头
    $(table).html(
        `<tr>
            <th class='studentIdTh'>学号</th>
            <th>姓名</th>
            <th>年龄</th>
            <th>性别</th>
            <th>班级</th>
            <th>班级老师</th>
        </tr>`
    )
    //渲染显示所有数据
    for(let i=0;i<arrStu.length;i++){
        if(i<arrStu.length && arrStu[i].studentStatus==true){
            $("#stuInfor_exportTable tbody").append(
                ` <tr>
                <td>${arrStu[i].studentId}</td>
                <td>${arrStu[i].studentName}</td>
                <td>${arrStu[i].studentAge}</td>
                <td>${arrStu[i].studentSex}</td>
                <td>${arrStu[i].studentGrade}</td>
                <td>${arrStu[i].studentTeacher}</td>
            </tr>`
            )
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
///渲染搜索查询班级中的班级名字函数
function className_option(select){
    for(let i=0;i<className(student).length;i++){
        $(select).append(
            ` <option value="${className(student)[i]}">${className(student)[i]}</option>`
        );
    }
}
//获取班级名称函数
function className(arrStu){
    for(let i=0;i<arrStu.length;i++){
        arrclassName.push($(arrStu[i].studentGrade).selector);
    }
    for(let i=0;i<arrclassName.length;i++) {  
        var items=arrclassName[i];  
        //判断元素是否存在于new_arrclassName中，如果不存在则插入到new_arrclassName中
        if($.inArray(items,new_arrclassName)==-1) {  
            new_arrclassName.push(items);  
        }  
    }  
    return new_arrclassName;
}
//获取批量删除被选中checkbox值函数
function checkDelatefun(){
    var checks=$("input[type='checkbox']:checked");;
    //将获取的值存入数组
    var checkDelateData=new Array();
    checks.each(function(){
        checkDelateData.push($(this).val());
    });
    return checkDelateData;
}
//模糊查询函数
function indexSelect(inputChar,stuArr){
    const arr = stuArr.filter( res => {
        return res.studentId.indexOf(inputChar) > -1 || res.studentName.indexOf(inputChar) > -1;
    })
    return arr;
}