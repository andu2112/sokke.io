// beskytte ruter som trenger autentisering
function isLoggedIn(req, res, next) {
    // sjekk om bruker er autentisert
    if(req.isAuthenticated()) {
        // sende bruker videre hvis de er autentisert
        next();
    } else {
        // oppdater error melding fr å vise på login side
        req.flash('errorMsg', 'You have to log in.');
        // sende bruker videre til login side
        res.redirect('/login');
    }
}

function isLoggedOut(req, res, next) {
    // sjekk om bruker er autentisert
    if(req.isAuthenticated()) {
        // sende bruker videre til chat side
        res.redirect('/');
    } else {
        // sende bruker videre hvis de ikke er logget inn
        next();
    }
}

module.exports = {
    isLoggedIn: isLoggedIn,
    isLoggedOut: isLoggedOut
};