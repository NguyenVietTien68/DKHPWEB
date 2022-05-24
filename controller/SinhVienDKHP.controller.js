var database = require("../database");
module.exports.dangkyhocphan = function (req, res) {
    const { cookies } = req;
    var mssv = cookies.mssv
    // console.log(mssv);
    // console.log(month);
    // console.log(year);
    // console.log(hockykiemtra);
    let hockykiemtra1;
    let namhockiemtra1;
    let d = new Date();
    let year = d.getFullYear();
    let month = d.getMonth()+1;
    // let month = 9;
    // let year = 2021;
    // console.log(month);      
    // let day = d.getDate();
    if (month <= 5) {
        hockykiemtra1 = "2";            
        year = year - 1;            }
    else if (6 <= month && month <= 7) {
        hockykiemtra1 = "3";
        year = year - 1;            }
    else if (8 <= month && month <= 12) {
        hockykiemtra1 = "1";
    }
    namhockiemtra1 = year + "-"+ (year+1);
    console.log(namhockiemtra1,hockykiemtra1);
    database.getAllHocKy(function (listhocky) {
        database.getAllNamHoc(function (listnamhoc) {
            database.getKhoaHocSV(mssv, function (khoa) {
                let hocky = req.query.hocky;
                // console.log("hoc ky: "+hocky);
                let namhoc = req.query.namhoc;
                // console.log("nam hoc: "+namhoc);
                var monhp = req.query.monhp;
                var chonlophocdadangky = req.query.lhpddk;
                // console.log(hocky)
                let dadangky;
                let tachkhoa = khoa[0].KhoaHoc.slice(0, 4);
                let viTri;
                // console.log(tachkhoa);
                for (let i = 0; i < listnamhoc.length; i++) {
                    let tachchuoiNam = (listnamhoc[i].Nam).slice(0, 4);
                    if (tachchuoiNam == tachkhoa) {
                        viTri = i;
                    }
                }
                // console.log(viTri);
                let listnamhoca = new Array();
                for (let a = viTri; a < viTri + 4; a++) {
                    if (listnamhoc[a] != undefined) {
                        listnamhoca.push(listnamhoc[a]);
                    }
                }
                database.laydanhsachlophodadangkychosinhvien(hocky, namhoc, mssv, function (listmonhocdadangky) {
                    // console.log(listmonhocdadangky);
                    dadangky = listmonhocdadangky;
                    if (chonlophocdadangky != "") {
                        database.huydangkyhocphanchosinhvien(mssv, chonlophocdadangky);
                        database.laymotlophocphanchosinhvien(chonlophocdadangky, function (lophochuy) {
                            // console.log(lophochuy);
                            if (lophochuy != "") {
                                // console.log("lophochuy:" + lophochuy[0].DaDangKy);
                                var x = lophochuy[0].DaDangKy;
                                // console.log("x:" + x);
                                x = parseInt(x) - 1;
                                // console.log("x2:" + x);
                                database.updatesisosinhviendadangkytrongmotlop(x, chonlophocdadangky);
                            }
                        });
                    }
                    database.laydanhsachmonhocphanchosinhvien(mssv, hocky, namhoc, function (listmh) {
                        // console.log(khoa[0].KhoaHoc);
                        // console.log(listnamhoca);
                        database.laydanhsachlophocphanchosinhvien(monhp, function (listlh) {
                            // console.log(monhp);
                            // console.log(listlh);
                            // console.log(monhp);
                            // console.log(listmonhocdadangky);
                            return res.render('./bodySinhVien/GD_SV_dkhp1', {
                                layout: './layouts/layoutSinhVien',
                                title: 'Đăng Ký Học Phần', namhockiemtra1, hockykiemtra1, listmh, namhoc, hocky, listlh, listmonhocdadangky, listhocky, listnamhoc: listnamhoca
                            });
                        });
                    });
                })
            });
        })
    })
}

module.exports.laydsnhomdk = function (req, res) {
    let mess = "";
    const MaLopHP = req.params.malophoc;
    const manhomth = req.query.nhomth;
    const manhomlt = req.query.nhomlt;
    const hocky = req.params.hocky;
    const namhoc = req.params.namhoc;
    database.laydanhsachlophocphanthuchanhchosinhvien(MaLopHP, function (listthuchanh) {
        database.laydanhsachlophocphanlythuyetchosinhvien(MaLopHP, function (listlythuyet) {
            // console.log(listthuchanh);
            // console.log(listlythuyet);
            // console.log(MaLopHP);
            // database.layhockykiemtra(MaLopHP, function (kt){
            //     const hockykiemtra = kt[0].HocKy;
            //     const namkiemtra = kt[0].Nam;
            //     console.log(hockykiemtra);
            //     console.log(namkiemtra);
            // })
            // console.log(hocky);
            // console.log(namhoc);
            // return res.render('./bodySinhVien/GD_SV_thongbao', { layout: './layouts/layoutSinhVien', title: 'Đăng ký học phần', listthuchanh, listlythuyet, MaLopHP, mess });

            return res.render('./bodySinhVien/GD_SV_dkhplh', { layout: './layouts/layoutSinhVien', title: 'Đăng ký nhóm', listthuchanh, listlythuyet, MaLopHP, mess });
        });
    });
};

module.exports.kiemtralopchosinhvien = function (req, res) {
    let mess = "";
    // var today = new Date();
    // var date = today.getDate()+'-'+(today.getMonth()+1)+'-'+today.getFullYear();
    // var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    // var dateTime = date+' '+time;

    // console.log(date);
    const MaLopHP = req.params.malophoc;
    database.laymotlophocphanchosinhvien(MaLopHP, function (lophoc) {
        // console.log(MaLopHP);
        // console.log(lophoc);
        // console.log(lophoc[0].DaDangKy);
        // console.log(lophoc[0].SiSo);
        let manhomth = req.query.nhomth;
        let manhomlt = req.query.nhomlt;

        const { cookies } = req;
        var mssv = cookies.mssv
        // console.log(mssv);
        // console.log(manhomth);
        // console.log(manhomlt);
        database.laydanhsachlophocphanthuchanhchosinhvien(MaLopHP, function (listthuchanh) {
            database.laydanhsachlophocphanlythuyetchosinhvien(MaLopHP, function (listlythuyet) {

                //đăng ký môn lý thuyết
                if (listthuchanh.length == 0 && listlythuyet.length > 0 && manhomth == null && manhomlt != null) {
                    // mess="Xong check";
                    // return res.render('./bodySinhVien/GD_SV_dkhplh',{layout:'./layouts/layoutSinhVien', title:'Đăng ký nhóm',listthuchanh,listlythuyet, MaLopHP, mess})
                    if (lophoc[0].DaDangKy == lophoc[0].SiSo) {
                        mess = "Thông báo: Lớp đã đầy "
                        return res.render('./bodySinhVien/GD_SV_dkhplh', { layout: './layouts/layoutSinhVien', title: 'Đăng ký nhóm', listthuchanh, listlythuyet, MaLopHP, mess })
                    } else {
                        database.laymonhocphantienquyetchosinhvien(MaLopHP, function (montienquyet) {
                            if (montienquyet.length > 0) {
                                database.sinhviendahocphantienquyetchua(MaLopHP, mssv, function (dahocmontienquyet) {
                                    if (dahocmontienquyet.length <= 0) {
                                        //Sinh viên chưa học môn tiên quyết
                                        mess = "Thông báo: Bạn chưa học môn tiên quyết";
                                        return res.render('./bodySinhVien/GD_SV_dkhplh', { layout: './layouts/layoutSinhVien', title: 'Đăng ký nhóm', listthuchanh, listlythuyet, MaLopHP, mess });
                                    } else {
                                        database.layhockykiemtra(MaLopHP, function (kt) {
                                            const hockykiemtra = kt[0].HocKy;
                                            const namkiemtra = kt[0].Nam;
                                            // console.log(hockykiemtra);
                                            // console.log(namkiemtra);
                                            //Kiểm tra trùng lịch học lý thuyết
                                            database.kiemtralichtrungthoigianchosinhvien(hockykiemtra, namkiemtra, mssv, MaLopHP, manhomlt, function (ktthoigian) {
                                                //Thời gian học lý thuyết bị trùng
                                                if (ktthoigian.length > 0) {
                                                    mess = "Thông báo: Bị trùng lịch học lý thuyết ";
                                                    return res.render('./bodySinhVien/GD_SV_dkhplh', { layout: './layouts/layoutSinhVien', title: 'Đăng ký nhóm', listthuchanh, listlythuyet, MaLopHP, mess });
                                                } else {
                                                    //Kiểm tra lịch học thực hành 
                                                    // console.log("Hoàn thành kiểm tra");
                                                    database.dangkyhocphanchosinhvien(mssv, MaLopHP, manhomlt);
                                                    //tăng 1 sinh viên cho lớp học
                                                    database.laymotlophocphanchosinhvien(MaLopHP, function (lophocdangky) {
                                                        if (lophocdangky != "") {
                                                            console.log("lophochuy:" + lophocdangky[0].DaDangKy);
                                                            var x = lophocdangky[0].DaDangKy;
                                                            console.log("x:" + x);
                                                            x = parseInt(x) + 1;
                                                            console.log("x2:" + x);
                                                            database.updatesisosinhviendadangkytrongmotlop(x, MaLopHP);
                                                        }
                                                    });
                                                    // return res.render('./bodySinhVien/GD_SV_dkhplh',{layout:'./layouts/layoutSinhVien', title:'Đăng ký nhóm', listthuchanh,listlythuyet, MaLopHP, mess});
                                                    return res.render('./bodySinhVien/GD_SV_thongbao', { layout: './layouts/layoutSinhVien', title: 'Đăng ký học phần' });

                                                }
                                            });
                                        })

                                    }
                                });
                                //Không có môn học tiên quyết
                            } else {
                                database.layhockykiemtra(MaLopHP, function (kt) {
                                    const hockykiemtra = kt[0].HocKy;
                                    const namkiemtra = kt[0].Nam;
                                    // console.log(hockykiemtra);
                                    // console.log(namkiemtra);
                                    //Kiểm tra trùng lịch học lý thuyết
                                    database.kiemtralichtrungthoigianchosinhvien(hockykiemtra, namkiemtra, mssv, MaLopHP, manhomlt, function (ktthoigian) {
                                        //Thời gian học lý thuyết bị trùng
                                        if (ktthoigian.length > 0) {
                                            mess = "Thông báo: Bị trùng lịch học lý thuyết ";
                                            return res.render('./bodySinhVien/GD_SV_dkhplh', { layout: './layouts/layoutSinhVien', title: 'Đăng ký nhóm', listthuchanh, listlythuyet, MaLopHP, mess });
                                        } else {
                                            //Kiểm tra lịch học thực hành 
                                            console.log("Hoàn thành kiểm tra");
                                            database.dangkyhocphanchosinhvien(mssv, MaLopHP, manhomlt);

                                            //tăng 1 sinh viên cho lớp học
                                            database.laymotlophocphanchosinhvien(MaLopHP, function (lophocdangky) {
                                                if (lophocdangky != "") {
                                                    console.log("lophochuy:" + lophocdangky[0].DaDangKy);
                                                    var x = lophocdangky[0].DaDangKy;
                                                    console.log("x:" + x);
                                                    x = parseInt(x) + 1;
                                                    console.log("x2:" + x);
                                                    database.updatesisosinhviendadangkytrongmotlop(x, MaLopHP);
                                                }
                                            });
                                            // return res.render('./bodySinhVien/GD_SV_dkhplh',{layout:'./layouts/layoutSinhVien', title:'Đăng ký nhóm', listthuchanh,listlythuyet, MaLopHP, mess});
                                            return res.render('./bodySinhVien/GD_SV_thongbao', { layout: './layouts/layoutSinhVien', title: 'Đăng ký học phần' });
                                        }
                                    });
                                })
                            }
                        });
                    }
                }
                if (listthuchanh.length == 0 && listlythuyet.length > 0 && manhomth == null && manhomlt == null) {
                    mess = "Chưa chọn lớp lý thuyết";
                    return res.render('./bodySinhVien/GD_SV_dkhplh', { layout: './layouts/layoutSinhVien', title: 'Đăng ký nhóm', listthuchanh, listlythuyet, MaLopHP, mess });
                }
                //Đăng ký cả nhóm lý thuyết và thực hành
                if (listthuchanh.length > 0 && listlythuyet.length > 0 && manhomth != null && manhomlt != null) {
                    //Kiểm tra số lượng sinh viên có trong lớp
                    if (lophoc[0].DaDangKy == lophoc[0].SiSo) {
                        //Lớp đầy
                        mess = "Thông báo: Lớp đã đầy "
                        return res.render('./bodySinhVien/GD_SV_dkhplh', { layout: './layouts/layoutSinhVien', title: 'Đăng ký nhóm', listthuchanh, listlythuyet, MaLopHP, mess })
                    } else {
                        //Kiểm tra môn học phần tiên quyết trước khi đăng ký
                        database.laymonhocphantienquyetchosinhvien(MaLopHP, function (montienquyet) {
                            //Nếu có môn học tiên quyết
                            if (montienquyet.length > 0) {
                                database.sinhviendahocphantienquyetchua(MaLopHP, mssv, function (dahocmontienquyet) {
                                    if (dahocmontienquyet.length <= 0) {
                                        //Sinh viên chưa học môn tiên quyết
                                        mess = "Thông báo: Bạn chưa học môn tiên quyết";
                                        return res.render('./bodySinhVien/GD_SV_dkhplh', { layout: './layouts/layoutSinhVien', title: 'Đăng ký nhóm', listthuchanh, listlythuyet, MaLopHP, mess });
                                    } else {
                                        database.layhockykiemtra(MaLopHP, function (kt) {
                                            const hockykiemtra = kt[0].HocKy;
                                            const namkiemtra = kt[0].Nam;
                                            // console.log(hockykiemtra);
                                            // console.log(namkiemtra);
                                            //Kiểm tra trùng lịch học lý thuyết
                                            database.kiemtralichtrungthoigianchosinhvien(hockykiemtra, namkiemtra, mssv, MaLopHP, manhomlt, function (ktthoigian) {
                                                //Thời gian học lý thuyết bị trùng
                                                if (ktthoigian.length > 0) {
                                                    mess = "Thông báo: Bị trùng lịch học lý thuyết ";
                                                    return res.render('./bodySinhVien/GD_SV_dkhplh', { layout: './layouts/layoutSinhVien', title: 'Đăng ký nhóm', listthuchanh, listlythuyet, MaLopHP, mess });
                                                } else {
                                                    //Kiểm tra lịch học thực hành 
                                                    database.kiemtralichtrungthoigianchosinhvien(hockykiemtra, namkiemtra, mssv, MaLopHP, manhomth, function (ktthoigianthuchanh) {
                                                        //Thời gian học thực hành bị trùng
                                                        if (ktthoigianthuchanh.length > 0) {
                                                            mess = "Thông báo: Bị trùng lịch học thực hành ";
                                                            return res.render('./bodySinhVien/GD_SV_dkhplh', { layout: './layouts/layoutSinhVien', title: 'Đăng ký nhóm', listthuchanh, listlythuyet, MaLopHP, mess });
                                                        }
                                                        else {
                                                            console.log("Hoàn thành kiểm tra");
                                                            database.dangkyhocphanchosinhvien(mssv, MaLopHP, manhomlt);
                                                            database.dangkyhocphanchosinhvien(mssv, MaLopHP, manhomth);

                                                            //thêm 1 sinh viên vào chỉ số lớp học
                                                            database.laymotlophocphanchosinhvien(MaLopHP, function (lophocdangky) {
                                                                if (lophocdangky != "") {
                                                                    // console.log("lophochuy:" + lophocdangky[0].DaDangKy);
                                                                    var x = lophocdangky[0].DaDangKy;
                                                                    // console.log("x:" + x);
                                                                    x = parseInt(x) + 1;
                                                                    // console.log("x2:" + x);
                                                                    database.updatesisosinhviendadangkytrongmotlop(x, MaLopHP);
                                                                }
                                                            });
                                                            // return res.render('./bodySinhVien/GD_SV_dkhplh', { layout: './layouts/layoutSinhVien', title: 'Đăng ký nhóm', listthuchanh, listlythuyet, MaLopHP, mess });
                                                            return res.render('./bodySinhVien/GD_SV_thongbao', { layout: './layouts/layoutSinhVien', title: 'Đăng ký học phần' });

                                                        }
                                                    });
                                                }
                                            });
                                        })

                                    }
                                });
                                //Không có môn học tiên quyết
                            } else {
                                database.layhockykiemtra(MaLopHP, function (kt) {
                                    const hockykiemtra = kt[0].HocKy;
                                    const namkiemtra = kt[0].Nam;
                                    // console.log(hockykiemtra);
                                    // console.log(namkiemtra);
                                    //Kiểm tra trùng lịch học lý thuyết
                                    database.kiemtralichtrungthoigianchosinhvien(hockykiemtra, namkiemtra, mssv, MaLopHP, manhomlt, function (ktthoigian) {
                                        //Thời gian học lý thuyết bị trùng
                                        if (ktthoigian.length > 0) {
                                            mess = "Thông báo: Bị trùng lịch học lý thuyết ";
                                            return res.render('./bodySinhVien/GD_SV_dkhplh', { layout: './layouts/layoutSinhVien', title: 'Đăng ký nhóm', listthuchanh, listlythuyet, MaLopHP, mess });
                                        } else {
                                            //Kiểm tra lịch học thực hành 
                                            database.kiemtralichtrungthoigianchosinhvien(hockykiemtra, namkiemtra, mssv, MaLopHP, manhomth, function (ktthoigianthuchanh) {
                                                //Thời gian học thực hành bị trùng
                                                if (ktthoigianthuchanh.length > 0) {
                                                    mess = "Thông báo: Bị trùng lịch học thực hành ";
                                                    return res.render('./bodySinhVien/GD_SV_dkhplh', { layout: './layouts/layoutSinhVien', title: 'Đăng ký nhóm', listthuchanh, listlythuyet, MaLopHP, mess });
                                                }
                                                else {
                                                    // console.log("Hoàn thành kiểm tra");
                                                    database.dangkyhocphanchosinhvien(mssv, MaLopHP, manhomlt);
                                                    database.dangkyhocphanchosinhvien(mssv, MaLopHP, manhomth);

                                                    //tăng 1 sinh viên cho lớp học
                                                    database.laymotlophocphanchosinhvien(MaLopHP, function (lophocdangky) {
                                                        if (lophocdangky != "") {
                                                            // console.log("lophochuy:" + lophocdangky[0].DaDangKy);
                                                            var x = lophocdangky[0].DaDangKy;
                                                            // console.log("x:" + x);
                                                            x = parseInt(x) + 1;
                                                            // console.log("x2:" + x);
                                                            database.updatesisosinhviendadangkytrongmotlop(x, MaLopHP);
                                                        }
                                                    });
                                                    // return res.render('./bodySinhVien/GD_SV_dkhplh',{layout:'./layouts/layoutSinhVien', title:'Đăng ký nhóm', listthuchanh,listlythuyet, MaLopHP, mess});
                                                    return res.render('./bodySinhVien/GD_SV_thongbao', { layout: './layouts/layoutSinhVien', title: 'Đăng ký học phần' });
                                                }
                                            });
                                        }
                                    });
                                })
                            }
                        });
                    }

                }
                if (listthuchanh.length > 0 && listlythuyet.length > 0 && manhomth != null && manhomlt == null) {
                    mess = "Chưa chọn lớp lý thuyết";
                    return res.render('./bodySinhVien/GD_SV_dkhplh', { layout: './layouts/layoutSinhVien', title: 'Đăng ký nhóm', listthuchanh, listlythuyet, MaLopHP, mess });
                } if (listthuchanh.length > 0 && listlythuyet.length > 0 && manhomth == null && manhomlt != null) {
                    mess = "Chưa chọn lớp thực hành";
                    return res.render('./bodySinhVien/GD_SV_dkhplh', { layout: './layouts/layoutSinhVien', title: 'Đăng ký nhóm', listthuchanh, listlythuyet, MaLopHP, mess });
                }
                if (listthuchanh.length == 0 && listlythuyet.length == 0) {
                    mess = "Lớp chưa được xếp lịch";
                    return res.render('./bodySinhVien/GD_SV_dkhplh', { layout: './layouts/layoutSinhVien', title: 'Đăng ký nhóm', listthuchanh, listlythuyet, MaLopHP, mess });
                }
            });
        });
    });
}