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
//xem kết quả học tập
module.exports.xemketquahoctap = function(req, res){
    const { cookies } = req;
   // console.log(cookies.mssv);
    var mssv = cookies.mssv;
    var list;
    database.layketquahoctapchosinhvien(mssv, function (listkq) {
        list =listkq;
        return res.render('./bodySinhVien/GD_SV_xemkqht',
                            {layout: './layouts/layoutSinhVien' , 
                            title: 'Xem kết quả học tập',  list:listkq});
    });
   
   
   
};