var database = require("../database");
const bcrypt = require('bcrypt');
const saltRounds = 10;
const readXlsxFile = require('read-excel-file/node');
var multer = require('multer');
const { savedataLopHP } = require("./NhanVienLHP.controller");
var storage = multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, './file');
    },
    filename: function (req, file, callback) {
        callback(null, file.originalname);
    }
});


const upload = multer();

var upload1 = multer({ storage: storage }).single('myfilesv');


module.exports.trangcapnhatsv = function (req, res) {
    res.render('./bodyNhanVien/CNSinhVien', { layout: './layouts/layoutNhanVien', title: 'Cập Nhật Sinh Viên', listsv: 0, trang: 0,kh:0 });
};

module.exports.lockqkh = function (req, res) {

    var page = parseInt(req.query.page) || 1;
    var perPage = 20;

    var start = (page - 1) * perPage;
    var end = page * perPage;
    var kh = req.query.khoahocsv;

    database.laysvtheokh(kh, function (listsv) {
        let sotrang = (listsv.length) / perPage;
        res.render('./bodyNhanVien/CNSinhVien', { layout: './layouts/layoutNhanVien', title: 'Cập Nhật Sinh Viên', listsv: listsv.slice(start,end), trang: sotrang+1,kh:kh });
    });

};

module.exports.trangchunv = function (req, res) {
    return res.render('./bodyNhanVien/GD_NV_TrangChu', { layout: './layouts/layoutNhanVien', title: 'Trang Chủ Nhân viên' });
};

module.exports.chuyennhapsv = function (req, res) {
    var matudong;
    database.laymaSVtudong(function(result){
        matudong = parseInt(result[0].MSSV);
        matudong = matudong +1;
        matudong = "00" + matudong;
        return res.render('./bodyKhongMenu/GD_NV_From_Add_SV', { layout: './layouts/layoutKhongMenu', title: 'Thêm Sinh Viên', matdsv: matudong });
    })
    
};

module.exports.chuyenedit = function (req, res) {
    const svid = req.params.svid;
    database.chuyenDenUpdate(svid, function (results) {
        return res.render('./bodyKhongMenu/GD_NV_From_Update_SV', { layout: './layouts/layoutKhongMenu', title: 'Cập nhật sinh viên', sv: results[0] });
    });
};

module.exports.xoasv = function (req, res) {
    const svid = req.params.svid;
    database.svkiemtratruocxoa(svid,function (resultsss) {
        if(resultsss.length > 0){
            res.send('Sinh viên đã có ngành nên xóa bên chia ngành trước');
        }else{
            database.xoatksv(svid, function (resultss) {
                database.xoaSV(svid, function (results) {
                    res.redirect('/nhanvien/cnsinhvien');
                });
            });
        }
    });  
};

module.exports.luusv = function (req, res) {
    console.log(req.body);
    const passdefaut = "123456";
    bcrypt.hash(passdefaut, saltRounds, function (err, hash) {
        let data = {
            MSSV: req.body.masv, DiaChi: req.body.diachi_sv, GioiTinh: req.body.gioitinh,
            HoTen: req.body.hotensv, NgaySinh: req.body.ns_sv, SoDT: req.body.dt_sv, KhoaHoc: req.body.khoahoc_sv
        };
        let tk = { MaTaiKhoan: req.body.masv, Pass: hash };
        database.themSV(data, function (results) {
            database.themtaikhoansv(tk, function (resultss) {
                res.redirect('/nhanvien/cnsinhvien');
            })

        });
    });
};

module.exports.capnhatsv = function (req, res) {
    const masv = req.body.masv;
    const hoten = req.body.hotensv;
    const gioitinh = req.body.gioitinh;
    const ns = req.body.ns_sv;
    const diachi = req.body.diachi_sv;
    const dt = req.body.dt_sv;
    const kh = req.body.khoahoc_sv;
    database.updateSV(masv, hoten, gioitinh, ns, diachi, dt, kh, function (results) {
        res.redirect('/nhanvien/cnsinhvien');
    });
};

module.exports.uploadfile = function (req, res) {
    upload1(req, res, function (err) {
        if (err) {
            return res.end('Error uploading file'); 
        }else{
            res.end('File is uploaded successfully');
        }
    });
};

module.exports.savedata = function (req, res) {

    const schema = {
        'Mã số': {
            prop: 'MSSV',
            type: String
        },
        'Địa chỉ': {
            prop: 'DiaChi',
            type: String
        },
        'Giới tính': {
            prop: 'GioiTinh',
            type: String
        },
        'Họ tên': {
            prop: 'HoTen',
            type: String
        },
        'Ngày sinh': {
            prop: 'NgaySinh',
            type: String
        },
        'Số điện thoại': {
            prop: 'SoDT',
            type: String
        },
        'Khóa học': {
            prop: 'KhoaHoc',
            type: String
        }
    }
    var arr = new Array();
    const passdefaut = "123456";
        readXlsxFile('./file/datasv.xlsx', { schema }).then(({ rows, errors }) => {
            errors.length == 0;
            for (let i = 0; i < rows.length; i++) {
                let MSSV = rows[i].MSSV;
                arr.push(MSSV);
            };
            database.kiemtradl(arr,function (results) {
                if(results.length>0){
                    res.send({ message: 'Mã số sinh viên'+'\t' + results[0].MSSV +'\t'+ 'đã tồn tại' });
                }else{
                    bcrypt.hash(passdefaut, saltRounds, function (err, hash) {
                             for (let a = 0; a < rows.length; a++) {
                                let data = {
                                    MSSV: rows[a].MSSV, DiaChi: rows[a].DiaChi, GioiTinh: rows[a].GioiTinh,
                                    HoTen: rows[a].HoTen, NgaySinh: rows[a].NgaySinh, SoDT: rows[a].SoDT, KhoaHoc: rows[a].KhoaHoc
                                };
                                let tk = { MaTaiKhoan: rows[a].MSSV, Pass: hash };
                                database.themSV(data, function (resultssss) {
                                    database.themtaikhoansv(tk, function (resultsssss) {
        
                                    });
                                });
                            }
                            res.send({ message: 'Thành công' });
                    });
                }
            });
        });
};

module.exports.timkiemsv = function (req, res) {
    
    var query = req.query.tukhoasv;
    database.timkiemsv(query, function (results) {
        if (results.length > 0) {
           
            res.render('./bodyNhanVien/CNSinhVien', { layout: './layouts/layoutNhanVien', title: 'Cập Nhật Sinh Viên', listsv:results, trang:0,kh:0 });
        } else {
            database.getAllSV(function (result) {
                res.render('./bodyNhanVien/CNSinhVien', { layout: './layouts/layoutNhanVien', title: 'Cập Nhật Sinh Viên', listsv:0, trang:0,kh:0 });
            });
        }

    });
};

module.exports.svdatlaimk = function (req, res) {
    var masv = req.params.svid;
    var passdefaut = "123456";
    bcrypt.hash(passdefaut, saltRounds, function (err, hash) {
        database.svupdatemk(hash,masv,function (results) {
            res.send('Thành công');
        });
    });
};

















