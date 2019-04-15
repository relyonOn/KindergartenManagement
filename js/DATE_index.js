var notices = [
    {
        noticeIssuer:"毛亮",//发起人
        noticeHead:"face3.jpg",//发起人头像
        noticeContent:"2018年秋季报名正式开始！新生成功报名交费送一个月特色课程（舞蹈、街舞、手工、钢琴任选其一）再送表情抱枕一个",//公告内容
        noticeContentImg:"",//内容图片
        noticeType:"public",//公告类型：public（园区公告），class（班级公告），person(个人邮件)
        noticeTime: "2018/8/15",//发布时间
        noticeObj:1801//发布对象
    },{
        noticeIssuer:"超级管理员",//发起人
        noticeHead:"face4.jpg",//发起人头像
        noticeContent:"2018年秋季报名正式开始！新生成功报名交费送一个月特色课程（舞蹈、街舞、手工、钢琴任选其一）再送表情抱枕一个",//公告内容
        noticeContentImg:"",//内容图片
        noticeType:"public",//公告类型：public（园区公告），class（班级公告），person(个人邮件)
        noticeTime: "2018/8/15",//发布时间
        noticeObj:1801//发布对象
    },
    {
        noticeIssuer:"赖红梅",//发起人
        noticeHead:"face2.jpg",//发起人头像
        noticeContent:"各组、室设考勤员一名，（由组长担任），逐日记载出勤情况，按日统计，上报教务处汇总公布。",//公告内容
        noticeContentImg:"",//内容图片
        noticeType:"class",//公告类型：public（园区公告），class（班级公告），person(个人邮件)
        noticeTime: "2018/9/1",//发布时间
        noticeObj:1802//发布对象
    },
    {
        noticeIssuer:"罗喜洋",//发起人
        noticeHead:"face4.jpg",//发起人头像
        noticeContent:"因工作需要，决定对萌宝幼儿园人事作如下调整：任命毛亮为营业部部长，全面负责营业部工作。园长级，营口地区班子成员。",//公告内容
        noticeContentImg:"",//内容图片
        noticeType:"public",//公告类型：public（园区公告），class（班级公告），person(个人邮件)
        noticeTime: "2018/12/1",//发布时间
        noticeObj:1//发布对象
    },
    {
        noticeIssuer:"毛亮",//发起人
        noticeHead:"face3.jpg",//发起人头像
        noticeContent:"由教务处负责考勤工作。各组、室设考勤员一名，（由组长担任），逐日记载出勤情况，按日统计，上报教务处汇总公布。",//公告内容
        noticeContentImg:"",//内容图片
        noticeType:"class",//公告类型：public（园区公告），class（班级公告），person(个人邮件)
        noticeTime: "2018/9/1",//发布时间
        noticeObj:1801//发布对象
    },
    {
        noticeIssuer:"毛亮",//发起人
        noticeHead:"face3.jpg",//发起人头像
        noticeContent:"希望能与您就孩子的成长教育问题做一次良好的沟通。你的建议是我们的收获，让我们为孩子撑起一片天空。",//公告内容
        noticeContentImg:"",//内容图片
        noticeType:"public",//公告类型：public（园区公告），class（班级公告），person(个人邮件)
        noticeTime: "2018/12/1",//发布时间
        noticeObj:1//发布对象
    },
    {
        noticeIssuer:"罗喜洋",//发起人
        noticeHead:"face4.jpg",//发起人头像
        noticeContent:"你的建议是我们的收获，让我们为孩子撑起一片天空。希望能与您就孩子的成长教育问题做一次良好的沟通。",//公告内容
        noticeContentImg:"",//内容图片
        noticeType:"class",//公告类型：public（园区公告），class（班级公告），person(个人邮件)
        noticeTime: "2018/12/7",//发布时间
        noticeObj:1802//发布对象
    },
    {
        noticeIssuer:"毛亮",//发起人
        noticeHead:"face3.jpg",//发起人头像
        noticeContent:"各组、室设考勤员一名，（由组长担任），逐日记载出勤情况，按日统计，上报教务处汇总公布。",//公告内容
        noticeContentImg:"",//内容图片
        noticeType:"class",//公告类型：public（园区公告），class（班级公告），person(个人邮件)
        noticeTime: "2018/9/1",//发布时间
        noticeObj:1801//发布对象
    }
]
var student = [
    {
        studentId:"180101",
        studentPhoto:"../images/stuInfor_images/stuImg01.jpg",//头像
        studentName:"张三丰",
        studentGrade:"1802",
        studentTeacher:"王红",
        studentAge:5,
        studentBirth:"2013/01/01",
        studentSex:"男",
        studentAddress:"天府二街",
        relation:"父子",
        parentName:"张飞",
        parentEmail:"131313@qq.com",
        ParentPhone:"18787878787",             //账号手机号
        password:"878787",                     //密码手机号后六位
        inTime:"2018/09/01 08:30",                    //入园时间
        outTime:"2018/09/01 17:30",                  //出园时间
        studentAttend:"全勤",               //出席
        vacationreason:"",
        studentStatus:true,           //被删除前的状态为true即学生学籍
    },
    {
        studentId:"180102",
        studentPhoto:"../images/stuInfor_images/stuImg02.jpg",//头像
        studentName:"李飞",
        studentGrade:"1801",
        studentTeacher:"毛不亮",
        studentAge:4,
        studentBirth:"2014/03/25",
        studentSex:"男",
        studentAddress:"天府二街",
        relation:"父子",
        parentName:"李自强",
        parentEmail:"131313@qq.com",
        ParentPhone:"18787878787",             //账号手机号
        password:"878787",                     //密码手机号后六位
        inTime:"暂无",                    //入园时间
        outTime:"暂无",                  //出园时间
        studentAttend:"请假",               //出席
        vacationreason:"家里有事",
        studentStatus:true,           //被删除前的状态为true即学生学籍

    },
    {
        studentId:"180103",
        studentPhoto:"../images/stuInfor_images/stuImg02.jpg",//头像
        studentName:"唐柳",
        studentGrade:"1801",
        studentTeacher:"王红",
        studentAge:4,
        studentBirth:"2013/01/01",
        studentSex:"女",
        studentAddress:"天府二街",
        relation:"母女",
        parentName:"柳唐歆",
        parentEmail:"131313@qq.com",
        ParentPhone:"18787878787",             //账号手机号
        password:"878787",                     //密码手机号后六位
        inTime:"2018/09/01 08:30",                    //入园时间
        outTime:"2018/09/01 17:30",                  //出园时间
        studentAttend:"全勤",               //出席
        vacationreason:"",          //出席
        studentStatus:true,           //被删除前的状态为true即学生学籍

    },
    {
        studentId:"180104",
        studentPhoto:"../images/stuInfor_images/stuImg04.jpg",//头像
        studentName:"赵飞燕",
        studentGrade:"1801",
        studentTeacher:"王红",
        studentAge:4,
        studentBirth:"2013/01/01",
        studentSex:"男",
        studentAddress:"天府二街",
        relation:"父子",
        parentName:"赵子龙",
        parentEmail:"131313@qq.com",
        ParentPhone:"18787878787",             //账号手机号
        password:"878787",                     //密码手机号后六位
        inTime:"暂无",                    //入园时间
        outTime:"暂无",                  //出园时间
        studentAttend:"请假",               //出席
        vacationreason:"家里有矿",            //出席
        studentStatus:true,           //被删除前的状态为true即学生学籍
    },
    {
        studentId:"180105",
        studentPhoto:"../images/stuInfor_images/stuImg05.jpg",//头像
        studentName:"田甜",
        studentGrade:"1802",
        studentTeacher:"毛不亮",
        studentAge:4,
        studentBirth:"2013/01/01",
        studentSex:"女",
        studentAddress:"天府二街",
        relation:"父女",
        parentName:"田不甜",
        parentEmail:"131313@qq.com",
        ParentPhone:"18787878787",             //账号手机号
        password:"878787",                     //密码手机号后六位
        inTime:"2018/09/01 08:30",                    //入园时间
        outTime:"2018/09/01 17:30",                  //出园时间
        studentAttend:"全勤",               //出席
        vacationreason:"",          //出席
        studentStatus:true,           //被删除前的状态为true即学生学籍
    },
    {
        studentId:"180106",
        studentPhoto:"../images/stuInfor_images/stuImg06.jpg",//头像
        studentName:"陈晨",
        studentGrade:"1801",
        studentTeacher:"王红",
        studentAge:4,
        studentBirth:"2013/01/01",
        studentSex:"男",
        studentAddress:"天府二街",
        relation:"父子",
        parentName:"陈世美",
        parentEmail:"131313@qq.com",
        ParentPhone:"18787878787",             //账号手机号
        password:"878787",                     //密码手机号后六位
        inTime:"2018/09/01 08:30",                    //入园时间
        outTime:"2018/09/01 17:30",                  //出园时间
        studentAttend:"全勤",               //出席
        vacationreason:"",        //出席
        studentStatus:true,           //被删除前的状态为true即学生学籍
    },
    {
        studentId:"180107",
        studentPhoto:"../images/stuInfor_images/stuImg07.jpg",//头像
        studentName:"吴敌",
        studentGrade:"1802",
        studentTeacher:"毛不亮",
        studentAge:4,
        studentBirth:"2013/01/01",
        studentSex:"男",
        studentAddress:"天府二街",
        relation:"父子",
        parentName:"吴寂寞",
        parentEmail:"131313@qq.com",
        ParentPhone:"18787878787",             //账号手机号
        password:"878787",                     //密码手机号后六位
        inTime:"暂无",                    //入园时间
        outTime:"暂无",                  //出园时间
        studentAttend:"请假",               //出席
        vacationreason:"陪爷爷奶奶爬山",           //出席
        studentStatus:true,           //被删除前的状态为true即学生学籍
    },
    {
        studentId:"180108",
        studentPhoto:"../images/stuInfor_images/stuImg08.jpg",//头像
        studentName:"罗布",
        studentGrade:"1801",
        studentTeacher:"王红",
        studentAge:4,
        studentBirth:"2013/01/01",
        studentSex:"男",
        studentAddress:"天府二街",
        relation:"父子",
        parentName:"罗喜洋",
        parentEmail:"131313@qq.com",
        ParentPhone:"18787878787",             //账号手机号
        password:"878787",                     //密码手机号后六位
        inTime:"2018/09/01 08:30",                    //入园时间
        outTime:"2018/09/01 17:30",                  //出园时间
        studentAttend:"全勤",               //出席
        vacationreason:"",             //出席
        studentStatus:true,           //被删除前的状态为true即学生学籍

    },
    {
        studentId:"180109",
        studentPhoto:"../images/stuInfor_images/stuImg09.jpg",//头像
        studentName:"涂涂",
        studentGrade:"1801",
        studentTeacher:"王红",
        studentAge:4,
        studentBirth:"2013/01/01",
        studentSex:"男",
        studentAddress:"天府二街",
        relation:"父子",
        parentName:"涂天皇",
        parentEmail:"131313@qq.com",
        ParentPhone:"18787878787",             //账号手机号
        password:"878787",                     //密码手机号后六位
        inTime:"2018/09/01 08:30",                    //入园时间
        outTime:"2018/09/01 17:30",                  //出园时间
        studentAttend:"全勤",               //出席
        vacationreason:"",               //出席
        studentStatus:true,           //被删除前的状态为true即学生学籍

    },
];
var teacher = [
    {
        teacherId:"180101",
        photo:"images/main_images/face3.jpg",//头像
        teacherName:"毛亮",
        teacherAge:"30",
        teacherSex:"男",
        teacherBirth:"1990/01/01",
        teacherPhone:"13232323232",
        grade:"1801",
        eamil:"111111@.com",
        password:"323232",
        job:"老师",                   //职务
        power:"1",                      //权限
        teacherAttend:"true",         //出席情况
        department:"2018001",          //所属部门
        departmentIsOk:"已激活"          //激活状态
    },
    {
        teacherId:"180102",
        photo:"images/main_images/face4.jpg",//头像
        teacherName:"罗喜洋",
        teacherAge:"30",
        teacherSex:"男",
        teacherBirth:"1990/01/01",
        teacherPhone:"13232320000",
        grade:"1801",
        eamil:"111111@.com",
        password:"323232",
        job:"老师",                   //职务
        power:"1",                      //权限
        teacherAttend:"true",         //出席情况
        department:"2018001",          //所属部门
        departmentIsOk:"已激活"          //激活状态
    },
    {
        teacherId:"180103",
        photo:"images/main_images/face4.jpg",//头像
        teacherName:"毛不易",
        teacherAge:"30",
        teacherSex:"男",
        teacherBirth:"1990/01/01",
        teacherPhone:"13232321111",
        grade:"1801",
        eamil:"111111@.com",
        password:"323232",
        job:"老师",                   //职务
        power:"1",                      //权限
        teacherAttend:"true",         //出席情况
        department:"2018001",          //所属部门
        departmentIsOk:"已激活"          //激活状态
    },
    {
        teacherId:"180104",
        photo:"images/main_images/face2.jpg",//头像
        teacherName:"毛不亮",
        teacherAge:"30",
        teacherSex:"男",
        teacherBirth:"1990/01/01",
        teacherPhone:"13232321111",
        grade:"1801",
        eamil:"111111@.com",
        password:"323232",
        job:"心理诱导老师",                   //职务
        power:"1",                      //权限
        teacherAttend:"true",         //出席情况
        department:"2018002",          //所属部门
        departmentIsOk:"已激活"          //激活状态
    },
    {
        teacherId:"180105",
        photo:"images/main_images/face2.jpg",//头像
        teacherName:"毛毛",
        teacherAge:"30",
        teacherSex:"男",
        teacherBirth:"1990/01/01",
        teacherPhone:"13232321111",
        grade:"1801",
        eamil:"111111@.com",
        password:"323232",
        job:"班主任",                   //职务
        power:"1",                      //权限
        teacherAttend:"true",         //出席情况
        department:"2018002",          //所属部门
        departmentIsOk:"已激活"          //激活状态
    },
    {
        teacherId:"180106",
        photo:"images/main_images/face2.jpg",//头像
        teacherName:"毛毛",
        teacherAge:"30",
        teacherSex:"男",
        teacherBirth:"1990/01/01",
        teacherPhone:"13232321111",
        grade:"1801",
        eamil:"111111@.com",
        password:"323232",
        job:"班主任",                   //职务
        power:"1",                      //权限
        teacherAttend:"true",         //出席情况
        department:"2018003",          //所属部门
        departmentIsOk:"已激活"          //激活状态
    },
    {
        teacherId:"180107",
        photo:"images/main_images/face2.jpg",//头像
        teacherName:"毛毛",
        teacherAge:"30",
        teacherSex:"男",
        teacherBirth:"1990/01/01",
        teacherPhone:"13232321111",
        grade:"1801",
        eamil:"111111@.com",
        password:"323232",
        job:"班主任",                   //职务
        power:"1",                      //权限
        teacherAttend:"true",         //出席情况
        department:"2018003",          //所属部门
        departmentIsOk:"已激活"          //激活状态
    },
    {
        teacherId:"180108",
        photo:"images/main_images/face2.jpg",//头像
        teacherName:"毛毛",
        teacherAge:"30",
        teacherSex:"男",
        teacherBirth:"1990/01/01",
        teacherPhone:"13232321111",
        grade:"1801",
        eamil:"111111@.com",
        password:"323232",
        job:"班主任",                   //职务
        power:"1",                      //权限
        teacherAttend:"true",         //出席情况
        department:"2018003",          //所属部门
        departmentIsOk:"已激活"          //激活状态
    },
    {
        teacherId:"180109",
        photo:"images/main_images/face2.jpg",//头像
        teacherName:"毛毛",
        teacherAge:"30",
        teacherSex:"男",
        teacherBirth:"1990/01/01",
        teacherPhone:"13232321111",
        grade:"1801",
        eamil:"111111@.com",
        password:"323232",
        job:"班主任",                   //职务
        power:"1",                      //权限
        teacherAttend:"true",         //出席情况
        department:"2018004",          //所属部门
        departmentIsOk:"已激活"          //激活状态
    },
    {
        teacherId:"180110",
        photo:"images/main_images/face2.jpg",//头像
        teacherName:"毛毛",
        teacherAge:"30",
        teacherSex:"男",
        teacherBirth:"1990/01/01",
        teacherPhone:"13232321111",
        grade:"1801",
        eamil:"111111@.com",
        password:"323232",
        job:"班主任",                   //职务
        power:"1",                      //权限
        teacherAttend:"true",         //出席情况
        department:"2018004",          //所属部门
        departmentIsOk:"已激活"          //激活状态
    },
    {
        teacherId:"180111",
        photo:"images/main_images/face2.jpg",//头像
        teacherName:"毛毛",
        teacherAge:"30",
        teacherSex:"男",
        teacherBirth:"1990/01/01",
        teacherPhone:"13232321111",
        grade:"1801",
        eamil:"111111@.com",
        password:"323232",
        job:"班主任",                   //职务
        power:"1",                      //权限
        teacherAttend:"true",         //出席情况
        department:"2018004",          //所属部门
        departmentIsOk:"已激活"          //激活状态
    }
];
var admin = [
    {
        adminName:"赖红梅",
        photo:"images//main_images/face2.jpg",//头像
        username:"leader",                 //园长
        password:"leader",
        job:"园长",                   //职务
        power:"5" ,                       //权限等级
        departmentIsOk:"已激活"          //激活状态
    },



    //管理员账号
    {
        adminName:"上帝",
        photo:"images/main_images/face4.jpg",//头像
        username:"admin",
        password:"admin",
        job:"超级管理员",                   //职务
        power:"10" ,                           //权限等级
        departmentIsOk:"已激活"          //激活状态
    },

];
var Grade = [                                 //班级管理
    {
        gradeId:"1801",
        gradeTeacher:"王红",
        gradeLevel:"小班",
        gradeStudents:"20"
    },
    {
        gradeId:"1802",
        gradeTeacher:"毛不易",
        gradeLevel:"中班",
        gradeStudents:"24"
    },
    {
        gradeId:"1803",
        gradeTeacher:"毛不易",
        gradeLevel:"大班",
        gradeStudents:"24"
    },
    {
        gradeId:"1804",
        gradeTeacher:"罗喜洋",
        gradeLevel:"大班",
        gradeStudents:"24"
    },
    {
        gradeId:"1805",
        gradeTeacher:"毛毛",
        gradeLevel:"中班",
        gradeStudents:"24"
    },
    {
        gradeId:"1806",
        gradeTeacher:"毛不亮",
        gradeLevel:"中班",
        gradeStudents:"24"
    },
];
var department = [
    {
        departmentId:"2018001",
        departmentName:"园长办公室",
        departmentContent:"教学管理部门",
        persons:"3"
    },
    {
        departmentId:"2018002",
        departmentName:"教学部",
        persons:"2",
        departmentContent:"教学老师部门"
    },
    {
        departmentId:"2018003",
        departmentName:"后勤部",
        persons:"3",
        departmentContent:"卫生安全负责部门"
    },
    {
        departmentId:"2018004",
        departmentName:"保安部",
        persons:"3",
        departmentContent:"校园安全负责部门"
    }
];
