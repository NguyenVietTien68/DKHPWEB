var database = require("../database");

module.exports.trangnhapdiem = function (req, res) {
    database.nvnhapdiemlaymalop(function (listma) {
        return res.render('./bodyNhanVien/GV_NV_Nhapdiem',{layout: './layouts/layoutNhanVien' , title: 'Giao Dien Nhập Điểm',listma:listma,dssv:0,trang:0,lhp:0});
    });
};


module.exports.locdssv = function (req, res) {
    var lhp = req.query.lhpsv;
    var page = parseInt(req.query.page) || 1;
    var perPage = 10;

    var start = (page - 1) * perPage;
    var end = page * perPage;
    database.nvnhapdiemlaymalop(function (listma) {
        database.nvnhapdiemlaydssv(lhp,function (dssv) {
            let sotrang = (dssv.length) / perPage;
            return res.render('./bodyNhanVien/GV_NV_Nhapdiem',{layout: './layouts/layoutNhanVien' , title: 'Giao Dien Nhập Điểm',listma:listma.slice(start,end),dssv:dssv, trang: sotrang+1,lhp:lhp});
        });
    });
    
};

module.exports.chuyendentrangsuadiem = function (req, res) {
    var massv = req.params.masv;
    var malop = req.params.malop;
    database.nvnhapdiemlaysv(massv,malop,function (sv) {
        return res.render('./bodyKhongMenu/GD_NV_From_NhapDiem', { layout: './layouts/layoutKhongMenu', title: 'Giao dien nhap diem',sv:sv[0]});
    });  
};

module.exports.luudiem = function (req, res) {
    var diemtk = req.body.diemtk;
    var diemgk = req.body.diemgk;
    var diemth = req.body.diemth;
    var diemck = req.body.diemck;
    var masv = req.body.masv;
    var malop = req.body.malop;
    database.nvnhapdiemcapnhatdiem(diemtk,diemgk,diemth,diemck,masv,malop,function (results) {
        res.redirect('/nhanvien/nhapdiem');
    });
};