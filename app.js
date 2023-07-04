const express = require('express')
const app = express()
const path=require('path')

const user = require('./router/user')
const admin = require('./router/admin');


app.use(express.static(path.join(__dirname,'public')))
app.use(express.static(path.join(__dirname,'utils')))

app.use(express.urlencoded({ extended: false }))
app.use(express.json())

app.set('view engine','ejs')
app.set('views')

app.use(user)
app.use('/admin',admin)



app.listen(10000, () => console.log(`Music`))