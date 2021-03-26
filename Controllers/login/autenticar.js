function autenticar(req, res, next) {
    if(req.session.usuario) {
        next()
    }else {
        
        return res.redirect('/login');
    }
}

module.exports = autenticar;