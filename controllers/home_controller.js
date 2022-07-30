module.exports.home = function(req, res){
    // return res.end(
    //    ' <h1>mY FIRST HOME CONTROLLER</h1>'
    // )
    return res.render('home', {
        title: 'Home Page'
    });
}