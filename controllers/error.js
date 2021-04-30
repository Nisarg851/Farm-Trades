exports.get404 = (req, res, next) => {
    res.status(404).render('404', { pageTitle: 'Page Not Found', path: '/404' });
  };
  
//############################################# My LOGIC ###############################################################
// const error404 = (req,res,next)=>{
//     // res.status(404).send('<h1>Page not found</h1>');
//     // res.status(404).sendFile(path.join(__dirname,'views','PageNotFound.html'));
//     res.status(404).render('PageNotFound',{pageTitle:'Page not Found'});
// }

// exports.error404 = error404;