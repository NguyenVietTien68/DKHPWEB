var database = require("../database");

//xem chương trình khung ntnt
module.exports.xemchuongtrinhkhung = function (req, res) {
    const { cookies } = req;
    // console.log(cookies.mssv);
    var mssv = cookies.mssv
    database.xemchuongtrinhkhung(mssv, function (resultQuery) {
        let mess = "Bạn chưa được chia chuyên ngành";
        // console.log("list:"+ list[0]);
        return res.render('./bodySinhVien/GD_SV_xemctkhung', { layout: './layouts/layoutSinhVien', title: 'Xem Chương Trình Khung', list: resultQuery, mess });
        // return res.render('./bodySinhVien/GD_SV_xemctkhung', { layout: './layouts/layoutSinhVien', title: 'Xem Chương Trình Khung', list: 0, mess });
    });
};