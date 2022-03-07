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

var upload1 = multer({ storage: storage }).single('myfilemonhp');

module.exports.trangcapnhatmhp = function (req, res) {
    
    database.laymakhoa(function (dsmak) {
        res.render('./bodyNhanVien/CNMonHocPhan', { layout: './layouts/layoutNhanVien', title: 'Cập Nhật Môn Học Phần',dsmakhoa: dsmak, listmhp : 0,sotrang:0});
    })
};

module.exports.chuyennhapkhoa = function (req, res) {
    database.laymakhoa(function (dsmak) {
        database.laymamhp(function (dsmamon) {
            return res.render('./bodyKhongMenu/GD_NV_Form_Add_MHP', { layout: './layouts/layoutKhongMenu', title: 'Thêm Môn học phần', dsmakhoa: dsmak, dshocphan: dsmamon });
        });
    });
    
};


module.exports.lockhoamh = function (req, res) {
    var page = parseInt(req.query.page) || 1;
    var perPage = 10;

    var start = (page - 1) * perPage;
    var end = page * perPage;

    var makhoa = req.query.makhoa;
    database.laymakhoa(function(dsmak){
        database.layMHtheoKhoa(makhoa,function(listmhp){
            let sotrang = (listmhp.length) / perPage;
            return res.render('./bodyNhanVien/CNMonHocPhan',{layout: './layouts/layoutNhanVien' , title: 'Cập Nhật Môn Học Phần',dsmakhoa : dsmak,listmhp:listmhp.slice(start,end),sotrang:sotrang+1, mk:makhoa});
        });
    });  
};

module.exports.luumhp = function(req,res){
    console.log(req.body);
    const mamhp = req.body.mamhp;
    database.kiemtramhtrung(mamhp,function(result){
        if(result.length>0){
            res.send({ message: 'Môn học phần mã số'+" "+ result[0].MaMHP+" "+ 'đã tồn tại' });
        }else{     
            let data = {
                MaMHP: req.body.mamhp, TenMHHP: req.body.tenmhhp,SoTinChi: req.body.sotinchi, HinhThucThi: req.body.hinhthucthi, BatBuoc: req.body.batbuoc, MaKhoa: req.body.makhoa, HocPhanYeuCau: req.body.hocphanyeucau
            };
            database.themMHP(data, function(results){
                res.redirect('/nhanvien/cnmonhp');
            });   
        } 
    })
        // let data = {
        //     MaMHP: req.body.mamhp, TenMHHP: req.body.tenmhhp,SoTinChi: req.body.sotinchi, HinhThucThi: req.body.hinhthucthi, BatBuoc: req.body.batbuoc, MaKhoa: req.body.makhoa, HocPhanYeuCau: req.body.hocphanyeucau
        // };
        // database.themMHP(data, function(results){
        //     res.redirect('/nhanvien/cnmonhp');
        // });
};

module.exports.xoamonhp = function (req, res) {
    const monhpid = req.params.monhpid;
    database.kiemtramhptruocxoa(monhpid, function(ketqua){
        if(ketqua.length > 0){
            res.send({message:'Môn học phần đã được phân lớp, cần xoá lớp học phần chứa môn'+" " +ketqua[0].MaMHP+" "+'trước'});
        }else{
            database.xoaMHP(monhpid, function(results){
                res.redirect('/nhanvien/cnmonhp');
            });
        }
    })  
};

module.exports.chuyeneditmonhp = function (req, res) {
    const monhpid = req.params.monhpid;
    database.chuyenDenUpdateMHP(monhpid, function (results) {
        console.log(results[0]);
        database.laymakhoa(function (dsmak) {
            database.laymamhp(function (dsmamon) {
                return res.render('./bodyKhongMenu/GD_NV_Form_UpdateMHP', { layout: './layouts/layoutKhongMenu', title: 'Cập nhật Môn học phần',dsmakhoa:dsmak,dshocphan: dsmamon , monhp: results[0] });
            });
        });
    });
};

module.exports.capnhatmhp = function(req,res){
    const mamhp = req.body.mamhp;
    const tenmhhp = req.body.tenmhhp;
    const sotinchi = req.body.sotinchi;
    const hinhthucthi = req.body.hinhthucthi;
    const batbuoc = req.body.batbuoc;
    const makhoa = req.body.makhoa;
    const hocphanyeucau = req.body.hocphanyeucau;

    database.updateMHP(sotinchi,hinhthucthi,batbuoc,makhoa,hocphanyeucau,tenmhhp,mamhp,function (results){
        res.redirect('/nhanvien/cnmonhp');
    });
    // console.log(mamhp,tenmhhp,sotinchi,hinhthucthi,batbuoc,makhoa,hocphanyeucau);
};

module.exports.timkiemmhp = function (req, res) {
    var query = req.query.tukhoamonhp;

    console.log(query);
    database.timkiemmhp(query, function (results) {
        if (results.length > 0) {
            database.laymakhoa(function (dsmak) {
                res.render('./bodyNhanVien/CNMonHocPhan', { layout: './layouts/layoutNhanVien', title: 'Cập Nhật Môn học phần',dsmakhoa: dsmak, listmhp: results,sotrang:0 });
            });
        } else {
            database.getAllMHP(function (result) {
                database.laymakhoa(function (dsmak) {
                    res.render('./bodyNhanVien/CNMonHocPhan', { layout: './layouts/layoutNhanVien', title: 'Cập Nhật Môn học phần',dsmakhoa: dsmak, listmhp: 0, sotrang:0 });
                });
            });
        }

    });
};

module.exports.uploadfilemonhp = function (req, res) {
    upload1(req, res, function (err) {
        if (err) {
            return res.end('Error uploading file');
        }
        res.end('File is uploaded successfully');
    });
};

module.exports.savedatamonhp = function (req, res) {
    const schema = {
        'Mã môn học phần': {
            prop: 'MaMHP',
            type: String
        },
        'Tên môn học phần': {
            prop: 'TenMHHP',
            type: String
        },
        'Số tín chỉ': {
            prop: 'SoTinChi',
            type: String
        },
        'Hình thức thi': {
            prop: 'HinhThucThi',
            type: String
        },
        'Bắt buộc': {
            prop: 'BatBuoc',
            type: String
        },
        'Mã khoa': {
            prop: 'MaKhoa',
            type: String
        },
        'Học phần yêu cầu': {
            prop: 'HocPhanYeuCau',
            type: String
        },
    };
    var arr = new Array();
    readXlsxFile('./file/datamonhocphan.xlsx', { schema }).then(({ rows, errors }) => {
        
        for (let i = 0; i < rows.length; i++) {
            let monhoc = rows[i].MaMHP;
            arr.push(monhoc);

        };
        database.monhocphankiemtradulieu(arr,function (results) {
            if(results.length > 0){
                res.send({ message: 'Môn phần có mã'+ '\t' + results[0].MaMHP + '\t' + 'đã tồn tại'});
            }else{
                for (let a = 0; a < rows.length; a++) {  
                    let data = {
                        MaMHP: rows[a].MaMHP, TenMHHP: rows[a].TenMHHP, SoTinChi: rows[a].SoTinChi, HinhThucThi: rows[a].HinhThucThi, BatBuoc: rows[a].BatBuoc, MaKhoa: rows[a].MaKhoa, HocPhanYeuCau: rows[a].HocPhanYeuCau
                    };
                    database.themMHP(data, function (results) {
                        
                    });
        
                };
                res.send({ message: 'Đã thêm' });
            }
        });
        
    });

};