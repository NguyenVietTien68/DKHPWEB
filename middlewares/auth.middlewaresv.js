module.exports.requireAuth = function(req, res, next){
    
    const{cookies} =req;
    console.log(cookies.mssv);
    var ms = cookies.mssv;
    if(!cookies.mssv){
        //return res.render('./bodyChung/TrangChu',{layout: './layouts/layoutChung' , title: 'Trang Chủ'}, mess='');
        return res.redirect('/');
    }

    var database = require("../database");
    database.getPassSV(ms, function (resultQuery1){
        if (resultQuery1.length <= 0) {
            return res.redirect('/');
        }
    }); 
    next();
};