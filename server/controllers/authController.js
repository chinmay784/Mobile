const User = require("../models/userModel");
const bcrypt = require("bcryptjs");
const generateToken = require("../utils/generatedToken");



exports.signup = async (req,res) =>{
    try {

        const {email,password,fullName,userName,confrimpassword} = req.body;
        console.log(email)

        if( !email || !password || !fullName || !confrimpassword || !userName){
            
            return res.status(400).json({
                success:false,
                error:"Please provide all filds"
            })
        }


        if(password !== confrimpassword){
            return res.status(400).json({
                success:false,
                error:"Password and confrimpassword not match",
            })
        }


        const user = await User.findOne({email});

        if(user){
            return res.status(400).json({
                success:false,
                error:"User Already Exit",
            })
        }


        const hashedPassword = await bcrypt.hash(password, 10);


        const newUser = new User({
            email,
            password:hashedPassword,
            fullName,
            userName,
            message:"user created successfully"
        })

        await newUser.save();
        console.log(newUser);



        return res.status(200).json({
            success:true,
            newUser
        })

    } catch (error) {
        console.log(error.message)

        return res.status(500).json({
            success:false,
            error:error.message
        })
    }
}

exports.login = async (req,res) =>{

    try {
        
        const {email,password} = req.body;

        if(!email || !password){
            return res.status(400).json({
                success:false,
                error:"Please provide all filds"
            })
        }


        const user = await User.findOne({email});


        const isPasswordCorrect = await bcrypt.compare(password, user?.password || "");


        if(! user || !isPasswordCorrect){
            return res.status(400).json({
                sucess:false,
                error:"Invalid UserName or Password"
            })
        }


        generateToken(user._id,res)


        if(user){
            return res.status(200).json({
                _id:user._id,
                fullName:user.fullName,
                userName:user.userName,
                sucess:true,
                message:"User login Sucessfully"
            })
        } 

    } catch (error) {
        
        console.log(error.message);

        return res.status(400).json({
            success:false,
            error:error.message
        })
    }
}


exports.logout = async (req,res) =>{
    try {
        
        res.cookie("jwt","",{
            maxAge:0
        })

        res.status(200).json({
            sucess:true,
            message:"logout Sucessfully",
        })


    } catch (error) {
        console.log("error in logout controller",error.message);

        return res.status(500).json({
            sucess:false,
            error:"error in logout controller"
        })
    }
}