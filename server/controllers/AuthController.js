const userModel = require("../modules/User");
const UserCounter = require("../modules/UserCounter");
const Location = require("../modules/Location");
const bcrypt = require("bcryptjs");
var jwt = require("jsonwebtoken");

const registerController = async (req, res) => {
  try {
    var user = await userModel.findOne({ email: req.body.email });

    if (user) {
      return res
        .status(200)
        .json({ message: "User already Exist", success: false });
    }
    const pass = req.body.password;
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(pass, salt);

    const {curr_id} = await UserCounter.findOne({counter:"id"});
    const user_id = curr_id;

    user = await userModel.create({
      user_id : user_id,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      password: hashedPassword,
      mobile: req.body.mobile,
      address: req.body.address,
    });

    await user.save();
    const usercounter = await UserCounter.findOneAndUpdate({ counter: "id" }, { "$inc": { "curr_id": 1}});
    res.status(200).send({ message: "Registration successful", success: true });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .send({
        success: false,
        meaasge: `Register Controller ${error.message}`,
      });
  }
};

const loginController = async (req,res) => {
  console.log("Hello");
    try{
        var user = await userModel.findOne({email: req.body.email});
        console.log(user)
        if (!user) {
            return res
              .status(200)
              .send({ message: "user not found", success: false });
        }

        const isMatch = await bcrypt.compare(req.body.password, user.password);

        if (!isMatch) {
            return res
              .status(200)
              .send({ message: "Invalid EmailId or password", success: false });
        }

        const token = jwt.sign({ id: user.user_id }, process.env.JWT_SECRET, {expiresIn: "1d",});
        localStorage.setItem("userid", user_id);

        res.status(200).send({ message: "Login Success", success: true, token });
    }catch(error){
        console.log(error);
        res.status(500).send({ message: `Error in login CTRL ${error.meaasge}` });
    }
};

const profileController = async(req, res) => {
  const {user_id} = req.body;
  try{
    const user = await userModel.findOne({user_id:user_id});
    const locations = await Location.find({user_id:user_id});
    const data = {
      user : user,
      locations : locations
    };
    return res.status(200).json(data);
  }
  catch(error){
    console.log(error);
  }

}

module.exports = {
    registerController,
    loginController,
    profileController
}