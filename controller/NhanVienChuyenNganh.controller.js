var database = require("../database");
const bcrypt = require('bcrypt');
const saltRounds = 10;
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

var upload1 = multer({ storage: storage }).single('myfilechuyennganh');


module.exports.trangcapnhatchuyennganh = function (req, res) {
    let makhoa;
    let query;
    let mess = "";
    // console.log(query)
    database.getAllKhoa(function (dsmak) {
        res.render('./bodyNhanVien/CNChuyenNganh', { layout: './layouts/layoutNhanVien', title: 'Cập Nhật Chuyên Ngành', mess, query, makhoa, dsmakhoa: dsmak, listchuyennganh: 0, sotrang: 0 });
    })
};

module.exports.lockhoa = function (req, res) {

    var page = parseInt(req.query.page) || 1;
    var perPage = 6;

    var start = (page - 1) * perPage;
    var end = page * perPage;

    let query = "";
    let mess = "";
    var makhoa = req.query.makhoa;
    database.getAllKhoa(function (dsmak) {
        database.layCNtheoKhoa(makhoa, function (listchuyennganh) {
            let sotrang = (listchuyennganh.length) / perPage;
            return res.render('./bodyNhanVien/CNChuyenNganh', { layout: './layouts/layoutNhanVien', title: 'Cập Nhật Chuyên Ngành', mess, query, makhoa, dsmakhoa: dsmak, listchuyennganh: listchuyennganh.slice(start, end), sotrang: sotrang + 1, mk: makhoa });
        });
    });
};

module.exports.chuyenaddchuyennganh = function (req, res) {
    let mess = "";
    database.getAllKhoa(function (dsmak) {
        return res.render('./bodyKhongMenu/GD_NV_Form_Add_ChuyenNganh', { layout: './layouts/layoutKhongMenu', title: 'Thêm chuyên ngành', mess, dsmakhoa: dsmak });
    })
}

module.exports.luuchuyennganh = function (req, res) {
    let mess = "";
    let query = "";
    let makhoa;
    const machuyennganh = req.body.machuyennganh;
    database.getAllKhoa(function (dsmak) {
        database.kiemtracntrung(machuyennganh, function (result) {
            if (result.length > 0) {
                mess = 'Chuyên ngành mã số ' + result[0].MaChuyenNganh + ' đã tồn tại';
                return res.render('./bodyKhongMenu/GD_NV_Form_Add_ChuyenNganh', { layout: './layouts/layoutKhongMenu', title: 'Thêm chuyên ngành', mess, dsmakhoa: dsmak });
            } else {
                let data = {
                    MaChuyenNganh: req.body.machuyennganh, MaKhoa: req.body.makhoa, TenChuyenNganh: req.body.tenchuyennganh
                };
                database.themChuyenNganh(data, function (results) {
                    database.getAllKhoa(function (dsmak) {
                        mess = 'Thêm thành công chuyên ngành '+ machuyennganh;
                        res.render('./bodyNhanVien/CNChuyenNganh', { layout: './layouts/layoutNhanVien', title: 'Cập Nhật Chuyên Ngành', mess, query, makhoa, dsmakhoa: dsmak, listchuyennganh: 0, sotrang: 0 });
                    })
                });
            }
        })
    })
};

module.exports.xoachuyennganh = function (req, res) {
    const chuyennganhid = req.params.chuyennganhid;
    let mess = "";
    let query = "";
    let makhoa;
    database.xoaChuyenNganh(chuyennganhid, function (results) {
        database.getAllKhoa(function (dsmak) {
            mess = 'Xoá thành công chuyên ngành '+ chuyennganhid;
            res.render('./bodyNhanVien/CNChuyenNganh', { layout: './layouts/layoutNhanVien', title: 'Cập Nhật Chuyên Ngành', mess, query, makhoa, dsmakhoa: dsmak, listchuyennganh: 0, sotrang: 0 });
        })
    });
};

module.exports.chuyeneditchuyennganh = function (req, res) {
    const chuyennganhid = req.params.chuyennganhid;
    database.chuyenDenUpdateChuyenNganh(chuyennganhid, function (results) {
        // console.log(results[0]);
        // res.render('GD_NV_Form_Update_Khoa', { sv: results[0] });
        return res.render('./bodyKhongMenu/GD_NV_Form_Update_ChuyenNganh', { layout: './layouts/layoutKhongMenu', title: 'Cập nhật chuyên ngành', chuyennganh: results[0] });
    });
};

module.exports.capnhatchuyennganh = function (req, res) {
    const machuyennganh = req.body.machuyennganh;
    const makhoa = req.body.makhoa;
    const tenchuyennganh = req.body.tenchuyennganh;

    database.updateChuyenNganh(tenchuyennganh, machuyennganh, function (results) {
        res.redirect('/nhanvien/cnchuyennganh');
    });
};

module.exports.timkiemchuyennganh = function (req, res) {
    var query = req.query.tukhoachuyennganh;
    let makhoa = "";
    let mess ="";
    // console.log(query);
    database.timkiemChuyenNganh(query, function (results) {
        if (results.length > 0) {
            var page = parseInt(req.query.page) || 1;
            var perPage = 5;

            var start = (page - 1) * perPage;
            var end = page * perPage;

            sotrang = (results.length) / perPage;
            database.getAllKhoa(function (dsmak) {
                // console.log(dsmak)
                res.render('./bodyNhanVien/CNChuyenNganh', { layout: './layouts/layoutNhanVien', title: 'Cập Nhật chuyên ngành',mess, query, makhoa, listchuyennganh: results.slice(start, end), dsmakhoa: dsmak, sotrang: sotrang + 1 });
            })
        } else {
            // database.getAllChuyenNganh(function (result) {
            //     database.getAllKhoa(function (dsmak) {
            //         res.render('./bodyNhanVien/CNChuyenNganh', { layout: './layouts/layoutNhanVien', title: 'Cập Nhật chuyên ngành',query, listchuyennganh: 0, dsmakhoa: dsmak, sotrang: 0 });
            //     })
            // });
            res.redirect('/nhanvien/cnchuyennganh');
        }

    });
};
module.exports.uploadfileChuyenNganh = function (req, res) {
    upload1(req, res, function (err) {
        if (err) {
            return res.end('Error uploading file');
        }
        res.end('File is uploaded successfully');
    });
};

module.exports.savedataChuyenNganh = function (req, res) {
    const schema = {
        'Mã chuyên ngành': {
            prop: 'MaChuyenNganh',
            type: String
        },
        'Tên chuyên ngành': {
            prop: 'TenChuyenNganh',
            type: String
        },
        'Mã khoa': {
            prop: 'MaKhoa',
            type: String
        },
    };

    var arr = new Array();
    let dem = 0;
    readXlsxFile('./file/datachuyennganh.xlsx', { schema }).then(({ rows, errors }) => {
        errors.length === 0;
        for (let i = 0; i < rows.length; i++) {
            let chuyennganh = rows[i].MaChuyenNganh;
            arr.push(chuyennganh);
        };
        database.chuyennganhkiemtradulieu(arr, function (results) {
            if (results.length > 0) {
                res.send({ message: 'Chuyên ngành có mã' + '\t' + results[0].MaChuyenNganh + '\t' + 'đã tồn tại' });
            } else {
                for (let a = 0; a < rows.length; a++) {
                    let data = {
                        MaChuyenNganh: rows[a].MaChuyenNganh, TenChuyenNganh: rows[a].TenChuyenNganh, MaKhoa: rows[a].MaKhoa,
                    };
                    database.themChuyenNganh(data, function (results) {

                    });
                    dem++;
                };

                res.send({ message: 'Đã thêm thành công '+dem+' chuyên ngành.' });
            }

        });
    });

};
