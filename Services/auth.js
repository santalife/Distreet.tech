function authUser(req,res,next){
    if(req.user == null){
        res.status(403)
        return res.redirect('/login')
    }

    next()
}

function authNotUser(req,res,next){
    if(req.user){
        res.status(403)
        return res.redirect('/')
    }

    next()
}


function authRole(role) {
    return (req,res,next) =>{
        if(req.user.role !== role){
            res.status(401)
            return res.send('not allowed')
        }

        next()
    }
}

const ensureAuthenticated = (req, res, next) => {
    if (req.isAuthenticated()) {
        // If user is authenticated 
        return next(); // Calling next() to proceed to the next statement 
    }
    // If not authenticated, show alert message and redirect to ‘/’ 
    res.redirect('/');
};

const ensureAnnonymous = (req, res, next) => {
    if (!req.isAuthenticated()) {
        // If user is not authenticated 
        return next(); // Calling next() to proceed to the next statement 
    }
    // If authenticated, show alert message and redirect to ‘/’ 
    res.redirect('/');
};

module.exports= { authUser, authNotUser, authRole, ensureAuthenticated, ensureAnnonymous }