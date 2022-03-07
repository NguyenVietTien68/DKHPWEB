const { Connect } = require('aws-sdk');
const express = require('express');
const app = express();
const multer = require('multer');
const upload = multer();

const cookieParser = require('cookie-parser');
//mã hóa
const bcrypt = require('bcrypt');
const saltRounds = 10;
//layouts
const expressLayouts = require('express-ejs-layouts');
//database NTNT
var database = require("./database");

var nhanvienRoute = require('./routes/nhanvien.rounte');
var sinhvienRoute = require('./routes/sinhvien.route');
 
var authmiddlenv = require('./middlewares/auth.middlewarenv');
var authmiddlesv = require('./middlewares/auth.middlewaresv');

const controllerDN = require('./controller/DN_Ctr.controller');

app.use(express.json({ extended: false }));
app.use(express.static('./views'));
app.use(cookieParser());


app.use(expressLayouts);
//app.set('layout', './layouts/layoutChung');
app.set('view engine', 'ejs');
//app.set('views', './views');

//Chung
app.get('/', (req, res) => {
    return res.render('./bodyChung/TrangChu',{layout: './layouts/layoutChung' , title: 'Trang Chủ'}, mess='');
});

//Nhân Viên router ntnt
app.use('/nhanvien',authmiddlenv.requireAuth ,nhanvienRoute);

//Sinh Viên router ntnt
app.use('/sinhvien',authmiddlesv.requireAuth, sinhvienRoute);


// không menu
// đăng nhập post ntnt
app.post('/dangnhaptong', upload.fields([]), controllerDN.dangnhap);



const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log('Server is running on port 3000!');
});