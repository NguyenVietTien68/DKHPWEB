var database = require("../database");
const bcrypt = require('bcrypt');
const saltRounds = 10;

module.exports.trangdoimatkhaunv = function (req, res) {
    const { cookies } = req;
    var msnv = cookies.msnv;
    return res.render('./bodyNhanVien/GD_NV_doimk',{layout: './layouts/layoutNhanVien' , title: 'Đổi mật khẩu',msnv:msnv,erromkc: '', erromkm: '',});
};

module.exports.doimatkhau = function (req, res) {
    var msnv = req.body.manv;
    var mkc = req.body.mkc;
    var mkm = req.body.mkm;
    let doimatkhauthanhcong = 0;
    database.nvlaymkduoicsdl(msnv,function (result) {
        bcrypt.compare(mkc, result[0].Pass, function (err, kq) {
            if(kq){
                doimatkhauthanhcong = 1;
                bcrypt.hash(mkm, saltRounds, function (err, hash) {
                    database.nvdatlaimatkhau(hash,msnv,function (params) {
                    });
                });
            }else{
                doimatkhauthanhcong = 0;
            }
            if (doimatkhauthanhcong == 1) {
                return res.render('./bodyNhanVien/GD_NV_doimk',{layout: './layouts/layoutNhanVien' , title: 'Đổi mật khẩu',msnv:msnv,erromkc: 'Thành công', erromkm: 'Thành công',});
            } else {
                return res.render('./bodyNhanVien/GD_NV_doimk',{layout: './layouts/layoutNhanVien' , title: 'Đổi mật khẩu',msnv:msnv,erromkc: 'Mật khẩu cũ không đúng', erromkm: '',});
            }

        });   
    });
};
