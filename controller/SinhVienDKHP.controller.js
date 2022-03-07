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

module.exports.dangkyhocphan = function (req, res){
    var hocky = req.query.hocky;
    var namhoc = req.query.namhoc;

    const { cookies } = req;
    var mssv = cookies.mssv
    console.log(mssv);

    var monhp = req.query.monhp;

    var chonhuylop =  req.query.lhpddk;
    var lophochuy;

    database.laydanhsachmonhocphanchosinhvien(mssv,hocky,namhoc, function (listmh){
        database.laydanhsachlophocphanchosinhvien(monhp, function (listlh){
            console.log(monhp);
            // console.log(listlh);
            // console.log(monhp);
            return res.render('./bodySinhVien/GD_SV_dkhp1',{
                layout: './layouts/layoutSinhVien', 
                title: 'Đăng Ký Học Phần',listmh, namhoc, hocky,listlh});
        });
        // return res.render('./bodySinhVien/GD_SV_dkhp1',{
        //     layout: './layouts/layoutSinhVien' , 
        //     title: 'Đăng Ký Học Phần', listmh, namhoc, hocky});
    });
    
}

module.exports.laydslophp = function (req, res){
    const monhp = req.params.monhp;
    database.laydanhsachlophocphanchosinhvien(monhp, function (listlh){
        // console.log(listlh);
        // console.log(monhp);
        return res.render('./bodySinhVien/GD_SV_DKLop',{
            layout: './layouts/layoutSinhVien', 
            title: 'Đăng Ký Học Phần', listlh});
    });
}

module.exports.laydsnhomdk = function (req, res){
    const malophoc = req.params.malophoc;
    database.laydanhsachlophocphanthuchanhchosinhvien(malophoc, function (listthuchanh){ 
        database.laydanhsachlophocphanlythuyetchosinhvien(malophoc, function (listlythuyet){
            console.log(listthuchanh);
            console.log(listlythuyet);
            console.log(malophoc);
            return res.render('./bodySinhVien/GD_SV_dkhplh',{
                layout: './layouts/layoutSinhVien', 
                title: 'Đăng Ký Học Phần', listthuchanh, listlythuyet});
        });

    });
}