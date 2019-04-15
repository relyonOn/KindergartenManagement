
$("#dljm_dl").on("click",function () {
  // console.log(123)
  for (let i=0;i<teacher.length;i++){
    for (let j=0;j<admin.length;j++) {
      if ($("#dljm_lable").val()==""||$("#dljm_lable_2").val()==""){
        alert("账号或密码不得为空")
        return
      }else if(($("#dljm_lable").val()==teacher[i].teacherId&&
        $("#dljm_lable_2").val()==teacher[i].password)||
        ($("#dljm_lable").val()==admin[j].username&&
          $("#dljm_lable_2").val()==admin[j].password)){
          var admin_id = $("#dljm_lable").val();
          sessionStorage.setItem("id",JSON.stringify(admin_id));
          console.log(1)
          window.location.href="pages/indexTwo.html"
        return
      }else{
          if(j==admin.length-1&&i==teacher.length-1){
              alert("账号或密码错误")
              return

          }

      }
    }
    console.log(123)
  }
})

