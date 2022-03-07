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
//xem lịch học
module.exports.xemlichhoc = function(req, res){
    const { cookies } = req;
   // console.log(cookies.mssv);
    var mssv = cookies.mssv
    var list;
    var hocky = req.query.hocky;
    var namhoc = req.query.namhoc;
  
    var thu2_13_phong, thu2_46_phong, thu2_79_phong, thu2_1012_phong, thu2_1315_phong;
    var thu3_13_phong, thu3_46_phong, thu3_79_phong, thu3_1012_phong, thu3_1315_phong;
    var thu4_13_phong, thu4_46_phong, thu4_79_phong, thu4_1012_phong, thu4_1315_phong;
    var thu5_13_phong, thu5_46_phong, thu5_79_phong, thu5_1012_phong, thu5_1315_phong;
    var thu6_13_phong, thu6_46_phong, thu6_79_phong, thu6_1012_phong, thu6_1315_phong;
    var thu7_13_phong, thu7_46_phong, thu7_79_phong, thu7_1012_phong, thu7_1315_phong;
    var chunhat_13_phong, chunhat_46_phong, chunhat_79_phong, chunhat_1012_phong, chunhat_1315_phong;

    var thu2_13_malop, thu2_46_malop, thu2_79_malop, thu2_1012_malop, thu2_1315_malop;
    var thu3_13_malop, thu3_46_malop, thu3_79_malop, thu3_1012_malop, thu3_1315_malop;
    var thu4_13_malop, thu4_46_malop, thu4_79_malop, thu4_1012_malop, thu4_1315_malop;
    var thu5_13_malop, thu5_46_malop, thu5_79_malop, thu5_1012_malop, thu5_1315_malop;
    var thu6_13_malop, thu6_46_malop, thu6_79_malop, thu6_1012_malop, thu6_1315_malop;
    var thu7_13_malop, thu7_46_malop, thu7_79_malop, thu7_1012_malop, thu7_1315_malop;
    var chunhat_13_malop, chunhat_46_malop, chunhat_79_malop, chunhat_1012_malop, chunhat_1315_malop;

    var thu2_13_nhom, thu2_46_nhom, thu2_79_nhom, thu2_1012_nhom, thu2_1315_nhom;
    var thu3_13_nhom, thu3_46_nhom, thu3_79_nhom, thu3_1012_nhom, thu3_1315_nhom;
    var thu4_13_nhom, thu4_46_nhom, thu4_79_nhom, thu4_1012_nhom, thu4_1315_nhom;
    var thu5_13_nhom, thu5_46_nhom, thu5_79_nhom, thu5_1012_nhom, thu5_1315_nhom;
    var thu6_13_nhom, thu6_46_nhom, thu6_79_nhom, thu6_1012_nhom, thu6_1315_nhom;
    var thu7_13_nhom, thu7_46_nhom, thu7_79_nhom, thu7_1012_nhom, thu7_1315_nhom;
    var chunhat_13_nhom, chunhat_46_nhom, chunhat_79_nhom, chunhat_1012_nhom, chunhat_1315_nhom;

    var thu2_13_tenmon, thu2_46_tenmon, thu2_79_tenmon, thu2_1012_tenmon, thu2_1315_tenmon;
    var thu3_13_tenmon, thu3_46_tenmon, thu3_79_tenmon, thu3_1012_tenmon, thu3_1315_tenmon;
    var thu4_13_tenmon, thu4_46_tenmon, thu4_79_tenmon, thu4_1012_tenmon, thu4_1315_tenmon;
    var thu5_13_tenmon, thu5_46_tenmon, thu5_79_tenmon, thu5_1012_tenmon, thu5_1315_tenmon;
    var thu6_13_tenmon, thu6_46_tenmon, thu6_79_tenmon, thu6_1012_tenmon, thu6_1315_tenmon;
    var thu7_13_tenmon, thu7_46_tenmon, thu7_79_tenmon, thu7_1012_tenmon, thu7_1315_tenmon;
    var chunhat_13_tenmon, chunhat_46_tenmon, chunhat_79_tenmon, chunhat_1012_tenmon, chunhat_1315_tenmon;

    var thu2_13_gv, thu2_46_gv, thu2_79_gv, thu2_1012_gv, thu2_1315_gv;
    var thu3_13_gv, thu3_46_gv, thu3_79_gv, thu3_1012_gv, thu3_1315_gv;
    var thu4_13_gv, thu4_46_gv, thu4_79_gv, thu4_1012_gv, thu4_1315_gv;
    var thu5_13_gv, thu5_46_gv, thu5_79_gv, thu5_1012_gv, thu5_1315_gv;
    var thu6_13_gv, thu6_46_gv, thu6_79_gv, thu6_1012_gv, thu6_1315_gv;
    var thu7_13_gv, thu7_46_gv, thu7_79_gv, thu7_1012_gv, thu7_1315_gv;
    var chunhat_13_gv, chunhat_46_gv, chunhat_79_gv, chunhat_1012_gv, chunhat_1315_gv;
    
    if(hocky==""&& namhoc ==""){
        hocky = "1";
        nam ="2021-2022";
       
    }
    database.laylichhocchosinhvien(hocky,namhoc, mssv, function (listLH) {
        return res.render('./bodySinhVien/GD_SV_xemlh',{layout: './layouts/layoutSinhVien', title: 'Xem Lịch Học', namhoc, hocky, listLH});
            // list = resultQuery;
            // console.log("list:"+ list);
            
            // for(let i=0;i< list.length;i++){
            //     if(list[i].NgayHoc=="Thứ 2"){
            //         if(list[i].TietHoc=="01-03"){
            //             thu2_13_gv ="Giảng viên:"+list[i].HoTen;
            //             thu2_13_malop ="Lớp:"+list[i].MaLopHP;
            //             thu2_13_nhom =list[i].Nhom;
            //             thu2_13_phong ="Phòng:"+list[i].PhongHoc;
            //             thu2_13_tenmon ="Môn học:"+list[i].TenMHHP;
            //         }
            //         if(list[i].TietHoc=="04-06"){
            //             thu2_46_gv ="Giảng viên:"+list[i].HoTen;
            //             thu2_46_malop ="Lớp:"+list[i].MaLopHP;
            //             thu2_46_nhom =list[i].Nhom;
            //             thu2_46_phong ="Phòng:"+list[i].PhongHoc;
            //             thu2_46_tenmon ="Môn học:"+list[i].TenMHHP;
            //         }
            //         if(list[i].TietHoc=="07-09"){
            //             thu2_79_gv ="Giảng viên:"+list[i].HoTen;
            //             thu2_79_malop ="Lớp:"+list[i].MaLopHP;
            //             thu2_79_nhom =list[i].Nhom;
            //             thu2_79_phong ="Phòng:"+list[i].PhongHoc;
            //             thu2_79_tenmon ="Môn học:"+list[i].TenMHHP;
            //         }
            //         if(list[i].TietHoc=="10-12"){
            //             thu2_1012_gv ="Giảng viên:"+list[i].HoTen;
            //             thu2_1012_malop ="Lớp:"+list[i].MaLopHP;
            //             thu2_1012_nhom =list[i].Nhom;
            //             thu2_1012_phong ="Phòng:"+list[i].PhongHoc;
            //             thu2_1012_tenmon ="Môn học:"+list[i].TenMHHP;
            //         }
            //         if(list[i].TietHoc=="13-15"){
            //             thu2_1315_gv ="Giảng viên:"+list[i].HoTen;
            //             thu2_1315_malop ="Lớp:"+list[i].MaLopHP;
            //             thu2_1315_nhom =list[i].Nhom;
            //             thu2_1315_phong ="Phòng:"+list[i].PhongHoc;
            //             thu2_1315_tenmon ="Môn học:"+list[i].TenMHHP;
            //         }         
            //     }
            //     if(list[i].NgayHoc=="Thứ 3"){
            //         if(list[i].TietHoc=="01-03"){
            //             thu3_13_gv ="Giảng viên:"+list[i].HoTen;
            //             thu3_13_malop ="Lớp:"+list[i].MaLopHP;
            //             thu3_13_nhom =list[i].Nhom;
            //             thu3_13_phong ="Phòng:"+list[i].PhongHoc;
            //             thu3_13_tenmon ="Môn học:"+list[i].TenMHHP;
            //         }
            //         if(list[i].TietHoc=="04-06"){
            //             thu3_46_gv ="Giảng viên:"+list[i].HoTen;
            //             thu3_46_malop ="Lớp:"+list[i].MaLopHP;
            //             thu3_46_nhom =list[i].Nhom;
            //             thu3_46_phong ="Phòng:"+list[i].PhongHoc;
            //             thu3_46_tenmon ="Môn học:"+list[i].TenMHHP;
            //         }
            //         if(list[i].TietHoc=="07-09"){
            //             thu3_79_gv ="Giảng viên:"+list[i].HoTen;
            //             thu3_79_malop ="Lớp:"+list[i].MaLopHP;
            //             thu3_79_nhom =list[i].Nhom;
            //             thu3_79_phong ="Phòng:"+list[i].PhongHoc;
            //             thu3_79_tenmon ="Môn học:"+list[i].TenMHHP;
            //         }
                    
            //         if(list[i].TietHoc=="10-12"){
            //             thu3_1012_gv ="Giảng viên:"+list[i].HoTen;
            //             thu3_1012_malop ="Lớp:"+list[i].MaLopHP;
            //             thu3_1012_nhom =list[i].Nhom;
            //             thu3_1012_phong ="Phòng:"+list[i].PhongHoc;
            //             thu3_1012_tenmon ="Môn học:"+list[i].TenMHHP;
            //         }
            //         if(list[i].TietHoc=="13-15"){
            //             thu3_1315_gv ="Giảng viên:"+list[i].HoTen;
            //             thu3_1315_malop ="Lớp:"+list[i].MaLopHP;
            //             thu3_1315_nhom =list[i].Nhom;
            //             thu3_1315_phong ="Phòng:"+list[i].PhongHoc;
            //             thu3_1315_tenmon ="Môn học:"+list[i].TenMHHP;
            //         }
            //     }
            //     if(list[i].NgayHoc=="Thứ 4"){
            //         if(list[i].TietHoc=="01-03"){
            //             thu4_13_gv ="Giảng viên:"+list[i].HoTen;
            //             thu4_13_malop ="Lớp:"+list[i].MaLopHP;
            //             thu4_13_nhom =list[i].Nhom;
            //             thu4_13_phong ="Phòng:"+list[i].PhongHoc;
            //             thu4_13_tenmon ="Môn học:"+list[i].TenMHHP;
            //         }
            //         if(list[i].TietHoc=="04-06"){
            //             thu4_46_gv ="Giảng viên:"+list[i].HoTen;
            //             thu4_46_malop ="Lớp:"+list[i].MaLopHP;
            //             thu4_46_nhom =list[i].Nhom;
            //             thu4_46_phong ="Phòng:"+list[i].PhongHoc;
            //             thu4_46_tenmon ="Môn học:"+list[i].TenMHHP;
            //         }
            //         if(list[i].TietHoc=="07-09"){
            //             thu4_79_gv ="Giảng viên:"+list[i].HoTen;
            //             thu4_79_malop ="Lớp:"+list[i].MaLopHP;
            //             thu4_79_nhom =list[i].Nhom;
            //             thu4_79_phong ="Phòng:"+list[i].PhongHoc;
            //             thu4_79_tenmon ="Môn học:"+list[i].TenMHHP;
            //         }
            //         if(list[i].TietHoc=="10-12"){
            //             thu4_1012_gv ="Giảng viên:"+list[i].HoTen;
            //             thu4_1012_malop ="Lớp:"+list[i].MaLopHP;
            //             thu4_1012_nhom =list[i].Nhom;
            //             thu4_1012_phong ="Phòng:"+list[i].PhongHoc;
            //             thu4_1012_tenmon ="Môn học:"+list[i].TenMHHP;
            //         }
                       
            //         if(list[i].TietHoc=="13-15"){
            //             thu4_1315_gv ="Giảng viên:"+list[i].HoTen;
            //             thu4_1315_malop ="Lớp:"+list[i].MaLopHP;
            //             thu4_1315_nhom =list[i].Nhom;
            //             thu4_1315_phong ="Phòng:"+list[i].PhongHoc;
            //             thu4_1315_tenmon ="Môn học:"+list[i].TenMHHP;
            //         }
            //     }
            //     if(list[i].NgayHoc=="Thứ 5"){
            //         if(list[i].TietHoc=="01-03"){
            //             thu5_13_gv ="Giảng viên:"+list[i].HoTen;
            //             thu5_13_malop ="Lớp:"+list[i].MaLopHP;
            //             thu5_13_nhom =list[i].Nhom;
            //             thu5_13_phong ="Phòng:"+list[i].PhongHoc;
            //             thu5_13_tenmon ="Môn học:"+list[i].TenMHHP;
            //         }
            //         if(list[i].TietHoc=="04-06"){
            //             thu5_46_gv ="Giảng viên:"+list[i].HoTen;
            //             thu5_46_malop ="Lớp:"+list[i].MaLopHP;
            //             thu5_46_nhom =list[i].Nhom;
            //             thu5_46_phong ="Phòng:"+list[i].PhongHoc;
            //             thu5_46_tenmon ="Môn học:"+list[i].TenMHHP;
            //         }
            //         if(list[i].TietHoc=="07-09"){
            //             thu5_79_gv ="Giảng viên:"+list[i].HoTen;
            //             thu5_79_malop ="Lớp:"+list[i].MaLopHP;
            //             thu5_79_nhom =list[i].Nhom;
            //             thu5_79_phong ="Phòng:"+list[i].PhongHoc;
            //             thu5_79_tenmon ="Môn học:"+list[i].TenMHHP;
            //         }
                        
            //         if(list[i].TietHoc=="10-12"){
            //             thu5_1012_gv ="Giảng viên:"+list[i].HoTen;
            //             thu5_1012_malop ="Lớp:"+list[i].MaLopHP;
            //             thu5_1012_nhom =list[i].Nhom;
            //             thu5_1012_phong ="Phòng:"+list[i].PhongHoc;
            //             thu5_1012_tenmon ="Môn học:"+list[i].TenMHHP;
            //         }
            //         if(list[i].TietHoc=="13-15"){
            //             thu5_1315_gv ="Giảng viên:"+list[i].HoTen;
            //             thu5_1315_malop ="Lớp:"+list[i].MaLopHP;
            //             thu5_1315_nhom =list[i].Nhom;
            //             thu5_1315_phong ="Phòng:"+list[i].PhongHoc;
            //             thu5_1315_tenmon ="Môn học:"+list[i].TenMHHP; 
            //         }
            //     }
            //     if(list[i].NgayHoc=="Thứ 6"){
            //         if(list[i].TietHoc=="01-03"){
            //             thu6_13_gv ="Giảng viên:"+list[i].HoTen;
            //             thu6_13_malop ="Lớp:"+list[i].MaLopHP;
            //             thu6_13_nhom =list[i].Nhom;
            //             thu6_13_phong ="Phòng:"+list[i].PhongHoc;
            //             thu6_13_tenmon ="Môn học:"+list[i].TenMHHP;  
            //         }
            //         if(list[i].TietHoc=="04-06"){
            //             thu6_46_gv ="Giảng viên:"+list[i].HoTen;
            //             thu6_46_malop ="Lớp:"+list[i].MaLopHP;
            //             thu6_46_nhom =list[i].Nhom;
            //             thu6_46_phong ="Phòng:"+list[i].PhongHoc;
            //             thu6_46_tenmon ="Môn học:"+list[i].TenMHHP;
            //         }
            //         if(list[i].TietHoc=="07-09"){
            //             thu6_79_gv ="Giảng viên:"+list[i].HoTen;
            //             thu6_79_malop ="Lớp:"+list[i].MaLopHP;
            //             thu6_79_nhom =list[i].Nhom;
            //             thu6_79_phong ="Phòng:"+list[i].PhongHoc;
            //             thu6_79_tenmon ="Môn học:"+list[i].TenMHHP;
            //         }
            //         if(list[i].TietHoc=="10-12"){
            //             thu6_1012_gv ="Giảng viên:"+list[i].HoTen;
            //             thu6_1012_malop ="Lớp:"+list[i].MaLopHP;
            //             thu6_1012_nhom =list[i].Nhom;
            //             thu6_1012_phong ="Phòng:"+list[i].PhongHoc;
            //             thu6_1012_tenmon ="Môn học:"+list[i].TenMHHP;
            //         }
            //         if(list[i].TietHoc=="13-15"){
            //             thu6_1315_gv ="Giảng viên:"+list[i].HoTen;
            //             thu6_1315_malop ="Lớp:"+list[i].MaLopHP;
            //             thu6_1315_nhom =list[i].Nhom;
            //             thu6_1315_phong ="Phòng:"+list[i].PhongHoc;
            //             thu6_1315_tenmon ="Môn học:"+list[i].TenMHHP;
            //         }
            //     }
            //     if(list[i].NgayHoc=="Thứ 7"){
            //         if(list[i].TietHoc=="01-03"){
            //             thu7_13_gv ="Giảng viên:"+list[i].HoTen;
            //             thu7_13_malop ="Lớp:"+list[i].MaLopHP;
            //             thu7_13_nhom =list[i].Nhom;
            //             thu7_13_phong ="Phòng:"+list[i].PhongHoc;
            //             thu7_13_tenmon ="Môn học:"+list[i].TenMHHP;
            //         }
            //         if(list[i].TietHoc=="04-06"){
            //             thu7_46_gv ="Giảng viên:"+list[i].HoTen;
            //             thu7_46_malop ="Lớp:"+list[i].MaLopHP;
            //             thu7_46_nhom =list[i].Nhom;
            //             thu7_46_phong ="Phòng:"+list[i].PhongHoc;
            //             thu7_46_tenmon ="Môn học:"+list[i].TenMHHP;
            //         }
            //         if(list[i].TietHoc=="07-09"){
            //             thu7_79_gv ="Giảng viên:"+list[i].HoTen;
            //             thu7_79_malop ="Lớp:"+list[i].MaLopHP;
            //             thu7_79_nhom =list[i].Nhom;
            //             thu7_79_phong ="Phòng:"+list[i].PhongHoc;
            //             thu7_79_tenmon ="Môn học:"+list[i].TenMHHP;
            //         }
            //         if(list[i].TietHoc=="10-12"){
            //             thu7_1012_gv ="Giảng viên:"+list[i].HoTen;
            //             thu7_1012_malop ="Lớp:"+list[i].MaLopHP;
            //             thu7_1012_nhom =list[i].Nhom;
            //             thu7_1012_phong ="Phòng:"+list[i].PhongHoc;
            //             thu7_1012_tenmon ="Môn học:"+list[i].TenMHHP;
            //         }
            //         if(list[i].TietHoc=="13-15"){
            //             thu7_1315_gv ="Giảng viên:"+list[i].HoTen;
            //             thu7_1315_malop ="Lớp:"+list[i].MaLopHP;
            //             thu7_1315_nhom =list[i].Nhom;
            //             thu7_1315_phong ="Phòng:"+list[i].PhongHoc;
            //             thu7_1315_tenmon ="Môn học:"+list[i].TenMHHP;
            //         }
            //     }
            //     if(list[i].NgayHoc=="Chủ nhật"){
            //         if(list[i].TietHoc=="01-03"){
            //             chunhat_13_gv ="Giảng viên:"+list[i].HoTen;
            //             chunhat_13_malop ="Lớp:"+list[i].MaLopHP;
            //             chunhat_13_nhom =list[i].Nhom;
            //             chunhat_13_phong ="Phòng:"+list[i].PhongHoc;
            //             chunhat_13_tenmon ="Môn học:"+list[i].TenMHHP;
            //         }
                    
            //         if(list[i].TietHoc=="04-06"){
            //             chunhat_46_gv ="Giảng viên:"+list[i].HoTen;
            //             chunhat_46_malop ="Lớp:"+list[i].MaLopHP;
            //             chunhat_46_nhom =list[i].Nhom;
            //             chunhat_46_phong ="Phòng:"+list[i].PhongHoc;
            //             chunhat_46_tenmon ="Môn học:"+list[i].TenMHHP;
            //         }
            //         if(list[i].TietHoc=="07-09"){
            //             chunhat_79_gv ="Giảng viên:"+list[i].HoTen;
            //             chunhat_79_malop ="Lớp:"+list[i].MaLopHP;
            //             chunhat_79_nhom =list[i].Nhom;
            //             chunhat_79_phong ="Phòng:"+list[i].PhongHoc;
            //             chunhat_79_tenmon ="Môn học:"+list[i].TenMHHP;
            //         }
                    
            //         if(list[i].TietHoc=="10-12"){
            //             chunhat_1012_gv ="Giảng viên:"+list[i].HoTen;
            //             chunhat_1012_malop ="Lớp:"+list[i].MaLopHP;
            //             chunhat_1012_nhom =list[i].Nhom;
            //             chunhat_1012_phong ="Phòng:"+list[i].PhongHoc;
            //             chunhat_1012_tenmon ="Môn học:"+list[i].TenMHHP;
            //         }
                
            //         if(list[i].TietHoc=="13-15"){
            //             chunhat_1315_gv ="Giảng viên:"+list[i].HoTen;
            //             chunhat_1315_malop ="Lớp:"+list[i].MaLopHP;
            //             chunhat_1315_nhom =list[i].Nhom;
            //             chunhat_1315_phong ="Phòng:"+list[i].PhongHoc;
            //             chunhat_1315_tenmon ="Môn học:"+list[i].TenMHHP;
            //         }
            //     }
               
            // }
            // return res.render('./bodySinhVien/GD_SV_xemlh',
            //     {layout: './layouts/layoutSinhVien' , 
            //     title: 'Xem Lịch Học',
            //     namhoc,
            //     hocky,
            //     thu2_13_phong, thu2_46_phong, thu2_79_phong, thu2_1012_phong, thu2_1315_phong,
            //     thu3_13_phong, thu3_46_phong, thu3_79_phong, thu3_1012_phong, thu3_1315_phong,
            //     thu4_13_phong, thu4_46_phong, thu4_79_phong, thu4_1012_phong, thu4_1315_phong,
            //     thu5_13_phong, thu5_46_phong, thu5_79_phong, thu5_1012_phong, thu5_1315_phong,
            //     thu6_13_phong, thu6_46_phong, thu6_79_phong, thu6_1012_phong, thu6_1315_phong,
            //     thu7_13_phong, thu7_46_phong, thu7_79_phong, thu7_1012_phong, thu7_1315_phong,
            //     chunhat_13_phong, chunhat_46_phong, chunhat_79_phong, chunhat_1012_phong, chunhat_1315_phong,
    
            //     thu2_13_malop, thu2_46_malop, thu2_79_malop, thu2_1012_malop, thu2_1315_malop,
            //     thu3_13_malop, thu3_46_malop, thu3_79_malop, thu3_1012_malop, thu3_1315_malop,
            //     thu4_13_malop, thu4_46_malop, thu4_79_malop, thu4_1012_malop, thu4_1315_malop,
            //     thu5_13_malop, thu5_46_malop, thu5_79_malop, thu5_1012_malop, thu5_1315_malop,
            //     thu6_13_malop, thu6_46_malop, thu6_79_malop, thu6_1012_malop, thu6_1315_malop,
            //     thu7_13_malop, thu7_46_malop, thu7_79_malop, thu7_1012_malop, thu7_1315_malop,
            //     chunhat_13_malop, chunhat_46_malop, chunhat_79_malop, chunhat_1012_malop, chunhat_1315_malop,
    
            //     thu2_13_nhom, thu2_46_nhom, thu2_79_nhom, thu2_1012_nhom, thu2_1315_nhom,
            //     thu3_13_nhom, thu3_46_nhom, thu3_79_nhom, thu3_1012_nhom, thu3_1315_nhom,
            //     thu4_13_nhom, thu4_46_nhom, thu4_79_nhom, thu4_1012_nhom, thu4_1315_nhom,
            //     thu5_13_nhom, thu5_46_nhom, thu5_79_nhom, thu5_1012_nhom, thu5_1315_nhom,
            //     thu6_13_nhom, thu6_46_nhom, thu6_79_nhom, thu6_1012_nhom, thu6_1315_nhom,
            //     thu7_13_nhom, thu7_46_nhom, thu7_79_nhom, thu7_1012_nhom, thu7_1315_nhom,
            //     chunhat_13_nhom, chunhat_46_nhom, chunhat_79_nhom, chunhat_1012_nhom, chunhat_1315_nhom,
    
            //     thu2_13_tenmon, thu2_46_tenmon, thu2_79_tenmon, thu2_1012_tenmon, thu2_1315_tenmon,
            //     thu3_13_tenmon, thu3_46_tenmon, thu3_79_tenmon, thu3_1012_tenmon, thu3_1315_tenmon,
            //     thu4_13_tenmon, thu4_46_tenmon, thu4_79_tenmon, thu4_1012_tenmon, thu4_1315_tenmon,
            //     thu5_13_tenmon, thu5_46_tenmon, thu5_79_tenmon, thu5_1012_tenmon, thu5_1315_tenmon,
            //     thu6_13_tenmon, thu6_46_tenmon, thu6_79_tenmon, thu6_1012_tenmon, thu6_1315_tenmon,
            //     thu7_13_tenmon, thu7_46_tenmon, thu7_79_tenmon, thu7_1012_tenmon, thu7_1315_tenmon,
            //     chunhat_13_tenmon, chunhat_46_tenmon, chunhat_79_tenmon, chunhat_1012_tenmon, chunhat_1315_tenmon,
    
            //     thu2_13_gv, thu2_46_gv, thu2_79_gv, thu2_1012_gv, thu2_1315_gv,
            //     thu3_13_gv, thu3_46_gv, thu3_79_gv, thu3_1012_gv, thu3_1315_gv,
            //     thu4_13_gv, thu4_46_gv, thu4_79_gv, thu4_1012_gv, thu4_1315_gv,
            //     thu5_13_gv, thu5_46_gv, thu5_79_gv, thu5_1012_gv, thu5_1315_gv,
            //     thu6_13_gv, thu6_46_gv, thu6_79_gv, thu6_1012_gv, thu6_1315_gv,
            //     thu7_13_gv, thu7_46_gv, thu7_79_gv, thu7_1012_gv, thu7_1315_gv,
            //     chunhat_13_gv, chunhat_46_gv, chunhat_79_gv, chunhat_1012_gv, chunhat_1315_gv,
    
    
            // });
            
        });
    
};