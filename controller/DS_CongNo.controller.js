var database = require("../database");
const bcrypt = require('bcrypt');
const saltRounds = 10;
const readXlsxFile = require('read-excel-file/node');
var multer = require('multer');
// const { param } = require("../routes/sinhvien.route");
var storage = multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, './file');
    },
    filename: function (req, file, callback) {
        callback(null, file.originalname);
    }
});


const upload = multer();

var upload1 = multer({ storage: storage }).single('myfilesv');

//xem công nợ
module.exports.xemcongno = function(req, res){
    const { cookies } = req;
   // console.log(cookies.mssv);
    var mssv = cookies.mssv
    var list;
    var tong = 0;
    database.laycongnochosinhvien(mssv, function (resultQuery) {
        list = resultQuery;
        //console.log("list:"+ list);
        
        for(let i=0;i< list.length;i++){
            tong = tong +list[i].SoTinChi*790000 ;
        }
        console.log("tong:"+tong);
        return res.render('./bodySinhVien/GD_SV_xemcongno',{layout: './layouts/layoutSinhVien' , title: 'Xem Công Nợ', list:resultQuery, tong});

    });
   

};