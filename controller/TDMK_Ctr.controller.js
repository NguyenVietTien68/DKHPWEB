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


const upload = multer();

var upload1 = multer({ storage: storage }).single('myfilesv');
//đổi mật khẩu sv ntnt
module.exports.doiMatKhauSV = function (req, res) {
    const { cookies } = req;
    // console.log(cookies.mssv);
    var mssv = cookies.mssv
    var mkc = "";
    var mkm = "";

    return res.render('./bodySinhVien/GD_SV_doimk', { layout: './layouts/layoutSinhVien', title: 'Đổi Mật Khẩu', mssv, mkc, mkm, erromkc: '', erromkm: '', });
};

module.exports.postDoiMatKhauSV = function (req, res) {
    const { cookies } = req;
    // console.log(cookies.mssv);
    var mssv = cookies.mssv

    var mkc = req.body.mkc;
    var mkm = req.body.mkm;

    let doimatkhauthanhcong = 0;
    // console.log("post đổi mật khẩu");
    // console.log(mkc + "");
    // console.log("mật khẩu mới" + mkm + "");
    if (mkc == '' && mkm == '') {
        return res.render('./bodySinhVien/GD_SV_doimk', { layout: './layouts/layoutSinhVien', title: 'Đổi Mật Khẩu', mssv, erromkc: '(trống)', erromkm: '(trống)', mkc, mkm });
    } else if (mkm == '') {
        return res.render('./bodySinhVien/GD_SV_doimk', { layout: './layouts/layoutSinhVien', title: 'Đổi Mật Khẩu', mssv, erromkc: '', erromkm: '(trống)', mkc, mkm });
    }
    else if (mkc == '') {
        return res.render('./bodySinhVien/GD_SV_doimk', { layout: './layouts/layoutSinhVien', title: 'Đổi Mật Khẩu', mssv, erromkc: '(trống)', erromkm: '', mkc, mkm });
    }
    bcrypt.genSalt(saltRounds, (err, salt) => {


        database.getPassSV(mssv, function (resultQuery) {
            if (resultQuery.length > 0) {
                bcrypt.compare(mkc, resultQuery[0].Pass, function (err, result) {
                    console.log("reult:" + result);
                    if (result) {
                       
                        console.log("đổi mật khẩu thành công");
                        doimatkhauthanhcong = 1;
                        console.log("doi mat khau brt" + doimatkhauthanhcong);


                       
                            bcrypt.hash(mkm, salt, function (err, has) {
                                console.log("hash mật khẩu mới" + has);
                                var pass = has;
                                database.updatematkhausv( mssv,pass);
                            });
                            mkc = "";
                            mkm = ""

                    } else {
                        console.log("đổi mk thấy bại");
                        doimatkhauthanhcong = 0;

                    }
                    console.log("doi mat khau" + doimatkhauthanhcong);
                    if (doimatkhauthanhcong == 1) {
                        return res.render('./bodySinhVien/GD_SV_doimk', { layout: './layouts/layoutSinhVien', title: 'Đổi Mật Khẩu', mssv, erromkc: 'Đổi Mật khẩu thành công', erromkm: 'Đổi Mật Khẩu thành công', mkc, mkm });
                    } else {
                        return res.render('./bodySinhVien/GD_SV_doimk', { layout: './layouts/layoutSinhVien', title: 'Đổi Mật Khẩu', mssv, erromkc: 'Mật Khẩu cũ không đúng', erromkm: '', mkc, mkm });
                    }

                });

            }

        });

    });

};