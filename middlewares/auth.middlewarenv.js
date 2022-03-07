
module.exports.requireAuth = function(req, res, next){
    
    const{cookies} =req;
    console.log(cookies.msnv);
    var ms = cookies.msnv;
    if(!cookies.msnv){
        //return res.render('./bodyChung/TrangChu',{layout: './layouts/layoutChung' , title: 'Trang Chủ'}, mess='');
        return res.redirect('/');
    }
    var database = require("../database");
    database.getPassNV(ms, function (resultQuery1){
        if (resultQuery1.length <= 0) {
            return res.redirect('/');
        }
    }); 
    next();
};