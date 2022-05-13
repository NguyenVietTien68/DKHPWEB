var database = require('../database');
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
var upload1 = multer({ storage: storage }).single('myfilelh');

module.exports.uploadfile = function (req, res) {
    upload1(req, res, function (err) {
        if (err) {
            return res.end('Error uploading file');
        }
        res.end('File is uploaded successfully');
    });
};

module.exports.trangxeplich = function (req, res) {
    let namhoc ="";
    let hocky= "";
    let query = "";
    database.getdsNam(function (dsnam) {
        database.getdshocky(function (dshocky) {
            return res.render('./bodyNhanVien/XepLichHoc',{layout: './layouts/layoutNhanVien' , title: 'Xếp Lịch Học', namhoc, hocky, query, listlh:0,sotrang:0,nam:0,hk:0,dsnam:dsnam,dshocky:dshocky});
        });       
    });
    
    
};

module.exports.lockqlh = function (req, res) {

    var page = parseInt(req.query.page) || 1;
    var perPage = 6;

    var start = (page - 1) * perPage;
    var end = page * perPage;
    var namhoc = req.query.namhoc;
    var hocky = req.query.hocky;
    let query = "";
    database.getdsNam(function (dsnam) {
        database.getdshocky(function (dshocky) {
            database.nvloclichhoc(namhoc,hocky,function (listlich) {
                // console.log(listlich)
                let sotrang = (listlich.length) / perPage;
                res.render('./bodyNhanVien/XepLichHoc', { layout: './layouts/layoutNhanVien', title: 'Xếp lich học', namhoc, hocky, query, listlh: listlich.slice(start,end), sotrang: sotrang+1,nam:namhoc,hk:hocky,dsnam:dsnam,dshocky:dshocky });
            });
        });       
    });
};

module.exports.timlhp = function (req, res) {
    var query = req.query.malophocphan;
    let namhoc ="";
    let hocky= "";
    database.getdsNam(function (dsnam) {
        database.getdshocky(function (dshocky) {
            database.timlophplh(query,function(listlh){
                if (listlh.length > 0) {
                    res.render('./bodyNhanVien/XepLichHoc', { layout: './layouts/layoutNhanVien', title: 'Xếp lich học', namhoc, hocky, query, listlh: listlh, sotrang:0,nam:0,hk:0,dsnam:dsnam,dshocky:dshocky });
                } else {
                    // res.render('./bodyNhanVien/XepLichHoc', { layout: './layouts/layoutNhanVien', title: 'Xếp lich học', listlh: 0, sotrang: 0,nam:0,hk:0,dsnam:dsnam,dshocky:dshocky });
                    return res.redirect('/nhanvien/xeplichhoc')
                }
                
            });
        });       
    });
    
    
};

module.exports.xoalichhoc = function (req, res) {
    const malhp = req.params.malop;
    const manhom = req.params.manhom;
    database.xlkiemtradulieutruocxoa(malhp,manhom,function (kq) {
        if(kq.length > 0){
            res.send('Lịch học đã có sinh viên đăng kí không xóa được')
        }else{
            database.xoalichhoc(malhp,manhom,function(results){
                res.redirect('/nhanvien/xeplichhoc');
            });
        }  
    });
    
};

module.exports.savedata = function (req, res) {
    const schema = {
        'Mã nhóm': {
            prop: 'MaNhom',
            type: String
        },
        'Mã lớp học phần': {
            prop: 'MaLopHP',
            type: String
        },
        'Tiết học': {
            prop: 'TietHoc',
            type: String
        },
        'Ngày học': {
            prop: 'NgayHoc',
            type: String
        },
        'Phòng học': {
            prop: 'PhongHoc',
            type: String
        },
        'Mã giáo viên': {
            prop: 'MaGV',
            type: String
        },
        'Ngày bắt đầu': {
            prop: 'NgayBatDau',
            type: String
        }
    };
    var arrlhp = new Array();
    var arrnhom = new Array();
    readXlsxFile('./file/datalichhoc.xlsx', { schema }).then(({ rows, errors }) => {
        errors.length === 0;
            for (let i = 0; i < rows.length; i++) {
                let MaLopHP = rows[i].MaLopHP;
                arrlhp.push(MaLopHP);
                let MaNhom = rows[i].MaNhom;
                arrnhom.push(MaNhom);
            };
           database.xlkiemtradulieu(arrlhp,arrnhom,function (results) {
            if(results.length>0){
                res.send({ message: 'Lớp học phần có mã'+'\t' + results[0].MaLopHP +'\t' + 'và nhóm' + '\t' + results[0].MaNhom + '\t' + 'đã tồn tại' });
            }else{
                let dem = 0;
                for (let a = 0; a < rows.length; a++) {
                    let data = {
                        MaNhom: rows[a].MaNhom, MaLopHP: rows[a].MaLopHP, TietHoc: rows[a].TietHoc,
                        NgayHoc: rows[a].NgayHoc, PhongHoc: rows[a].PhongHoc, MaGV: rows[a].MaGV, NgayBatDau: rows[a].NgayBatDau
                    };
                    database.themlichhoc(data, function (results) {
                    });
                    dem++;
                };
                res.send({ message: 'Đã thêm '+dem+' lịch học' });
            } 
           });
    });
};


