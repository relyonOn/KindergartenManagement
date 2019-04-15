var Num  = 5
var b = 1
var br =true
var sInfo2 = sessionStorage.getItem("grade_info");
var Grade = JSON.parse(sInfo2);
// 渲染页面方法
function pageConten(table,countNum,arr,mybool) {
  if (mybool){
      for (let item in arr[0]) {
          if (item=="gradeId"){
              $("table thead tr").append("<th>班级</th>")
          }else if (item=="gradeTeacher") {
              $("table thead tr").append("<th>班主任</th>")
          }else if (item=="gradeLevel") {
              $("table thead tr").append("<th>班级数</th>")
          }else if (item=="gradeStudents") {
              $("table thead tr").append("<th>人数</th>")
          }
      }
      $("table thead tr").append("<th>操作</th>")
  }
  br=false
    $("table tbody").html("")

  for (let i=countNum;i<countNum+Num;i++){
        if (i<arr.length){
            $("table tbody").append(`
           <tr>
                <td>${arr[i].gradeId}</td>
                <td>${arr[i].gradeTeacher}</td>
                <td>${arr[i].gradeLevel}</td>
                <td>${arr[i].gradeStudents}</td>
                <td class="tdOperation">
                  <button type="button" class="stu_lookBtn btn" data-toggle="modal" data-target="#bjgl_bianjick" onclick="ck(this)">查看</button>
                  <div class="dropdown">
                      <button type="button" class="stuInfor_moreActions btn btn-default dropdown-toggle"  id="dropdownMenu1" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">
                       更多操作 
                      <span class="caret"></span>
                      </button>
                      <ul class="dropdown-menu bjgl_ul_2" aria-labelledby="dropdownMenu1">
                          <li class="bjgl_bianji" data-toggle="modal" data-target="#bjgl_bianji" onclick="bj(this)"><a href="#">编辑</a></li>
                          <li class="stuInfor_dropOut" onclick="sc(this)"><a href="#">删除</a></li>
                      </ul>
                  </div>
                </td>
            </tr>`)
        }
    }
}
// 页面加载完成是调用页面渲染与按钮渲染
$(document).ready(function () {
    pageConten(".bjgl_table",0,Grade,br)
    br=false
    pageBtn("#bjgl_anniu",Grade)
    $(".bjgl_ul").on("click",".bjgl_ul_li1",function () {
       let page= $(this).text()
        b = page
        page = (page-1)*Num
        pageConten("#bjgl_table",page,Grade,false)
    })
})
// 按钮渲染与方向键

function pageBtn(element,arr) {
      $("#bjgl_anniu").html("");
    for (let i=0;i<Math.ceil(arr.length/Num);i++){
      $(element).append(
        `<li class="bjgl_ul_li1"><a href="#">${i+1}</a></li>`
      )
    }

  // 右方向键
  $("#bjgl_ul_li").on("click",function () {
    if (b>1){
      b--;
      let c = (b-1)*Num;
      pageConten("#bjgl_table",c,Grade,false);
    }
  })
// 左方向键
  $("#bjgl_ul_li_1").on("click",function () {
    if (b<Math.ceil(Grade.length/Num)){
      b++;
      let c = (b-1)*Num;
      pageConten("#bjgl_table",c,Grade,false);
    }
  })
}
// =============添加
$("#bjgl_btn").on("click",function () {
  var a = $("#bjgl_label").val()
  var b = $("#bjgl_label2").val()
  var c = $("#bjgl_label3").val()
  var d = $("#bjgl_label4").val()
  if ( $("#bjgl_label").val()==""||$("#bjgl_label2").val()==""||$("#bjgl_label3").val()==""||$("#bjgl_label4").val()==""){
    alert("不得有空的输入框")
  }
  else {
    var duixiang={
      gradeId: a,
      gradeTeacher: b,
      gradeLevel: c,
      gradeStudents: d,
    }
    Grade.push(duixiang)
    var sInfo1 = JSON.stringify(Grade);   //将对象"序列化"为JSON数据(字符串格式)
    sessionStorage.setItem("grade_info", sInfo1);   //以字符串格式存储信息
  }
})
// 删除
function sc(e) {
  let k = $(e).parent().parent().parent().parent().children()[0].innerHTML
  for (let i = 0;i<Grade.length;i++) {
    // console.log(k)
    if (Grade[i].gradeId==k){
      if (Grade[i].gradeStudents==0) {
        $(e).parent().parent().parent().parent().remove()
        Grade.splice(i,1)
        var sInfo1 = JSON.stringify(Grade);   //将对象"序列化"为JSON数据(字符串格式)
        sessionStorage.setItem("grade_info", sInfo1);   //以字符串格式存储信息
        alert("删除成功")
        $("#bjgl_anniu").html("")
        pageConten(".bjgl_table",0,Grade,br)
        pageBtn("#bjgl_anniu",Grade)
        break
      }else {
        alert("该班级还有成员，不可删除")
        break
      }
    }
  }
}
// 查看
var teacherLocal = JSON.parse(sessionStorage.getItem("grade_info"));
var arr =[]
function ck(g) {
  // console.log($(g).parent().parent().parent().children()[0].innerHTML)
  $(".tjdiv_3").children().remove()
  let o = $(g).parent().parent().children()[0].innerHTML
  for (let j=0;j<teacherLocal.length;j++){
    if (teacherLocal[j].gradeId==o) {
      // $("#bjgl_label_2").val(Grade[j].gradeId)
      // $("#bjgl_label2_2").val(Grade[j].gradeTeacher)
      // $("#bjgl_label3_2").val(Grade[j].gradeLevel)
      // $("#bjgl_label4_2").val(Grade[j].gradeStudents)
      arr.push(teacherLocal[j])
    }
  }
  for (let u= 0;u<arr.length;u++) {
      $(".tjdiv_3").children().remove()
    $(".tjdiv_3").append(
    `  <div class="row tjdiv_2 modal-body">
         <div class="col-md-12 col-lg-12">
           <div class="col-md-2 col-lg-6">班级名:</div>
           <div class="col-md-3 col-lg-2 ">${arr[u].gradeId}</div>
           <div class="col-md-2 col-lg-6">班主任:</div>
           <div class="col-md-3 col-lg-2 ">${arr[u].gradeTeacher}</div>
         </div>
     </div>
         <div class="row tjdiv_2 modal-body">
         <div class="col-lg-12 col-md-12">
           <div class="col-md-2   col-lg-2">班级数:</div>
           <div class="col-md-3  col-lg-2 ">${arr[u].gradeLevel}</div>
           <div class="col-md-2 col-lg-2">班级人数:</div>
           <div class="col-md-3 col-lg-2 ">${arr[u].gradeStudents}</div>

      
        </div>
      </div>
`)}
arr=[]
}

// $("#bjgl_btn_1").on("click",function () {
//   $(".tjdiv_3").children().remove()
// });
// $("#bjgl_qx").on("click",function () {
//   $(".tjdiv_3").children().remove()
// });
// $("#bjgl_X").on("click",function () {
//   $(".tjdiv_3").children().remove()
// })
var this_j
// 编辑
function bj(g) {
  let k = $(g).parent().parent().parent().parent().children()[0].innerHTML
  console.log(k)
  for (let j=0;j<Grade.length;j++){
    if (Grade[j].gradeId==k) {
      $("#bjgl_label_1").val(Grade[j].gradeId)
      $("#bjgl_label2_1").val(Grade[j].gradeTeacher)
      $("#bjgl_label3_1").val(Grade[j].gradeLevel)
      $("#bjgl_label4_1").val(Grade[j].gradeStudents)
      this_j = j
    }
  }
  $("#bjgl_btn_2").on("click",function () {
      let y= {
        gradeId: $("#bjgl_label_1").val(),
        gradeTeacher: $("#bjgl_label2_1").val(),
        gradeLevel: $("#bjgl_label3_1").val(),
        gradeStudents: $("#bjgl_label4_1").val(),
      }
      Grade.splice(this_j,1,y)
      var sInfo1 = JSON.stringify(Grade);   //将对象"序列化"为JSON数据(字符串格式)
      sessionStorage.setItem("grade_info", sInfo1);   //以字符串格式存储信息
      $(".bjgl_bianji").modal("hide")
      pageConten(".bjgl_table",0,Grade,br)
      pageBtn("#bjgl_anniu",Grade)
  })
}
// 搜索
/*$(".sr").on("keyup",function () {
   let t = $(".stuInfor_inputText").val()
   for (let e = 0; e<Grade.length;e++){
      if (Grade[e].gradeId==t||Grade[e].gradeTeacher===t){
        console.log(Grade[e].gradeId)
        $("table tbody").html(`
        <tr>
                <td>${Grade[e].gradeId}</td>
                <td>${Grade[e].gradeTeacher}</td>
                <td>${Grade[e].gradeLevel}</td>
                <td>${Grade[e].gradeStudents}</td>
                <td class="tdOperation">
                  <button type="button" class="stu_lookBtn btn" data-toggle="modal" data-target="#bjgl_bianjick" onclick="ck(this)">查看</button>
                  <div class="dropdown">
                      <button type="button" class="stuInfor_moreActions btn btn-default dropdown-toggle"  id="dropdownMenu1" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">
                       更多操作 
                      <span class="caret"></span>
                      </button>
                      <ul class="dropdown-menu bjgl_ul_2" aria-labelledby="dropdownMenu1">
                          <li class="bjgl_bianji" data-toggle="modal" data-target="#bjgl_bianji" onclick="bj(this)"><a href="#">编辑</a></li>
                          <li class="stuInfor_dropOut" onclick="sc(this)"><a href="#">删除</a></li>
                      </ul>
                  </div>
                </td>
            </tr>`)
      }
   }
})*/

// 搜索
$(".bjgl_ss").keyup(
  function(){
    var inputTxt=$.trim($(".bjgl_ss").val());
    newJson = indexSelect(inputTxt,Grade);
    pageBtn("#bjgl_anniu",newJson,false)
    pageConten(".bjgl_table",0,newJson,false)

    // $("#bjgl_anniu").html("")
    // pageBtn("#bjgl_anniu",Grade,br_1)
    // pageConten(table,countNum,arr,mybool)
    // $(".stuInfor__stuNumberStrong").html(newJson.length);
    // $("#stuInfor_selectClass option:not(:first)").remove();
    // className_option("#stuInfor_selectClass");
    // pageBtn("#stuInfor_pageNum",departmentLocal,isFirst);
    // paging("#stuInfor_thead",whichPageNum,departmentLocal,isFirst);
    // $(".stuInfor__stuNumberStrong").html(departmentLocal.length);
  }
);
//模糊查询函数
function indexSelect(inputChar,stuArr){
  const arr = stuArr.filter( res => {
    return res.gradeId.indexOf(inputChar) > -1 || res.gradeTeacher.indexOf(inputChar) > -1;
  });
  return arr;
}
