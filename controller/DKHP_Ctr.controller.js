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

//đăng ký học phần ntnt
module.exports.dangkyhocphan = function(req,res){
    var hocky = req.query.hocky;
    var namhoc = req.query.namhoc;
    

    const { cookies } = req;
    var mssv = cookies.mssv
    console.log(mssv);

    var mamonhoc = req.query.monhp;
    var malophoc = req.query.lophocphan;

    var manhomth =  req.query.nhomth;
    var manhomlt =  req.query.nhomlt;
    var chonlophocdadangky =  req.query.lhpddk;

    console.log("học kỳ:"+hocky);
    console.log("năm học:"+namhoc);
    console.log("mã môn học"+mamonhoc);
    console.log("mã lớp học"+malophoc);
    var listmh;
    var listlh;
    var listthuchanh;
    var listlythuyet;
    var listmonhocdadangky;
    var lophoc;
    var monhoctienquyet;
    var dahocmontienquyet;
    var lophochuy;
    var lophocdangky;
    var mess="";
    var mess1="";
    var mess2="";
    console.log("mã th:"+manhomth);
    console.log("mã lt:"+manhomlt);
    console.log("mã lớp đã chọn để hủy:"+chonlophocdadangky);

    if(chonlophocdadangky!=""){
         database.huydangkyhocphanchosinhvien(mssv,chonlophocdadangky);
         database.laymotlophocphanchosinhvien(chonlophocdadangky, function (resultQuery5) {
            lophochuy = resultQuery5;
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

    database.laydanhsachmonhocphanchosinhvien(mssv,hocky,namhoc, function (resultQuery){
             listmh = resultQuery;
            console.log("listmh:"+ listmh[0]);
            //console.log("listmh mã 0 :"+ listmh[0].MaMHP);
            //console.log("resultQuerymh"+ resultQuery.length);
                database.laydanhsachlophocphanchosinhvien(mamonhoc, function (resultQuery1){ 
                     listlh = resultQuery1;
                    //console.log("listlh:"+ listlh[0].MalopHP);
                    // console.log("resultQuerylh"+ resultQuery1.length);
                    database.laydanhsachlophodadangkychosinhvien(hocky,namhoc,mssv, function (resultQuery2){
                        listmonhocdadangky = resultQuery2
                        database.laydanhsachlophocphanthuchanhchosinhvien(malophoc, function (resultQuery3){ 
                            listthuchanh = resultQuery3;
                            
                            database.laydanhsachlophocphanlythuyetchosinhvien(malophoc, function (resultQuery4){
                                
                                listlythuyet = resultQuery4;

                               //kiểm tra trường hợp đăng ký lý thuyết mà không đăng ký thực hành 
                               if(listthuchanh.length>0 && listlythuyet.length>0 && manhomth!= null && manhomlt != null){
                                console.log("thực hành lý thuyết >0 mã nhóm thực hành lý thuyết khác null");

                                //kiểm tra xem lớp đầy chưa
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
                                        
                                    }else{
                                        //kiểm tra lớp học phần có môn học tiên quyết hay không
                                        database.laymonhocphantienquyetchosinhvien(malophoc,function (resultQuery7) {
                                            monhoctienquyet = resultQuery7;
                                            if(monhoctienquyet.length>0){
                                                console.log("mon hoc phan tien quyet:"+monhoctienquyet[0].TenMHHP);
                                                //kiểm tra sinh viên đã học môn tiên quyết chưa
                                                database.sinhviendahocphantienquyetchua(malophoc,mssv, function (resultQuery8) {
                                                    dahocmontienquyet= resultQuery8;
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
                                            database.laymonhocphantienquyetchosinhvien(malophoc,function (resultQuery7) {
                                                monhoctienquyet = resultQuery7;
                                                if(monhoctienquyet.length>0){
                                                    console.log("mon hoc phan tien quyet:"+monhoctienquyet[0].TenMHHP);

                                                    //kiểm tra sinh viên đã học môn tiên quyết chưa
                                                    database.sinhviendahocphantienquyetchua(malophoc,mssv, function (resultQuery8) {
                                                        dahocmontienquyet= resultQuery8;
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
                                    
                             });
                        
                          
    
                        });
                     }); 
                   
                   
                 });
    });
};
