const User = require("../model/userModel");
const bcrypt = require("bcrypt");

// register
module.exports.register = async (req, res, next) => {
    try {
        const { username, email, password } = req.body;

        const usernameCheck = await User.findOne({ username });
        if (usernameCheck)
            return res.json({ msg: "Username already used", status: false });

        const emailCheck = await User.findOne({ email });
        if (emailCheck)
            return res.json({ msg: "Email already used", status: false });

        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.create({
            username,
            email,
            password: hashedPassword,
        });

        // Delete the password field from the user object
        delete user.password;

        return res.json({ status: true, user });
    } catch (ex) {
        next(ex);
    }
};

// login
module.exports.login = async (req, res, next) => {
    try {
        const { username, password } = req.body;

        const user = await User.findOne({ username });
        
        if (!user)
            return res.json({ msg: "Incorrect username or password", status: false });

        const isPasswordValid = await bcrypt.compare(password, user.password);
        
        if(!isPasswordValid){
            return res.json({ msg: "Incorrect username or password", status: false });
        }

        delete user.password;

        return res.json({ status: true, user });
    } catch (ex) {
        next(ex);
    }
};

// SetAvatar
module.exports.SetAvatar = async (req, res, next) => {
try {
    const userId =  req.params.id;
    const avatarImage =  req.body.image;
    const userData =  await User.findByIdAndUpdate(userId , {
        isAvatarImageSet : true,
        avatarImage,
    });

    return res.json({
        isSet:userData.isAvatarImageSet, 
        image:userData.avatarImage,
    
    });

}catch (ex) {
    next (ex);
}
};

// userscontactfetched
module.exports.getAllUsers = async (req, res, next) =>{
    try {
        const users = await User.find({_id: {$ne: req.params.id }}).select([
            "email",
            "username",
            "avatarImage",
            "_id",
        ]);
        return res.json(users);
    }catch (ex) {
        next(ex);
    }
};

