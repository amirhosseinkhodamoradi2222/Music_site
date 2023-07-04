const { render } = require('ejs')
const { static } = require('express')
const express = require('express')
const path =require('path');
const router = express.Router()
const mysql2 = require('mysql2')
const session = require('express-session');
const cookieParser = require('cookie-parser');
const upload = require('express-fileupload');
const fs = require('fs');


router.use(express.urlencoded({ extended: false }))
router.use(express.json())

// برسی احراز هویت کاربر 
function check(req,res,next){
    res.set(
        "Cache-Control",
        "no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0"
    );
    if (req.session.user) {
        next();
    }else{
        res.render('404')
    }
}
// اضافه کردن کوکی 
router.use(cookieParser())
// SESSION اضافه کردن  
router.use(session({
	secret: 'amir',
    resave: false,
	saveUninitialized: false,
    cookie:{
        secure: false
    }
}));
// اتصال به پایگاه داده
const db = mysql2.createConnection({
    host: 'localhost',
     user:'root',
     password:'',
     database: 'music site'
})


// صفحه ورود به پنل مدیریت
router.get('/login', (req, res)=>{
res.render('login',{
    title:'ورود',
    masexite: masexite,
})
// چک کردن لاگین بودن مدیر سایت
router.post('/login',(req,res)=>{
    res.set(
        "Cache-Control",
        "no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0"
    );
    let user_name = req.body.user_name
    let password = req.body.password
    if (user_name && password) {
        db.query(`SELECT * FROM admin WHERE user_name = "${user_name}" AND password = "${password}"`, (error, results, fields)=> {
            if (results.length > 0) {
                req.session.user = user_name
                req.session.loggedin = true;
                res.redirect('/admin/musicadmin');
            } else {
                masser = 'نام کاربری یا رمز عبور اشتباه است'
                res.redirect('/admin/login');
            }			
            res.end();
          } );
        }  
        else {
            masserr='لطفا همه فیلد ها را پر کنید'
           res.redirect('/admin/login');
        }
    })
})

//نمایش اهنگ ها 
router.get('/musicadmin',check, (req, res)=>{
    res.set(
        "Cache-Control",
        "no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0"
    );
    let sql_allmusic = 'SELECT id,img ,name,id_singer,title,history,music,`condition`,`new_music`,popular FROM music';
    db.query(sql_allmusic,(err,result)=>{ 
    res.render('musicadmin',{
        title:'اهنگ',
        result : result
    })
    })
    
})

//اضافه کردن اهگ
router.get('/addmusic',check, (req, res)=>{
    let cat
    res.set(
        "Cache-Control",
        "no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0"
    );

     let sql_catgory_music = 'SELECT * FROM cotgory'
     db.query(sql_catgory_music,(err,result)=>{cat = result}) 
    let sql_singer_music = 'SELECT * FROM singer'
    db.query(sql_singer_music,(err,results)=>{ 
    res.render('addmusic',{
        title:'اضافه کردن اهنگ',
        singer : results,
        catgory : cat
    })
}) 
})
// اضافه کردن پست اهنگ و ذخیره در دیتابیس
let mas_addmusic
router.post('/addmusic',check, (req, res)=>{
    router.use(upload())
let name = req.body.name 
let title = req.body.title
let text = req.body.text
let newM = req.body.new
let imge = req.files.imge
let music = req.files.music
let singer = req.body.singer
let catgory = req.body.catgory
let popular = req.body.popular
let condition = req.body.condition
let date = req.body.date

let imgName = imge.name
let imgType = imge.mimetype

let musicName = music.name
let musicType = music.mimetype

    if (imge == "" || imge == undefined || imge == null ||name == "" || name == undefined || name == null ) {
        mas_addmusic = "لطفا همه فیلد ها را پر کنید"
        res.redirect('/admin/advertisingadmin')
    }else{
        if (imgType == "image/jpeg" && musicType == "audio/mpeg") {
            let sql_addmusic = 'INSERT INTO `music` (`id`, `name`, `id_singer`, `history`, `text`, `img`, `music`,`id_catgory`, `new_music`, `popular`, `condition`, `title`) VALUES (NULL, "'+name+'", '+singer+', "'+date+'", "'+text+'", "'+imgName+'", "'+musicName+'", '+catgory+', '+newM+', '+popular+', '+condition+', "'+title+'")'
            db.query(sql_addmusic,(err)=>{
                if (err) throw err ;
                mas_addmusic = "تبلیغ با موفقیت درج و انتشار شد"
                res.redirect('/admin/musicadmin')
            })
            imge.mv('./utils/img/'+imgName)
            music.mv('./utils/music/'+musicName)
        }else{
         mas_addmusic ="فقط فایل هایی با پسوند JPEG ارسال شود"
         res.redirect('/admin/musicadmin')
        }
    }

})
// ویرایش اطلاعات اهنگ
router.get('/edtmusic:id',check, (req, res)=>{
    let sin,cat
    res.set(
        "Cache-Control",
        "no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0"
    );

    let id = req.params.id
   

    let sql_catgory_music = 'SELECT * FROM cotgory'
    db.query(sql_catgory_music,(err,result)=>{cat = result}) 
    let sql_singer_music = 'SELECT * FROM singer'
    db.query(sql_singer_music,(err,result)=>{sin = result}) 
    let sql_edtmusic = `SELECT * FROM music WHERE id = ${id}`
    db.query(sql_edtmusic,(err,rows,result)=>{
       res.render('edtmusic',{
        title:'ویرایش اهنگ',
        sin : sin,
        cat :cat,
        id : id ,
        name : rows[0].name,
        singer : rows[0].id_singer,
        history : rows[0].history,
        text : rows[0].text,
        img : rows[0].img,
        music : rows[0].music,
        catgory : rows[0].id_catgory,
        newsss : rows[0].new_music,
        popular : rows[0].popular,
        condition : rows[0].condition,
        title : rows[0].title,
       })
    })
})
// ویرایش اطلاعات اهنگ
router.post('/edtmusic:id/:img/:music',check,(req,res)=>{
    router.use(upload())
    res.set(
        "Cache-Control",
        "no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0"
    );
    let id = req.params.id
    let img = req.params.img
    let music = req.params.music

if(req.files){
   
    
let name = req.body.name 
let title = req.body.title
let text = req.body.text
let newM = req.body.new
let singer = req.body.singer
let catgory = req.body.catgory
let popular = req.body.popular
let condition = req.body.condition
let date = req.body.date

console.log(req.files.imge.name);

    let sql_update_news = 'UPDATE music SET `name` = "'+name+'", `title`= "'+title+'", `id_singer` = '+singer+' , `history` = "'+date+'" ,`text` = "'+text+'", `img`= "'+req.files.imge.name+'", `music` = "'+req.files.music.name+'" , `id_catgory`  = '+catgory+' ,`new_music` = '+newM+', `popular` = '+popular+' , `condition` = '+condition+'  WHERE `id` = '+id+''
    db.query(sql_update_news,(err,result)=>{
        if (err) throw err
        req.files.imge.mv('./utils/img/'+req.files.imge.name)
        req.files.music.mv('./utils/music/'+req.files.music.name)
        res.redirect('/admin/musicadmin')
    })
    

    } else{ 
        let name = req.body.name 
        let title = req.body.title
        let text = req.body.text
        let newM = req.body.new
        let singer = req.body.singer
        let catgory = req.body.catgory
        let popular = req.body.popular
        let condition = req.body.condition
        let date = req.body.date
        let img = req.params.img
        let music = req.params.music
        
        let sql_update_musics = 'UPDATE music SET `name` = "'+name+'", `title`= "'+title+'", `id_singer` = '+singer+' , `history` = "'+date+'" ,`text` = "'+text+'", `img`= "'+img+'", `music` = "'+music+'" , `id_catgory`  = '+catgory+' ,`new_music` = '+newM+', `popular` = '+popular+' , `condition` = '+condition+'  WHERE `id` = '+id+''
        db.query(sql_update_musics,(err,result)=>{
            if (err) throw err
            res.redirect('/admin/musicadmin')
        })
    }
  
})
// حذف اهنگ
let am
router.get('/deletemusic:id/:music/:img',check, (req, res)=>{
    res.set(
        "Cache-Control",
        "no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0"
    );
    let music = req.params.music
    let img = req.params.img
    if(img){
    fs.unlink(`./utils/img/${img}`,(err)=>{
        if(err) throw err
        return
    }) 
    }else{ 
         res.redirect('/admin/musicadmin')
    }
    if(music){
    fs.unlink(`./utils/music/${music}`,(err)=>{
        if(err) throw err
        return
    })
    } else{
        res.redirect('/admin/musicadmin')
    }
    let id = req.params.id
    let sql_deletemusic = `DELETE FROM music WHERE id = ${id}`;
    db.query(sql_deletemusic,(err,result)=>{
        if (err) throw err
        res.redirect('/admin/musicadmin')
   })

})

// نمایش کامنت ها
router.get('/comentadmin',check, (req, res)=>{
    res.set(
        "Cache-Control",
        "no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0"
    );
    
    let sql = `SELECT c.name , c.email , m.title , c.text ,c.condition, c.id FROM comment AS c INNER JOIN music AS m ON c.id_music = m.id;`
    db.query(sql,(err,result)=>{
    res.render('comentadmin',{
        title:'کامنت ها',
        result : result
    })
    })
})
//حذف کامنت ها
router.get('/deletecoment/:id',check, (req, res)=>{
    res.set(
        "Cache-Control",
        "no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0"
    );
    let sql_delete = `DELETE FROM comment WHERE id = ${req.params.id}`;
    db.query(sql_delete,(err,result)=>{
        if (err) throw err
        res.redirect('/admin/comentadmin')
   })
})
//انتشار کامنت ها
router.get('/condition:id',check, (req, res)=>{
    res.set(
        "Cache-Control",
        "no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0"
    );
    let sql_condition = 'UPDATE `comment` SET `condition` = 1 WHERE `comment`.`id` = '+req.params.id+''
    db.query(sql_condition,(err,result)=>{
        if (err) throw err
        res.redirect('/admin/comentadmin')
   })
})
// نمایش کنسرت ها
router.get('/consertadmin',check, (req, res)=>{
    res.set(
        "Cache-Control",
        "no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0"
    );
    let sql_consert = 'SELECT * FROM concert'
    db.query(sql_consert,(err,result)=>{
    res.render('consertadmin',{
        title:'کنسرت ها ',
        result : result
    })
})
})
// اضافه کردن کنسرت
router.get('/addconsert',check, (req, res)=>{
    res.set(
        "Cache-Control",
        "no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0"
    );
    res.render('addconsert',{
        title:'اضافه کردن کنسرت',
        massconsert : massconsert
    })
})
// اضافه کردن کنسرت
let massconsert
router.post('/addconsert',(req,res)=>{
    router.use(upload())
let title = req.body.title
let image = req.files.image
let dates = req.body.dates
let date = req.body.date
let text = req.body.text
let link = req.body.link

let imgName = image.name
let imgType = image.mimetype

if (title == "" || title == undefined || title == null || image == "" || image == undefined || image == null ||text == "" || text == undefined || text == null || date == "" || date == undefined || date == null || dates == "" || dates == undefined || dates == null || link == "" || link == undefined || link == null  ) {
    massconsert = "لطفا همه فیلد ها را پر کنید"
    res.redirect('/admin/consertadmin')
}else{
    if (imgType == "image/jpeg") {
        let sql_addconsert = `INSERT INTO concert (title , img , text , history , link, date) VALUES ("${title}","${imgName}","${text}","${date}","${link}","${dates}")`
        db.query(sql_addconsert,(err)=>{
            if (err) throw err ;
            massconsert = "کنسرت با موفقیت درج و انتشار شد"
            res.redirect('/admin/consertadmin')
        })
        image.mv('./utils/img/'+imgName)
    }else{
     massconsert ="فقط فایل هایی با پسوند JPEG ارسال شود"
     res.redirect('/admin/consertadmin')
    }
}

})
// ویرایش کنسرت
router.get('/edtconsert:id',check, (req, res)=>{
    res.set(
        "Cache-Control",
        "no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0"
    );
    let id = req.params.id
    let sql_consert = 'SELECT * FROM concert'
    db.query(sql_consert,(err,rows,result)=>{
    res.render('edtconsert',{
        title:'ویرایش کنسرت ',
        id : id,
        titles : rows[0].title,
        img : rows[0].img,
        text : rows[0].text,
        history : rows[0].history,
        link : rows[0].link,
        date : rows[0].date,
    })
   })
})
// ویرایش کنسرت
router.post('/edtconsert:id',check, (req, res)=>{
    res.set(
        "Cache-Control",
        "no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0"
    );
})
// حذف کنسرت
router.get('/deleteconsert:id/:img',check, (req, res)=>{
    res.set(
        "Cache-Control",
        "no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0"
    );
    let img = req.params.img
    fs.unlink(`./utils/img/${img}`,(err)=>{
        if(err) throw err
        return
    })
    let id = req.params.id
    let delete_consert = `DELETE FROM concert WHERE id = ${id}`
    db.query(delete_consert,(err)=>{
        if (err) throw err;
        res.redirect('/admin/consertadmin')
    })
})
// نمایش اخبار
router.get('/newsadmin',check, (req, res)=>{
    res.set(
        "Cache-Control",
        "no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0"
    );
    let sql_newss = 'SELECT * FROM news'
    db.query(sql_newss,(err,result)=>{
    res.render('newsadmin',{
        title:'اخبار',
        result :result,
        mas_err:mas_err
    })
    })
})
// اضافه کردن اخبار موزیک
router.get('/addnews',check, (req, res)=>{
    res.set(
        "Cache-Control",
        "no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0"
    );
    res.render('addnews',{
        title:'اضافه کردن اخبار',
        mas_err:mas_err
    })
})
// اضافه کردن اخبار موزیک
let mas_err
router.post('/addnews',check, (req, res)=>{
    router.use(upload())
    res.set(
        "Cache-Control",
        "no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0"
    );
   let title = req.body.title
   let text = req.body.text
   let date = req.body.date

   let myfile = req.files.myfile 
   let imgName = myfile.name
   let imgType = myfile.mimetype

   if (title == "" || title == undefined || title == null || myfile == "" || myfile == undefined || myfile == null ||text == "" || text == undefined || text == null || date == "" || date == undefined || date == null ) {
       mas_err = "لطفا همه فیلد ها را پر کنید"
       res.redirect('/admin/newsadmin')
   }else{
       if (imgType == "image/jpeg") {
           let sql_addnews = `INSERT INTO news (title, img, text, date) VALUES ("${title}","${imgName}","${text}","${date}")`
           db.query(sql_addnews,(err)=>{
               if (err) throw err ;
               mas_err = "خبر با موفقیت درج و انتشار شد"
               res.redirect('/admin/newsadmin')
           })
           myfile.mv('./utils/img/'+imgName)
       }else{
        mass ="فقط فایل هایی با پسوند JPEG ارسال شود"
        res.redirect('/admin/newsadmin')
       }
   }
})
// ویرایش خبر
router.get('/edtnews:id',check, (req, res)=>{
    router.use(upload())
    res.set(
        "Cache-Control",
        "no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0"
    );
    let id = req.params.id
    let sql_edtnews = `SELECT * FROM news WHERE id = ${id}`
    db.query(sql_edtnews,(err,rows,result)=>{
       res.render('edtnews',{
        title:'ویرایش اخبار',
        id : id ,
        title : rows[0].title,
        img : rows[0].img,
        text : rows[0].text,
        date : rows[0].date,
       })
    })
})
// ویرایش خبر
router.post('/edtnews:id',check, (req, res)=>{
    res.set(
        "Cache-Control",
        "no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0"
    );
    router.use(upload())

    let id = req.params.id
    let title = req.body.title
    let text = req.body.text
    let date = req.body.date
    let img = req.files.img

    let imgName = img.name
    let type = img.mimetype
        if(type == 'image/jpeg'){
    let sql_update_news = `UPDATE news SET title = "${title}", img= "${imgName}", text = "${text}" , date = ${date}  WHERE id = ${id}`
    db.query(sql_update_news,(err,result)=>{
        if (err) throw err
        img.mv('./utils/img/'+imgName)
        res.redirect('/admin/newsadmin')
    })
    }else{
        res.redirect('/admin/newsadmin')
    }
})
// حذف اخبار
router.get('/deletenews/:id',check, (req, res)=>{
    res.set(
        "Cache-Control",
        "no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0"
    );
    let id = req.params.id
    let delete_news = `DELETE FROM news WHERE id = ${id}`
    db.query(delete_news,(err)=>{
        if (err) throw err;
        res.redirect('/admin/newsadmin')
        
    })
   
})
//صفحه دسته بندی ها 
router.get('/catgoryadmin',check, (req, res)=>{
    res.set(
        "Cache-Control",
        "no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0"
    );
    let sql_catgory = 'SELECT * FROM cotgory'
    db.query(sql_catgory,(err,result)=>{
    res.render('catgoryadmin',{
        title:'دسته بندی',
        result:result,
       // massss : massss
    })
    })
})
//اضافه کردن دسته
router.get('/addcatgory',check, (req, res)=>{
    res.set(
        "Cache-Control",
        "no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0"
    );
    res.render('addcatgory',{
        title:'اضافه کردن دسته',
    })
})

//let massss
router.post('/addcatgory',check, (req, res)=>{
    res.set(
        "Cache-Control",
        "no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0"
    );
let name_catgory = req.body.name
if (name_catgory === undefined || name_catgory === "" || name_catgory === null) {
    //massss = "دسته اظافه نشد"
    res.redirect('/admin/musicadmin')
}else{
    let sql_addcatgory =`INSERT INTO cotgory(name) VALUES ("${name_catgory}")`
    db.query(sql_addcatgory,(err,result)=>{
        if (err) throw ree
       // massss = "دسته جدید اضافه شد"
        res.redirect('/admin/catgoryadmin')
    })
}

})
// ویرایش دسته
router.get('/edtcatgory:id',check, (req, res)=>{
    res.set(
        "Cache-Control",
        "no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0"
    );
    let id = req.params.id
    let sql_edtcotgory = `SELECT * FROM cotgory WHERE id = ${id}`
    db.query(sql_edtcotgory,(err,rows,result)=>{
       res.render('edtcatgory',{
        title:'ویرایش دسته',
        id : id ,
        name : rows[0].name,
       })
    })
})
// ویرایش دسته
router.post('/edtcatgory:id',check, (req, res)=>{
    res.set(
        "Cache-Control",
        "no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0"
    );
    let id = req.params.id
    let name = req.body.name
    let sql_update = `UPDATE cotgory SET name = "${name}" WHERE id = ${id}`
    db.query(sql_update,(err,result)=>{
        if (err) throw err
    res.redirect('/admin/catgoryadmin')
    })
})
//نام هنرمندان
router.get('/singeradmin',check, (req, res)=>{
    res.set(
        "Cache-Control",
        "no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0"
    );
    let sql_cantact = 'SELECT * FROM singer'
    db.query(sql_cantact,(err,result)=>{
    res.render('singeradmin',{
        title:'خواننده',
        result:result
    })
    })
})
// اضافه کردن خواننده
router.get('/addsinger',check, (req, res)=>{
    res.set(
        "Cache-Control",
        "no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0"
    );
    res.render('addsinger',{
        title:'اضافه کردن خواننده',
    })
})
// اضافه کردن خواننده
router.post('/addsinger',check, (req, res)=>{
    res.set(
        "Cache-Control",
        "no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0"
    );
    let name = req.body.name
    let sql = `INSERT INTO singer(name) VALUES ("${name}")`
    db.query(sql,(err)=>{
    res.redirect('/admin/singeradmin')
    })
})
//ثبت ویرایش نام خواننده
router.get('/edtsinger:id',check, (req, res)=>{
    res.set(
        "Cache-Control",
        "no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0"
    );
    let sql = `SELECT * FROM singer WHERE id = ${req.params.id}`
    db.query(sql,(err,rows,result)=>{
    res.render('edtsinger',{
        id: req.params.id,
        name :rows[0].name,
        title:'ویرایش نام خواننده',
    })
    })
})
//ثبت ویرایش نام خواننده
router.post('/edtsinger:id',check, (req, res)=>{
    res.set(
        "Cache-Control",
        "no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0"
    );
    let name = req.body.name_singer;
    let sql_update = `UPDATE  singer  SET name = "${name}"  WHERE id = ${req.params.id}`
    db.query(sql_update,(err,result)=>{
        if (err) throw err
    res.redirect('/admin/singeradmin')
    })  
})
// نمایش تبلیغات
router.get('/advertisingadmin',check, (req, res)=>{
    res.set(
        "Cache-Control",
        "no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0"
    );
    let sql_advertising = 'SELECT * FROM advertising'
    db.query(sql_advertising,(err,result)=>{
    res.render('advertisingadmin',{
        title:'تبلیغات',
        result : result
    })
    })
})
// اضافه کردن تبلیغات
router.get('/addadvertising',check, (req, res)=>{
    res.set(
        "Cache-Control",
        "no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0"
    );
    res.render('addadvertising',{
        title:'اضافه کردن تبلیغات',
    })
})
// اضافه کردن تبلیغات
let mas_advertising
router.post('/addadvertising',check, (req, res)=>{
    router.use(upload())
    res.set(
        "Cache-Control",
        "no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0"
    );
    let image = req.files.image
    let link = req.body.link

    let imgName = image.name
    let imgType = image.mimetype
        
    if (image == "" || image == undefined || image == null ||link == "" || link == undefined || link == null ) {
        mas_advertising = "لطفا همه فیلد ها را پر کنید"
        res.redirect('/admin/advertisingadmin')
    }else{
        if (imgType == "image/jpeg") {
            let sql_addadvertising = `INSERT INTO advertising (src, link) VALUES ("${imgName}","${link}")`
            db.query(sql_addadvertising,(err)=>{
                if (err) throw err ;
                mas_advertising = "تبلیغ با موفقیت درج و انتشار شد"
                res.redirect('/admin/advertisingadmin')
            })
            image.mv('./utils/img/'+imgName)
        }else{
         mas_advertising ="فقط فایل هایی با پسوند JPEG ارسال شود"
         res.redirect('/admin/advertisingadmin')
        }
    }
})
router.get('/edtadvertising/:id',check, (req, res)=>{
    res.set(
        "Cache-Control",
        "no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0"
    );
    res.render('edtadvertising',{
        title:'ویرایش تبلیغات',
    })
})
// حذف تبلیغ
router.get('/deleteadvertising:id/:src',check, (req, res)=>{
    res.set(
        "Cache-Control",
        "no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0"
    );
    let id = req.params.id
    let src = req.params.src
    fs.unlink(`./utils/img/${src}`,(err)=>{
        if(err) throw err
        return
    })
    let delete_advertising = `DELETE FROM advertising WHERE id = ${id}`
    db.query(delete_advertising,(err)=>{
        if (err) throw err;
        res.redirect('/admin/advertisingadmin')
    })
   
})
//دریافت پیام های ادمین
router.get('/cantactadmin',check, (req, res)=>{
    res.set(
        "Cache-Control",
        "no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0"
    );
let send
let sql_send = 'SELECT * FROM send_music'
db.query(sql_send,(err,result)=>{ send=result })
let sql_cantact = 'SELECT * FROM contact'
db.query(sql_cantact,(err,result)=>{
    res.render('cantactadmin',{
        title:'پیام ها ',
        result:result,
        send:send
    })
    })
})

router.get('/deletesend:id/:img',check, (req, res)=>{
    res.set(
        "Cache-Control",
        "no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0"
    );
    let img = req.params.img
    let id = req.params.id
    let delete_send = `DELETE FROM send_music WHERE id = ${id}`
    db.query(delete_send,(err)=>{
        if (err) throw err;
        res.redirect('/admin/cantactadmin')
    })
    fs.access(`./utils/upload/${img}`,(err)=>{
        if(err){
            res.redirect('/admin/cantactadmin')
        }else{
     fs.unlink(`./utils/upload/${img}`,(err)=>{
        if(err){
            res.redirect('/admin/cantactadmin')
        } else{
        return
        }
    })}
    })
   
   
})

// حذف پیام ها
router.get('/deletecantact/:id',check, (req, res)=>{
    res.set(
        "Cache-Control",
        "no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0"
    );
    let sql_delete = `DELETE FROM contact WHERE id = ${req.params.id}`;
    db.query(sql_delete,(err,result)=>{
        if (err) throw err
        res.redirect('/admin/cantactadmin')
   })
})
// نمایش ویدئو موزیک ها
router.get('/vidoadmin',check, (req, res)=>{
    res.set(
        "Cache-Control",
        "no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0"
    );
    let sql_videos = 'SELECT * FROM video'
    db.query(sql_videos,(err,result)=>{
    res.render('vidoadmin',{
        title:'ویدئو موزیک',
        result : result
    })
    })
})
// اضافه کردن ویدئو موزیک
router.get('/addvido',check, (req, res)=>{
    res.set(
        "Cache-Control",
        "no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0"
    );
    res.render('addvido',{
        title:'اضافه کردن ویدئو موزیک',
    })
})
// اضافه کردن ویدئو موزیک
let mas_vido
router.post('/addvido',check, (req, res)=>{
    router.use(upload())
    res.set(
        "Cache-Control",
        "no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0"
    );
  let condition = req.body.condition
  let text = req.body.text
  let vido = req.files.vido
  let title = req.body.title
  
  let vidiName = vido.name
  let vidoType = vido.mimetype
      
  if (condition == "" || condition == undefined || condition == null ||text == "" || text == undefined || text == null ||vido == "" || vido == undefined || vido == null ||title == "" || title == undefined || title == null ) {
    mas_vido = "لطفا همه فیلد ها را پر کنید"
      res.redirect('/admin/vidoadmin')
  }else{
      if (vidoType == "video/mp4") {
          let sql_addadvertising = 'INSERT INTO `video` (`id`, `title`, `src`, `condition`, `text`) VALUES (NULL, "'+title+'", "'+vidiName+'", '+condition+', "'+text+'")'
          db.query(sql_addadvertising,(err)=>{
              if (err) throw err ;
              mas_vido = "تبلیغ با موفقیت درج و انتشار شد"
              res.redirect('/admin/vidoadmin')
          })
          vido.mv('./utils/video/'+vidiName)
      }else{
        mas_vido ="فقط فایل هایی با پسوند JPEG ارسال شود"
       res.redirect('/admin/vidoadmin')
      }
  }
})

router.get('/edtvido:id',check, (req, res)=>{
    router.use(upload())
    res.set(
        "Cache-Control",
        "no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0"
    );
    let id = req.params.id
    let sql_edtcotgory = `SELECT * FROM video WHERE id = ${id}`
    db.query(sql_edtcotgory,(err,rows,result)=>{
       res.render('edtvido',{
        title:'ویرایش ویدئو موزیک',
        id : id ,
        title : rows[0].title,
        src : rows[0].src,
        text : rows[0].text,
        condition : rows[0].condition
       })
    })
 
})
// ویرایش ویدئو موزیک
router.post('/edtvido:id',check, (req, res)=>{
    router.use(upload())
    res.set(
        "Cache-Control",
        "no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0"
    );
   let id = req.params.id
   let title = req.body.title 
   let vido = req.files.vido 
   let text = req.body.text 
   let condition = req.body.condition 

   let vidoName = vido.name
   let type = vido.mimetype
       if(type == 'video/mp4'){
   let sql_update_video = 'UPDATE video SET `title` = "'+title+'", `src` = "'+vidoName+'" ,`condition` = '+condition+', `text` = "'+text+'"  WHERE `id` = '+id+' '
   db.query(sql_update_video,(err,result)=>{
       if (err) throw err
       vido.mv('./utils/video/'+vidoName)
       res.redirect('/admin/vidoadmin')
   })
   }else{
       res.redirect('/admin/vidoadmin')
   }

})
// حذف ویدئو موزیک 
router.get('/deletevido:id/:src',check, (req, res)=>{
    router.use(upload())
    fs.unlink(`./utils/video/${req.params.src}`,(err)=>{
        if (err) throw err 
        return 
    })

    let sql_delete = `DELETE FROM video WHERE id = ${req.params.id}`;
    db.query(sql_delete,(err,result)=>{
        if (err) throw err
        res.redirect('/admin/vidoadmin')
   })
})
// خروج از  پنل مدیریت
let masexite
router.get('/exit', (req, res)=>{
    res.set(
        "Cache-Control",
        "no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0"
    );
    req.session.destroy()
    masexite = "خروج از  پنل مدیریت"
    res.redirect('/admin/login')
})
// صفحه 404
router.get('*',(req,res)=>{
   res.render('404')
})


module.exports = router