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


export {
    userSignUp,
    userLogin,
    checkAuthentication,
    findUserById
}
