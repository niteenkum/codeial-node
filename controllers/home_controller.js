const Post = require("../models/post");

module.exports.home = function (req, res) {
//   Post.find({}, function (err, posts) {
//     if (err) {
//       console.log("Error in getting all posts", err);
//       return;
//     }
//     return res.render("home", {
//       title: "Home Page",
//       posts: posts,
//     });
//   });

Post.find({}).populate('user').exec(function(err, posts){
    if(err){
        console.log("Error in getting posts", err);
        return;
    }

    return res.render("home", {
        title: "Home Page",
        posts: posts
    })
})

};
