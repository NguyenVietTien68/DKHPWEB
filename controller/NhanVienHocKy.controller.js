var database = require("../database");
const bcrypt = require('bcrypt');
const saltRounds = 10;
const readXlsxFile = require('read-excel-file/node');
var multer = require('multer');
var storage = multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, './file');
    },
    filename: function (req, file, callback) {
        callback(null, file.originalname);
    }
});

module.exports.trangcapnhatHocKy = function (req, res) {
    var page = parseInt(req.query.page) || 1;
    var perPage = 10;

    var start = (page - 1) * perPage;
    var end = page * perPage;

    database.getAllHocKy(function (result) {
        let sotrang = (result.length) / perPage;
        res.render('./bodyNhanVien/CNHocKi', { layout: './layouts/layoutNhanVien', title: 'Cập Nhật Học Kỳ', listhocky : result.slice(start,end),sotrang:sotrang+1});
    })
};

module.exports.chuyennhapHocKy = function (req, res) {
    var matudong;
    database.layhktudong(function(result){
        matudong = parseInt(result[0].HocKy);
        matudong = matudong +1;
        return res.render('./bodyKhongMenu/GD_NV_Form_Add_HocKy', { layout: './layouts/layoutKhongMenu', title: 'Thêm Học Kỳ', matdhk: matudong });
    })
    
};

module.exports.luuHocKy = function(req,res){
    console.log(req.body);
    const hocky = req.body.hocky;
    database.kiemtrahockytrung(hocky,function(result){
        if(result.length>0){
            res.send({ message: 'Học kỳ'+" "+ result[0].HocKy+" "+ 'đã tồn tại' });
        }else{
            let data = {
                HocKy: req.body.hocky
            };
            database.themHocKy(data, function(results){
                res.redirect('/nhanvien/cnhocky');
            });
        } 
    })
        // let data = {
        //     HocKy: req.body.hocky
        // };
        // database.themHocKy(data, function(results){
        //     res.redirect('/nhanvien/cnhocky');
        // });
};

module.exports.xoaHocKy = function (req, res) {
    const hocky = req.params.hocky;
        database.xoaHocKy(hocky, function(results){
            res.redirect('/nhanvien/cnhocky');
        });
};
