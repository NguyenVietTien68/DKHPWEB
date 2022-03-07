const { Connect } = require('aws-sdk');

const expressLayouts = require('express-ejs-layouts');
var express = require('express');
const multer = require('multer');
const upload = multer();

const controllersv = require('../controller/sinhvien.controller');
const controllerkhoa = require('../controller/nhanvienkhoa.controller');
const controllerchuyennganh = require('../controller/NhanVienChuyenNganh.controller');
const controllerlh = require('../controller/lichhoc.controller');
const controllercn = require('../controller/chiachuyennganh.controller');
const controllerchcckh = require('../controller/chuongtrkh.controller');
const controllerlhp = require('../controller/NhanVienLHP.controller');
const controllermhp = require('../controller/nhanvienmhp.controller');
const controllergv = require('../controller/nhanvien.giangvien.controller');
const controllernamhoc = require('../controller/NhanVienNamHoc.controller');
const controllerphonghoc = require('../controller/NhanVienPhongHoc.controller');
const controllerhocky = require('../controller/NhanVienHocKy.controller');
const controllercnnhanvien = require('../controller/capnhatnhanvien.contronler');
const controllernvdoimk = require('../controller/nhanviendoimk.contronller');
const controllertimkiemsv = require('../controller/nhanvientimsinhvien.controller');
const controllernhapdiem = require('../controller/nhanviennhapdiem.controller');


var database = require("../database");
var router = express.Router();
router.use(express.json({ extended: false }));
router.use(express.static('../views'));
router.use(expressLayouts);

//Nhân Viên
router.get('/trangchu',controllersv.trangchunv );


//Nhân viên cập nhật chuyên ngành
router.get('/cnchuyennganh',controllerchuyennganh.trangcapnhatchuyennganh);
router.get('/cnchuyennganh/add-chuyennganh',controllerchuyennganh.chuyenaddchuyennganh);
router.get('/cnchuyennganh/deletechuyennganh/:chuyennganhid',controllerchuyennganh.xoachuyennganh);
router.get('/cnchuyennganh/editchuyennganh/:chuyennganhid', controllerchuyennganh.chuyeneditchuyennganh);
router.get('/cnchuyennganh/timchuyennganh',upload.fields([]), controllerchuyennganh.timkiemchuyennganh);
router.get('/cnchuyennganh/savedatachuyennganh', upload.fields([]),controllerchuyennganh.savedataChuyenNganh);
router.get('/cnchuyennganh/lockhoa', controllerchuyennganh.lockhoa);

router.post('/cnchuyennganh/save_chuyennganh', upload.fields([]),controllerchuyennganh.luuchuyennganh);
router.post('/cnchuyennganh/update_chuyennganh', upload.fields([]), controllerchuyennganh.capnhatchuyennganh);
router.post('/cnchuyennganh/uploadfileChuyenNganh', controllerchuyennganh.uploadfileChuyenNganh);

//Nhân viên cập nhật khoa
router.get('/cnkhoa',controllerkhoa.trangcapnhatkhoa);
router.get('/cnkhoa/add-khoa', controllerkhoa.chuyennhapkhoa);
router.get('/cnkhoa/deletekhoa/:khoaid',controllerkhoa.xoakhoa);
router.get('/cnkhoa/editkhoa/:khoaid', controllerkhoa.chuyeneditkhoa);
router.get('/cnkhoa/timkhoa',upload.fields([]), controllerkhoa.timkiemkhoa);
router.get('/cnkhoa/savedatakhoa', upload.fields([]),controllerkhoa.savedatakhoa);

router.post('/cnkhoa/save_khoa', upload.fields([]),controllerkhoa.luukhoa);
router.post('/cnkhoa/update_khoa', upload.fields([]), controllerkhoa.capnhatkhoa);
router.post('/cnkhoa/uploadfileKhoa', controllerkhoa.uploadfilekhoa);

//Nhân viên cập nhật môn học phần
router.get('/cnmonhp',controllermhp.trangcapnhatmhp);
router.get('/cnmonhp/add-monhp', controllermhp.chuyennhapkhoa);
router.get('/cnmonhp/deletemonhp/:monhpid', controllermhp.xoamonhp);
router.get('/cnmonhp/editmonhp/:monhpid', controllermhp.chuyeneditmonhp);
router.get('/cnmonhp/timmonhp', upload.fields([]),controllermhp.timkiemmhp);
router.get('/cnmonhp/savedatamonhp', upload.fields([]),controllermhp.savedatamonhp);
router.get('/cnmonhp/lockhoa', controllermhp.lockhoamh);

router.post('/cnmonhp/save_mhp', upload.fields([]),controllermhp.luumhp);
router.post('/cnmonhp/update_mhp', upload.fields([]), controllermhp.capnhatmhp);
router.post('/cnmonhp/uploadfileMonHP', controllermhp.uploadfilemonhp);

//Nhân viên cập nhật lớp học phần
router.get('/cnlophp',controllerlhp.trangcapnhatlhp);
router.get('/cnlophp/add-lhp', controllerlhp.chuyennhaplhp);
router.get('/cnlophp/deletelophp/:lophpid', controllerlhp.xoalophp);
router.get('/cnlophp/editlophp/:lophpid', controllerlhp.chuyeneditlophp);
router.get('/cnlophp/timlophp', upload.fields([]),controllerlhp.timkiemlophp);
router.get('/cnlophp/savedatalophp', upload.fields([]),controllerlhp.savedataLopHP);
router.get('/cnlophp/locmhp', controllerlhp.locmhp);

router.post('/cnlophp/save_lophp', upload.fields([]),controllerlhp.luulhp);
router.post('/cnlophp/update_lhp', upload.fields([]), controllerlhp.capnhatlophp);
router.post('/cnlophp/uploadfileLopHP', controllerlhp.uploadfileLopHP);

//Nhân viên cập nhật sinh viên
router.get('/cnsinhvien',controllersv.trangcapnhatsv );
router.get('/cnsinhvien/add-sv', controllersv.chuyennhapsv);
router.get('/cnsinhvien/editsv/:svid', controllersv.chuyenedit);
router.get('/cnsinhvien/deletesv/:svid', controllersv.xoasv);
router.post('/cnsinhvien/save_sv', upload.fields([]), controllersv.luusv);
router.post('/cnsinhvien/update_sv', upload.fields([]), controllersv.capnhatsv);
router.post('/cnsinhvien/uploadfileSV', controllersv.uploadfile);
router.get('/cnsinhvien/savedata', upload.fields([]),controllersv.savedata);
router.get('/cnsinhvien/timsv', upload.fields([]),controllersv.timkiemsv);
router.get('/cnsinhvien/suamk/:svid',controllersv.svdatlaimk);
//<<<<<<< HEAD
router.get('/cnsinhvien/lockq',controllersv.lockqkh );


//Nhân viên cập nhật giảng viên
router.get('/cngiangvien',controllergv.trangcapnhatgv );
router.get('/cngiangvien/add-gv', controllergv.chuyennhapgv);
router.get('/cngiangvien/editgv/:gvid', controllergv.chuyeneditgv);
router.get('/cngiangvien/deletegv/:gvid', controllergv.xoagv);
router.get('/cngiangvien/timgv', upload.fields([]),controllergv.timkiemgv);
router.get('/cngiangvien/savedatagv', upload.fields([]),controllergv.savedataGV);
router.get('/cngiangvien/lockhoa', controllergv.lockhoagv);

router.post('/cngiangvien/save_giangvien', upload.fields([]), controllergv.luugv);
router.post('/cngiangvien/update_giangvien', upload.fields([]), controllergv.capnhatgv);
router.post('/cngiangvien/uploadfileGV', controllergv.uploadfileGV);

//Nhân viên cập nhật năm học
router.get('/cnnamhoc', controllernamhoc.trangcapnhatNamHoc);
router.get('/cnnamhoc/add-namhoc', controllernamhoc.chuyennhapNamHoc);
router.get('/cnnamhoc/deletenamhoc/:nam', controllernamhoc.xoaNamHoc);
router.get('/cnnamhoc/timnamhoc', upload.fields([]),controllernamhoc.timkiemNamHoc)

router.post('/cnnamhoc/save_namhoc', upload.fields([]), controllernamhoc.luuNamHoc);

//Nhân viên cập nhật phòng học
router.get('/cnphonghoc', controllerphonghoc.trangcapnhatPhongHoc);
router.get('/cnphonghoc/add-phonghoc', controllerphonghoc.chuyennhapPhongHoc);
router.get('/cnphonghoc/deletephonghoc/:phonghoc', controllerphonghoc.xoaPhongHoc);
router.get('/cnphonghoc/timphonghoc', upload.fields([]),controllerphonghoc.timkiemPhongHoc)

router.post('/cnphonghoc/save_phonghoc', upload.fields([]), controllerphonghoc.luuPhongHoc);

//Nhân viên cập nhật học kỳ
router.get('/cnhocky', controllerhocky.trangcapnhatHocKy);
router.get('/cnhocky/add-hocky', controllerhocky.chuyennhapHocKy);
router.get('/cnhocky/deletehocky/:hocky', controllerhocky.xoaHocKy);

router.post('/cnhocky/save_hocky', upload.fields([]), controllerhocky.luuHocKy);
//>>>>>>> TienBranch

//Nhân viên xếp lịch học
router.get('/xeplichhoc', controllerlh.trangxeplich);
router.get('/xeplichhoc/timlhp',upload.fields([]), controllerlh.timlhp);
router.get('/xeplichhoc/xoalich/:manhom&:malop', controllerlh.xoalichhoc);
router.post('/xeplichhoc/uploadfilelh', controllerlh.uploadfile);
router.get('/xeplichhoc/savedata', upload.fields([]),controllerlh.savedata);
router.get('/xeplichhoc/lockq', controllerlh.lockqlh);
// router.get('/xeplichhoc/xlkiemtradl', upload.fields([]),controllerlh.xlkiemtraduleu);
//Nhân viên chia chuyên ngành
router.get('/chiachuyennganh', controllercn.trangchiacn);
router.get('/chiachuyennganh/lockq', controllercn.lockqcn);
router.get('/chiachuyennganh/deletesvng/:svid', controllercn.xoasvkhcn);
router.post('/chiachuyennganh/uploadfilesvcn', controllercn.uploadfilesvcn);
router.get('/chiachuyennganh/savedata', upload.fields([]),controllercn.savedata);
router.get('/chiachuyennganh/timsv',upload.fields([]), controllercn.timsvcn);


//nhân viên chia chương trình khung
router.get('/xepkhung', controllerchcckh.trangxepkhung);
router.get('/xepkhung/lockq', controllerchcckh.lockq);
router.get('/xepkhung/deletemhp/:mhid', controllerchcckh.xoamhkhcn);
router.post('/xepkhung/uploadfilemhcn', controllerchcckh.uploadfilemhcn);
router.get('/xepkhung/savedata', upload.fields([]),controllerchcckh.savedata);

//nhân viên cập nhật nhân viên
router.get('/cnnhanvien', controllercnnhanvien.trangcapnhapnv);
router.get('/cnnhanvien/add-nv', controllercnnhanvien.chuyentrangnhap);
router.post('/cnnhanvien/save_nhanvien',upload.fields([]), controllercnnhanvien.luunhanvien);
router.post('/cnnhanvien/update_nhanvien',upload.fields([]), controllercnnhanvien.capnhatnhanvien);
router.get('/cnnhanvien/editnv/:nvid', controllercnnhanvien.chuyentrangcapnhat);
router.get('/cnnhanvien/xoanv/:nvid', controllercnnhanvien.xoanhanvien);
router.get('/cnnhanvien/datlaimksv/:nvid', controllercnnhanvien.datlaimatkhaunv);

//nhân viên đổi mật khẩu
router.get('/nvdoimk',controllernvdoimk.trangdoimatkhaunv);
router.post('/nvdoimk/doimk',upload.fields([]),controllernvdoimk.doimatkhau);

//nhân viên tìm kiếm sinh viên
router.get('/timsv', controllertimkiemsv.trangtimsv);
router.get('/timsv/lockq', controllertimkiemsv.timsvlockq);

router.get('/trangchuNV', (req, res) => {
    return res.render('./bodyNhanVien/GD_NV_TrangChu',{layout: './layouts/layoutNhanVien' , title: 'Trang Chủ Nhân Viên'});
});

//Nhập điểm
router.get('/nhapdiem', controllernhapdiem.trangnhapdiem);
router.get('/nhapdiem/loclop',controllernhapdiem.locdssv);
router.get('/nhapdiem/suadiem/:masv&:malop',controllernhapdiem.chuyendentrangsuadiem);
router.post('/nhapdiem/luudiem',upload.fields([]),controllernhapdiem.luudiem);

//đăng xuất
router.get('/dangxuat', (req, res) => {
    res.clearCookie('msnv');
    res.clearCookie('msnv');
    return res.redirect('/');
});

module.exports = router;