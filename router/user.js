const { render } = require('ejs')
const { static } = require('express')
const express = require('express')
const router = express.Router()
const mysql2 = require('mysql2')
const upload = require('express-fileupload');

router.use(express.urlencoded({ extended: true }))
router.use(express.json())

router.use(upload(({
    safeFileNames : false
})))

const db= mysql2.createConnection({
    host: 'localhost',
     user:'root',
     password:'',
     port:'3306',
     database: 'music site'
})

let home,cotgory,singer,news,popular,concert,video,madahe,dmo,waiting,advertising

// دستورات دمو موزیک
let sql_dmo = 'SELECT id,title,id_catgory FROM music WHERE id_catgory = 6 '
db.query(sql_dmo,(err,result)=>{ dmo = result })
// دستورات پخش اهنگ های بزودی
let sql_waiting = 'SELECT id,title,id_catgory FROM music WHERE id_catgory = 7 '
db.query(sql_waiting,(err,result)=>{ waiting = result })
// دستورات مداحی
let sql_madahe = 'SELECT id,title,id_catgory FROM music WHERE id_catgory = 5 '
db.query(sql_madahe,(err,result)=>{ madahe = result })
// دستورات ویدئو موزیک ها
let sql_video = 'SELECT * FROM video'
db.query(sql_video,(err,result)=>{ video = result })
// دستورات اطلاعیه کنسرت ها
let sql_concert = "SELECT * FROM concert"
db.query(sql_concert,(err,result)=>{ concert = result })
// دستورات محبوب ترین اهنگ ها
let sql_popular='SELECT m.id, m.img,s.name  FROM music AS m INNER JOIN singer AS s ON id_singer = s.id WHERE popular = 1'
db.query(sql_popular,(err,result)=>{ popular = result })

let sql = 'SELECT m.id, m.img, s.name, m.history, m.title FROM music AS m INNER JOIN singer AS s ON id_singer = s.id WHERE new_music = 1'
db.query(sql,(err,result)=>{ home = result })

let sql_cotgory='SELECT * FROM cotgory'
db.query(sql_cotgory,(err,result)=>{ cotgory = result })

let sql_singer = 'SELECT * FROM singer'
db.query(sql_singer,(err,result)=>{ singer = result })

let sql_advertising = 'SELECT * FROM advertising'
db.query(sql_advertising,(err,result)=>{ advertising = result })

let sql_news = 'SELECT * FROM news'
db.query(sql_news,(err,result)=>{ news = result })

// مسیر صفحه اصلی و اهنگ های جدید
router.get('/',(req,res)=>{
    res.render('index',{
        title:'صفحه اصلی',
        path:'/',
        cotgory:cotgory,
        result:home,
        singer:singer,
        popular:popular,
        madahe:madahe,
        dmo:dmo,
        waiting:waiting,
        advertising :advertising
    })
})
// مسیر خبر موزیک
router.get('/news',(req,res)=>{
    res.render('news',{
        title:'خبر موزیک',
        cotgory:cotgory,
        singer:singer,
        news : news,
        popular:popular,
        madahe:madahe,
        dmo:dmo,
        waiting:waiting,
        advertising :advertising
    })
})
// مسیر اطلاعیه کنسرت ها
router.get('/consert',(req,res)=>{
    res.render('consert',{
        title:'کنسرت',
        cotgory:cotgory,
        singer:singer,
        popular:popular,
        concert:concert,
        madahe:madahe,
        dmo:dmo,
        waiting:waiting,
        advertising :advertising
    })
})
// مسیر فرم ارسال اهنگ ها
router.get('/send',(req,res)=>{
    res.render('send',{
        title:'ارسال اهنگ',
        cotgory:cotgory,
        mass : mass,
        singer:singer,
        popular:popular,
        madahe:madahe,
        dmo:dmo,
        waiting:waiting,
        advertising :advertising
    })
})
let mass
// مسیر ذخیره فرم ارسال اهنگ
router.post('/send',(req,res)=>{
   let name = req.body.name
   let family = req.body.family
   let email = req.body.email
   let file = req.files.music

   let fileName = file.name
   let type = file.mimetype
   if (name === "" || name === undefined || name === null || family === "" || family === undefined || family === null || email === "" || email === undefined || email === null  || file === "" || file === undefined || file === null) {
       mass = "لطفا اطلاعات را کامل پر کنید"
       res.redirect('/send')
   }else{
       if (type == 'audio/mpeg') {
      
        let sql_inser = `INSERT INTO send_music (name, family, email, src_music) VALUES ("${name}","${family}","${email}","${fileName}")`
        db.query(sql_inser,(err)=>{
            if (err) throw err;
            mass ="پیام با موفقیت ارسال شد"
            res.redirect('/send')
        })
        file.mv('./utils/upload/'+fileName)
       }else{
        mass ="فقط فایل هایی با پسوند MP3 ارسال شود"
        res.redirect('/send')
       }
   }
})

// مسیر فرم تماس با ما
router.get('/call',(req,res)=>{
    res.render('call',{
        title:'تماس با ما',
        cotgory:cotgory,
        singer:singer,
        popular:popular,
        madahe:madahe,
        dmo:dmo,
        waiting:waiting,
        mas : mas,
        advertising :advertising
    })
})
let mas
// مسیر پست فرم تماس با ما
router.post('/call',(req,res)=>{
    let name = req.body.name;
    let email = req.body.email
    let text = req.body.text

    const google = "6LcH-iMbAAAAABY-dNUs0_us6HngfMGR1xkRNVds";
    const verify =`https://google.com/recaptcha/api/siteverify?secret=${google}&response=${req.body["g-recaptcha-response"]} &remoteip=${req.connection.remoteAddress}`;

    if (name === "" || name === undefined || name === null || email === "" || email === undefined || email === null || text === "" || text === undefined || text === null || !req.body["g-recaptcha-response"] || req.body["g-recaptcha-response"]=== ""|| req.body["g-recaptcha-response"]=== null || req.body["g-recaptcha-response"] === undefined ) {
        mas = "لطفا اطلاعات را کامل پر کنید"
        res.redirect('/call')
    } else {
        let sql = `INSERT INTO contact(name,email,text) VALUES ("${name}","${email}","${text}")`
    db.query(sql,(err)=>{
        if (err) throw err;
        mas ="پیام با موفقیت ارسال شد"
        res.redirect('/call')
    })
    }

})
// مسیر ویدئو موزیک
router.get('/vido',(req,res)=>{
    res.render('vido',{
        title:'ویدئو موزیک',
        cotgory:cotgory,
        singer:singer,
        popular:popular,
        madahe:madahe,
        video:video,
        dmo:dmo,
        waiting:waiting,
        advertising :advertising
    })
})
// مسیر اطلاعیه کنسرت ها
router.get('/conserts',(req,res)=>{
    res.render('conserts',{
        title:'کنسرت ها',
        cotgory:cotgory,
        singer:singer,
        popular:popular,
        dmo:dmo,
        waiting:waiting,
        advertising :advertising
    })
})
// مسیر اهنگ های هنرمندان
router.get( `/singer:id`,(req,res)=>{
    let id = req.params.id
    let sql_singer_id = `SELECT m.id , m.img, s.name, m.history, m.title FROM music AS m INNER JOIN singer AS s ON m.id_singer = s.id  WHERE id_singer = ${id}`
    db.query(sql_singer_id,(err,result)=>{ 
    res.render('singer',{
        title:'هنرمندان',
        cotgory:cotgory,
        singer:singer,
        sin:result, // خواننده
        popular:popular,
        madahe:madahe,
        dmo:dmo,
        waiting:waiting,
        advertising :advertising
    })
})
})
// مسیر دسته بندی اهنگ ها
router.get('/catgory:id',(req,res)=>{
   
    let id = req.params.id
    let sql_catgory_id = `SELECT m.id , m.img, m.id_singer, c.name , m.history, title FROM music AS m INNER JOIN cotgory AS c ON m.id_catgory = c.id WHERE id_catgory = ${id}`
    db.query(sql_catgory_id,(err,result)=>{
    res.render('catgory',{
        title:'دسته بندی ',
        cats:result, // دسته بندی
        cotgory:cotgory,
        singer:singer,
        popular:popular,
        madahe:madahe,
        dmo:dmo,
        waiting:waiting,
        advertising :advertising
    })
})
})

// مسیر اطلاعات کامل اهنگ ها
let comment
router.get( `/:id`,(req,res)=>{
 let id = req.params.id 
   let sql1 = `SELECT name,text FROM comment WHERE id_music = ${id}`
    db.query(sql1,(err,result)=>{ comment =result  })
   let sql_music_id = `SELECT * FROM music WHERE id = ${id}`
    db.query(sql_music_id,(err,result)=>{  
    res.render('music',{
        title:'اهنگ |',
        music : result, // انتخاب اهنگ کامل
        cotgory:cotgory,
        comment : comment, //
        singer:singer,
        popular:popular,
        madahe:madahe,
        dmo:dmo,
        waiting:waiting,
        id : id,
        advertising :advertising
    })
    }) 
})

 //مسیر ارسال کامنت ها هر اهنگ
 router.post(`/ids`,(req,res)=>{
    let text =  req.body.text
    let name =req.body.name
    let email = req.body.email
    let id = req.body.id
      if (text === "" || text === undefined || text === null || name === "" || name === undefined || name === null || email === "" || email === undefined || email === null) {
         console.log(errr); 
      } else {
          let sql = `INSERT INTO comment (id, name, email, text, id_music) VALUES (NULL, '${name}', '${email}', '${text}', ${id});`
          db.query(sql,(err)=>{
              if (err) throw err;
              res.redirect(`/${id}`)
          
          })
      }
})
   


module.exports =router;




