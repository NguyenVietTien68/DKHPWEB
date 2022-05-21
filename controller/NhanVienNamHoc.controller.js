var database = require("../database");

module.exports.trangcapnhatNamHoc = function (req, res) {
    var page = parseInt(req.query.page) || 1;
    var perPage = 6;

    var start = (page - 1) * perPage;
    var end = page * perPage;
    let query = "";
    database.getAllNamHoc(function (result) {
        let sotrang = (result.length) / perPage;
        res.render('./bodyNhanVien/CNNamHoc', { layout: './layouts/layoutNhanVien', title: 'Cập Nhật Năm Học',query, listnamhoc : result.slice(start,end),sotrang:sotrang+1});
    })
};

module.exports.chuyennhapNamHoc = function (req, res) {
    let mess="";
    return res.render('./bodyKhongMenu/GD_NV_Form_Add_NamHoc', { layout: './layouts/layoutKhongMenu', title: 'Thêm Năm Học' ,mess});
};

module.exports.luuNamHoc = function(req,res){
    const nam = req.body.nam;
    let mess="";
    database.kiemtranamtrung(nam,function(result){
        if(result.length>0){
            mess= 'Năm học'+" "+ result[0].Nam+" "+ 'đã tồn tại' ;
            return res.render('./bodyKhongMenu/GD_NV_Form_Add_NamHoc', { layout: './layouts/layoutKhongMenu', title: 'Thêm Năm Học' ,mess});
        }else{
            let data = {
                Nam: req.body.nam
            };
            database.themNamHoc(data, function(results){
                res.redirect('/nhanvien/cnnamhoc');
            });
        } 
    })      
};

module.exports.xoaNamHoc = function (req, res) {
    const nam = req.params.nam;
        database.xoaNamHoc(nam, function(results){
            res.redirect('/nhanvien/cnnamhoc');
        });
};

module.exports.timkiemNamHoc = function (req, res) {
    var query = req.query.tukhoanamhoc;
    console.log(query);
    database.timkiemNamHoc(query, function (results) {
        if (results.length > 0) {
            res.render('./bodyNhanVien/CNNamHoc', { layout: './layouts/layoutNhanVien', title: 'Cập Nhật Năm Học', query, listnamhoc: results,sotrang:0 });
        } else {
            // database.getAllNamHoc(function (result) {
            //     res.render('./bodyNhanVien/CNNamHoc', { layout: './layouts/layoutNhanVien', title: 'Cập Nhật Năm Học', query, listnamhoc: result,sotrang:0 });
            // });
            res.redirect('nhanvien/cnnamhoc')
        }

    });
};