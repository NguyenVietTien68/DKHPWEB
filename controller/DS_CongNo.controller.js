var database = require("../database");
// const bcrypt = require('bcrypt');
// const saltRounds = 10;
// const readXlsxFile = require('read-excel-file/node');
// var multer = require('multer');
// const { param } = require("../routes/sinhvien.route");

function format1(n, currency) {
    return n.toFixed(0).replace(/./g, function (c, i, a) {
        return i > 0 && c !== "." && (a.length - i) % 3 === 0 ? "," + c : c;
    }) + currency;
}

module.exports.trangxemcongno = function (req, res) {
    var hocky = req.query.hocky;
    var namhoc = req.query.namhoc;
    const { cookies } = req;
    var mssv = cookies.mssv
    database.getAllNamHoc(function (listnamhoc) {
        database.getAllHocKy(function (listhocky) {
            database.getKhoaHocSV(mssv, function (khoa) {
                let tachkhoa = khoa[0].KhoaHoc.slice(0, 4);
                let viTri;
                for (let i = 0; i < listnamhoc.length; i++) {
                    let tachchuoiNam = (listnamhoc[i].Nam).slice(0, 4);
                    if (tachchuoiNam == tachkhoa) {
                        viTri = i;
                    }
                }
                let listnamhoca = new Array();
                for (let a = viTri; a < viTri + 4; a++) {
                    if (listnamhoc[a] != undefined) {
                        listnamhoca.push(listnamhoc[a]);
                    }
                }
                return res.render('./bodySinhVien/GD_SV_xemcongno', { layout: './layouts/layoutSinhVien', title: 'Xem Công Nợ', list: 0, tong: 0, listTien: 0, namhoc, hocky, listnamhoc: listnamhoca, listhocky });
            });
        });
    });
}

//xem công nợ
module.exports.xemcongno = function (req, res) {
    const { cookies } = req;
    // console.log(cookies.mssv);
    var mssv = cookies.mssv
    var tong = 0;
    var hocky = req.query.hocky;
    var namhoc = req.query.namhoc;
    database.laycongnochosinhvien(mssv,namhoc, hocky, function (resultQuery) {
        let list = new Array();
        for (let i = 0; i < resultQuery.length; i++) {
            if (resultQuery[i].nhom == "LT")
                list.push(resultQuery[i]);
            tong = tong + resultQuery[i].SoTinChi * 790000;
        }
        // console.log(tong);
        let tongcongno = format1(tong, 'VND');
        // console.log("tong:"+tongcongno);
        let listTien = new Array();
        for (let a = 0; a < resultQuery.length; a++) {
            if (resultQuery[a].nhom == "LT")
                listTien.push(format1(resultQuery[a].SoTinChi * 790000, " VND"));
        }
        // console.log(listTien);
        // console.log(resultQuery)
        database.getAllNamHoc(function (listnamhoc) {
            database.getAllHocKy(function (listhocky) {
                database.getKhoaHocSV(mssv, function (khoa) {
                    let tachkhoa = khoa[0].KhoaHoc.slice(0, 4);
                    let viTri;
                    for (let i = 0; i < listnamhoc.length; i++) {
                        let tachchuoiNam = (listnamhoc[i].Nam).slice(0, 4);
                        if (tachchuoiNam == tachkhoa) {
                            viTri = i;
                        }
                    }
                    let listnamhoca = new Array();
                    for (let a = viTri; a < viTri + 4; a++) {
                        if (listnamhoc[a] != undefined) {
                            listnamhoca.push(listnamhoc[a]);
                        }
                    }
                    // console.log(tongcongno)
                    return res.render('./bodySinhVien/GD_SV_xemcongno', { layout: './layouts/layoutSinhVien', title: 'Xem Công Nợ', list, tong: tongcongno, listTien, namhoc, hocky, listnamhoc: listnamhoca, listhocky  });
                })
                // }
            });
        });
    });
};