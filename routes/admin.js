const express = require('express');
const router = express.Router();
const execute = require("./db");


router.get("/", async function (req, res) {

    res.render("admin/03.login.ejs");
});

router.get("/home", isAuth, async function (req, res) {
    let data = req.params;
    let sql = `SELECT * FROM dashboard_home_data_page`;

    let Homedata = await execute(sql);
    res.render("admin/04.home.ejs", { result: Homedata[0] });
});

function isAuth(req, res, next) {
    if (req.session && req.session.user) {
        next();
    }
    else {
        res.redirect("/admin");
    }
}


router.post("/login_admin", async function (req, res) {
    let data = req.body;
    let sql = `SELECT * FROM dashboard_admin_login_data
    WHERE username = '${data.username}' AND 
    password = '${data.password}'`;

    let result = await execute(sql);

    if (result.length > 0) {
        req.session.user = result[0];
        res.redirect("/admin/home");
    }
    else {
        // res.send(`<div style='text-align: center;'><h3> Invalid username OR password </h3> 
        //     <a href = '/' style="text-align: center;"> Try Again </a> </div>`)
        //     res.redirect("/");
        res.redirect("/admin");
    }
});



router.post("/save_home_page", async function (req, res) {
    let data = req.body;
    let img = req.files;

    let sql = " ";
    if (req.files && req.files.Home_photo) {

        let filename = Math.random().toFixed(4) + img.Home_photo.name;

        await img.Home_photo.mv("public/uploads/" + filename);

        sql = `UPDATE dashboard_home_data_page SET Home_name = '${data.Home_name}',
    Home_position = '${data.Home_position}',
    Home_photo = '${filename}',
    Home_Whatsapp =  '${data.Home_Whatsapp}',
    Home_instagram = '${data.Home_instagram}',
    Home_Facebook = '${data.Home_Facebook}',
    Home_Github = '${data.Home_Github}',
    Home_Linkedin = '${data.Home_Linkedin}',
    Home_Descrip = '${data.Home_Descrip}' WHERE id = 1`;


    }
    else {

        sql = `UPDATE dashboard_home_data_page SET Home_name = '${data.Home_name}',
    Home_position = '${data.Home_position}',
    Home_Whatsapp =  '${data.Home_Whatsapp}',
    Home_instagram = '${data.Home_instagram}',
    Home_Facebook = '${data.Home_Facebook}',
    Home_Github = '${data.Home_Github}',
    Home_Linkedin = '${data.Home_Linkedin}',
    Home_Descrip = '${data.Home_Descrip}' WHERE id = 1`;

    }
    await execute(sql);
    res.redirect("/admin/home");
});

router.get("/about", async function (req, res) {

    let Aboutdata = await execute(`SELECT * FROM dashboard_about_data_page`);
    let result = await execute(`SELECT * FROM dashboard_skill_data_front_end`);
    let Back_end = await execute(`SELECT * FROM dashboard_skill_data_back_end`);

    res.render("admin/05.about.ejs", { Aboutdata: Aboutdata[0], result: result, Back_end: Back_end });
});

router.post("/save_about_page", async function (req, res) {
    let data = req.body;
    let sql = `
    UPDATE dashboard_about_data_page SET About_Email = '${data.About_Email}',
    About_Mobile = '${data.About_Mobile}',
    About_Address = '${data.About_Address}',
    About_Header = '${data.About_Header}',
    About_Desript = '${data.About_Desript}',
    About_project_complete = '${data.About_project_complete}',
    About_year_Exp = '${data.About_year_Exp}',
    About_client_sa = '${data.About_client_sa}',
    About_Speciali = '${data.About_Speciali}',
    About_Exp_level = '${data.About_Exp_level}',
    About_Education = '${data.About_Education}',
    About_languages = '${data.About_languages}',
    About_happy_client = '${data.About_happy_client}',
    About_projects = '${data.About_projects}',
    About_hour_sup = '${data.About_hour_sup}',
    About_hard_work = '${data.About_hard_work}' WHERE id = 1`;

    await execute(sql);

    res.redirect("/admin/about");
});

router.get("/skill", function (req, res) {
    res.render("admin/06.skill.ejs")
})

router.post("/save_skill_page", async function (req, res) {
    let data = req.body;
    let sql = `INSERT INTO dashboard_skill_data_front_end(skill_f_title,	skill_f_technology , skill_f_pro_bar_rang , skill_f_Decript)
   VALUES('${data.skill_f_title}','${data.skill_f_technology}','${data.skill_f_pro_bar_rang}','${data.skill_f_Decript}')`;

    let result = await execute(sql);
    res.redirect("/admin/about");
});


router.get("/skill_edit/:id", async function (req, res) {
    let id = req.params.id;

    let sql = `SELECT * FROM dashboard_skill_data_front_end WHERE id = '${id}'`;

    let result = await execute(sql);

    res.render("admin/06.skill.ejs", { result: result[0] });

});

router.post("/update_skill_page", async function (req, res) {
    let data = req.body;

    let sql = `
     UPDATE dashboard_skill_data_front_end SET skill_f_title = '${data.skill_f_title}',
     skill_f_technology = '${data.skill_f_technology}',
     	skill_f_pro_bar_rang = '${data.skill_f_pro_bar_rang}',
        skill_f_Decript = '${data.skill_f_Decript}' WHERE id = '${data.id}'`;
    await execute(sql);

    res.redirect("/admin/about");
});


router.post("/save_backend_skill_page", async function (req, res) {
    let data = req.body;
    let sql = `INSERT INTO dashboard_skill_data_back_end(skill_B_title,	skill_B_technology , skill_B_pro_bar_rang , skill_B_Decript)
   VALUES('${data.skill_B_title}','${data.skill_B_technology}','${data.skill_B_pro_bar_rang}','${data.skill_B_Decript}')`;

    let result = await execute(sql);
    res.redirect("/admin/about");
});

router.get("/B_skill_edit/:id", async function (req, res) {
    let id = req.params.id;

    let sql = `SELECT * FROM dashboard_skill_data_back_end WHERE id = '${id}'`;

    let B_result = await execute(sql);

    res.render("admin/07.back_end_skill.ejs", { B_result: B_result[0] });

});

router.post("/back_end_update_skill_page", async function (req, res) {
    let data = req.body;

    let sql = `
     UPDATE dashboard_skill_data_back_end SET skill_B_title = '${data.skill_B_title}',
     skill_B_technology = '${data.skill_B_technology}',
     	skill_B_pro_bar_rang = '${data.skill_B_pro_bar_rang}',
        skill_B_Decript = '${data.skill_B_Decript}' WHERE id = '${data.id}'`;
    await execute(sql);

    res.redirect("/admin/about");
});

// resume work pending //

router.get("/resume", async function (req, res) {

    let data = req.params;
    let sql = `SELECT * FROM resume_all_data`;
    let resultresume = await execute(sql);

    res.render("admin/08.resume.ejs", { resultresume: resultresume });
})

router.post("/save_resume", async function (req, res) {
    let data = req.body;
    let img = req.files;

    let filename = Math.random().toFixed(4) + img.resume_photo.name;

    await img.resume_photo.mv("public/uploads/" + filename);

    let sql = `INSERT INTO resume_all_data(resume_information,resume_photo,resume_profe_summary,resume_prof_sum_decript,
     resume_contact_info,resume_linkedin_url,resume_technical_skill_tech,resume_tech_prog_bar_per,resume_prof_Expe_title,
     resume_present_date,resume_company_name,resume_prof_decription,resume_education_name,resume_education_date,
     resume_university_name,resume_education_decript,resume_certi_name,resume_certi_date)VALUES('${data.resume_information}',
     '${filename}','${data.resume_profe_summary}','${data.resume_prof_sum_decript}','${data.resume_contact_info}',
     '${data.resume_linkedin_url}','${data.resume_technical_skill_tech}','${data.resume_tech_prog_bar_per}','${data.resume_prof_Expe_title}',
     '${data.resume_present_date}','${data.resume_company_name}','${data.resume_prof_decription}',
     '${data.resume_education_name}','${data.resume_education_date}','${data.resume_university_name}','${data.resume_education_decript}',
     '${data.resume_certi_name}','${data.resume_certi_date}')`;

    let result = await execute(sql);

    res.redirect("/admin/resume");

});

router.get("/resume_top_part_edit/:id", async function (req, res) {
    let id = req.params.id;

    let sql = `SELECT * FROM resume_all_data WHERE id = '${id}'`;

    let resumetop_part = await execute(sql);

    res.render("admin/008.resume_top_part_update.ejs", { resumetop_part: resumetop_part[0] });

});

router.post("/update_top_part_resume", async function (req, res) {

    let data = req.body;
    let img = req.files;

    let sql = "";
    if (req.files && req.files.resume_photo) {

        let filename = Math.random().toFixed(4) + img.resume_photo.name;

        await img.resume_photo.mv("public/uploads/" + filename);

        sql = `UPDATE resume_all_data SET resume_information = '${data.resume_information}',
    resume_photo = '${filename}',
   resume_profe_summary =  '${data.resume_profe_summary}',
   resume_prof_sum_decript = '${data.resume_prof_sum_decript}',
  resume_contact_info = '${data.resume_contact_info}',
   resume_linkedin_url = '${data.resume_linkedin_url}'
    WHERE id = '${data.id}'`;

    }
    else {
        sql = `UPDATE resume_all_data SET resume_information = '${data.resume_information}',
   resume_profe_summary =  '${data.resume_profe_summary}',
   resume_prof_sum_decript = '${data.resume_prof_sum_decript}',
   resume_contact_info = '${data.resume_contact_info}',
   resume_linkedin_url = '${data.resume_linkedin_url}'
    WHERE id = '${data.id}'`;

    }
    await execute(sql);
    res.redirect("/admin/resume");

});

router.get("/resume_technical_part_edit/:id",async function(req,res){
        let id = req.params.id;

    let sql = `SELECT * FROM resume_all_data WHERE id = '${id}'`;

    let resume_technical_part = await execute(sql);

    res.render("admin/009.resume_technical_part_update.ejs", { resume_technical_part: resume_technical_part[0] });
})

router.post("/update_technical_part_resume", async function (req, res) {
    let data = req.body;

    let sql = `
     UPDATE resume_all_data SET resume_technical_skill_tech = '${data.resume_technical_skill_tech}',
     resume_tech_prog_bar_per = '${data.resume_tech_prog_bar_per}'
      WHERE id = '${data.id}'`;
    await execute(sql);

    res.redirect("/admin/resume");
});

router.get("/resume_technical_part_delete/:id", async function (req, res) {
    let id = req.params.id;

    let sql = `DELETE FROM  resume_all_data WHERE id = '${id}'`;

    let reviews_row_delete = await execute(sql);

    res.redirect("/admin/resume");

});


router.get("/resume_profe_exp_edit/:id", async function (req, res) {
    let id = req.params.id;

    let sql = `SELECT * FROM resume_all_data WHERE id = '${id}'`;

    let resume_prof_exp = await execute(sql);

    res.render("admin/010.resume_prof_exp_update.ejs", { resume_prof_exp: resume_prof_exp[0] });

});

router.post("/update_prof_exp_resume", async function (req, res) {
    let data = req.body;

    let sql = `
     UPDATE resume_all_data SET resume_prof_Expe_title = '${data.resume_prof_Expe_title}',
     resume_present_date = '${data.resume_present_date}',
      resume_company_name = '${data.resume_company_name}',
       resume_prof_decription = '${data.resume_prof_decription}'
     
      WHERE id = '${data.id}'`;
    await execute(sql);

    res.redirect("/admin/resume");
});


router.get("/resume_education_edit/:id", async function (req, res) {
    let id = req.params.id;

    let sql = `SELECT * FROM resume_all_data WHERE id = '${id}'`;

    let resume_education = await execute(sql);

    res.render("admin/011.resume_education_update.ejs", { resume_education : resume_education[0] });

});

router.post("/update_education_resume", async function (req, res) {
    let data = req.body;

    let sql = `
     UPDATE resume_all_data SET resume_education_name = '${data.resume_education_name}',
     resume_education_date = '${data.resume_education_date}',
      resume_university_name = '${data.resume_university_name}',
       resume_education_decript = '${data.resume_education_decript}'
     
      WHERE id = '${data.id}'`;
    await execute(sql);

    res.redirect("/admin/resume");
});

router.get("/resume_certifications_edit/:id", async function (req, res) {
    let id = req.params.id;

    let sql = `SELECT * FROM resume_all_data WHERE id = '${id}'`;

    let resume_certifications = await execute(sql);

    res.render("admin/012.resume_certifications_update.ejs", { resume_certifications : resume_certifications[0] });

});

router.post("/update_certifications_resume", async function (req, res) {
    let data = req.body;

    let sql = `
     UPDATE resume_all_data SET resume_certi_name = '${data.resume_certi_name}',
       resume_certi_date = '${data.resume_certi_date}'
     
      WHERE id = '${data.id}'`;
    await execute(sql);

    res.redirect("/admin/resume");
});

// resume work pending //


router.get("/portfolio", async function (req, res) {
    let data = req.params;
    let sql = `SELECT * FROM portfolio_page_data`;
    let portfoliodata = await execute(sql);

    res.render("admin/13.portfolio.ejs", { portfoliodata: portfoliodata });
});

router.post("/portfolio_save_page", async function (req, res) {
    let data = req.body;
    let img = req.files;

    let filename = Math.random().toFixed(4) + img.portfolio_photo.name;

    await img.portfolio_photo.mv("public/uploads/" + filename);

    let sql = `INSERT INTO portfolio_page_data(Portfolio_Descript,portfolio_photo,portfolio_proj_name,portfolio_works_name)
    VALUES('${data.Portfolio_Descript}','${filename}','${data.portfolio_proj_name}','${data.portfolio_works_name}')`;

    let result = await execute(sql);

    res.redirect("/admin/portfolio");
});

router.get("/portfolio_edit/:id", async function (req, res) {
    let id = req.params.id;

    let sql = `SELECT * FROM portfolio_page_data WHERE id = '${id}'`;

    let portfolioresult = await execute(sql);

    res.render("admin/013.portfolio_update.ejs", { portfolioresult: portfolioresult[0] });

});

router.post("/portfolio_update_page", async function (req, res) {

    let data = req.body;
    let img = req.files;

    let sql = "";
    if (req.files && req.files.portfolio_photo) {

        let filename = Math.random().toFixed(4) + img.portfolio_photo.name;

        await img.portfolio_photo.mv("public/uploads/" + filename);

        sql = `UPDATE portfolio_page_data SET Portfolio_Descript = '${data.Portfolio_Descript}',
    portfolio_photo = '${filename}',
   portfolio_proj_name =  '${data.portfolio_proj_name}',
   portfolio_works_name = '${data.portfolio_works_name}' WHERE id = '${data.id}'`;

    }
    else {
        sql = `UPDATE portfolio_page_data SET Portfolio_Descript = '${data.Portfolio_Descript}',
   portfolio_proj_name =  '${data.portfolio_proj_name}',
   portfolio_works_name = '${data.portfolio_works_name}' WHERE id = '${data.id}'`;

    }
    await execute(sql);
    res.redirect("/admin/portfolio");

});

router.get("/portfolio_delete/:id", async function (req, res) {
    let id = req.params.id;

    let sql = `DELETE FROM portfolio_page_data WHERE id = '${id}'`;

    let portfolio_row_delete = await execute(sql);

    res.redirect("/admin/portfolio");

});

router.get("/services", async function (req, res) {
    let id = req.params;
    let servicesdata = await execute(`SELECT * FROM sevices_all_data`);
    let reviewsdata = await execute(`SELECT * FROM reviews_all_data`);
    res.render("admin/14.services.ejs", { servicesdata: servicesdata, reviewsdata: reviewsdata });
});

router.post("/services_save_page", async function (req, res) {
    let data = req.body;
    let sql = `INSERT INTO sevices_all_data(services_icon,services_name,services_Descript)
    VALUES('${data.services_icon}','${data.services_name}','${data.services_Descript}')`;

    await execute(sql);
    res.redirect("/admin/services");
});

router.get("/services_edit/:id", async function (req, res) {
    let id = req.params.id;

    let sql = `SELECT * FROM sevices_all_data WHERE id = '${id}'`;

    let result = await execute(sql);

    res.render("admin/014.services_update.ejs", { result: result[0] });

});

router.post("/services_update_page", async function (req, res) {
    let data = req.body;
    let sql = `UPDATE sevices_all_data SET services_icon = '${data.services_icon}',
    services_name = '${data.services_name}',
    services_Descript = '${data.services_Descript}' WHERE id = '${data.id}'`;
    await execute(sql);
    res.redirect("/admin/services")
});

router.get("/services_delete/:id", async function (req, res) {
    let id = req.params.id;

    let sql = `DELETE FROM  sevices_all_data WHERE id = '${id}'`;

    let services_row_delete = await execute(sql);

    res.redirect("/admin/services");

});

router.post("/reviews_save_page", async function (req, res) {
    let data = req.body;
    let img = req.files;

    let filename = Math.random().toFixed(4) + img.reviews_photo.name;
    await img.reviews_photo.mv("public/uploads/" + filename);

    let sql = `INSERT INTO reviews_all_data(reviews_title,reviews_person_Descript,reviews_photo,reviews_person_name,reviews_position)
      VALUES('${data.reviews_title}','${data.reviews_person_Descript}','${filename}','${data.reviews_person_name}','${data.reviews_position}')`;

    await execute(sql);

    res.redirect("/admin/services");
});

router.get("/reviews_edit/:id", async function (req, res) {
    let id = req.params.id;

    let sql = `SELECT * FROM reviews_all_data WHERE id = '${id}'`;

    let result = await execute(sql);

    res.render("admin/15.reviews_update.ejs", { result: result[0] });

});

router.post("/reviews_update_page", async function (req, res) {

    let data = req.body;
    let img = req.files;

    let sql = "";
    if (req.files && req.files.reviews_photo) {

        let filename = Math.random().toFixed(4) + img.reviews_photo.name;

        await img.reviews_photo.mv("public/uploads/" + filename);

        sql = `UPDATE reviews_all_data SET reviews_title = '${data.reviews_title}',
          reviews_person_Descript =  '${data.reviews_person_Descript}',
          reviews_photo = '${filename}',
          reviews_person_name = '${data.reviews_person_name}',
     	  reviews_position = '${data.reviews_position}'
          WHERE id = '${data.id}'`;

    }
    else {
        sql = `UPDATE reviews_all_data SET reviews_title = '${data.reviews_title}',
        reviews_person_Descript =  '${data.reviews_person_Descript}',
        reviews_person_name = '${data.reviews_person_name}',
   	    reviews_position = '${data.reviews_position}' WHERE id = '${data.id}'`;

    }
    await execute(sql);
    res.redirect("/admin/services");

});

router.get("/reviews_delete/:id", async function (req, res) {
    let id = req.params.id;

    let sql = `DELETE FROM  reviews_all_data WHERE id = '${id}'`;

    let reviews_row_delete = await execute(sql);

    res.redirect("/admin/services");

});



router.get("/logout", function (req, res) {
    req.session.destroy();
    res.redirect("/admin");
});


router.get("/message_box", async function (req, res) {
    let data = req.params;
    let sql = `SELECT * FROM user_side_massage_data`;
    let message_box_data = await execute(sql);

    res.render("admin/16.message_box.ejs", { message_box_data : message_box_data });
});

router.get("/message_box_delete/:id", async function (req, res) {
    let id = req.params.id;

    let sql = `DELETE FROM  user_side_massage_data WHERE id = '${id}'`;

    let message_row_delete = await execute(sql);

    res.redirect("/admin/message_box");

});


module.exports = router;







