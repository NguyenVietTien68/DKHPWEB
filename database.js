//NTNT ket noi my sql
var mysql = require('mysql');
var connection = mysql.createConnection({
    //local

    host:'192.168.1.6',
    user:'andro',
    password:'andro',
    database:'sqlquanlyhocphan'

    //phải có dòng này trong mysql local, còn trên aws không cần
    //alter user 'root'@'localhost' identified with mysql_native_password by 'sapassword'

    //aws
    // host:'',
    // user:'',
    // password:'',
    // database:''   
});
var connect = function(){
    connection.connect(function(err){
        if(!err){
            console.log("connected");
        }else{
            console.log("error kết nối lần 2");
        }
    })
}
var closeDB = function(){
    connection.end(function(err){
        if(!err){
            console.log("close");
        }else{
            console.log("error cloes");
        } 
    })
}


// lay ds nam

exports.getdsNam = function(callbackQuery){
    connect();
    connection.query("SELECT * FROM nam", function(err, results,fields){
        if(!err){
            callbackQuery(results);
        }else{
            console.log(err);
           
        }
    })  
};

exports.getdshocky = function(callbackQuery){
    connect();
    connection.query("SELECT * FROM hocky", function(err, results,fields){
        if(!err){
            callbackQuery(results);
        }else{
            console.log(err);
           
        }
    })  
};
// lấy mật khẩu sv ntnt
exports.getPassSV = function(MSSV,callbackQuery){
    connect();
    connection.query("SELECT Pass FROM taikhoansv where MaTaiKhoan =? ",[MSSV], function(err, results,fields){
        if(!err){
            callbackQuery(results);
        }else{
            console.log(err);
            results = null;
        }
    })
    //closeDB();
};

//lấy mật khẩu nv ntnt
exports.getPassNV = function(MSNV,callbackQuery){
    connect();
    connection.query("SELECT Pass FROM taikhoannv where MaTaiKhoan = ?",[MSNV], function(err, results,fields){
        if(!err){
            callbackQuery(results);
        }else{
            console.log(err);
            results = null;
        }
    })
    //closeDB();
};

/*
    Bắt đầu xử lý cho giao diện sinh viên
*/

// Lấy dữ liệu từ bảng sinh viên ntnt
exports.getAllSV = function(callbackQuery){
    connect();// order by MSSV DESC limit 5
    connection.query("SELECT * FROM sinhvien", function(err, results,fields){
        if(!err){
            callbackQuery(results);
        }else{
            console.log(err);
           
        }
    })  
    //closeDB();
}
//Thêm sinh viên
exports.themSV = function(data,callbackQuery){
    connect();
    connection.query("Insert into sinhvien Set ? ",[data],(err,results)=>{
        if(!err){
            callbackQuery(results);
        }else{
            console.log(err);
            results = null;
        }
    });  
};
exports.themtaikhoansv = function(tk,callbackQuery){
    connect();
    connection.query("Insert into taikhoansv Set ?",[tk],(err,results)=>{
        if(!err){
            callbackQuery(results);
        }else{
            console.log(err);
            results = null;
        }
    });
};
// Xóa sinh viên
exports.xoaSV = function(masv,callbackQuery){
    connect();
    connection.query("Delete from sinhvien where MSSV = ?",[masv],(err,results)=>{
        if(!err){
            callbackQuery(results);
        }else{
            console.log(err);
            results = null;
        }
    })  
};
//Xóa tài khoản sinh viên
exports.xoatksv = function(masv,callbackQuery){
    connect();
    connection.query("Delete from taikhoansv where MaTaiKhoan = ?",[masv],(err,results)=>{
        if(!err){
            callbackQuery(results);
        }else{
            console.log(err);
            results = null;
        }
    })  
};
//Chuyển đến trang cập nhật
exports.chuyenDenUpdate = function(masv,callbackQuery){
    connect();
    connection.query("Select * from sinhvien where MSSV = ?",[masv],(err,results)=>{
        if(!err){
            callbackQuery(results);
        }else{
            console.log(err);
            results = null;
        }
    })  
};

exports.updateSV = function(masv,hoten,gioitinh,ns,diachi,dienthoai,khoahoc,callbackQuery){
    connect();
    connection.query("update sinhvien set DiaChi = ?, GioiTinh = ?, HoTen = ?, NgaySinh = ?, SoDT = ?, KhoaHoc = ? where MSSV = ?",
    [diachi,gioitinh,hoten,ns,dienthoai,khoahoc,masv],(err,results)=>{
        if(!err){
            callbackQuery(results);
        }else{
            console.log(err);
            results = null;
        }
    }) 
};
//cap nhat lại mật khẩu
exports.svupdatemk = function(mk,masv,callbackQuery){
    connect();
    connection.query("update taikhoansv set Pass = ? where MaTaiKhoan = ?",[mk,masv],(err,results)=>{
        if(!err){
            callbackQuery(results);
        }else{
            console.log(err);
            results = null;
        }
    }) 
};
// lấy thông tin cá nhân sinh viên ntnt
exports.getTTCNSV = function(MSSV,callbackQuery){
    connect();// order by MSSV DESC limit 5
    connection.query("SELECT * FROM sqlquanlyhocphan.sinhvien where MSSV = ?",[MSSV], function(err, results,fields){
        if(!err){
            callbackQuery(results);
        }else{
            console.log(err);
        }
    })  
    //closeDB();
}

exports.timkiemsv = function(tukhoa,callbackQuery){
    connect();//or DiaChi like N'%"+tukhoa+"%'
    connection.query("Select * from sinhvien where Hoten like N'%"+tukhoa+"%' or MSSV like N'%"+tukhoa+"%' limit 10",
    (err,results)=>{
        if(!err){
            callbackQuery(results);
        }else{
            console.log(err);
            results = null;
        }
    }) 
};

//lấy mã sinh viên tự động
exports.laymaSVtudong = function(callbackQuery){
    connect();
    connection.query("SELECT sinhvien.MSSV FROM sinhvien order by sinhvien.MSSV desc;",(err,results)=>{
        if(!err){
            callbackQuery(results);
        }else{
            console.log(err);
            results = null;
        }
    }) 
};

exports.timkiemsvtongthe = function(tukhoa,callbackQuery){
    connect();
    connection.query("Select * from sinhvien where MSSV like N'%"+tukhoa+"' or MSSV like N'"+tukhoa+"%' or MSSV like N'%"+tukhoa+"%' or DiaChi like N'%"+tukhoa+"' or DiaChi like N'"+tukhoa+"%' or DiaChi like N'%"+tukhoa+"%' or HoTen like N'%"+tukhoa+"' or HoTen like N'"+tukhoa+"%' or HoTen like N'%"+tukhoa+"%'",
    (err,results)=>{
        if(!err){
            callbackQuery(results);
        }else{
            console.log(err);
            results = null;
        }
    });
};

exports.kiemtradl = function(masv,callbackQuery){
    connect();
    connection.query("SELECT * FROM sinhvien where MSSV in (?)",[masv],
    (err,results)=>{
        if(!err){
            callbackQuery(results);
        }else{
            console.log(err);
            results = null;
        }
    }) 
};
exports.laysvtheokh = function(khoahoc,callbackQuery){
    connect();
    connection.query("SELECT * FROM sinhvien where KhoaHoc = ?",[khoahoc],
    (err,results)=>{
        if(!err){
            callbackQuery(results);}
    })}

//update pass tk sinh viên ntnt
exports.updatematkhausv = function(masv,pass,callbackQuery){
    connect();
    connection.query("UPDATE taikhoansv SET Pass = ? WHERE (MaTaiKhoan = ?)",
    [pass,masv],(err,results)=>{
        if(!err){
            //callbackQuery(results);
        }else{
            console.log(err);
            results = null;
        }
    }) 
};

//xem chương trình khung 
exports.xemchuongtrinhkhung = function(MSSV,callbackQuery){
    connect();// order by MSSV DESC limit 5
    connection.query("select chuyennganh.TenChuyenNganh,monhocphan.MaMHP,monhocphan.TenMHHP , chuongtrinhkhung.HocKy from sinhvien_thuoc_nganh inner join chuongtrinhkhung on sinhvien_thuoc_nganh.MaChuyenNganh  = chuongtrinhkhung.MachuyenNganh inner join monhocphan on monhocphan.MaMHP  = chuongtrinhkhung.MaMHP inner join chuyennganh on chuyennganh.MaChuyenNganh = sinhvien_thuoc_nganh.MaChuyenNganh where sinhvien_thuoc_nganh.MSSV = ? order by  chuongtrinhkhung.HocKy asc",[MSSV], function(err, results,fields){
        if(!err){
            callbackQuery(results);
        }else{
            console.log(err);
        }
    })  
    //closeDB();
}
//lấy danh sách môn học phần cho sinh viên đang ký
exports.laydanhsachmonhocphanchosinhvien = function(MSSV,HocKy,Nam,callbackQuery){
    connect();// order by MSSV DESC limit 5
    connection.query(" select monhocphan.* from sinhvien_thuoc_nganh inner join chuongtrinhkhung on sinhvien_thuoc_nganh.MaChuyenNganh  = chuongtrinhkhung.MachuyenNganh inner join lophocphan on lophocphan.MaMHP = chuongtrinhkhung.MaMHP inner join monhocphan on monhocphan.MaMHP = lophocphan.MaMHP where sinhvien_thuoc_nganh.MSSV = ? and lophocphan.HocKy =? and lophocphan.Nam =? and monhocphan.TenMHHP not in ( select monhocphan.TenMHHP from phieudangkylhp  inner join lophocphan on lophocphan.MaLopHP = phieudangkylhp.MaLopHP inner join monhocphan on monhocphan.MaMHP = lophocphan.MaMHP where  phieudangkylhp.MSSV = ?) GROUP BY lophocphan.MaMHP;",[MSSV,HocKy,Nam, MSSV], function(err, results,fields){
        if(!err){
            callbackQuery(results);
        }else{
            console.log(err);
        }
    })  
    //closeDB();
}
//lấy danh sách lớp học phần cho sinh viên
exports.laydanhsachlophocphanchosinhvien = function(MaMonHP,callbackQuery){
    connect();// order by MSSV DESC limit 5
    connection.query(" select lophocphan.* from lophocphan where lophocphan.MaMHP =?",[MaMonHP], function(err, results,fields){
        if(!err){
            callbackQuery(results);
        }else{
            console.log(err);
        }
    })  
    //closeDB();
}
//lấy 1 lớp học phần để xem tỷ số đã đăng ký so sánh với sỉ số
exports.laymotlophocphanchosinhvien = function(MaLopHP,callbackQuery){
    connect();// order by MSSV DESC limit 5
    connection.query(" select lophocphan.* from lophocphan where lophocphan.MaLopHP =?",[MaLopHP], function(err, results,fields){
        if(!err){
            callbackQuery(results);
        }else{
            console.log(err);
        }
    })  
    //closeDB();
}
//từ mã lớp học xem cái môn đó có học phần tiên quyết hay không
exports.laymonhocphantienquyetchosinhvien = function(MaLopHP,callbackQuery){
    connect();// order by MSSV DESC limit 5
    connection.query("select monhocphan.TenMHHP from monhocphan where monhocphan.MaMHP =( select monhocphan.HocPhanYeuCau from lophocphan inner join monhocphan on monhocphan.MaMHP = lophocphan.MaMHP where lophocphan.MaLopHP =?)",[MaLopHP], function(err, results,fields){
        if(!err){
            callbackQuery(results);
        }else{
            console.log(err);
        }
    })  
    //closeDB();
}
//kiểm tra sinh viên đã học môn học tiên quyết chưa
exports.sinhviendahocphantienquyetchua = function(MaLopHP, MSSV,callbackQuery){
    connect();// order by MSSV DESC limit 5
    connection.query("select  DISTINCT  monhocphan.TenMHHP from phieudangkylhp inner join lophocphan on lophocphan.MalopHP = phieudangkylhp.MaLopHP inner join monhocphan on monhocphan.MaMHP = lophocphan.MaMHP inner join thoigian_phonghoc_giangvien on thoigian_phonghoc_giangvien.MaLopHP = lophocphan.MaLopHP inner join giangvien on thoigian_phonghoc_giangvien.MaGV = giangvien.MaGV where phieudangkylhp.MSSV = ? and monhocphan.TenMHHP In ( select monhocphan.TenMHHP from monhocphan where monhocphan.MaMHP =( select monhocphan.HocPhanYeuCau from lophocphan inner join monhocphan on monhocphan.MaMHP = lophocphan.MaMHP where lophocphan.MaLopHP =?));",[ MSSV,MaLopHP], function(err, results,fields){
        if(!err){
            callbackQuery(results);
        }else{
            console.log(err);
        }
    })  
    //closeDB();
}
//lấy danh sách lớp thực hành cho sinh viên
exports.laydanhsachlophocphanthuchanhchosinhvien = function(MaLopHP,callbackQuery){
    connect();// order by MSSV DESC limit 5
    connection.query("select thoigian_phonghoc_giangvien.*, giangvien.HoTen from thoigian_phonghoc_giangvien inner join giangvien on giangvien.MaGV = thoigian_phonghoc_giangvien.MaGV where thoigian_phonghoc_giangvien.MaLopHP = ?  and thoigian_phonghoc_giangvien.MaNhom !='LT'",[MaLopHP], function(err, results,fields){
        if(!err){
            callbackQuery(results);
        }else{
            console.log(err);
        }
    })  
    //closeDB();
}
//lấy danh sách lớp lý thuyết cho sinh viên
exports.laydanhsachlophocphanlythuyetchosinhvien = function(MaLopHP,callbackQuery){
    connect();// order by MSSV DESC limit 5
    connection.query("select thoigian_phonghoc_giangvien.*, giangvien.HoTen from thoigian_phonghoc_giangvien inner join giangvien on giangvien.MaGV = thoigian_phonghoc_giangvien.MaGV where thoigian_phonghoc_giangvien.MaLopHP = ?  and thoigian_phonghoc_giangvien.MaNhom ='LT'",[MaLopHP], function(err, results,fields){
        if(!err){
            callbackQuery(results);
        }else{
            console.log(err);
        }
    })  
    //closeDB();
}
// lấy danh sách môn học đã đăng ký cho sinh viên
exports.laydanhsachlophodadangkychosinhvien = function(HocKy, Nam, MSSV,callbackQuery){
    connect();// order by MSSV DESC limit 5
    connection.query("select DISTINCT lophocphan.MaLopHP, monhocphan.TenMHHP, phieudangkylhp.Nhom, giangvien.HoTen from phieudangkylhp inner join lophocphan on lophocphan.MalopHP = phieudangkylhp.MaLopHP inner join monhocphan on monhocphan.MaMHP = lophocphan.MaMHP inner join thoigian_phonghoc_giangvien on thoigian_phonghoc_giangvien.MaLopHP = lophocphan.MaLopHP and thoigian_phonghoc_giangvien.MaNhom = phieudangkylhp.Nhom inner join giangvien on thoigian_phonghoc_giangvien.MaGV = giangvien.MaGV where phieudangkylhp.MSSV = ? and lophocphan.HocKy = ? and lophocphan.Nam=?;",[MSSV,HocKy,Nam], function(err, results,fields){
        if(!err){
            callbackQuery(results);
        }else{
            console.log(err);
        }
    })  
    //closeDB();
}
//kiểm tra trùng thời gian cho sinh viên
exports.kiemtralichtrungthoigianchosinhvien = function(HocKy, Nam, MSSV,MaLopHP,MaNhom,callbackQuery){
    connect();// order by MSSV DESC limit 5
    connection.query("select DISTINCT lophocphan.MaLopHP , thoigian_phonghoc_giangvien.MaNhom, thoigian_phonghoc_giangvien.NgayHoc, thoigian_phonghoc_giangvien.TietHoc from phieudangkylhp  inner join lophocphan on lophocphan.MalopHP = phieudangkylhp.MaLopHP inner join thoigian_phonghoc_giangvien on thoigian_phonghoc_giangvien.MaLopHP = lophocphan.MaLopHP and thoigian_phonghoc_giangvien.MaNhom = phieudangkylhp.Nhom where phieudangkylhp.MSSV = ? and lophocphan.HocKy = ? and lophocphan.Nam=? and thoigian_phonghoc_giangvien.NgayHoc = (select thoigian_phonghoc_giangvien.NgayHoc from thoigian_phonghoc_giangvien where thoigian_phonghoc_giangvien.MaLopHP=? and thoigian_phonghoc_giangvien.MaNhom=?) and thoigian_phonghoc_giangvien.TietHoc = (select thoigian_phonghoc_giangvien.TietHoc from thoigian_phonghoc_giangvien where thoigian_phonghoc_giangvien.MaLopHP=? and thoigian_phonghoc_giangvien.MaNhom=?)",[MSSV, HocKy,Nam, MaLopHP,MaNhom, MaLopHP,MaNhom], function(err, results,fields){
        if(!err){
            callbackQuery(results);
        }else{
            console.log(err);
        }
    })  
    //closeDB();
}
//đăng ký học phần
exports.dangkyhocphanchosinhvien = function(masv,malophp,nhom,callbackQuery){
    connect();
    connection.query("INSERT INTO `sqlquanlyhocphan`.`phieudangkylhp` (`MSSV`, `MaLopHP`, `Nhom`) VALUES (?, ?, ?)",
    [masv,malophp,nhom],(err,results)=>{
        if(!err){
            //callbackQuery(results);
        }else{
            console.log(err);
            results = null;
        }
    }) 
};
//hủy đăng ký học phần
exports.huydangkyhocphanchosinhvien = function(masv,malophp,callbackQuery){
    connect();
    connection.query("DELETE FROM `sqlquanlyhocphan`.`phieudangkylhp` WHERE (`MSSV` = ?) and (`MaLopHP` = ?) ",
    [masv,malophp],(err,results)=>{
        if(!err){
            //callbackQuery(results);
        }else{
            console.log(err);
            results = null;
        }
    }) 
};
//lấy công nợ cho sinh viên
exports.laycongnochosinhvien = function(MSSV,callbackQuery){
    connect();// order by MSSV DESC limit 5
    connection.query(" select monhocphan.TenMHHP, monhocphan.SoTinChi, lophocphan.Nam, lophocphan.HocKy from phieudangkylhp inner join lophocphan on lophocphan.MaLopHP = phieudangkylhp.MaLopHP inner join monhocphan on monhocphan.MaMHP = lophocphan.MaMHP  where  phieudangkylhp.MSSV = ? order by lophocphan.Nam asc, lophocphan.HocKy asc;",[MSSV], function(err, results,fields){
        if(!err){
            callbackQuery(results);
        }else{
            console.log(err);
        }
    })  
    //closeDB();
}
//lấy lịch học
exports.laylichhocchosinhvien = function(HocKy, Nam, MSSV,callbackQuery){
    connect();// order by MSSV DESC limit 5
    connection.query("select lophocphan.MaLopHP, thoigian_phonghoc_giangvien.TietHoc, thoigian_phonghoc_giangvien.NgayHoc, thoigian_phonghoc_giangvien.PhongHoc, phieudangkylhp.Nhom, monhocphan.TenMHHP, giangvien.HoTen from phieudangkylhp inner join lophocphan on lophocphan.MaLopHP = phieudangkylhp.MaLopHP inner join thoigian_phonghoc_giangvien on thoigian_phonghoc_giangvien.MaLopHP = lophocphan.MaLopHP and thoigian_phonghoc_giangvien.MaNhom= phieudangkylhp.Nhom inner join monhocphan on  monhocphan.MaMHP = lophocphan.MaMHP inner join giangvien on giangvien.MaGV = thoigian_phonghoc_giangvien.MaGV where phieudangkylhp.MSSV = ? and lophocphan.HocKy = ? and lophocphan.Nam=? order by thoigian_phonghoc_giangvien.TietHoc;",[MSSV,HocKy,Nam], function(err, results,fields){
        if(!err){
            callbackQuery(results);
        }else{
            console.log(err);
        }
    })  
    //closeDB();
}

//update số lượng sinh viên đăng ký trong 1 lớp
exports.updatesisosinhviendadangkytrongmotlop = function(siso,malophp,callbackQuery){
    connect();
    connection.query("UPDATE `sqlquanlyhocphan`.`lophocphan` SET `DaDangKy` = ? WHERE (`MaLopHP` = ?);",[siso,malophp],(err,results)=>{
        if(!err){
            //callbackQuery(results);
        }else{
            console.log(err);
            results = null;
        }
    }) 
};
//lấy kết quả học tập cho sinh viên
exports.layketquahoctapchosinhvien = function(MSSV,callbackQuery){
    connect();// order by MSSV DESC limit 5
    connection.query("select lophocphan.Nam, lophocphan.hocky, monhocphan.TenMHHP,monhocphan.SoTinChi, phieudangkylhp.DiemTK, phieudangkylhp.DiemGK, phieudangkylhp.DiemTH ,phieudangkylhp.DiemCK from phieudangkylhp inner join lophocphan on lophocphan.MaLopHP = phieudangkylhp.MaLopHP inner join monhocphan on monhocphan.MaMHP = lophocphan.MaMHP where phieudangkylhp.MSSV = ? and phieudangkylhp.Nhom ='LT' order by lophocphan.Nam asc , lophocphan.HocKy asc;",[MSSV], function(err, results,fields){
        if(!err){
            callbackQuery(results);
        }else{
            console.log(err);
        }
    })  
    //closeDB();
}

/*
    Kết thúc xử lý cho giao diện sinh viên
*/

/*
    Bắt đầu xử lý cho giao diện Khoa
*/

// Lấy dữ liệu từ bảng khoa
exports.getAllKhoa = function(callbackQuery){
    connect();
    connection.query("SELECT * FROM khoa order by MaKhoa", function(err, results,fields){
        if(!err){
            callbackQuery(results);
        }else{
            console.log(err);
        }
    })  
    //closeDB();
}
//Thêm khoa
exports.themKhoa = function(data,callbackQuery){
    connect();
    connection.query("Insert into khoa Set ? ",[data],(err,results)=>{
        if(!err){
            callbackQuery(results);
        }else{
            console.log(err);
            results = null;
        }
    });  
};

//Xóa khoa
exports.xoaKhoa = function(makhoa,callbackQuery){
    connect();
    connection.query("Delete from khoa where MaKhoa = ?",[makhoa],(err,results)=>{
        if(!err){
            callbackQuery(results);
        }else{
            console.log(err);
            results = null;
        }
    })  
};

//Cập nhật lại khoa
exports.chuyenDenUpdateKhoa = function(makhoa,callbackQuery){
    connect();
    connection.query("Select * from khoa where MaKhoa = ?",[makhoa],(err,results)=>{
        if(!err){
            callbackQuery(results);
        }else{
            console.log(err);
            results = null;
        }
    })  
};

exports.updateKhoa = function(makhoa,tenkhoa,callbackQuery){
    connect();
    connection.query("update khoa set tenkhoa = ? where MaKhoa = ?",
    [tenkhoa,makhoa],(err,results)=>{
        if(!err){
            callbackQuery(results);
        }else{
            console.log(err);
            results = null;
        }
    }) 
}

exports.timkiemkhoa = function(tukhoakhoa,callbackQuery){
    connect();
    connection.query("Select * from khoa where MaKhoa like N'%"+tukhoakhoa+"%' or TenKhoa like N'%"+tukhoakhoa+"%' limit 10",
    (err,results)=>{
        if(!err){
            callbackQuery(results);
        }else{
            console.log(err);
            results = null;
        }
    }) 
}

exports.kiemtradulieukhoa = function(makhoa,callbackQuery){
    connect();
    connection.query("Select * from khoa where MaKhoa in (?)",[makhoa],(err,results)=>{
        if(!err){
            callbackQuery(results);
        }else{
            console.log(err);
            results = null;
        }
    })  
};

exports.kiemtrakhoatrung = function(makhoa,callbackQuery){
    connect();
    connection.query("Select * from khoa where MaKhoa = ?",[makhoa],(err,results)=>{
        if(!err){
            callbackQuery(results);
        }else{
            console.log(err);
            results = null;
        }
    })  
};

// exports.laysvtheocn = function(data,callbackQuery){
//     connect();
//     connection.query("SELECT sv.* FROM sinhvien sv join sinhvien_thuoc_nganh svn on sv.MSSV = svn.MSSV where svn.MaChuyenNganh = ?",[data],
//     (err,results)=>{
//         if(!err){
//             callbackQuery(results);
//         }else{
//             console.log(err);
//             results = null;
//         }
//     }) 
// };
exports.layCNtheoKhoa = function(data,callbackQuery){
    connect();
    connection.query("SELECT cn.* FROM khoa kh join chuyennganh cn on kh.MaKhoa = cn.MaKhoa where kh.MaKhoa = ?",[data],
    (err,results)=>{
        if(!err){
            callbackQuery(results);
        }else{
            console.log(err);
            results = null;
        }
    }) 
};
//Lấy mã khoa
exports.laymakhoa = function(callbackQuery){
    connect();
    connection.query("Select MaKhoa from khoa",
    (err,results)=>{
        if(!err){
            callbackQuery(results);
        }else{
            console.log(err);
            results = null;
        }
    }) 
};
/*
    Kết thúc xử lý cho giao diện khoa
*/

/*
    Bắt đầu xử lý cho giao diện chuyên ngành
*/

// Lấy dữ liệu từ bảng chuyên ngành
exports.getAllChuyenNganh = function(callbackQuery){
    connect();
    connection.query("SELECT * FROM chuyennganh order by MaChuyenNganh", function(err, results,fields){
        if(!err){
            callbackQuery(results);
        }else{
            console.log(err);
        }
    })  
    //closeDB();
};
//Thêm chuyên ngành
exports.themChuyenNganh = function(data,callbackQuery){
    connect();
    connection.query("Insert into chuyennganh Set ? ",[data],(err,results)=>{
        if(!err){
            callbackQuery(results);
        }else{
            console.log(err);
            results = null;
        }
    });  
};

//Xóa chuyên ngành
exports.xoaChuyenNganh = function(machuyennganh,callbackQuery){
    connect();
    connection.query("Delete from chuyennganh where MaChuyenNganh = ?",[machuyennganh],(err,results)=>{
        if(!err){
            callbackQuery(results);
        }else{
            console.log(err);
            results = null;
        }
    })  
};

//Cập nhật lại chuyên ngành
exports.chuyenDenUpdateChuyenNganh = function(machuyennganh,callbackQuery){
    connect();
    connection.query("Select * from chuyennganh where MaChuyenNganh = ?",[machuyennganh],(err,results)=>{
        if(!err){
            callbackQuery(results);
        }else{
            console.log(err);
            results = null;
        }
    })  
};

exports.updateChuyenNganh = function(tenchuyennganh,machuyennganh,callbackQuery){
    connect();
    connection.query("update chuyennganh set TenChuyenNganh = ? where MaChuyenNganh = ?",
    [tenchuyennganh,machuyennganh],(err,results)=>{
        if(!err){
            callbackQuery(results);
        }else{
            console.log(err);
            results = null;
        }
    }) 
};

exports.timkiemChuyenNganh = function(tukhoachuyennganh,callbackQuery){
    connect();
    connection.query("Select * from chuyennganh where MaKhoa like N'%"+tukhoachuyennganh+"%' or TenChuyenNganh like N'%"+tukhoachuyennganh+"%' or MaChuyenNganh like N'%"+tukhoachuyennganh+"%' limit 10",
    (err,results)=>{
        if(!err){
            callbackQuery(results);
        }else{
            console.log(err);
            results = null;
        }
    }) 
};

exports.chuyennganhkiemtradulieu = function(data,callbackQuery){
    connect();
    connection.query("Select * from chuyennganh where MaChuyenNganh in (?)",[data],
    (err,results)=>{
        if(!err){
            callbackQuery(results);
        }else{
            console.log(err);
            results = null;
        }
    }) 
};

exports.kiemtracntrung = function(machuyennganh,callbackQuery){
    connect();
    connection.query("Select * from chuyennganh where MaChuyenNganh = ?",[machuyennganh],(err,results)=>{
        if(!err){
            callbackQuery(results);
        }else{
            console.log(err);
            results = null;
        }
    })  
};
/*
    Kết thúc xử lý cho giao diện chuyên ngành
*/


/*
    Xử lý giao diện xếp lịch
*/

exports.laylichhoc = function(callbackQuery){
    connect();
    connection.query("SELECT * FROM thoigian_phonghoc_giangvien",
    (err,results)=>{
        if(!err){
            callbackQuery(results);
        }else{
            console.log(err);
            results = null;
        }
    }) 
};

exports.timlophplh = function(malophp,callbackQuery){
    connect();
    connection.query("SELECT * FROM thoigian_phonghoc_giangvien where MaLopHP = ?",[malophp],
    (err,results)=>{
        if(!err){
            callbackQuery(results);
        }else{
            console.log(err);
            results = null;
        }
    }) 
};

exports.xoalichhoc = function(malophp,manhom,callbackQuery){
    connect();
    connection.query("DELETE FROM thoigian_phonghoc_giangvien where MaLopHP = ? and MaNhom = ?",[malophp,manhom],
    (err,results)=>{
        if(!err){
            callbackQuery(results);
        }else{
            console.log(err);
            results = null;
        }
    }) 
};

exports.themlichhoc = function(data,callbackQuery){
    connect();
    connection.query("Insert into thoigian_phonghoc_giangvien Set ?",[data],
    (err,results)=>{
        if(!err){
            callbackQuery(results);
        }else{
            console.log(err);
            results = null;
        }
    }) 
};

exports.nvloclichhoc = function(nh,hk,callbackQuery){
    connect();
    connection.query("select thoigian_phonghoc_giangvien.* from lophocphan INNER JOIN thoigian_phonghoc_giangvien on lophocphan.MaLopHP =  thoigian_phonghoc_giangvien.MaLopHP where lophocphan.HocKy = ? and  lophocphan.Nam =?",[hk,nh],
    (err,results)=>{
        if(!err){
            callbackQuery(results);
        }else{
            console.log(err);
            results = null;
        }
    }) 
};

exports.xlkiemtradulieu = function(malop,manhom,callbackQuery){
    connect();
    connection.query("SELECT * FROM thoigian_phonghoc_giangvien where MaLopHP in (?) and MaNhom in (?)",[malop,manhom],
    (err,results)=>{
        if(!err){
            callbackQuery(results);
        }else{
            console.log(err);
            results = null;
        }
    }) 
};

exports.xlkiemtradulieutruocxoa = function(malop,manhom,callbackQuery){
    connect();
    connection.query("SELECT * FROM phieudangkylhp where MaLopHP = ? and Nhom = ? ",[malop,manhom],
    (err,results)=>{
        if(!err){
            callbackQuery(results);
        }else{
            console.log(err);
            results = null;
        }
    }) 
};

/*
   Kết thúc xử lý giao diện xếp lịch
*/

/*
    Xử lý giao diện chia chuyên ngành
*/

exports.laymachuyennganh = function(callbackQuery){
    connect();
    connection.query("Select MaChuyenNganh from chuyennganh",
    (err,results)=>{
        if(!err){
            callbackQuery(results);
        }else{
            console.log(err);
            results = null;
        }
    }) 
};

exports.laysvtheocn = function(data,callbackQuery){
    connect();
    connection.query("SELECT sv.* FROM sinhvien sv join sinhvien_thuoc_nganh svn on sv.MSSV = svn.MSSV where svn.MaChuyenNganh = ?",[data],
    (err,results)=>{
        if(!err){
            callbackQuery(results);
        }else{
            console.log(err);
            results = null;
        }
    }) 
};

exports.xoaSVKCN = function(data,callbackQuery){
    connect();
    connection.query("Delete from sinhvien_thuoc_nganh where MSSV = ?",[data],
    (err,results)=>{
        if(!err){
            callbackQuery(results);
        }else{
            console.log(err);
            results = null;
        }
    }) 
};

exports.themCNSV = function(data,callbackQuery){
    connect();
    connection.query("Insert into sinhvien_thuoc_nganh Set ?",[data],
    (err,results)=>{
        if(!err){
            callbackQuery(results);
        }else{
            console.log(err);
            results = null;
        }
    }) 
};

exports.timsvtrongcn = function(masv,callbackQuery){
    connect();
    connection.query("SELECT sv.* FROM sinhvien sv join sinhvien_thuoc_nganh svn on sv.MSSV = svn.MSSV where sv.MSSV = ?;",[masv],
    (err,results)=>{
        if(!err){
            callbackQuery(results);
        }else{
            console.log(err);
            results = null;
        }
    }) 
};

exports.kiemtradulieusvcn = function(masv,macn,callbackQuery){
    connect();
    connection.query("SELECT * FROM sinhvien_thuoc_nganh where MSSV = ? and MaChuyenNganh = ?",[masv,macn],
    (err,results)=>{
        if(!err){
            callbackQuery(results);
        }else{
            console.log(err);
            results = null;
        }
    }) 
};

exports.kiemtradulieubangmang = function(masv,callbackQuery){
    connect();
    connection.query("SELECT * FROM sinhvien_thuoc_nganh where MSSV in (?)",[masv],
    (err,results)=>{
        if(!err){
            callbackQuery(results);
        }else{
            console.log(err);
            results = null;
        }
    }) 
};

exports.svkiemtratruocxoa = function(masv,callbackQuery){
    connect();
    connection.query("SELECT * FROM sinhvien_thuoc_nganh where MSSV = ?",[masv],
    (err,results)=>{
        if(!err){
            callbackQuery(results);
        }else{
            console.log(err);
            results = null;
        }
    }) 
};

/*
   Kết thúc xử lý giao diện chia chuyên ngành
*/

/*
    Xử lý giao diện xếp chương trình khung
*/

exports.laymhtheocng = function(macng,callbackQuery){
    connect();
    connection.query("SELECT ctk.MachuyenNganh,ctk.MaMHP,mh.TenMHHP,ctk.HocKy FROM monhocphan mh join chuongtrinhkhung ctk on mh.MaMHP = ctk.MaMHP where ctk.MachuyenNganh = ?",[macng],
    (err,results)=>{
        if(!err){
            callbackQuery(results);
        }else{
            console.log(err);
            results = null;
        }
    }) 
};

exports.xoamhkhcn = function(mamh,callbackQuery){
    connect();
    connection.query("DELETE FROM sqlquanlyhocphan.chuongtrinhkhung where  MaMHP = ?",[mamh],
    (err,results)=>{
        if(!err){
            callbackQuery(results);
        }else{
            console.log(err);
            results = null;
        }
    }) 
};

exports.themMHCN = function(data,callbackQuery){
    connect();
    connection.query("Insert into chuongtrinhkhung Set ?",[data],
    (err,results)=>{
        if(!err){
            callbackQuery(results);
        }else{
            console.log(err);
            results = null;
        }
    }) 
};

exports.kiemtradulieuxepkhung = function(macn,mamhp,callbackQuery){
    connect();
    connection.query("SELECT * FROM chuongtrinhkhung where MachuyenNganh in (?) and MaMHP in (?)",[macn,mamhp],
    (err,results)=>{
        if(!err){
            callbackQuery(results);
        }else{
            console.log(err);
            results = null;
        }
    }) 
};

/*
   Kết thúc xử lý giao diện xếp chương trình khung
*/

/*
    Bắt đầu xử lý cho giao diện Lớp học phần
*/

// Lấy dữ liệu từ bảng Lớp học phần
exports.getAllLHP = function(callbackQuery){
    connect();
    connection.query("SELECT * FROM lophocphan order by MaLopHP", function(err, results,fields){
        if(!err){
            callbackQuery(results);
        }else{
            console.log(err);
        }
    })  
    //closeDB();
}
//Thêm Lớp học phần
exports.themLHP = function(data,callbackQuery){
    connect();
    connection.query("Insert into lophocphan Set ? ",[data],(err,results)=>{
        if(!err){
            callbackQuery(results);
        }else{
            console.log(err);
            results = null;
        }
    });  
};

//Xóa Lớp học phần
exports.xoaLHP = function(MaLopHP,callbackQuery){
    connect();
    connection.query("Delete from lophocphan where MaLopHP = ?",[MaLopHP],(err,results)=>{
        if(!err){
            callbackQuery(results);
        }else{
            console.log(err);
            results = null;
        }
    })  
};

//Cập nhật lại Lớp học phần
exports.chuyenDenUpdateLHP = function(MaLopHP,callbackQuery){
    connect();
    connection.query("Select * from lophocphan where MaLopHP = ?",[MaLopHP],(err,results)=>{
        if(!err){
            callbackQuery(results);
        }else{
            console.log(err);
            results = null;
        }
    })  
};

exports.updateLHP = function(siso,mamhp,nam,hocky,dadangky,malophp,callbackQuery){
    connect();
    connection.query("update lophocphan set SiSo = ?,MaMHP = ?,Nam = ?,HocKy = ?,DaDangKy = ? where MaLopHP = ?",
    [siso,mamhp,nam,hocky,dadangky,malophp],(err,results)=>{
        if(!err){
            callbackQuery(results);
        }else{
            console.log(err);
            results = null;
        }
    }) 
};

exports.timkiemlhp = function(tukhoalhp,callbackQuery){
    connect();
    connection.query("Select * from lophocphan where MaLopHP like N'%"+tukhoalhp+"%' or SiSo like N'%"+tukhoalhp+"%'or MaMHP like N'%"+tukhoalhp+"%'or Nam like N'%"+tukhoalhp+"%'or HocKy like N'%"+tukhoalhp+"%'or DaDangKy like N'%"+tukhoalhp+"%' limit 10",
    (err,results)=>{
        if(!err){
            callbackQuery(results);
        }else{
            console.log(err);
            results = null;
        }
    }) 
};

exports.lhpkiemtradulieu = function(data,callbackQuery){
    connect();
    connection.query("Select * from lophocphan where MaLopHP in (?) ",[data],
    (err,results)=>{
        if(!err){
            callbackQuery(results);
        }else{
            console.log(err);
            results = null;
        }
    }) 
};

exports.layLHPtheoMH = function(data,callbackQuery){
    connect();
    connection.query("SELECT lhp.* FROM monhocphan mhp join lophocphan lhp on mhp.MaMHP = lhp.MaMHP where mhp.MaMHP = ?",[data],
    (err,results)=>{
        if(!err){
            callbackQuery(results);
        }else{
            console.log(err);
            results = null;
        }
    }) 
};

exports.kiemtralhptrung = function(malhp,callbackQuery){
    connect();
    connection.query("Select * from lophocphan where MaLopHP = ?",[malhp],(err,results)=>{
        if(!err){
            callbackQuery(results);
        }else{
            console.log(err);
            results = null;
        }
    })  
};

/*
    Kết thúc xử lý cho giao diện Lớp học phần
*/

/*
    Bắt đầu xử lý cho giao diện Môn học phần
*/

// Lấy dữ liệu từ bảng Môn học phần
exports.getAllMHP = function(callbackQuery){
    connect();
    connection.query("SELECT * FROM monhocphan order by MaMHP", function(err, results,fields){
        if(!err){
            callbackQuery(results);
        }else{
            console.log(err);
        }
    })  
    //closeDB();
}
//Thêm Môn học phần
exports.themMHP = function(data,callbackQuery){
    connect();
    connection.query("Insert into monhocphan Set ? ",[data],(err,results)=>{
        if(!err){
            callbackQuery(results);
        }else{
            console.log(err);
            results = null;
        }
    });  
};

//Xóa Môn học phần
exports.xoaMHP = function(MaMHP,callbackQuery){
    connect();
    connection.query("Delete from monhocphan where MaMHP = ?",[MaMHP],(err,results)=>{
        if(!err){
            callbackQuery(results);
        }else{
            console.log(err);
            results = null;
        }
    })  
};

exports.chuyenDenUpdateMHP = function(MaMHP,callbackQuery){
    connect();
    connection.query("Select * from monhocphan where MaMHP = ?",[MaMHP],(err,results)=>{
        if(!err){
            callbackQuery(results);
        }else{
            console.log(err);
            results = null;
        }
    })  
};

exports.updateMHP = function(sotinchi,hinhthucthi,batbuoc,makhoa,hocphanyeucau,tenmhhp,mamhp,callbackQuery){
    connect();
    connection.query("update monhocphan set tenmhhp = ?,sotinchi = ?,hinhthucthi = ?,batbuoc = ?,makhoa = ?,hocphanyeucau = ? where mamhp = ?",
    [tenmhhp,sotinchi,hinhthucthi,batbuoc,makhoa,hocphanyeucau,mamhp],(err,results)=>{
        // console.log(sotinchi,hinhthucthi,batbuoc,makhoa,hocphanyeucau,tenmhhp,mamhp);
        if(!err){
            callbackQuery(results);
        }else{
            console.log(err);
            results = null;
        }
    }) 
}

exports.timkiemmhp = function(tukhoamonhp,callbackQuery){
    connect();
    connection.query("Select * from monhocphan where mamhp like N'%"+tukhoamonhp+"%' or tenmhhp like N'%"+tukhoamonhp+"%'or sotinchi like N'%"+tukhoamonhp+"%'or hinhthucthi like N'%"+tukhoamonhp+"%'or batbuoc like N'%"+tukhoamonhp+"%'or makhoa like N'%"+tukhoamonhp+"%'or hocphanyeucau like N'%"+tukhoamonhp+"%' limit 10",
    (err,results)=>{
        if(!err){
            callbackQuery(results);
        }else{
            console.log(err);
            results = null;
        }
    }) 
};
exports.monhocphankiemtradulieu = function(data,callbackQuery){
    connect();
    connection.query("Select * from monhocphan where mamhp in (?) ",[data],
    (err,results)=>{
        if(!err){
            callbackQuery(results);
        }else{
            console.log(err);
            results = null;
        }
    }) 
};
exports.laymamhp = function(callbackQuery){
    connect();
    connection.query("Select MaMHP from monhocphan",
    (err,results)=>{
        if(!err){
            callbackQuery(results);
        }else{
            console.log(err);
            results = null;
        }
    }) 
};

exports.kiemtramhtrung = function(mamhp,callbackQuery){
    connect();
    connection.query("Select * from monhocphan where MaMHP = ?",[mamhp],(err,results)=>{
        if(!err){
            callbackQuery(results);
        }else{
            console.log(err);
            results = null;
        }
    })  
};

exports.layMHtheoKhoa = function(data,callbackQuery){
    connect();
    connection.query("SELECT mh.* FROM khoa kh join monhocphan mh on kh.MaKhoa = mh.MaKhoa where kh.MaKhoa = ?",[data],
    (err,results)=>{
        if(!err){
            callbackQuery(results);
        }else{
            console.log(err);
            results = null;
        }
    }) 
};

exports.kiemtramhptruocxoa = function(mamhp,callbackQuery){
    connect();
    connection.query("SELECT * FROM lophocphan where MaMHP = ?",[mamhp],
    (err,results)=>{
        if(!err){
            callbackQuery(results);
        }else{
            console.log(err);
            results = null;
        }
    }) 
};
/*
    Kết thúc xử lý cho giao diện Môn học phần
*/

/*
    Bắt đầu xử lý cho giao diện giảng viên
*/

// Lấy dữ liệu từ bảng giảng viên
exports.getGiangVien = function(callbackQuery){
    connect();
    connection.query("SELECT * FROM giangvien order by MaGV", function(err, results,fields){
        if(!err){
            callbackQuery(results);
        }else{
            console.log(err);
        }
    })  
    //closeDB();
}
//Thêm giảng viên
exports.themGV = function(data,callbackQuery){
    connect();
    connection.query("Insert into giangvien Set ? ",[data],(err,results)=>{
        if(!err){
            callbackQuery(results);
        }else{
            console.log(err);
            results = null;
        }
    });  
};

//Xóa giảng viên
exports.xoaGV = function(MaGV,callbackQuery){
    connect();
    connection.query("Delete from giangvien where MaGV = ?",[MaGV],(err,results)=>{
        if(!err){
            callbackQuery(results);
        }else{
            console.log(err);
            results = null;
        }
    })  
};

exports.chuyenDenUpdateGV = function(MaGV,callbackQuery){
    connect();
    connection.query("Select * from giangvien where MaGV = ?",[MaGV],(err,results)=>{
        if(!err){
            callbackQuery(results);
        }else{
            console.log(err);
            results = null;
        }
    })  
};

exports.updateGV = function(hoten,diachi,gioitinh,ngaysinh,dienthoai,magv,callbackQuery){
    connect();
    connection.query("update giangvien set HoTen = ?, DiaChi = ?, GioiTinh = ?, NgaySinh = ?, SoDT = ? where MaGV = ?",
    [hoten,diachi,gioitinh,ngaysinh,dienthoai,magv],(err,results)=>{
        console.log(hoten,diachi,gioitinh,ngaysinh,dienthoai,magv)
        if(!err){
            callbackQuery(results);
        }else{
            console.log(err);
            results = null;
        }
    }) 
};

exports.timkiemGV = function(tukhoagv,callbackQuery){
    connect();//or DiaChi like N'%"+tukhoa+"%'
    connection.query("Select * from giangvien where Hoten like N'%"+tukhoagv+"%' or MaGV like N'%"+tukhoagv+"%' limit 10",
    (err,results)=>{
        if(!err){
            callbackQuery(results);
        }else{
            console.log(err);
            results = null;
        }
    }) 
};

exports.giangvienkiemtradulieu = function(data,callbackQuery){
    connect();
    connection.query("SELECT * FROM giangvien where MaGV in (?)",[data],function(err, results,fields){
        if(!err){
            callbackQuery(results);
        }else{
            console.log(err);
        }
    })  
    //closeDB();
};
exports.kiemtragvtrung = function(magv,callbackQuery){
    connect();
    connection.query("Select * from giangvien where MaGV = ?",[magv],(err,results)=>{
        if(!err){
            callbackQuery(results);
        }else{
            console.log(err);
            results = null;
        }
    })  
};

exports.layGVtheoKhoa = function(data,callbackQuery){
    connect();
    connection.query("SELECT gv.* FROM khoa kh join giangvien gv on kh.MaKhoa = gv.MaKhoa where kh.MaKhoa = ?",[data],
    (err,results)=>{
        if(!err){
            callbackQuery(results);
        }else{
            console.log(err);
            results = null;
        }
    }) 
};

exports.kiemtrakhoaocntruocxoa = function(makhoa,callbackQuery){
    connect();
    connection.query("SELECT * FROM chuyennganh where MaKhoa = ?",[makhoa],
    (err,results)=>{
        if(!err){
            callbackQuery(results);
        }else{
            console.log(err);
            results = null;
        }
    }) 
};

exports.kiemtrakhoaogvtruocxoa = function(makhoa,callbackQuery){
    connect();
    connection.query("SELECT * FROM giangvien where MaKhoa = ?",[makhoa],
    (err,results)=>{
        if(!err){
            callbackQuery(results);
        }else{
            console.log(err);
            results = null;
        }
    }) 
};

exports.kiemtrakhoaomhptruocxoa = function(makhoa,callbackQuery){
    connect();
    connection.query("SELECT * FROM monhocphan where MaKhoa = ?",[makhoa],
    (err,results)=>{
        if(!err){
            callbackQuery(results);
        }else{
            console.log(err);
            results = null;
        }
    }) 
};

/*
    Kết thúc xử lý cho giao diện giảng viên
*/

/*
    Bắt đầu xử lý cho giao diện năm học
*/

// Lấy dữ liệu từ bảng năm học
exports.getAllNamHoc = function(callbackQuery){
    connect();
    connection.query("SELECT * FROM nam order by Nam", function(err, results,fields){
        if(!err){
            callbackQuery(results);
        }else{
            console.log(err);
        }
    })  
    //closeDB();
}
//Thêm năm học
exports.themNamHoc = function(data,callbackQuery){
    connect();
    connection.query("Insert into nam Set ? ",[data],(err,results)=>{
        if(!err){
            callbackQuery(results);
        }else{
            console.log(err);
            results = null;
        }
    });  
};

//Xóa năm học
exports.xoaNamHoc = function(Nam,callbackQuery){
    connect();
    connection.query("Delete from nam where Nam = ?",[Nam],(err,results)=>{
        if(!err){
            callbackQuery(results);
        }else{
            console.log(err);
            results = null;
        }
    })  
};

// Tìm kiếm năm học
exports.timkiemNamHoc = function(tukhoanamhoc,callbackQuery){
    connect();
    connection.query("Select * from nam where Nam like N'%"+tukhoanamhoc+"%' limit 10",
    (err,results)=>{
        if(!err){
            callbackQuery(results);
        }else{
            console.log(err);
            results = null;
        }
    }) 
}

exports.kiemtranamtrung = function(nam,callbackQuery){
    connect();
    connection.query("Select * from nam where Nam = ?",[nam],(err,results)=>{
        if(!err){
            callbackQuery(results);
        }else{
            console.log(err);
            results = null;
        }
    })  
};

/*
    Kết thúc xử lý cho giao diện năm học
*/

/*
    Bắt đầu xử lý cho giao diện phòng học
*/

// Lấy dữ liệu từ bảng phòng học
exports.getAllPhongHoc = function(callbackQuery){
    connect();
    connection.query("SELECT * FROM phonghoc order by PhongHoc", function(err, results,fields){
        if(!err){
            callbackQuery(results);
        }else{
            console.log(err);
        }
    })  
    //closeDB();
}
//Thêm phòng học
exports.themPhongHoc = function(data,callbackQuery){
    connect();
    connection.query("Insert into phonghoc Set ? ",[data],(err,results)=>{
        if(!err){
            callbackQuery(results);
        }else{
            console.log(err);
            results = null;
        }
    });  
};

//Xóa phòng học
exports.xoaPhongHoc = function(PhongHoc,callbackQuery){
    connect();
    connection.query("Delete from phonghoc where PhongHoc = ?",[PhongHoc],(err,results)=>{
        if(!err){
            callbackQuery(results);
        }else{
            console.log(err);
            results = null;
        }
    })  
};

// Tìm kiếm phòng học
exports.timkiemPhongHoc = function(tukhoaphonghoc,callbackQuery){
    connect();
    connection.query("Select * from phonghoc where PhongHoc like N'%"+tukhoaphonghoc+"%' limit 10",
    (err,results)=>{
        if(!err){
            callbackQuery(results);
        }else{
            console.log(err);
            results = null;
        }
    }) 
}

exports.kiemtraphonghoctrung = function(ph,callbackQuery){
    connect();
    connection.query("Select * from phonghoc where PhongHoc = ?",[ph],(err,results)=>{
        if(!err){
            callbackQuery(results);
        }else{
            console.log(err);
            results = null;
        }
    })  
};
/*
    Kết thúc xử lý cho giao diện phòng học
*/

/*
    Bắt đầu xử lý cho giao diện học kỳ
*/

// Lấy dữ liệu từ bảng học kỳ
exports.getAllHocKy = function(callbackQuery){
    connect();
    connection.query("SELECT * FROM hocky order by HocKy", function(err, results,fields){
        if(!err){
            callbackQuery(results);
        }else{
            console.log(err);
        }
    })  
    //closeDB();
}
//Thêm học kỳ
exports.themHocKy = function(data,callbackQuery){
    connect();
    connection.query("Insert into hocky Set ? ",[data],(err,results)=>{
        if(!err){
            callbackQuery(results);
        }else{
            console.log(err);
            results = null;
        }
    });  
};

//Xóa học kỳ
exports.xoaHocKy = function(HocKy,callbackQuery){
    connect();
    connection.query("Delete from hocky where HocKy = ?",[HocKy],(err,results)=>{
        if(!err){
            callbackQuery(results);
        }else{
            console.log(err);
            results = null;
        }
    })  
};

exports.kiemtrahockytrung = function(hocky,callbackQuery){
    connect();
    connection.query("Select * from hocky where HocKy = ?",[hocky],(err,results)=>{
        if(!err){
            callbackQuery(results);
        }else{
            console.log(err);
            results = null;
        }
    })  
};

//Mã tự động
exports.layhktudong = function(callbackQuery){
    connect();
    connection.query("SELECT hocky.HocKy FROM hocky order by hocky.HocKy desc;",(err,results)=>{
        if(!err){
            callbackQuery(results);
        }else{
            console.log(err);
            results = null;
        }
    }) 
};

/*
    Kết thúc xử lý cho giao diện học kỳ
*/

/*
    Bắt đầu giao diện cập nhật nhân viên
*/

//lấy danh sách nhân viên
exports.cnnvlayds = function(callbackQuery){
    connect();
    connection.query("SELECT * FROM nhanvienphongdaotao",(err,results)=>{
        if(!err){
            callbackQuery(results);
        }else{
            console.log(err);
            results = null;
        }
    })  
};

exports.themnhanvien = function(data,callbackQuery){
    connect();
    connection.query("Insert into nhanvienphongdaotao Set ? ",[data],(err,results)=>{
        if(!err){
            callbackQuery(results);
        }else{
            console.log(err);
            results = null;
        }
    });  
};
exports.themtaikhoannv = function(tk,callbackQuery){
    connect();
    connection.query("Insert into taikhoannv Set ?",[tk],(err,results)=>{
        if(!err){
            callbackQuery(results);
        }else{
            console.log(err);
            results = null;
        }
    });
};

exports.nvchuyendentrangcapnhat = function(masv,callbackQuery){
    connect();
    connection.query("Select * from nhanvienphongdaotao where MaNV = ?",[masv],(err,results)=>{
        if(!err){
            callbackQuery(results);
        }else{
            console.log(err);
            results = null;
        }
    })  
};

exports.capnhatnhanvien = function(manv,hoten,diachi,sodt,ngaysinh,gioitinh,makhoa,callbackQuery){
    connect();
    connection.query("update nhanvienphongdaotao set HoTen = ?, DiaChi = ?, SoDT = ?, NgaySinh = ?, GioiTinh = ?, MaKhoa = ? where MaNV = ?",
    [hoten,diachi,sodt,ngaysinh,gioitinh,makhoa,manv],(err,results)=>{
        if(!err){
            callbackQuery(results);
        }else{
            console.log(err);
            results = null;
        }
    }) 
};

// Xóa nhân viên
exports.xoanhanvien = function(manv,callbackQuery){
    connect();
    connection.query("Delete from nhanvienphongdaotao where MaNV = ?",[manv],(err,results)=>{
        if(!err){
            callbackQuery(results);
        }else{
            console.log(err);
            results = null;
        }
    })  
};
//Xóa tài khoản nhân viên
exports.xoataikhoanhanvien = function(manv,callbackQuery){
    connect();
    connection.query("Delete from taikhoannv where MaTaiKhoan = ?",[manv],(err,results)=>{
        if(!err){
            callbackQuery(results);
        }else{
            console.log(err);
            results = null;
        }
    })  
};

//cap nhat lại mật khẩu
exports.nvdatlaimatkhau = function(mk,manv,callbackQuery){
    connect();
    connection.query("update taikhoannv set Pass = ? where MaTaiKhoan = ?",[mk,manv],(err,results)=>{
        if(!err){
            callbackQuery(results);
        }else{
            console.log(err);
            results = null;
        }
    }) 
};

//lấy mã tự động
exports.nvlaymatudong = function(callbackQuery){
    connect();
    connection.query("SELECT nhanvienphongdaotao.MaNV FROM nhanvienphongdaotao order by nhanvienphongdaotao.MaNV desc;",(err,results)=>{
        if(!err){
            callbackQuery(results);
        }else{
            console.log(err);
            results = null;
        }
    }) 
};

exports.nvlaymkduoicsdl = function(manv,callbackQuery){
    connect();
    connection.query("SELECT * FROM taikhoannv where MaTaiKhoan = ?",[manv],(err,results)=>{
        if(!err){
            callbackQuery(results);
        }else{
            console.log(err);
            results = null;
        }
    }) 
};


/*
    Kết thúc giao diện cập nhật nhân viên
*/

/*
    Bắt đầu xử lý giao diện nhập điểm
*/

exports.nvnhapdiemlaymalop = function(callbackQuery){
    connect();
    connection.query("SELECT phieudangkylhp.MaLopHP FROM phieudangkylhp group by phieudangkylhp.MaLopHP",(err,results)=>{
        if(!err){
            callbackQuery(results);
        }else{
            console.log(err);
            results = null;
        }
    }) 
};

exports.nvnhapdiemlaydssv = function(malop,callbackQuery){
    connect();
    connection.query("SELECT ph.MSSV,sv.HoTen,ph.MaLopHP,ph.DiemTK,ph.DiemGK,ph.DiemTH,ph.DiemCK FROM sqlquanlyhocphan.phieudangkylhp ph join sqlquanlyhocphan.sinhvien sv on ph.MSSV = sv.MSSV where MaLopHP = ? and Nhom = 'LT'",[malop],(err,results)=>{
        if(!err){
            callbackQuery(results);
        }else{
            console.log(err);
            results = null;
        }
    }) 
};

exports.nvnhapdiemlaysv = function(mssv,malop,callbackQuery){
    connect();
    connection.query("SELECT * FROM sqlquanlyhocphan.phieudangkylhp where MSSV = ? and MaLopHP = ? and Nhom = 'LT'",[mssv,malop],(err,results)=>{
        if(!err){
            callbackQuery(results);
        }else{
            console.log(err);
            results = null;
        }
    }) 
};

exports.nvnhapdiemcapnhatdiem = function(diemtk,diemgk,diemth,diemck,masv,malop,callbackQuery){
    connect();
    connection.query("update sqlquanlyhocphan.phieudangkylhp set DiemTK = ?, DiemGK = ? , DiemTH = ? , DiemCK = ? where MSSV = ? and MaLopHP = ? and Nhom = 'LT'",[diemtk,diemgk,diemth,diemck,masv,malop],(err,results)=>{
        if(!err){
            callbackQuery(results);
        }else{
            console.log(err);
            results = null;
        }
    }) 
};

/*
   Kết thúc xử lý giao diện nhập điểm
*/