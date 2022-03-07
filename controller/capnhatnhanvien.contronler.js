var database = require("../database");
const bcrypt = require('bcrypt');
const saltRounds = 10;


module.exports.trangcapnhapnv = function (req, res) {
    database.cnnvlayds(function (results) {
        return res.render('./bodyNhanVien/CNNhanvien',{layout: './layouts/layoutNhanVien' , title: 'Cập Nhật Nhân viên',listnv:results});
    });
};

module.exports.chuyentrangnhap = function (req, res) {
    var matudong;
    database.nvlaymatudong(function (result) {
        database.getAllKhoa(function (results) {
            matudong = parseInt(result[0].MaNV);
            matudong = matudong +1;
            matudong = "0" + matudong;
            return res.render('./bodyKhongMenu/GD_NV_From_Add_NV', { layout: './layouts/layoutKhongMenu', title: 'Thêm Nhân Viên',listkhoa:results,matd:matudong });
        }); 
    });
        
};

module.exports.chuyentrangcapnhat = function (req, res) {
    const nvid = req.params.nvid;
    database.nvchuyendentrangcapnhat(nvid,function (results) {
        return res.render('./bodyKhongMenu/GD_NV_Form_Update_NV', { layout: './layouts/layoutKhongMenu', title: 'Cập nhật nhân viên', nv: results[0] });
    });
};

module.exports.luunhanvien = function (req, res) {
    const passdefaut = "123456789";
    bcrypt.hash(passdefaut, saltRounds, function (err, hash) {
        let data = {
            MaNV: req.body.manv, HoTen: req.body.hotennv, DiaChi: req.body.diachinv,
            SoDT: req.body.sodtnv, NgaySinh: req.body.ngaysinhnv, GioiTinh: req.body.gioitinhnv, MaKhoa: req.body.makhoa
        };
        let tk = { MaTaiKhoan: req.body.manv, Pass: hash };
        database.themnhanvien(data, function (results) {
            database.themtaikhoannv(tk, function (resultss) {
                res.redirect('/nhanvien/cnnhanvien');
            })
        });
    });
};

module.exports.capnhatnhanvien = function (req, res) {
    const manv = req.body.manv;
    const hoten = req.body.hoten;
    const diachi = req.body.diachi;
    const gioitinh = req.body.gioitinh;
    const ngaysinh = req.body.ngaysinh;
    const sodt = req.body.sodt;
    const makhoa = req.body.makhoa;
    database.capnhatnhanvien(manv,hoten,diachi,sodt,ngaysinh,gioitinh,makhoa,function (result) {
        res.redirect('/nhanvien/cnnhanvien');
    });
    
};

module.exports.xoanhanvien = function (req, res) {
    const nvid = req.params.nvid;
    if(nvid == '01'){
        res.send('Không được phép xóa');
    }else{
        database.xoataikhoanhanvien(nvid, function (resultss) {
            database.xoanhanvien(nvid, function (results) {
                res.redirect('/nhanvien/cnnhanvien');
            });
        });
    }
    
};

module.exports.datlaimatkhaunv = function (req, res) {
    var nvid = req.params.nvid;
    var passdefaut = "123456789";
    bcrypt.hash(passdefaut, saltRounds, function (err, hash) {
        database.nvdatlaimatkhau(hash,nvid,function (results) {
            res.send('Thành công');
        });
    }); 
};

