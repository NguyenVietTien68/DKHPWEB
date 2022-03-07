var database = require("../database");
// const bcrypt = require('bcrypt');
// const saltRounds = 10;
// const readXlsxFile = require('read-excel-file/node');
// var multer = require('multer');
// var storage = multer.diskStorage({
//     destination: function (req, file, callback) {
//         callback(null, './file');
//     },
//     filename: function (req, file, callback) {
//         callback(null, file.originalname);
//     }
// });

module.exports.trangcapnhatPhongHoc = function (req, res) {
    var page = parseInt(req.query.page) || 1;
    var perPage = 10;

    var start = (page - 1) * perPage;
    var end = page * perPage;

    database.getAllPhongHoc(function (result) {
        let sotrang = (result.length) / perPage;
        res.render('./bodyNhanVien/CNPhongHoc', { layout: './layouts/layoutNhanVien', title: 'Cập Nhật Phòng Học', listphong : result.slice(start,end),sotrang:sotrang+1});
    })
};

module.exports.chuyennhapPhongHoc = function (req, res) {
    return res.render('./bodyKhongMenu/GD_NV_Form_Add_PhongHoc', { layout: './layouts/layoutKhongMenu', title: 'Thêm Phòng Học' });
};

module.exports.luuPhongHoc = function(req,res){
    console.log(req.body);

    const ph = req.body.phonghoc;
    database.kiemtraphonghoctrung(ph,function(result){
        if(result.length>0){
            res.send({ message: 'Phòng học'+" "+ result[0].PhongHoc+" "+ 'đã tồn tại' });
        }else{
            let data = {
                PhongHoc: req.body.phonghoc
            };
            database.themPhongHoc(data, function(results){
                res.redirect('/nhanvien/cnphonghoc');
            });
        } 
    })

       
};

module.exports.xoaPhongHoc = function (req, res) {
    const phonghoc = req.params.phonghoc;
        database.xoaPhongHoc(phonghoc, function(results){
            res.redirect('/nhanvien/cnphonghoc');
        });
};

module.exports.timkiemPhongHoc = function (req, res) {
    var query = req.query.tukhoaphonghoc;
    console.log(query);
    database.timkiemPhongHoc(query, function (results) {
        if (results.length > 0) {
            res.render('./bodyNhanVien/CNPhongHoc', { layout: './layouts/layoutNhanVien', title: 'Cập Nhật Phòng Học', listphong: results,sotrang:0 });
        } else {
            database.getAllPhongHoc(function (result) {
                res.render('./bodyNhanVien/CNPhongHoc', { layout: './layouts/layoutNhanVien', title: 'Cập Nhật Phòng Học', listphong: result,sotrang:0 });
            });
        }

    });
};