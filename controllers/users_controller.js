const User = require("../models/user");

module.exports.profile = function(req,res){

   if(req.cookies.user_id){
    User.findById(req.cookies.user_id, function(err, user){
        if(err){
            console.log("Error in finding the user in profile");
            return;
        }
        return  res.render('user_profile',{
            title: "User Profile Page",
            name: user.name,
            email: user.email
        })
    })
   }else{
    return res.redirect("/users/sign-in");
   }
}

// render the sign up page
module.exports.SignUp = function(req,res){

 return   res.render('user_sign_up',{
        title: "Codeial | Sign Up"
    })
}

// render the sign in page
module.exports.SignIn = function(req,res){

    return   res.render('user_sign_in',{
           title: "Codeial | Sign In"
       })
   }

// adding the sign up data

    module.exports.create = function(req,res){
    
        if(req.body.password !== req.body.confirm_password){
            console.log("passowrd and confirm password didn't matched")
            return res.redirect('back');
        }

        User.findOne({email: req.body.email}, function(err, user){
            if(err){
                console.log("Error in finding the user in sign up");
                return;
            }
            if(!user){
                User.create(req.body, function(err, user){
                    if(err){
                        console.log("Error in creating the user in sign up");
                        return;
                    }
                    return res.redirect('/users/sign-in');
                })
            }else{
                return res.redirect('back');
            }
        })

    }

// sign in and create a session for the user
module.exports.createSession = function(req,res){
   
    User.findOne({email: req.body.email}, function(err, user){
        if(err){
            console.log("Error in finding the user in sign in");
            return
        }
        if(user){
           if(user.password != req.body.password){
               return res.redirect('back');
           }
           res.cookie('user_id', user.id);
           return res.redirect("/users/profile");
        }else{
            return res.redirect('back');
        }
    })

}