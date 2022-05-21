var database = require("../database");
//xem kết quả học tập
module.exports.xemketquahoctap = function (req, res) {
    const { cookies } = req;
    // console.log(cookies.mssv);
    var mssv = cookies.mssv;
    var listth = new Array();
    database.layketquahoctapchosinhvien(mssv, function (listkq) {
        database.layketquahoctapchosinhvien(mssv, function (listtimth) {
        for(let i = 0; i < listkq.length; i++) {
            if(listkq[i].MaLopHP = listtimth[i].MaLopHP) {
                listth.push(listkq[i]);
            }
        }
        return res.render('./bodySinhVien/GD_SV_xemkqht',
            {
                layout: './layouts/layoutSinhVien',
                title: 'Xem kết quả học tập', list: listkq, listth
            });
    });
    });
};