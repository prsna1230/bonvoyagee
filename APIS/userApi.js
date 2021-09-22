// create mini express app
const express = require("express");
const userApiObj = express.Router();
const expressAsyncHandler = require("express-async-handler");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const userdpObj = require("./middleware/adduserImage");
const checkToken = require("./middleware/verifyToken");
const ObjectId = require("mongodb").ObjectId;
// body parser middleware
userApiObj.use(express.json());

let userCollection;
// get usercollection object
userApiObj.use((req, res, next) => {
  userCollection = req.app.get("userCollection");
  next();
});

// profile img update
userApiObj.put(
  "/editprofilepic/:id",
  userdpObj.single("profileimage"),
  expressAsyncHandler(async (req, res) => {
    //console.log(req.params.id);
    const id = req.params.id;
    // add image Url to userObj
    let image = req.file.path;

    // get user from req.body
    await userCollection.updateOne(
      { _id: new ObjectId(id) },
      { $set: { profileimage: image } }
    );

    // send Response
    res.send({ message: "Success", payload: image });
  })
);

// update profileInfo
userApiObj.put(
  "/editprofile/:id",
  checkToken,

  expressAsyncHandler(async (req, res) => {
    const id = req.params.id;

    let newUserObj = req.body;

    // get user from req.body
    await userCollection.updateOne(
      { _id: new ObjectId(id) },
      {
        $set: {
          email: newUserObj.email,
          mobilenumber: newUserObj.mobilenumber,
          address: newUserObj.address,
        },
      }
    );

    // send Response
    res.send({ message: "Success", payload: newUserObj });
  })
);

// user registration
userApiObj.post(
  "/userregister",
  userdpObj.single("profileimage"),
  expressAsyncHandler(async (req, res) => {
    const newUser = JSON.parse(req.body.userObj);
    // add image Url to userObj
    newUser.profileimage = req.file.path;
    // get user from req.body
    let user = await userCollection.findOne({ name: newUser.name });
    // if user existed send response as user name already existed
    if (user !== null) {
      res.send({ message: "User Name Already Existed" });
    } else {
      let hashedPassword = await bcryptjs.hash(newUser.password, 6);
      // replace plain password with hash password
      newUser.password = hashedPassword;
      // insert userObj to user Collection
      let response = await userCollection.insertOne(newUser);
      // send Response
      res.send({ message: "Success" });
    }
  })
);

// userlogin
userApiObj.post(
  "/login",
  expressAsyncHandler(async (req, res) => {
    // get user crediantials obj
    let userCredentialsObj = req.body;
    // find user by username
    let user = await userCollection.findOne({ name: userCredentialsObj.name });
    // if user is not there
    if (user === null) {
      res.send({ message: "Invalid username" });
    }
    // if user found
    else {
      // compare passwords
      let status = await bcryptjs.compare(
        userCredentialsObj.password,
        user.password
      );
      // if not equal
      if (status === false) {
        res.send({ message: "Invalid Password" });
      }
      // if status is true
      else {
        // create and send token
        let signedToken = await jwt.sign(
          { name: user.name },
          process.env.SECRET,
          { expiresIn: "1h" }
        );
        // send token as response
        res.send({ message: "Success", token: signedToken, user: user });
      }
    }
  })
);

// export
module.exports = userApiObj;
