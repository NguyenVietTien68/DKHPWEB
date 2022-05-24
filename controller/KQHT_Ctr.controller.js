var database = require("../database");
//xem kết quả học tập
module.exports.xemketquahoctap = function (req, res) {
    const { cookies } = req;
    // console.log(cookies.mssv);
    var mssv = cookies.mssv;
    var listdiem = new Array();
    database.layketquahoctapchosinhvien(mssv, function (listkq) {
        for (let i = 0; i < listkq.length; i++) {
            let diemTongKet;
            // listdiem.push(listkq[i]);
            if (listkq[i].DiemCK == null) {
                diemTongKet = null;
            }else {
                if(listkq[i].DiemTH != null) {
                    diemTongKet = ((((listkq[i].DiemTK * 0.2) + (listkq[i].DiemGK * 0.3) + (listkq[i].DiemCK * 0.5)) * (listkq[i].SoTinChi - 1)) + listkq[i].DiemTH) / (listkq[i].SoTinChi);
                    diemTongKet = diemTongKet.toFixed(2);
                }else{
                    diemTongKet =  ((listkq[i].DiemTK * 0.2) + (listkq[i].DiemGK * 0.3) + (listkq[i].DiemCK * 0.5))
                    diemTongKet = diemTongKet.toFixed(2)
                }
            }
            // console.log(diemTongKet)
            listdiem.push(diemTongKet)
            // console.log(listdiem)
        }
        return res.render('./bodySinhVien/GD_SV_xemkqht',
            {
                layout: './layouts/layoutSinhVien',
                title: 'Xem kết quả học tập', list: listkq, listdiem
            });
    });
};