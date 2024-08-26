import User from "../../schema/UserSchema.js";

const userSignUp = (req, res) => {
    const { username,
        password,
        firstname,
        lastname,
        phone_number,
        email,
        user_role,
        interest,
        confirm_password } = req.body;

        if(password!==confirm_password){
            res.send({message:"Password didn't match"});
        }
        const generatedInterest  = interest.split(",");
        const user = User.create({
            username,
            password,
            firstname,
            lastname,
            phone_number,
            email,
            user_role,
            interest: generatedInterest,
        })
    res.send({user,message:"User created"});
}

export {
    userSignUp
}
