const authRouter = require("express").Router();
const passport = require('passport');
const User = require("../models/User");
const GoogleStrategy = require("passport-google-oauth20").Strategy;

passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: "http://localhost:8800/google/callback",
        passReqToCallback : true
      },
      async function (request, accessToken, refreshToken, profile, done) {
        const newUser = {
          googleId:profile.id,
          displayName:profile.displayName,
          firstName:profile.name.givenName,
          lastName:profile.name.familyName,
          profileImage:profile.photos[0].value
        }

        try {
          
          let user = await User.findOne({googleId:profile.id});
          if(user) {
            done(null,user);
          } else {
            user = await User.create(newUser);
            done(null,user);
          }

        } catch (error) {
          console.log(error);
        }

      }
    )
  );

authRouter.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["email", "profile"] })
);

// Retrieve user data
authRouter.get(
  "/google/callback",
  passport.authenticate("google", {
    failureRedirect: "/login-failure",
    successRedirect: "/dashboard", 
  })
);

authRouter.get("/logout",(req,res)=>{
  req.session.destroy(err => {
    if(err) {
      console.log("Error");
      res.send("Error logout");
    } else {
      res.redirect("/");
    }
  });
});


authRouter.get("/login-failure",(req,res)=>{
  res.send("Some thing went wrong");
})


passport.serializeUser(function(user,done) {
  done(null,user.id);
});

passport.deserializeUser(async function(id,done) {
  const user = await User.findById(id);
  done(null,user);
});


module.exports = authRouter