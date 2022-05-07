var database = require("../database");
const bcrypt = require('bcrypt');
const saltRounds = 10;
const readXlsxFile = require('read-excel-file/node');
var multer = require('multer');
// const { param } = require("../routes/sinhvien.route");

function format1(n, currency) {
    return n.toFixed(0).replace(/./g, function (c, i, a) {
        return i > 0 && c !== "." && (a.length - i) % 3 === 0 ? "," + c : c;
    }) + currency;
}

//xem công nợ
module.exports.xemcongno = function (req, res) {
    const { cookies } = req;
    // console.log(cookies.mssv);
    var mssv = cookies.mssv
    var tong = 0;
    database.laycongnochosinhvien(mssv, function (resultQuery) {
        // for (let c = 0; c < resultQuery.length -1; c++) {
            // if (resultQuery[c].nhom === "TH1" || resultQuery[c].nhom === "TH2") {
            //     resultQuery.slice(c, 1);
            //     // console.log(resultQuery)
            //     console.log(resultQuery)
            // }
            let list = new Array();
            for (let i = 0; i < resultQuery.length; i++) {
                if (resultQuery[i].nhom == "LT")
                    list.push(resultQuery[i]);
                    tong = tong + resultQuery[i].SoTinChi * 790000;
            }
            let tongcongno = format1(tong, 'VND');
            // console.log("tong:"+tongcongno);
            let listTien = new Array();
            for (let a = 0; a < resultQuery.length; a++) {
                if (resultQuery[a].nhom == "LT")
                    listTien.push(format1(resultQuery[a].SoTinChi * 790000, " VND"));
            }
            // console.log(listTien);
            console.log(resultQuery)
            return res.render('./bodySinhVien/GD_SV_xemcongno', { layout: './layouts/layoutSinhVien', title: 'Xem Công Nợ', list, tong: tongcongno, listTien });
        // }
    });
};