module.exports.home = function(req, res){
    // return res.end(
    //    ' <h1>mY FIRST HOME CONTROLLER</h1>'
    // )
    console.log(req.cookies);
    return res.render('home', {
        title: 'Home Page'
    });
}