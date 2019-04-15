
var noticeIssuer = JSON.parse(sessionStorage.getItem("Duty_Name"));


//显示公告
function notice_display(notice_input_class,notice_input_issue){
    $(".notice_content").html("")
    notices.forEach(function (notice_obj) {
        if(notice_obj.noticeType=="public"){
            notice_display_detail(notice_obj.noticeType);
        }
        if(notice_obj.noticeType=="class"&&notice_obj.noticeObj==notice_input_class){
            notice_display_detail(notice_obj.noticeType);
        }
        if(notice_obj.noticeIssuer==notice_input_issue){
            notice_display_detail("issue");
        }
        //逐条显示公告
        function notice_display_detail(notice_type) {
            $("#notice_"+notice_type+"_content").append(`
                    <div class="notice_list clear">
                        <div class="notice_left">
                            <img src="../images/notice_images/${notice_obj.noticeHead}" alt="">
                            <span>${notice_obj.noticeIssuer}</span>
                        </div>
                        <div class="notice_right">
                            <p class="notice_detail_text">${notice_obj.noticeContent}</p>
                            <div class="notice_detail_img"><img src="../images/notice_images/${notice_obj.noticeContentImg}" alt=""></div>
                            <span>${notice_obj.noticeTime}</span>
                        </div>
                        <div class="notice_detail_pop">
                           ${notice_obj.noticeContent}
                        </div>
                        <i class="iconfont icon-close notice_close" onclick=""></i>
                    </div>
                `)
        }
    })
}
function notice_dis(){
    notice_display($("#notice_class_text").val(),$("#notice_issue_text").val());
}
// 点击搜索班级
$("#notice_class_button").on("click",function () {
    notice_dis();
    notice_empty();
})
// 模拟点击搜索
$("#notice_class_text").on("keyup",function (e) {
    if(e.key=="Enter"){
        notice_dis();
        notice_empty();
    }
})
// 点击搜索公告
$("#notice_issue_text").val(noticeIssuer)
$("#notice_issue_button").on("click",function () {
    notice_dis();
    notice_empty();
})
// 模拟点击搜索
$("#notice_issue_text").on("keyup",function (e) {
    if(e.key=="Enter"){
        notice_dis();
        notice_empty();
    }
})




var nitoce_head_edit_count=0;
var nitoce_bold_edit_count=0;
//点击标题按钮
$(".icon-biaoti").on("click",function () {
    nitoce_head_edit_count++;
    if(nitoce_head_edit_count%2){
        $(this).parent().prev().css("font-size","18px");
        $(this).css("background-color" ,"#eee");
    }else{
        $(this).parent().prev().css("font-size","14px");
        $(this).css("background-color" ,"white");
    }
})
//点击加粗按钮
$(".icon-bold").on("click",function () {
    nitoce_bold_edit_count++;
    if(nitoce_bold_edit_count%2){
        $(this).parent().prev().css("font-weight","600");
        $(this).css("background-color" ,"#eee");
    }else{
        $(this).parent().prev().css("font-weight","500");
        $(this).css("background-color" ,"white");
    }
})
//点击图片按钮
$('.icon-chakanzhaopian').on('change',"input",function( e ){
    //获取文件名
    let notice_file_name=e.currentTarget.files[0].name;
    $(this).parent().next().html(notice_file_name)
    $(this).parent().next().css("display","inline-block")
});
// 判断是否有公告
function notice_empty(){
    if($("#notice_public_content").html().length==0){
        $("#notice_public_content").append(`
                <p>暂时还没有公告！</p>
            `)
    }
    if($("#notice_class_content").html().length==0){
        $("#notice_class_content").append(`
                <p>没有匹配公告！</p>
            `)
    }
    if($("#notice_issue_content").html().length==0){
        $("#notice_issue_content").append(`
                <p>暂时还没有发布公告！</p>
            `)
    }
}
$(document).ready(function () {
    notice_dis();
    notice_empty();
    // 模拟下拉列表框
    $("#notice_option").on("click","li",function () {
        let text=$(this).html()
        $(this).parent().prev().prev().html(text);
        if(text=="园区公告"){
            $(this).parent().parent().parent().prev().val("@所有人："+$(this).parent().parent().parent().prev().val())
        }
        if(text=="班级公告"){
            $(this).parent().parent().parent().prev().val("@："+$(this).parent().parent().parent().prev().val())
        }
        if(text=="个人邮件"){
            $(this).parent().parent().parent().prev().val("@个人邮件："+$(this).parent().parent().parent().prev().val())
        }
    })
    //删除公告
    $(".notice_content").on("click",".notice_close",function () {
        $(this).parent().remove();
    })
    //查看公告详情
    $(".notice_content").on("mouseover",".notice_list",function () {
        $(this).children(".notice_detail_pop").css("display","block")
    })
    $(".notice_content").on("mouseout",".notice_list",function () {
        $(this).children(".notice_detail_pop").css("display","none")
    })
    //点击发布公告
    $("#notice_announce").on("click",notice_announce_click);
    function notice_announce_click(){
        let notice_issuer=noticeIssuer;//发布人
        let notice_head;
        for(let b=0;b<teacher.length;b++){
            if(teacher[b].teacherName==noticeIssuer){
                teacher[b].photo=teacher[b].photo.slice(19)

                notice_head=teacher[b].photo;
            }
        }

        for(let a=0;a<admin.length;a++){
            console.log(admin[a].username)
            if(admin[a].adminName==noticeIssuer){

                admin[a].photo= admin[a].photo.slice(19)
                console.log(admin[a].photo);
                notice_head=admin[a].photo;
            }
        }
        let notice_img=$(this).prev().prev().prev().html();
        let noticeTime=new Date();//公告时间
        // 格式化显示时间
        let notice_month=(noticeTime.getMonth()+1)>10?(noticeTime.getMonth()+1):"0"+(noticeTime.getMonth()+1)
        let notice_day=noticeTime.getDate()>10?noticeTime.getDate():"0"+noticeTime.getDate()
        let notice_hour=noticeTime.getHours()>10?noticeTime.getHours():"0"+noticeTime.getHours()
        let notice_min=noticeTime.getMinutes()>10?noticeTime.getMinutes():"0"+noticeTime.getMinutes()
        let notice_time=`${noticeTime.getFullYear()}/${notice_month}/${notice_day} ${notice_hour}:${notice_min}`
        let notice_content=$(this).parent().prev().val();//公告框文本内容
        //获取：的开始下标
        let notice_obj=notice_content.slice(1,notice_content.indexOf("："));//获得@的对象
        notice_content=notice_content.slice(notice_content.indexOf("：")+1);//获得文本内容
        let notice_type;//公告类型
        if($(this).prev().prev().children("#notice_mySelect").html()=="园区公告"){
            notice_type="public";
        }else if($(this).prev().prev().children("#notice_mySelect").html()=="班级公告"){
            notice_type="class";
        }else if($(this).prev().prev().children("#notice_mySelect").html()=="个人邮件"){
            notice_type="person";
            $(this).attr({
                "data-toggle":"modal",
                "data-target":".bs-example-modal-sm"
            })
            $(".modal-content span:eq(0)").html(notice_obj+"的家长");
            $(".modal-content span:eq(1)").html(notice_obj+"@qq.com");
            $(".modal-content span:eq(2)").html(noticeIssuer);
            $(".modal-content span:eq(3)").html( notice_time);
        }
        let student={
            noticeIssuer:notice_issuer,//发起人
            noticeHead:notice_head,//发布人头像
            noticeContent:notice_content,//公告内容
            noticeType:notice_type,//公告类型：public（园区公告），class（班级公告），person(个人邮件)
            noticeTime: notice_time,//发布时间
            noticeObj:parseInt(notice_obj),//发布对象
            noticeContentImg:notice_img,//内容图片
        }
        if(notice_content!=""&&notice_type!=undefined){
            $(this).children().remove();
            notices.push(student);
            notice_dis();
            notice_empty();
            $(this).parent().prev().val("");//清空公告内容
            $(this).prev().prev().prev().html("");//清空照片内容
            $(this).prev().prev().children("#notice_mySelect").html("请选择公告类型");//下拉框默认样式
        }else if(notice_content==""){
            $(this).children().remove();
            $(this).append(`
                   <span class="notice_danger">公告内容不能为空！</span>
                `)
        }else{
            $(this).children().remove();
            $(this).append(`
                   <span class="notice_danger">公告类型不能为空！</span>
                `)
        }
    }
    //获取输入框文本数量
    $("#notice_text").on("keyup",function (e) {
        if($(this).val().length<=140){
            $(this).next().children("#notice_count").html($(this).val().length+"/140")
        }
    })

})