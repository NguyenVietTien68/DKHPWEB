const { Connect } = require('aws-sdk');

const expressLayouts = require('express-ejs-layouts');
var express = require('express');
var database = require("../database");
var controllerSV = require("../controller/sinhvien.controller");
const controllerTDMK = require('../controller/TDMK_Ctr.controller');
const controllerTTCN = require('../controller/TTCN_Ctr.contronller');
const controllerCTK = require('../controller/CTK_Ctr.controller');
const controllerCN = require('../controller/DS_CongNo.controller');
const controllerXLH = require('../controller/XLH_Ctr.controller');
const controllerXKQHT = require('../controller/KQHT_Ctr.controller');
const controllerDKHP = require('../controller/SinhVienDKHP.controller');
var router = express.Router();
router.use(express.json({ extended: false }));
router.use(express.static('../views'));
router.use(expressLayouts);


const multer = require('multer');
const upload = multer();

router.get('/trangchu', (req, res) => {
    return res.render('./bodySinhVien/GD_SV_trangchu',{layout: './layouts/layoutSinhVien' , title: 'Trang Chủ Sinh Viên', mssv, hoten, gioitinh, diachi, ngaysinh, sodt, khoahoc});
});

//chọn lớp cho sinh viên đăng ký
router.get('/dangkyhp', controllerDKHP.dangkyhocphan);

//chọn nhóm sinh viên đăng ký
router.get('/dangkyhp/:malophoc', controllerDKHP.laydsnhomdk);

//kiểm tra cho sinh viên đăng ký
router.get('/dangkyhp/:malophoc/kiemtra', controllerDKHP.kiemtralopchosinhvien);

//xem thông tin cá nhân ntnt
router.get('/xemttcn', controllerTTCN.xemthongtincanhan);

//đổi mật khẩu get ntnt
router.get('/doimk', controllerTDMK.doiMatKhauSV);

//đổi mật khẩu post
router.post('/doimatkhau',upload.fields([]), controllerTDMK.postDoiMatKhauSV);

//xem công nợ
router.get('/xemcongno',controllerCN.trangxemcongno);
router.get('/chitietcongno',controllerCN.xemcongno);

//xem chương trình khung
router.get('/xemctk',controllerCTK.xemchuongtrinhkhung);

//xem lịch học 
router.get('/xemlh', controllerXLH.xemlichhoc);

router.get('/dangxuat', (req, res) => {
    res.clearCookie('mssv');
    res.clearCookie('msnv');
    return res.redirect('/');
});

//xem kết quả học tập
router.get('/ketquahoctap', controllerXKQHT.xemketquahoctap);


module.exports = router;

