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
    // let year = d.getFullYear();
    // let month = d.getMonth()+1;
    let month = d.getMonth()+1;
    let year = d.getFullYear();
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
                                title: '????ng K?? H???c Ph???n', namhockiemtra1, hockykiemtra1, listmh, namhoc, hocky, listlh, listmonhocdadangky, listhocky, listnamhoc: listnamhoca
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
            // return res.render('./bodySinhVien/GD_SV_thongbao', { layout: './layouts/layoutSinhVien', title: '????ng k?? h???c ph???n', listthuchanh, listlythuyet, MaLopHP, mess });

            return res.render('./bodySinhVien/GD_SV_dkhplh', { layout: './layouts/layoutSinhVien', title: '????ng k?? nh??m', listthuchanh, listlythuyet, MaLopHP, mess });
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

                //????ng k?? m??n l?? thuy???t
                if (listthuchanh.length == 0 && listlythuyet.length > 0 && manhomth == null && manhomlt != null) {
                    // mess="Xong check";
                    // return res.render('./bodySinhVien/GD_SV_dkhplh',{layout:'./layouts/layoutSinhVien', title:'????ng k?? nh??m',listthuchanh,listlythuyet, MaLopHP, mess})
                    if (lophoc[0].DaDangKy == lophoc[0].SiSo) {
                        mess = "Th??ng b??o: L???p ???? ?????y "
                        return res.render('./bodySinhVien/GD_SV_dkhplh', { layout: './layouts/layoutSinhVien', title: '????ng k?? nh??m', listthuchanh, listlythuyet, MaLopHP, mess })
                    } else {
                        database.laymonhocphantienquyetchosinhvien(MaLopHP, function (montienquyet) {
                            if (montienquyet.length > 0) {
                                database.sinhviendahocphantienquyetchua(MaLopHP, mssv, function (dahocmontienquyet) {
                                    if (dahocmontienquyet.length <= 0) {
                                        //Sinh vi??n ch??a h???c m??n ti??n quy???t
                                        mess = "Th??ng b??o: B???n ch??a h???c m??n ti??n quy???t";
                                        return res.render('./bodySinhVien/GD_SV_dkhplh', { layout: './layouts/layoutSinhVien', title: '????ng k?? nh??m', listthuchanh, listlythuyet, MaLopHP, mess });
                                    } else {
                                        database.layhockykiemtra(MaLopHP, function (kt) {
                                            const hockykiemtra = kt[0].HocKy;
                                            const namkiemtra = kt[0].Nam;
                                            // console.log(hockykiemtra);
                                            // console.log(namkiemtra);
                                            //Ki???m tra tr??ng l???ch h???c l?? thuy???t
                                            database.kiemtralichtrungthoigianchosinhvien(hockykiemtra, namkiemtra, mssv, MaLopHP, manhomlt, function (ktthoigian) {
                                                //Th???i gian h???c l?? thuy???t b??? tr??ng
                                                if (ktthoigian.length > 0) {
                                                    mess = "Th??ng b??o: B??? tr??ng l???ch h???c l?? thuy???t ";
                                                    return res.render('./bodySinhVien/GD_SV_dkhplh', { layout: './layouts/layoutSinhVien', title: '????ng k?? nh??m', listthuchanh, listlythuyet, MaLopHP, mess });
                                                } else {
                                                    //Ki???m tra l???ch h???c th???c h??nh 
                                                    // console.log("Ho??n th??nh ki???m tra");
                                                    database.dangkyhocphanchosinhvien(mssv, MaLopHP, manhomlt);
                                                    //t??ng 1 sinh vi??n cho l???p h???c
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
                                                    // return res.render('./bodySinhVien/GD_SV_dkhplh',{layout:'./layouts/layoutSinhVien', title:'????ng k?? nh??m', listthuchanh,listlythuyet, MaLopHP, mess});
                                                    return res.render('./bodySinhVien/GD_SV_thongbao', { layout: './layouts/layoutSinhVien', title: '????ng k?? h???c ph???n' });

                                                }
                                            });
                                        })

                                    }
                                });
                                //Kh??ng c?? m??n h???c ti??n quy???t
                            } else {
                                database.layhockykiemtra(MaLopHP, function (kt) {
                                    const hockykiemtra = kt[0].HocKy;
                                    const namkiemtra = kt[0].Nam;
                                    // console.log(hockykiemtra);
                                    // console.log(namkiemtra);
                                    //Ki???m tra tr??ng l???ch h???c l?? thuy???t
                                    database.kiemtralichtrungthoigianchosinhvien(hockykiemtra, namkiemtra, mssv, MaLopHP, manhomlt, function (ktthoigian) {
                                        //Th???i gian h???c l?? thuy???t b??? tr??ng
                                        if (ktthoigian.length > 0) {
                                            mess = "Th??ng b??o: B??? tr??ng l???ch h???c l?? thuy???t ";
                                            return res.render('./bodySinhVien/GD_SV_dkhplh', { layout: './layouts/layoutSinhVien', title: '????ng k?? nh??m', listthuchanh, listlythuyet, MaLopHP, mess });
                                        } else {
                                            //Ki???m tra l???ch h???c th???c h??nh 
                                            console.log("Ho??n th??nh ki???m tra");
                                            database.dangkyhocphanchosinhvien(mssv, MaLopHP, manhomlt);

                                            //t??ng 1 sinh vi??n cho l???p h???c
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
                                            // return res.render('./bodySinhVien/GD_SV_dkhplh',{layout:'./layouts/layoutSinhVien', title:'????ng k?? nh??m', listthuchanh,listlythuyet, MaLopHP, mess});
                                            return res.render('./bodySinhVien/GD_SV_thongbao', { layout: './layouts/layoutSinhVien', title: '????ng k?? h???c ph???n' });
                                        }
                                    });
                                })
                            }
                        });
                    }
                }
                if (listthuchanh.length == 0 && listlythuyet.length > 0 && manhomth == null && manhomlt == null) {
                    mess = "Ch??a ch???n l???p l?? thuy???t";
                    return res.render('./bodySinhVien/GD_SV_dkhplh', { layout: './layouts/layoutSinhVien', title: '????ng k?? nh??m', listthuchanh, listlythuyet, MaLopHP, mess });
                }
                //????ng k?? c??? nh??m l?? thuy???t v?? th???c h??nh
                if (listthuchanh.length > 0 && listlythuyet.length > 0 && manhomth != null && manhomlt != null) {
                    //Ki???m tra s??? l?????ng sinh vi??n c?? trong l???p
                    if (lophoc[0].DaDangKy == lophoc[0].SiSo) {
                        //L???p ?????y
                        mess = "Th??ng b??o: L???p ???? ?????y "
                        return res.render('./bodySinhVien/GD_SV_dkhplh', { layout: './layouts/layoutSinhVien', title: '????ng k?? nh??m', listthuchanh, listlythuyet, MaLopHP, mess })
                    } else {
                        //Ki???m tra m??n h???c ph???n ti??n quy???t tr?????c khi ????ng k??
                        database.laymonhocphantienquyetchosinhvien(MaLopHP, function (montienquyet) {
                            //N???u c?? m??n h???c ti??n quy???t
                            if (montienquyet.length > 0) {
                                database.sinhviendahocphantienquyetchua(MaLopHP, mssv, function (dahocmontienquyet) {
                                    if (dahocmontienquyet.length <= 0) {
                                        //Sinh vi??n ch??a h???c m??n ti??n quy???t
                                        mess = "Th??ng b??o: B???n ch??a h???c m??n ti??n quy???t";
                                        return res.render('./bodySinhVien/GD_SV_dkhplh', { layout: './layouts/layoutSinhVien', title: '????ng k?? nh??m', listthuchanh, listlythuyet, MaLopHP, mess });
                                    } else {
                                        database.layhockykiemtra(MaLopHP, function (kt) {
                                            const hockykiemtra = kt[0].HocKy;
                                            const namkiemtra = kt[0].Nam;
                                            // console.log(hockykiemtra);
                                            // console.log(namkiemtra);
                                            //Ki???m tra tr??ng l???ch h???c l?? thuy???t
                                            database.kiemtralichtrungthoigianchosinhvien(hockykiemtra, namkiemtra, mssv, MaLopHP, manhomlt, function (ktthoigian) {
                                                //Th???i gian h???c l?? thuy???t b??? tr??ng
                                                if (ktthoigian.length > 0) {
                                                    mess = "Th??ng b??o: B??? tr??ng l???ch h???c l?? thuy???t ";
                                                    return res.render('./bodySinhVien/GD_SV_dkhplh', { layout: './layouts/layoutSinhVien', title: '????ng k?? nh??m', listthuchanh, listlythuyet, MaLopHP, mess });
                                                } else {
                                                    //Ki???m tra l???ch h???c th???c h??nh 
                                                    database.kiemtralichtrungthoigianchosinhvien(hockykiemtra, namkiemtra, mssv, MaLopHP, manhomth, function (ktthoigianthuchanh) {
                                                        //Th???i gian h???c th???c h??nh b??? tr??ng
                                                        if (ktthoigianthuchanh.length > 0) {
                                                            mess = "Th??ng b??o: B??? tr??ng l???ch h???c th???c h??nh ";
                                                            return res.render('./bodySinhVien/GD_SV_dkhplh', { layout: './layouts/layoutSinhVien', title: '????ng k?? nh??m', listthuchanh, listlythuyet, MaLopHP, mess });
                                                        }
                                                        else {
                                                            console.log("Ho??n th??nh ki???m tra");
                                                            database.dangkyhocphanchosinhvien(mssv, MaLopHP, manhomlt);
                                                            database.dangkyhocphanchosinhvien(mssv, MaLopHP, manhomth);

                                                            //th??m 1 sinh vi??n v??o ch??? s??? l???p h???c
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
                                                            // return res.render('./bodySinhVien/GD_SV_dkhplh', { layout: './layouts/layoutSinhVien', title: '????ng k?? nh??m', listthuchanh, listlythuyet, MaLopHP, mess });
                                                            return res.render('./bodySinhVien/GD_SV_thongbao', { layout: './layouts/layoutSinhVien', title: '????ng k?? h???c ph???n' });

                                                        }
                                                    });
                                                }
                                            });
                                        })

                                    }
                                });
                                //Kh??ng c?? m??n h???c ti??n quy???t
                            } else {
                                database.layhockykiemtra(MaLopHP, function (kt) {
                                    const hockykiemtra = kt[0].HocKy;
                                    const namkiemtra = kt[0].Nam;
                                    // console.log(hockykiemtra);
                                    // console.log(namkiemtra);
                                    //Ki???m tra tr??ng l???ch h???c l?? thuy???t
                                    database.kiemtralichtrungthoigianchosinhvien(hockykiemtra, namkiemtra, mssv, MaLopHP, manhomlt, function (ktthoigian) {
                                        //Th???i gian h???c l?? thuy???t b??? tr??ng
                                        if (ktthoigian.length > 0) {
                                            mess = "Th??ng b??o: B??? tr??ng l???ch h???c l?? thuy???t ";
                                            return res.render('./bodySinhVien/GD_SV_dkhplh', { layout: './layouts/layoutSinhVien', title: '????ng k?? nh??m', listthuchanh, listlythuyet, MaLopHP, mess });
                                        } else {
                                            //Ki???m tra l???ch h???c th???c h??nh 
                                            database.kiemtralichtrungthoigianchosinhvien(hockykiemtra, namkiemtra, mssv, MaLopHP, manhomth, function (ktthoigianthuchanh) {
                                                //Th???i gian h???c th???c h??nh b??? tr??ng
                                                if (ktthoigianthuchanh.length > 0) {
                                                    mess = "Th??ng b??o: B??? tr??ng l???ch h???c th???c h??nh ";
                                                    return res.render('./bodySinhVien/GD_SV_dkhplh', { layout: './layouts/layoutSinhVien', title: '????ng k?? nh??m', listthuchanh, listlythuyet, MaLopHP, mess });
                                                }
                                                else {
                                                    // console.log("Ho??n th??nh ki???m tra");
                                                    database.dangkyhocphanchosinhvien(mssv, MaLopHP, manhomlt);
                                                    database.dangkyhocphanchosinhvien(mssv, MaLopHP, manhomth);

                                                    //t??ng 1 sinh vi??n cho l???p h???c
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
                                                    // return res.render('./bodySinhVien/GD_SV_dkhplh',{layout:'./layouts/layoutSinhVien', title:'????ng k?? nh??m', listthuchanh,listlythuyet, MaLopHP, mess});
                                                    return res.render('./bodySinhVien/GD_SV_thongbao', { layout: './layouts/layoutSinhVien', title: '????ng k?? h???c ph???n' });
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
                    mess = "Ch??a ch???n l???p l?? thuy???t";
                    return res.render('./bodySinhVien/GD_SV_dkhplh', { layout: './layouts/layoutSinhVien', title: '????ng k?? nh??m', listthuchanh, listlythuyet, MaLopHP, mess });
                } if (listthuchanh.length > 0 && listlythuyet.length > 0 && manhomth == null && manhomlt != null) {
                    mess = "Ch??a ch???n l???p th???c h??nh";
                    return res.render('./bodySinhVien/GD_SV_dkhplh', { layout: './layouts/layoutSinhVien', title: '????ng k?? nh??m', listthuchanh, listlythuyet, MaLopHP, mess });
                }
                if (listthuchanh.length == 0 && listlythuyet.length == 0) {
                    mess = "L???p ch??a ???????c x???p l???ch";
                    return res.render('./bodySinhVien/GD_SV_dkhplh', { layout: './layouts/layoutSinhVien', title: '????ng k?? nh??m', listthuchanh, listlythuyet, MaLopHP, mess });
                }
            });
        });
    });
}