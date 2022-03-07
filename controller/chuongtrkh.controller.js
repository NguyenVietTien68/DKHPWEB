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

var upload1 = multer({ storage: storage }).single('myfilemhcn');

module.exports.uploadfilemhcn = function (req, res) {
    upload1(req, res, function (err) {
        if (err) {
            return res.end('Error uploading file');
        }
        res.end('File is uploaded successfully');
    });
};


module.exports.trangxepkhung = function (req, res) {
    database.laymachuyennganh(function (dsma) {
        return res.render('./bodyNhanVien/XepKhung', { layout: './layouts/layoutNhanVien', title: 'Xếp Chương Trình Khung', dsmacn: dsma, listmh: 0, macn: 0, sotrang: 0 });
    });
};


module.exports.lockq = function (req, res) {
    var page = parseInt(req.query.page) || 1;
    var perPage = 10;

    var start = (page - 1) * perPage;
    var end = page * perPage;
    var macn = req.query.macn;
    database.laymachuyennganh(function (dsma) {
        database.laymhtheocng(macn, function (dsmh) {
            //console.log(dsmh);
            let sotrang = (dsmh.length) / perPage;
            return res.render('./bodyNhanVien/XepKhung', { layout: './layouts/layoutNhanVien', title: 'Xếp Chương Trình Khung', dsmacn: dsma, listmh: dsmh.slice(start, end), macn: macn, sotrang: sotrang + 1 });
        });
    });
};


module.exports.xoamhkhcn = function (req, res) {
    const mhid = req.params.mhid;
    //console.log(mhid);
    database.xoamhkhcn(mhid, function (resultss) {
        res.redirect('/nhanvien/xepkhung');
    });
};





module.exports.savedata = function (req, res) {

    const schema = {
        'Mã chuyên ngành': {
            prop: 'MaChuyenNganh',
            type: String
        },
        'Mã môn học phần': {
            prop: 'MaMHP',
            type: String
        },
        'Học Kì': {
            prop: 'HocKy',
            type: Number
        },
    };
    var arrcn = new Array();
    var arrmhp = new Array();
    readXlsxFile('./file/datamhthuocnganh.xlsx', { schema }).then(({ rows, errors }) => {
        errors.length === 0;
        for (let i = 0; i < rows.length; i++) {
            let MaChuyenNganh = rows[i].MaChuyenNganh;
            arrcn.push(MaChuyenNganh);
            let MaMHP = rows[i].MaMHP
            arrmhp.push(MaMHP);
            
        };
        database.kiemtradulieuxepkhung(arrcn,arrmhp,function (results) {
            if(results.length>0){
                res.send({ message: 'Môn học có mã' + '\t' + results[0].MaMHP + '\t' + 'thuộc chuyên ngành' + '\t' + results[0].MachuyenNganh + '\t' + 'đã tồn tại'});
            }else{
            
                for (let i = 0; i < rows.length; i++) {
                
                        let data = {
                            MaChuyenNganh: rows[i].MaChuyenNganh, MaMHP: rows[i].MaMHP, HocKy: rows[i].HocKy
                        };
                        database.themMHCN(data, function (results) {

                        });
                
                    };
                res.send({ message: 'Thành công' });
            }  
        });
    });

};




