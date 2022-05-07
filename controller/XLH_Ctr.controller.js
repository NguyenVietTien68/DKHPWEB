var database = require("../database");
//xem lịch học
module.exports.xemlichhoc = function (req, res) {
    const { cookies } = req;
    var mssv = cookies.mssv
    var hocky = req.query.hocky;
    var namhoc = req.query.namhoc;
    database.getAllNamHoc(function (listnamhoc) {
        database.getAllHocKy(function (listhocky) {
            database.getKhoaHocSV(mssv, function (khoa) {
                console.log(khoa[0].KhoaHoc);
                let tachkhoa = khoa[0].KhoaHoc.slice(0, 4);
                let viTri;
                console.log(tachkhoa);
                for (let i = 0; i < listnamhoc.length; i++) {
                    let tachchuoiNam = (listnamhoc[i].Nam).slice(0, 4);
                    if (tachchuoiNam == tachkhoa) {
                        viTri = i;
                    }
                }
                console.log(viTri);
                let listnamhoca = new Array();
                for (let a = viTri; a < viTri + 4; a++) {
                    if (listnamhoc[a] != undefined) {
                        listnamhoca.push(listnamhoc[a]);
                    }
                }
                database.laylichhocchosinhvien(hocky, namhoc, mssv, function (listLH) {
                    return res.render('./bodySinhVien/GD_SV_xemlichhoc1', { layout: './layouts/layoutSinhVien', title: 'Xem Lịch Học', namhoc, hocky, listLH, listnamhoc:listnamhoca, listhocky });
                });
            });
        })
    })

};