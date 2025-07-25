const express = require('express');
const router = express.Router();
const execute = require("./db");

router.get("/", async function (req, res) {
   let data = req.params;
   let Homedata = await execute(`SELECT * FROM dashboard_home_data_page`);
   let Aboutdata = await execute(`SELECT * FROM dashboard_about_data_page`);
   let f_skill_data = await execute(`SELECT * FROM dashboard_skill_data_front_end`);
   let B_skill_data = await execute(`SELECT * FROM dashboard_skill_data_back_end`);
   let resumedata = await execute(`SELECT * FROM resume_all_data`);
   let portfolioresult = await execute(`SELECT * FROM portfolio_page_data`);
   let servicesresult = await execute(`SELECT * FROM sevices_all_data`);
   let reviewsresult = await execute(`SELECT * FROM reviews_all_data`);

  let obj = 
  {
       Homedata: Homedata[0], 
       Aboutdata : Aboutdata[0] , 
       f_skill_data : f_skill_data , 
       B_skill_data : B_skill_data , 
      resumedata : resumedata , 
      portfolioresult : portfolioresult , 
      servicesresult : servicesresult ,
      reviewsresult : reviewsresult
  }

   res.render("user/userHome.ejs", obj);
});


router.post("/user/contact_save", async function (req, res) {
   let data = req.body;
   const sql = `INSERT INTO user_side_massage_data(name,email,subject,message)VALUES('${data.name}',
   '${data.email}','${data.subject}','${data.message}')`;
   let result = await execute(sql);
   res.redirect("/")
});

module.exports = router;