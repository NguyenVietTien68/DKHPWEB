var database = require("../database");
var xlsx = require("xlsx");
var excel = require("exceljs");
const readXlsxFile = require('read-excel-file/node');

var multer = require('multer');
var storage = multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, './file');
    },
    filename: function (req, file, callback) {
        callback(null, file.originalname);
    }
});

var upload1 = multer({ storage: storage }).single('filediem');

module.exports.trangnhapdiem = function (req, res) {
    let MaLopHP = "hello";

    database.getAllNamHoc(function (listnamhoc) {
        database.getAllHocKy(function (listhocky) {
            // database.getAllLHP(function (listLop) {
            //     if (namhoc != "null" && hocky != "null") {
            //         database.nvnhapdiemthongtinlop(function (thongtin) {
            //             let listmamoi = new Array();
            //             let ma;
            //             let listma = new Array();
            //             for (let i = 0; i < thongtin.length; i++) {
            //                 // console.log(listma[i].Nam)
            //                 listma.push(thongtin[i].MaLopHP);
            //                 if (i > 0) {
            //                     ma = thongtin[i - 1].Nam;
            //                 }
            //                 if (ma != thongtin[i].Nam) {
            //                     listmamoi.push(thongtin[i]);
            //                 }
            //             }
            //             // console.log(listmamoi);
            //             console.log(listma);
            return res.render('./bodyNhanVien/GV_NV_Nhapdiem', { layout: './layouts/layoutNhanVien', title: 'Giao Dien Nhập Điểm', listma: 0, dssv: 0, trang: 0, lhp: 0, listnamhoc, listhocky });
            // });
            // }
            // });
        });
    });
};


module.exports.locdssv = function (req, res) {
    let namhoc = req.query.namhoc;
    let hocky = req.query.hocky;
    var page = parseInt(req.query.page) || 1;
    var lhp = req.query.lhpsv;
    var perPage = 6;
    var start = (page - 1) * perPage;
    var end = page * perPage;
    // database.nvnhapdiemthongtinlop(function (listma) {
    //     database.nvnhapdiemlaydssv(lhp, function (dssv) {
    //         // console.log(listma);
    //         // console.log(dssv);
    //         let sotrang = (dssv.length) / perPage;
    //         return res.render('./bodyNhanVien/GV_NV_Nhapdiem', { layout: './layouts/layoutNhanVien', title: 'Giao Dien Nhập Điểm', listma: listma.slice(start, end), dssv: dssv, trang: sotrang + 1, lhp: lhp, MaLopHP: lhp });
    //     });
    // });
    database.getAllNamHoc(function (listnamhoc) {
        database.getAllHocKy(function (listhocky) {
            if (namhoc == "null" && hocky == "null") {
                return res.render('./bodyNhanVien/GV_NV_Nhapdiem', { layout: './layouts/layoutNhanVien', title: 'Giao Dien Nhập Điểm', listma: 0, dssv: 0, trang: 0, lhp: 0, listnamhoc, listhocky });
            }
            if (namhoc != "null" && hocky == "null") {
                database.laydiemloptheonam(namhoc, function (listmalop) {
                    // console.log(listmalop);
                    console.log(lhp);
                    database.nvnhapdiemlaydssv(lhp, function (dssv) {
                        return res.render('./bodyNhanVien/GV_NV_Nhapdiem', { layout: './layouts/layoutNhanVien', title: 'Giao Dien Nhập Điểm', listma: listmalop, dssv, trang: 0, lhp: 0, listnamhoc, listhocky });
                    });
                });
            }
            if (namhoc == "null" && hocky != "null") {
                return res.render('./bodyNhanVien/GV_NV_Nhapdiem', { layout: './layouts/layoutNhanVien', title: 'Giao Dien Nhập Điểm', listma: 0, dssv: 0, trang: 0, lhp: 0, listnamhoc, listhocky });
            }
            if (namhoc != "null" && hocky != "null") {
                database.laydiemlop(namhoc, hocky, function (listma) {
                    database.nvnhapdiemlaydssv(lhp, function (dssv) {
                        return res.render('./bodyNhanVien/GV_NV_Nhapdiem', { layout: './layouts/layoutNhanVien', title: 'Giao Dien Nhập Điểm', listma, dssv: dssv, trang: 0, lhp: 0, listnamhoc, listhocky });
                    })
                })
            }
        })
    })
};

module.exports.chuyendentrangsuadiem = function (req, res) {
    var massv = req.params.masv;
    var malop = req.params.malop;
    database.nvnhapdiemlaysv(massv, malop, function (sv) {
        return res.render('./bodyKhongMenu/GD_NV_Form_NhapDiem', { layout: './layouts/layoutKhongMenu', title: 'Giao dien nhap diem', sv: sv[0] });
    });
};

module.exports.luudiem = function (req, res) {
    let diemtk = req.body.diemtk;
    let diemgk = req.body.diemgk;
    let diemth = req.body.diemth;
    let diemck = req.body.diemck;
    let masv = req.body.masv;
    let malop = req.body.malop;
    if (diemtk != "") {
        // database.nvnhapdiemtk(diemtk, masv, malop, function (result) {
        // });
        if (diemgk != "") {
            // database.nvnhapdiemgk(diemgk, masv, malop, function (result) {
            // });
            if (diemth != "") {
                // database.nvnhapdiemth(diemth, masv, malop, function (result) {
                // });
                if (diemck != "") {
                    // database.nvnhapdiemck(diemck, masv, malop, function (results) {
                    //     res.redirect('/nhanvien/nhapdiem');
                    // });
                } else {
                    diemck = null;
                    database.nvnhapdiemcapnhatdiem(diemtk, diemgk, diemth, diemck, masv, malop, function (results) {
                        res.redirect('/nhanvien/nhapdiem');
                    });
                }
            } else {
                diemth = null;
                diemck = null;
                database.nvnhapdiemcapnhatdiem(diemtk, diemgk, diemth, diemck, masv, malop, function (results) {
                    res.redirect('/nhanvien/nhapdiem');
                });
            }
        } else {
            diemgk = null;
            diemth = null;
            diemck = null;
            database.nvnhapdiemcapnhatdiem(diemtk, diemgk, diemth, diemck, masv, malop, function (results) {
                res.redirect('/nhanvien/nhapdiem');
            });
        }
    } else {
        diemtk = null;
        diemgk = null;
        diemth = null;
        diemck = null;
        database.nvnhapdiemcapnhatdiem(diemtk, diemgk, diemth, diemck, masv, malop, function (results) {
            res.redirect('/nhanvien/nhapdiem');
        });
    }

};

module.exports.exports = function (req, res) {
    let malop = req.params.malop;
    // console.log(malop);
    database.nvnhapdiemlaydssv(malop, function (dssv) {
        // var newWB = xlsx.utils.book_new();
        // var wb = xlsx.utils.json_to_sheet(dssv);
        // xlsx.utils.book_append_sheet(newWB, wb, "Lop"+malop);

        // xlsx.writeFile(newWB, "NewFileData_"+malop+".xlsx");
        const jsonDiem = JSON.parse(JSON.stringify(dssv));
        // console.log(jsonDiem);
        let workbook = new excel.Workbook();
        let worksheet = workbook.addWorksheet(malop);

        worksheet.columns = [
            { header: 'Mã Lớp', key: 'MaLopHP', width: 10 },
            { header: 'MSSV', key: 'MSSV', width: 10 },
            { header: 'Họ và Tên', key: 'HoTen', width: 30 },
            { header: 'Thường Kỳ', key: 'DiemTK', width: 10 },
            { header: 'Giữa Kỳ', key: 'DiemGK', width: 10 },
            { header: 'Thực Hành', key: 'DiemTH', width: 10 },
            { header: 'Cuối Kỳ', key: 'DiemCK', width: 10 },
        ];
        worksheet.addRows(jsonDiem);
        res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
        res.setHeader('Content-Disposition', 'attachment; filename=' + 'filediem.xlsx');
        return workbook.xlsx.write(res)
            .then(function () {
                res.status(200).end();
            });
    });
}

module.exports.uploadfileDiem = function (req, res) {
    upload1(req, res, function (err) {
        if (err) {
            return res.end('Error uploading file');
        }
        res.end('File is uploaded successfully');
    });
};

module.exports.savedataDiem = function (req, res) {
    const schema = {
        'Mã Lớp': {
            prop: 'MaLopHP',
            type: String
        },
        'MSSV': {
            prop: 'MSSV',
            type: String
        },
        'Họ và Tên': {
            prop: 'HoTen',
            type: String
        },
        'Thường Kỳ': {
            prop: 'DiemTK',
            type: String
        },
        'Giữa Kỳ': {
            prop: 'DiemGK',
            type: String
        },
        'Thực Hành': {
            prop: 'DiemTH',
            type: String
        },
        'Cuối Kỳ': {
            prop: 'DiemCK',
            type: String
        },
    };
    var arr = new Array();
    readXlsxFile('./file/filediem.xlsx', { schema }).then(({ rows, errors }) => {
        errors.length === 0;
        for (let i = 0; i < rows.length; i++) {
            let mssv = rows[i].MSSV;
            arr.push(mssv);
        };
        database.kiemtradulieudiem(arr, function (result) {
            if (result.length < 0) {
                res.send({ message: 'Sinh viên mã số' + '\t' + result[0].MSSV + '\t' + 'không tồn tại' });
            } else {
                for (let a = 0; a < rows.length; a++) {
                    // if(rows[a].DiemTK == undefined){
                    //     rows[a].DiemTK = null;
                    //     if(rows[a].DiemGK == undefined){
                    //         rows[a].DiemGK = null;
                    //         if(rows[a].DiemCK == undefined){
                    //             rows[a].DiemCK = null;
                    //         }
                    //     }
                    // }
                    if (rows[a].DiemTK != undefined) {
                        database.nvnhapdiemtk(rows[a].DiemTK, rows[a].MSSV, rows[a].MaLopHP, function (result) {
                        });
                        if (rows[a].DiemGK != undefined) {
                            database.nvnhapdiemgk(rows[a].DiemGK, rows[a].MSSV, rows[a].MaLopHP, function (result) {
                            });
                            if (rows[a].DiemTH != undefined) {
                                database.nvnhapdiemth(rows[a].DiemTH, rows[a].MSSV, rows[a].MaLopHP, function (result) {
                                }); if (rows[a].DiemCK != undefined) {
                                    database.nvnhapdiemck(rows[a].DiemCK, rows[a].MSSV, rows[a].MaLopHP, function (results) {
                                        res.send({ message: 'thành công' });
                                    });
                                } else {
                                    rows[a].DiemCK = null;
                                    database.nvnhapdiemcapnhatdiem(rows[a].DiemTK, rows[a].DiemGK, rows[a].DiemTH, rows[a].DiemCK, rows[a].MSSV, rows[a].MaLopHP, function (results) {
                                        res.send({ message: 'thành công' });
                                    });
                                }
                            } else {
                                rows[a].DiemTH = null;
                                rows[a].DiemCK = null;
                                database.nvnhapdiemcapnhatdiem(rows[a].DiemTK, rows[a].DiemGK, rows[a].DiemTH, rows[a].DiemCK, rows[a].MSSV, rows[a].MaLopHP, function (results) {
                                    res.send({ message: 'thành công' });
                                });
                            }
                        } else {
                            rows[a].DiemGK = null;
                            rows[a].DiemTH = null;
                            rows[a].DiemCK = null;
                            database.nvnhapdiemcapnhatdiem(rows[a].DiemTK, rows[a].DiemGK, rows[a].DiemTH, rows[a].DiemCK, rows[a].MSSV, rows[a].MaLopHP, function (results) {
                                res.send({ message: 'thành công' });
                            });
                        }
                    } else {
                        rows[a].DiemTK = null;
                        rows[a].DiemGK = null;
                        rows[a].DiemTH = null;
                        rows[a].DiemCK = null;
                        database.nvnhapdiemcapnhatdiem(rows[a].DiemTK, rows[a].DiemGK, rows[a].DiemTH, rows[a].DiemCK, rows[a].MSSV, rows[a].MaLopHP, function (results) {
                            res.send({ message: 'thành công' });
                        });
                    }
                    // let data = {
                    //     MaKhoa: rows[a].MaKhoa, TenKhoa: rows[a].TenKhoa
                    // };
                    // row[a].
                    // database.themKhoa(data, function (results) {

                    // });

                };
            }
        });
    });



};
// module.exports.NhapDiem;