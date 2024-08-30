import User from "../../schema/UserSchema.js";
import ApiResponse from "../../utils/ApiResponse.js";
const generateAccessAndRefreshTokens = async (userId) => {
    try {
        const user = await User.findById(userId);
        const accessToken = user.generateAccessToken();
        const refreshToken = user.generateRefreshToken();
        user.refreshToken = refreshToken;
        await user.save({ validateBeforeSave: false });
        return { accessToken, refreshToken };
    } catch (error) {
        return ApiError(500, "Something went wrong while generating refresh and access token");
    }
};
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

    if (password !== confirm_password) {
        res.send({ message: "Password didn't match" });
    }
    const generatedInterest = interest.split(",");
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
    if (user) {
        let transporter = nodemailer.createTransport({
            service: 'gmail',
            host: 'smtp.gmail.com',
            port: 587,
            secure: false, // True for 465, false for other ports
            auth: {
                user: process.env.ADMIN_MAIL,
                pass: process.env.ADMIN_PASSWORD,
            },
        });

        let mailOptions = {
            from: {
                name: 'Mentor Sync',
                address: process.env.ADMIN_MAIL
            },
            to: createdUser.email,
            subject: 'Welcome to Mentor Sync!',
            html: `Welcome to Mentor Sync!<br/>
            ${createdUser.firstname} ${createdUser.lastname} we're currently in the process of verifying your details. Thank you for your patience as we complete this process.<br/>
            Regards,<br/>
            Team HackElite
            `
        };
        try {
             transporter.sendMail(mailOptions);
            console.log('Email sent successfully');
        } catch (error) {
            console.error('Error sending email:', error);
        }
    }
    res.send({ user, message: "User created" });
}


const userLogin = async (req, res, next) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res
            .status(400)
            .json(new ApiResponse(400, {}, "Please fill all the required fields"));
    }
    const user = await User.findOne({ email });
    if (!user) {
        return res
            .status(404)
            .json(new ApiResponse(404, {}, "Incorrect email or password"));
    }
    const isPasswordValid = await user.isPasswordCorrect(password);
    if (!isPasswordValid) {
        return res
            .status(400)
            .json(new ApiResponse(400, {}, "Invalid email or password"));
    }
    const { accessToken, refreshToken } = await generateAccessAndRefreshTokens(user._id);
    const loggedInUser = await User.findById(user._id).select("-password -refreshToken");

    const options = {
        httpOnly: true,
        secure: true,
    };

    return res
        .status(200)
        .cookie("accessToken", accessToken, options)
        .cookie("refreshToken", refreshToken, options)
        .json(new ApiResponse(200, { user: loggedInUser, accessToken, refreshToken }, "User logged in Successfully"));
};

const checkAuthentication = async (req, res) => {
    if (req.user?._id) {
        const user = await User.findById(req.user._id).select("-password");
        if (user) {
            return res
                .status(200)
                .json(new ApiResponse(200, user, { isLoggedIn: true }, "User is authenticated"));
        }
        else {
            return res
                .status(401)
                .json(new ApiResponse(401, { isLoggedIn: false }, "User is not authenticated"));
        }
    }
    else {
        return res
            .status(401)
            .json(new ApiResponse(401, { isLoggedIn: false }, "User is not authenticated"));
    }
};
const findUserById = async (req, res) => {
    const { userId } = req.params;
    try {
        const user = await User.findById(userId);  // Added await to handle the asynchronous call

        if (!user) {  // Check if user is not found
            return res.status(404).send({ error: "User not found" });
        }

        res.send({ user });
    } catch (error) {
        console.error("Error finding user:", error);
        res.status(500).send({ error: "An error occurred while fetching the user" });
    }
};

const userContactUs = async (req, res) => {
    const { name, email, message } = req.body;

    console.log(process.env.ADMIN_MAIL + process.env.ADMIN_PASSWORD)


    if (name && email && message) {
        let transporter = nodemailer.createTransport({
            service: 'gmail',
            host: 'smtp.gmail.com',
            port: 587,
            secure: false, 
            auth: {
                user: process.env.ADMIN_MAIL,
                pass: process.env.ADMIN_PASSWORD,
            },
        });

        transporter.verify(function (error,success){
            if (error) {
                console.error('Transporter verification failed:', error);
            return res.status(500).send({ message: "Transporter verification failed", error });
            }
            else {
            console.log('Server is ready to take our messages:', success);
            }
        });

        let mailOptions = {
            from: {
                name: 'Mentor Sync',
                address: process.env.ADMIN_MAIL
            },
            to: "goelnancy14@gmail.com",
            subject: `Contact Us query by ${name} (${email})`,
            html: `<p>${message}</p>`
        };

        try {
            await transporter.sendMail(mailOptions);
            console.log('Email sent successfully');
            res.status(200).send({ message: "Mail sent successfully" });
        } catch (error) {
            console.error('Error sending email:', error);
            res.status(500).send({ message: "Error sending email", error });
        }
    } else {
        res.status(400).send({ message: "Name, email, and message are required" });
    }
};



export {
    userSignUp,
    userLogin,
    checkAuthentication,
    findUserById,
    userContactUs
}
