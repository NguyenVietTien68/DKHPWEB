var database = require("../database");
const bcrypt = require('bcrypt');
const saltRounds = 10;
const readXlsxFile = require('read-excel-file/node');
var multer = require('multer');
// const { param } = require("../routes/sinhvien.route");
var storage = multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, './file');
    },
    filename: function (req, file, callback) {
        callback(null, file.originalname);
    }
});


module.exports.dangnhap = function (req, res) {
    var username = req.body.tendn;
    var pass = req.body.matkhau;

    console.log("tendn" + username);
    let encryptedPass = '';
    bcrypt.genSalt(saltRounds, (err, salt) => {
        bcrypt.hash(pass, salt, function (err, hash) {
            encryptedPass = hash;
            console.log("hash pass" + hash);
            database.getPassNV(username, function (resultQuery1) {
                if (resultQuery1.length > 0) {
 
                    bcrypt.compare(pass, resultQuery1[0].Pass.toString(), function (err, result) {
                       
                        if (result) {
                            res.cookie('msnv', username);
                            return res.redirect('/nhanvien/trangchu');
                        } else {
                            
                            res.render('./bodyChung/TrangChu',{layout: './layouts/layoutChung' , title: 'Trang Chủ', mess:'pass nv sai' });
                        }
                    });
                } else {
                    database.getPassSV(username, function (resultQuery) {
                        if (resultQuery.length > 0) {

                            bcrypt.compare(pass, resultQuery[0].Pass, function (err, result) {
                                console.log("reult:" + result);
                                if (result) {
                                    res.cookie('mssv', username);
                                    return res.redirect('sinhvien/trangchu');
                                } else {
                                   
                                    res.render('./bodyChung/TrangChu',{layout: './layouts/layoutChung' , title: 'Trang Chủ', mess:'pass sv sai' });
                                }

                            });

                        }else{
                           
                            res.render('./bodyChung/TrangChu',{layout: './layouts/layoutChung' , title: 'Trang Chủ', mess:'pass sv sai' });
                        }
                    });
                }
              
            });

        });
    });
  
};