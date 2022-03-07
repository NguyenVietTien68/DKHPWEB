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

var upload1 = multer({ storage: storage }).single('myfilesvthn');

module.exports.uploadfilesvcn = function (req, res) {
    upload1(req, res, function (err) {
        if (err) {
            return res.end('Error uploading file');
        }
        res.end('File is uploaded successfully');
    });
};

module.exports.trangchiacn = function (req, res) {
    database.laymachuyennganh(function(dsma){
        return res.render('./bodyNhanVien/ChiaChuyenNganh',{layout: './layouts/layoutNhanVien' , title: 'Chia Chuyên Ngành',dsmacn:dsma,listsvn:0,macn:0,sotrang:0});
    });  
};


module.exports.lockqcn = function (req, res) {

    var page = parseInt( req.query.page) || 1;
    var perPage = 10;

    var start = (page - 1) *perPage;
    var end = page * perPage;

    var macn = req.query.macn;
    database.laymachuyennganh(function(dsma){
        database.laysvtheocn(macn,function(listsvn){
            let sotrang = (listsvn.length)/perPage;
            return res.render('./bodyNhanVien/ChiaChuyenNganh',{layout: './layouts/layoutNhanVien' , title: 'Chia Chuyên Ngành',dsmacn:dsma,listsvn:listsvn.slice(start,end),macn:macn,sotrang:sotrang+1});
        });
    });  
};

module.exports.xoasvkhcn = function (req, res) {
    const svid = req.params.svid;
    database.xoaSVKCN(svid, function (resultss) {
        res.redirect('/nhanvien/chiachuyennganh');
    });
};




module.exports.timsvcn = function (req, res) {
    var masvcn = req.query.masvcn;
    database.laymachuyennganh(function (dsma) {
        database.timsvtrongcn(masvcn,function(listsv){
            if (listsv.length > 0) {
                return res.render('./bodyNhanVien/ChiaChuyenNganh',{layout: './layouts/layoutNhanVien' , title: 'Chia Chuyên Ngành',dsmacn:dsma,listsvn:listsv,macn:0,sotrang:0});
            } else {
                return res.render('./bodyNhanVien/ChiaChuyenNganh',{layout: './layouts/layoutNhanVien' , title: 'Chia Chuyên Ngành',dsmacn:dsma,listsvn:0,macn:0,sotrang:0});
            }
            
        });
    });
    
};


module.exports.savedata = function (req, res) {
    const schema = {
        'Mã số': {
            prop: 'MSSV',
            type: String
        },
        'Mã chuyên ngành': {
            prop: 'MaChuyenNganh',
            type: String
        },
    };
    var arr = new Array();
    readXlsxFile('./file/datasvthuocnganh.xlsx', { schema }).then(({ rows, errors }) => {
        errors.length === 0;
        for (let i = 0; i < rows.length; i++) {
            let MSSV = rows[i].MSSV;
            arr.push(MSSV);
            
        };
         database.kiemtradulieubangmang(arr,function (results) {
             if(results.length>0){
                 res.send({ message: 'Sinh viên có mã'+ '\t' + results[0].MSSV + '\t' + 'đã có chuyên ngành'});
             }else{
                    for (let a = 0; a < rows.length; a++) { 
                        let data = {
                            MSSV: rows[a].MSSV, MaChuyenNganh: rows[a].MaChuyenNganh
                        };
                        database.themCNSV(data, function (results) {
                            
                        });
                    };   
                    res.send({ message: 'Đã thêm' });
             }
         });
    });
};