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

let mess ="";

module.exports.dangkyhocphan = function (req, res){
    var hocky = req.query.hocky;
    var namhoc = req.query.namhoc;

    const { cookies } = req;
    var mssv = cookies.mssv
    console.log(mssv);

    var monhp = req.query.monhp;

    var chonlophocdadangky =  req.query.lhpddk;

    if(chonlophocdadangky!=""){
        database.huydangkyhocphanchosinhvien(mssv,chonlophocdadangky);
        database.laymotlophocphanchosinhvien(chonlophocdadangky, function (lophochuy) {
           console.log(lophochuy);
           if(lophochuy!=""){
               console.log("lophochuy:"+lophochuy[0].DaDangKy);
               var x = lophochuy[0].DaDangKy;
               console.log("x:"+x);
               x = parseInt(x)-1;
               console.log("x2:"+x);
               database.updatesisosinhviendadangkytrongmotlop(x,chonlophocdadangky);
           }
        });
   }

    database.laydanhsachmonhocphanchosinhvien(mssv,hocky,namhoc, function (listmh){
        database.laydanhsachlophocphanchosinhvien(monhp, function (listlh){
            database.laydanhsachlophodadangkychosinhvien(hocky,namhoc,mssv, function (listmonhocdadangky){
                console.log(monhp);
                // console.log(listlh);
                // console.log(monhp);
                return res.render('./bodySinhVien/GD_SV_dkhp1',{
                    layout: './layouts/layoutSinhVien', 
                    title: 'Đăng Ký Học Phần',listmh, namhoc, hocky,listlh, listmonhocdadangky});
            });
        });
    });
    
}

// module.exports.laydslophp = function (req, res){
//     const monhp = req.params.monhp;
//     const hocky = req.query.hocky;
//     const namhoc = req.query.namhoc;
//     database.laydanhsachlophocphanchosinhvien(monhp, function (listlh){
//         database.laydanhsachlophodadangkychosinhvien(hocky,namhoc,mssv, function (listmonhocdadangky){
//         // console.log(listlh);
//         // console.log(monhp);
//             return res.render('./bodySinhVien/GD_SV_DKLop',{
//                 layout: './layouts/layoutSinhVien', 
//                 title: 'Đăng Ký Học Phần', listlh, listmonhocdadangky});
//         });
//     });
// }

module.exports.laydsnhomdk = function (req, res){
    const malophoc = req.params.malophoc;
    const manhomth =  req.query.nhomth;
    const manhomlt =  req.query.nhomlt;
    database.laydanhsachlophocphanthuchanhchosinhvien(malophoc, function (listthuchanh){ 
        database.laydanhsachlophocphanlythuyetchosinhvien(malophoc, function (listlythuyet){
            console.log(listthuchanh);
            console.log(listlythuyet);
            console.log(malophoc);
            if(listthuchanh.length>0 && listlythuyet.length>0 && manhomth!= null && manhomlt != null){
                console.log("thực hành lý thuyết >0 mã nhóm thực hành lý thuyết khác null");
                  database.laymotlophocphanchosinhvien(malophoc, function (lophoc) {
                    // console.log("lophoc"+ lophoc[0].DaDangKy);
                    // console.log("lophoc"+ lophoc[0].SiSo);
                    if(lophoc[0].DaDangKy == lophoc[0].SiSo){
                        mess ="lớp học đã đủ người";
                        // console.log("mess"+mess);
                        //res.send(mess);
                        return res.render('./bodySinhVien/GD_SV_DKLop',{
                            layout: './layouts/layoutSinhVien' , 
                            title: 'Đăng Ký Học Phần', 
                            listthuchanh,
                            listlythuyet,
                            listmonhocdadangky, 
                            namhoc, 
                            mamonhoc,
                            malophoc,
                            mess,
                            mess1,
                            mess2
                        });
                        
                    }else{
                        //kiểm tra lớp học phần có môn học tiên quyết hay không
                        database.laymonhocphantienquyetchosinhvien(malophoc,function (monhoctienquyet) {
                            if(monhoctienquyet.length>0){
                                console.log("mon hoc phan tien quyet:"+monhoctienquyet[0].TenMHHP);
                                //kiểm tra sinh viên đã học môn tiên quyết chưa
                                database.sinhviendahocphantienquyetchua(malophoc,mssv, function (dahocmontienquyet) {
                                    //sinh viên chưa học môn tiên quyết
                                    if(dahocmontienquyet.length<=0){
                                    mess1="chưa học môn tiên quyết";     
                                    //console.log("đã học môn tiên quyết <=0"+ dahocmontienquyet[0].TenMHHP);
                                    return res.render('./bodySinhVien/GD_SV_dkhp',{
                                        layout: './layouts/layoutSinhVien' , 
                                        title: 'Đăng Ký Học Phần', 
                                        listmh, 
                                        listlh,
                                        listthuchanh,
                                        listlythuyet,
                                        listmonhocdadangky, 
                                        namhoc, 
                                        hocky,
                                        mamonhoc,
                                        malophoc,
                                        mess,
                                        mess1,
                                        mess2
                                    });
                                    //sinh viên đã học môn tiên quyết
                                    }else{
                                        mess1="đã học học môn tiên quyết"; 
                                        console.log("đã học môn tiên quyết"+ dahocmontienquyet[0].TenMHHP);
        
                                        //kiểm tra trùng thời gian cho sinh viên
                                        database.kiemtralichtrungthoigianchosinhvien(hocky,namhoc,mssv,malophoc,manhomlt, function (ktthoigian) {
                                            //sinh viên bị trùng thời gian 
                                            if(ktthoigian.length> 0){
                                                    mess2="trùng lịch học lý thuyết"
                                                    return res.render('./bodySinhVien/GD_SV_DKLop',{
                                                        layout: './layouts/layoutSinhVien' , 
                                                        title: 'Đăng Ký Học Phần', 
                                                        listmh, 
                                                        listlh,
                                                        listthuchanh,
                                                        listlythuyet,
                                                        listmonhocdadangky, 
                                                        namhoc, 
                                                        hocky,
                                                        mamonhoc,
                                                        malophoc,
                                                        mess,
                                                        mess1,
                                                        mess2
                                                    });
                                            //sinh viên không bị trùng lịch học     
                                            }else{
                                                console.log("mã nhóm thực hành kiểm tra:"+manhomth);
                                                database.kiemtralichtrungthoigianchosinhvien(hocky,namhoc,mssv,malophoc,manhomth, function (ktthoigianthuchanh) {
                                                    if(ktthoigianthuchanh.length> 0){
                                                        mess2="trùng lịch học thực hành"
                                                        return res.render('./bodySinhVien/GD_SV_dkhp',{
                                                            layout: './layouts/layoutSinhVien' , 
                                                            title: 'Đăng Ký Học Phần', 
                                                            listmh, 
                                                            listlh,
                                                            listthuchanh,
                                                            listlythuyet,
                                                            listmonhocdadangky, 
                                                            namhoc, 
                                                            hocky,
                                                            mamonhoc,
                                                            malophoc,
                                                            mess,
                                                            mess1,
                                                            mess2
                                                        });
                                                    }else{
                                                        mess2="không trùng lịch học"
                                                        //thêm đăng ký 2
                                                        database.dangkyhocphanchosinhvien(mssv,malophoc,manhomlt);
                                                        database.dangkyhocphanchosinhvien(mssv,malophoc,manhomth);
        
                                                        //tăng 1 sinh viên cho lớp học
                                                        database.laymotlophocphanchosinhvien(malophoc, function (resultQuery5) {
                                                            lophocdangky = resultQuery5;
                                                            if(lophocdangky!=""){
                                                                console.log("lophochuy:"+lophocdangky[0].DaDangKy);
                                                                var x = lophocdangky[0].DaDangKy;
                                                                console.log("x:"+x);
                                                                x = parseInt(x)+1;
                                                                console.log("x2:"+x);
                                                                database.updatesisosinhviendadangkytrongmotlop(x,malophoc);
                                                            }
                                                         });   
                                                        return res.render('./bodySinhVien/GD_SV_dkhp',{
                                                            layout: './layouts/layoutSinhVien' , 
                                                            title: 'Đăng Ký Học Phần', 
                                                            listmh, 
                                                            listlh,
                                                            listthuchanh,
                                                            listlythuyet,
                                                            listmonhocdadangky, 
                                                            namhoc, 
                                                            hocky,
                                                            mamonhoc,
                                                            malophoc,
                                                            mess,
                                                            mess1,
                                                            mess2
                                                        });
                                                    }
                                                });
                                              
                                            } 
                                    
        
                                        });
                                    }
                                
                                })
                            }else{
                               //kiểm tra trùng thời gian cho sinh viên
                                database.kiemtralichtrungthoigianchosinhvien(hocky,namhoc,mssv,malophoc,manhomlt, function (ktthoigian) {
                                    //sinh viên bị trùng thời gian 
                                   
                                    if(ktthoigian.length> 0){
                                            mess2="trùng lịch học lý thuyết"
                                            return res.render('./bodySinhVien/GD_SV_dkhp',{
                                                layout: './layouts/layoutSinhVien' , 
                                                title: 'Đăng Ký Học Phần', 
                                                listmh, 
                                                listlh,
                                                listthuchanh,
                                                listlythuyet,
                                                listmonhocdadangky, 
                                                namhoc, 
                                                hocky,
                                                mamonhoc,
                                                malophoc,
                                                mess,
                                                mess1,
                                                mess2
                                            });
                                    //sinh viên không bị trùng lịch học     
                                    }else{
                                        console.log("mã nhóm thực hành kiểm tra:"+manhomth);
                                        database.kiemtralichtrungthoigianchosinhvien(hocky,namhoc,mssv,malophoc,manhomth, function (ktthoigianthuchanh) {
                                            if(ktthoigianthuchanh.length> 0){
                                                mess2="trùng lịch học thực hành"
                                                return res.render('./bodySinhVien/GD_SV_dkhp',{
                                                    layout: './layouts/layoutSinhVien' , 
                                                    title: 'Đăng Ký Học Phần', 
                                                    listmh, 
                                                    listlh,
                                                    listthuchanh,
                                                    listlythuyet,
                                                    listmonhocdadangky, 
                                                    namhoc, 
                                                    hocky,
                                                    mamonhoc,
                                                    malophoc,
                                                    mess,
                                                    mess1,
                                                    mess2
                                                });
                                            }else{
                                                mess2="Đăng ký thành công"
                                                //thêm đăng ký 3
                                                database.dangkyhocphanchosinhvien(mssv,malophoc,manhomlt);
                                                database.dangkyhocphanchosinhvien(mssv,malophoc,manhomth);
        
                                                 //tăng 1 sinh viên cho lớp học
                                                 database.laymotlophocphanchosinhvien(malophoc, function (resultQuery5) {
                                                    lophocdangky = resultQuery5;
                                                    if(lophocdangky!=""){
                                                        console.log("lophochuy:"+lophocdangky[0].DaDangKy);
                                                        var x = lophocdangky[0].DaDangKy;
                                                        console.log("x:"+x);
                                                        x = parseInt(x)+1;
                                                        console.log("x2:"+x);
                                                        database.updatesisosinhviendadangkytrongmotlop(x,malophoc);
                                                    }
                                                 });  
                                                return res.render('./bodySinhVien/GD_SV_dkhp',{
                                                    layout: './layouts/layoutSinhVien' , 
                                                    title: 'Đăng Ký Học Phần', 
                                                    listmh, 
                                                    listlh,
                                                    listthuchanh,
                                                    listlythuyet,
                                                    listmonhocdadangky, 
                                                    namhoc, 
                                                    hocky,
                                                    mamonhoc,
                                                    malophoc,
                                                    mess,
                                                    mess1,
                                                    mess2
                                                });
                                            }
                                        });
                                      
                                    } 
                            
        
                                });
                                
                            }
        
        
                        })
                    }
        
                });
        
               }
               //kiểm tra trường hợp không có thực hành, có lý thuyết nhưng không chọn lý thuyết    
               else if(listthuchanh.length<=0 && listlythuyet.length>0 && manhomth== null && manhomlt != null){
                    console.log("thực hành <=0 lý thuyết >0 mã nhóm thực hành null lý thuyết khác null");
        
                    //kiểm tra xem lớp đầy chưa
                    database.laymotlophocphanchosinhvien(malophoc, function (resultQuery5) {
                        lophoc = resultQuery5;
                        console.log("lophoc"+ lophoc[0].DaDangKy);
                        console.log("lophoc"+ lophoc[0].SiSo);
                        if(lophoc[0].DaDangKy == lophoc[0].SiSo){
                            mess ="lớp học đã đủ người";
                            console.log("mess"+mess);
                            //res.send(mess);
                            return res.render('./bodySinhVien/GD_SV_dkhp',{
                                layout: './layouts/layoutSinhVien' , 
                                title: 'Đăng Ký Học Phần', 
                                listmh, 
                                listlh,
                                listthuchanh,
                                listlythuyet,
                                listmonhocdadangky, 
                                namhoc, 
                                hocky,
                                mamonhoc,
                                malophoc,
                                mess,
                                mess1,
                                mess2
                            });
                            
                        }
                        else{
                            //kiểm tra lớp học phần có môn học tiên quyết hay không
                            database.laymonhocphantienquyetchosinhvien(malophoc,function (monhoctienquyet) {
                                if(monhoctienquyet.length>0){
                                    console.log("mon hoc phan tien quyet:"+monhoctienquyet[0].TenMHHP);
        
                                    //kiểm tra sinh viên đã học môn tiên quyết chưa
                                    database.sinhviendahocphantienquyetchua(malophoc,mssv, function (dahocmontienquyet) {
                                        //sinh viên chưa học môn tiên quyết
                                        if(dahocmontienquyet.length<=0){
                                        mess1="chưa học môn tiên quyết";     
                                        //console.log("đã học môn tiên quyết <=0"+ dahocmontienquyet[0].TenMHHP);
                                        return res.render('./bodySinhVien/GD_SV_dkhp',{
                                            layout: './layouts/layoutSinhVien' , 
                                            title: 'Đăng Ký Học Phần', 
                                            listmh, 
                                            listlh,
                                            listthuchanh,
                                            listlythuyet,
                                            listmonhocdadangky, 
                                            namhoc, 
                                            hocky,
                                            mamonhoc,
                                            malophoc,
                                            mess,
                                            mess1,
                                            mess2
                                        });
                                        //sinh viên đã học môn tiên quyết
                                        }else{
                                            mess1="đã học học môn tiên quyết"; 
                                            console.log("đã học môn tiên quyết"+ dahocmontienquyet[0].TenMHHP);
        
                                            //kiểm tra trùng thời gian cho sinh viên
                                            database.kiemtralichtrungthoigianchosinhvien(hocky,namhoc,mssv,malophoc,manhomlt, function (ktthoigian) {
                                            //sinh viên bị trùng thời gian 
                                            if(ktthoigian.length> 0){
                                                    mess2="trùng lịch học"
                                                    return res.render('./bodySinhVien/GD_SV_dkhp',{
                                                        layout: './layouts/layoutSinhVien' , 
                                                        title: 'Đăng Ký Học Phần', 
                                                        listmh, 
                                                        listlh,
                                                        listthuchanh,
                                                        listlythuyet,
                                                        listmonhocdadangky, 
                                                        namhoc, 
                                                        hocky,
                                                        mamonhoc,
                                                        malophoc,
                                                        mess,
                                                        mess1,
                                                        mess2
                                                    });
                                            //sinh viên không bị trùng lịch học     
                                            }
                                            else{
                                                mess2="Đăng ký thành công"
                                                database.dangkyhocphanchosinhvien(mssv,malophoc,manhomlt);
        
                                                 //tăng 1 sinh viên cho lớp học
                                                 database.laymotlophocphanchosinhvien(malophoc, function (resultQuery5) {
                                                    lophocdangky = resultQuery5;
                                                    if(lophocdangky!=""){
                                                        console.log("lophochuy:"+lophocdangky[0].DaDangKy);
                                                        var x = lophocdangky[0].DaDangKy;
                                                        console.log("x:"+x);
                                                        x = parseInt(x)+1;
                                                        console.log("x2:"+x);
                                                        database.updatesisosinhviendadangkytrongmotlop(x,malophoc);
                                                    }
                                                 });  
                                                return res.render('./bodySinhVien/GD_SV_dkhp',{
                                                    layout: './layouts/layoutSinhVien' , 
                                                    title: 'Đăng Ký Học Phần', 
                                                    listmh, 
                                                    listlh,
                                                    listthuchanh,
                                                    listlythuyet,
                                                    listmonhocdadangky, 
                                                    namhoc, 
                                                    hocky,
                                                    mamonhoc,
                                                    malophoc,
                                                    mess,
                                                    mess1,
                                                    mess2
                                                });
                                                
                                               
                                                
                                            } 
                                            console.log("mess21"+mess2);
                                           
                                            });
                                            console.log("mess22"+mess2);
                                        }
                                    
                                    });
                                }else{
                                     //kiểm tra trùng thời gian cho sinh viên
                                     database.kiemtralichtrungthoigianchosinhvien(hocky,namhoc,mssv,malophoc,manhomlt, function (ktthoigian) {
                                        //sinh viên bị trùng thời gian 
                                        if(ktthoigian.length> 0){
                                            mess2="Trùng lịch học"
                                            return res.render('./bodySinhVien/GD_SV_dkhp',{
                                                layout: './layouts/layoutSinhVien' , 
                                                title: 'Đăng Ký Học Phần', 
                                                listmh, 
                                                listlh,
                                                listthuchanh,
                                                listlythuyet,
                                                listmonhocdadangky, 
                                                namhoc, 
                                                hocky,
                                                mamonhoc,
                                                malophoc,
                                                mess,
                                                mess1,
                                                mess2
                                            });
                                        //sinh viên không bị trùng lịch học     
                                        }else{
                                            mess2="Đăng ký thành công"
                                            database.dangkyhocphanchosinhvien(mssv,malophoc,manhomlt);
                                             //tăng 1 sinh viên cho lớp học
                                             database.laymotlophocphanchosinhvien(malophoc, function (resultQuery5) {
                                                lophocdangky = resultQuery5;
                                                if(lophocdangky!=""){
                                                    console.log("lophochuy:"+lophocdangky[0].DaDangKy);
                                                    var x = lophocdangky[0].DaDangKy;
                                                    console.log("x:"+x);
                                                    x = parseInt(x)+1;
                                                    console.log("x2:"+x);
                                                    database.updatesisosinhviendadangkytrongmotlop(x,malophoc);
                                                }
                                             });  
                                
                                            
                                            return res.render('./bodySinhVien/GD_SV_dkhp',{
                                                layout: './layouts/layoutSinhVien' , 
                                                title: 'Đăng Ký Học Phần', 
                                                listmh, 
                                                listlh,
                                                listthuchanh,
                                                listlythuyet,
                                                listmonhocdadangky, 
                                                namhoc, 
                                                hocky,
                                                mamonhoc,
                                                malophoc,
                                                mess,
                                                mess1,
                                                mess2
                                            }); 
                                        } 
                                        console.log("mess21"+mess2);
                                       
                                        });
                                    
                                }
        
        
                            });
                        }
                    });
               }
               else{
                return res.render('./bodySinhVien/GD_SV_dkhp',{
                    layout: './layouts/layoutSinhVien' , 
                    title: 'Đăng Ký Học Phần', 
                    listmh, 
                    listlh,
                    listthuchanh,
                    listlythuyet,
                    listmonhocdadangky, 
                    namhoc,
                    hocky,
                    mamonhoc,
                    malophoc,
                    mess,
                    mess1,
                    mess2
                });
               }
            return res.render('./bodySinhVien/GD_SV_dkhplh',{
                layout: './layouts/layoutSinhVien', 
                title: 'Đăng Ký Học Phần', listthuchanh, listlythuyet});
        });
    });
}