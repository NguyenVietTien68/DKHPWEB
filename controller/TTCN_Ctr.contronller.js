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

//xem thông tin cá nhân
module.exports.xemthongtincanhan = function(req, res){
    const { cookies } = req;
   // console.log(cookies.mssv);
    var mssv = cookies.mssv
    database.getTTCNSV(mssv, function (resultQuery) {
        // console.log("msss:"+ resultQuery[0].MSSV);
        // console.log("địa chỉ:"+ resultQuery[0].DiaChi);
        // console.log("giới tính:"+ resultQuery[0].GioiTinh);
        // console.log("Họ tên:"+ resultQuery[0].HoTen);
        // console.log("ngày sinh:"+ resultQuery[0].NgaySinh);
        // console.log("Số ĐT:"+ resultQuery[0].SoDT);
        // console.log("Khóa Học:"+ resultQuery[0].KhoaHoc);
        var diachi =resultQuery[0].DiaChi;
        var gioitinh =resultQuery[0].GioiTinh;
        var hoten =resultQuery[0].HoTen;
        var ngaysinh  =resultQuery[0].NgaySinh;
        var sodt =resultQuery[0].SoDT;
        var khoahoc =resultQuery[0].KhoaHoc;
        
        console.log("resultQuery[0]"+resultQuery[0]);
        return res.render('./bodySinhVien/GD_SV_xemttcn',{layout: './layouts/layoutSinhVien' , title: 'Xem Thông Tin Cá Nhân', diachi, gioitinh,ngaysinh,sodt,khoahoc,mssv,hoten});
    });
    //return res.render('./bodySinhVien/GD_SV_xemttcn',{layout: './layouts/layoutSinhVien' , title: 'Xem Thông Tin Cá Nhân', });
};