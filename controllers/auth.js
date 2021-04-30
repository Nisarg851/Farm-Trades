const userInfo = require('../models/userInfo');
// exports.getLoginForm = (req, res, next) => {
//     res.render('auth/login',{
//         path : '/admin/login',
//         pageTitle : 'Login' 
//     });
// }

// exports.postLoginForm = (req, res, next) => {
//     console.log(req.body['E-mail'],req.body.password);
//     res.redirect('/');
// }
 
exports.createNewUser = (req, res, next) => {
    const name = req.body.name;
    const phone = req.body.phone;
    const email = req.body.email;
    const password = req.body.password;
    const occupation = req.body.occupation;
    console.log(req.body.occupation);
    const newUser = new userInfo({
        userName : name,
        email : email,
        password : password,
        phone : phone,
        occupation : occupation
    });

    newUser.save()
            .then(result => {
                res.redirect('/admin/Registration');
            });
}