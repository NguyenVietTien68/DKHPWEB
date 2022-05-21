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

var upload1 = multer({ storage: storage }).single('myfilekhoa');

module.exports.trangcapnhatkhoa = function (req, res) {

    var page = parseInt(req.query.page) || 1;
    var perPage = 6;
    var start = (page - 1) * perPage;
    var end = page * perPage;
    let mess = "";
    let query = "";

    database.getAllKhoa(function (result) {
        let sotrang = (result.length) / perPage;
        res.render('./bodyNhanVien/CNKhoa', { layout: './layouts/layoutNhanVien', title: 'Cập Nhật Khoa', mess, query, listkhoa: result.slice(start, end), sotrang: sotrang + 1 });
    })
};


module.exports.trangchunv = function (req, res) {
    return res.render('./bodyNhanVien/GD_NV_TrangChu', { layout: './layouts/layoutNhanVien', title: 'Trang Chủ Khoa' });
};

module.exports.chuyennhapkhoa = function (req, res) {
    let mess ="";
    return res.render('./bodyKhongMenu/GD_NV_Form_Add_Khoa', { layout: './layouts/layoutKhongMenu', title: 'Thêm Khoa',mess });
};

module.exports.luukhoa = function (req, res) {
    const makhoa = req.body.makhoa;
    let mess ="";
    let data = {
        MaKhoa: req.body.makhoa, TenKhoa: req.body.tenkhoa
    };
    database.kiemtrakhoatrung(makhoa, function (result) {
        if (result.length > 0) {
            mess= 'Khoa có mã số ' + result[0].MaKhoa +' đã tồn tại';
            return res.render('./bodyKhongMenu/GD_NV_Form_Add_Khoa', { layout: './layouts/layoutKhongMenu', title: 'Thêm Khoa', mess });
        } else {
            // console.log(data);
            database.themKhoa(data, function (results) {
            });
            var page = parseInt(req.query.page) || 1;
            //console.log(page);
            var perPage = 6;
            var start = (page - 1) * perPage;
            var end = page * perPage;
            let query = "";

            database.getAllKhoa(function (listkhoa) {
                let sotrang = (result.length) / perPage;
                mess = "Thêm thành công khoa mới";
                res.render('./bodyNhanVien/CNKhoa', { layout: './layouts/layoutNhanVien', title: 'Cập Nhật Khoa', mess, query, listkhoa: listkhoa.slice(start, end), sotrang: sotrang + 1 });
            })
        }
    })
};


module.exports.xoakhoa = function (req, res) {
    const khoaid = req.params.khoaid;
    let mess;

    var page = parseInt(req.query.page) || 1;

    var perPage = 6;
    var start = (page - 1) * perPage;
    var end = page * perPage;
    let query = "";

    database.getAllKhoa(function (result) {
        let sotrang = (result.length) / perPage;
        database.kiemtrakhoaocntruocxoa(khoaid, function (ketqua) {
            if (ketqua.length > 0) {
                mess= 'Khoa đã được phân chuyên ngành, cần xoá chuyên ngành chứa khoa ' + ketqua[0].MaKhoa +' trước';
                res.render('./bodyNhanVien/CNKhoa', { layout: './layouts/layoutNhanVien', title: 'Cập Nhật Khoa', mess, query, listkhoa: result.slice(start, end), sotrang: sotrang + 1 });
            } else {
                database.kiemtrakhoaogvtruocxoa(khoaid, function (ketqua) {
                    if (ketqua.length > 0) {
                        mess='Đã có giảng viên được phân vào khoa, cần xoá giảng viên chứa khoa '+ ketqua[0].MaKhoa +' trước';
                        res.render('./bodyNhanVien/CNKhoa', { layout: './layouts/layoutNhanVien', title: 'Cập Nhật Khoa', mess, query, listkhoa: result.slice(start, end), sotrang: sotrang + 1 });
                    } else {
                        database.kiemtrakhoaomhptruocxoa(khoaid, function (ketqua) {
                            if (ketqua.length > 0) {
                                mess='Đã có môn học phần được phân vào khoa, cần xoá môn học phần chứa khoa '+ ketqua[0].MaKhoa +' trước';
                                res.render('./bodyNhanVien/CNKhoa', { layout: './layouts/layoutNhanVien', title: 'Cập Nhật Khoa', mess, query, listkhoa: result.slice(start, end), sotrang: sotrang + 1 });
                            } else {
                                database.xoaKhoa(khoaid, function (results) {
                                    mess='Xoá thành công khoa '+ khoaid;
                                    res.render('./bodyNhanVien/CNKhoa', { layout: './layouts/layoutNhanVien', title: 'Cập Nhật Khoa', mess, query, listkhoa: result.slice(start, end), sotrang: sotrang + 1 });
                                });
                            }
                        })
                    }
                })
            }
        })
    })
};

module.exports.chuyeneditkhoa = function (req, res) {
    const khoaid = req.params.khoaid;
    database.chuyenDenUpdateKhoa(khoaid, function (results) {
        // console.log(results[0]);
        // res.render('GD_NV_Form_Update_Khoa', { sv: results[0] });
        return res.render('./bodyKhongMenu/GD_NV_Form_Update_Khoa', { layout: './layouts/layoutKhongMenu', title: 'Cập nhật khoa', khoa: results[0] });
    });
};

module.exports.capnhatkhoa = function (req, res) {
    const makhoa = req.body.makhoa;
    const tenkhoa = req.body.tenkhoa;

    var page = parseInt(req.query.page) || 1;

    var perPage = 6;
    var start = (page - 1) * perPage;
    var end = page * perPage;
    let query = "";

    // console.log(makhoa,tenkhoa);
    database.updateKhoa(makhoa, tenkhoa, function (results) {
        database.getAllKhoa(function (listkhoa) {
            let sotrang = (listkhoa.length) / perPage;
            mess = "Cập nhật thành công khoa "+ makhoa;
            res.render('./bodyNhanVien/CNKhoa', { layout: './layouts/layoutNhanVien', title: 'Cập Nhật Khoa', mess, query, listkhoa: listkhoa.slice(start, end), sotrang: sotrang + 1 });
        })
    });
};

module.exports.uploadfilekhoa = function (req, res) {
    upload1(req, res, function (err) {
        if (err) {
            return res.end('Error uploading file');
        }
        res.end('File is uploaded successfully');
    });
};

module.exports.savedatakhoa = function (req, res) {
    const schema = {
        'Mã khoa': {
            prop: 'MaKhoa',
            type: String
        },
        'Tên khoa': {
            prop: 'TenKhoa',
            type: String
        },
    };
    var arr = new Array();
    let dem = 0;
    readXlsxFile('./file/datakhoa.xlsx', { schema }).then(({ rows, errors }) => {
        errors.length === 0;
        for (let i = 0; i < rows.length; i++) {
            let makhoa = rows[i].MaKhoa;
            arr.push(makhoa);
        };
        database.kiemtradulieukhoa(arr, function (result) {
            if (result.length > 0) {
                res.send({ message: 'Khoa có mã số' + '\t' + result[0].MaKhoa + '\t' + 'đã tồn tại' });
            } else {
                for (let a = 0; a < rows.length; a++) {
                    // console.log(rows[a].MaKhoa);
                    let data = {
                        MaKhoa: rows[a].MaKhoa, TenKhoa: rows[a].TenKhoa
                    };
                    database.themKhoa(data, function (results) {

                    });
                    dem++;
                };
                res.send({ message: 'Thành công thêm '+dem +' khoa' });
            }
        });
    });
};

module.exports.timkiemkhoa = function (req, res) {
    var query = req.query.tukhoakhoa;
    let mess = "";
    // console.log(query);
    database.timkiemkhoa(query, function (results) {
        if (results.length > 0) {
            res.render('./bodyNhanVien/CNKhoa', { layout: './layouts/layoutNhanVien', title: 'Cập Nhật Khoa', mess, query, listkhoa: results, sotrang: 0 });
        } else {
            // database.getAllKhoa(function (result) {
            // res.render('./bodyNhanVien/CNKhoa', { layout: './layouts/layoutNhanVien', title: 'Cập Nhật Khoa', query, listkhoa: 0,sotrang: 0 });
            // });
            res.render('./bodyNhanVien/CNKhoa', { layout: './layouts/layoutNhanVien', title: 'Cập Nhật Khoa', mess, query, listkhoa: results, sotrang: 0 });
        }
    });
};

module.exports.downloadkhoa = function (req, res) {
    var query = req.body.tukhoakhoa;
    console.log(query);
};