function isLoggedIn(req, res, next) {
    if(req.isAuthenticated()) {
        next();
    } else {
        req.flash('errorMsg', 'You have to log in.');
        res.redirect('/login');
    }
}

function isLoggedOut(req, res, next) {
    if(req.isAuthenticated()) {
        res.redirect('/');
    } else {
        next();
    }
}

module.exports = {
    isLoggedIn: isLoggedIn,
    isLoggedOut: isLoggedOut
};