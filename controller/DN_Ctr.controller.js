var database = require("../database");
const bcrypt = require('bcrypt');
const saltRounds = 10;
module.exports.dangnhap = function (req, res) {
    var username = req.body.tendn;
    var pass = req.body.matkhau;
    // console.log("tendn" + username);
    let encryptedPass = '';
    bcrypt.genSalt(saltRounds, (err, salt) => {
        bcrypt.hash(pass, salt, function (err, hash) {
            encryptedPass = hash;
            // console.log("hash pass" + hash);
            database.getPassNV(username, function (resultQuery1) {
                if (resultQuery1.length > 0) {
                    bcrypt.compare(pass, resultQuery1[0].Pass.toString(), function (err, result) {
                       
                        if (result) {
                            res.cookie('msnv', username);
                            return res.redirect('/nhanvien/trangchu');
                        } else {
                            res.render('./bodyChung/DangNhap',{layout: './layouts/layoutDangNhap' , title: 'Trang Chủ', mess:'Mã số hoặc mật khẩu không hợp lệ' });
                        }
                    });
                } else {
                    database.getPassSV(username, function (resultQuery) {
                        if (resultQuery.length > 0) {
                            bcrypt.compare(pass, resultQuery[0].Pass, function (err, result) {
                                // console.log("reult:" + result);
                                if (result) {
                                    res.cookie('mssv', username);
                                    return res.redirect('sinhvien/xemttcn');
                                } else {  
                                    res.render('./bodyChung/DangNhap',{layout: './layouts/layoutDangNhap' , title: 'Trang Chủ', mess:'Mã số hoặc mật khẩu không hợp lệ' });
                                }
                            });

                        }else{
                            res.render('./bodyChung/DangNhap',{layout: './layouts/layoutDangNhap' , title: 'Trang Chủ', mess:'Mã số hoặc mật khẩu không hợp lệ' });
                        }
                    });
                }
              
            });

        });
    });
  
};