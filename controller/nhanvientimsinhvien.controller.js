var database = require("../database");

module.exports.trangtimsv = function (req, res) {
    return res.render('./bodyNhanVien/TimKiemSV',{layout: './layouts/layoutNhanVien' , title:'Tìm Kiếm Sinh Viên',listsv:0,trang:0,tk:0});
};

module.exports.timsvlockq = function (req, res) {
    var query = req.query.tukhoa;
    var page = parseInt(req.query.page) || 1;
    var perPage = 10;

    var start = (page - 1) * perPage;
    var end = page * perPage;
    // console.log(query);
    database.timkiemsvtongthe(query,function (listsv) {
        let sotrang = (listsv.length) / perPage;
        return res.render('./bodyNhanVien/TimKiemSV',{layout: './layouts/layoutNhanVien' , title:'Tìm Kiếm Sinh Viên',listsv:listsv.slice(start,end),trang: sotrang+1,tk:query });
    });
};