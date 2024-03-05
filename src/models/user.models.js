import mongoose, { Schema } from "mongoose";
import { jwt } from "jsonwebtoken";
import bcrypt from "bcrypt";


const userSchema = new Schema(
    {
        username: {
            type: String,
            require: true,
            unique: true,
            lowerCase: true,
            trim: true,
            index: true,
        },

        email: {
            type: String,
            require: true,
            unique: true,
            lowerCase: true,
            trim: true,
        },

        fullname: {
            type: String,
            require: true,
            trim: true,
            index: true,
        },

        avatar: {
            type: String, // cloudnary url we will use;
            require: true,
        },

        coverImage: {
            type: String, // cloudnary url we will use;
        },

        watchHistory: [
            {
                type: Schema.Types.ObjectId,
                ref: "video",
            },
        ],

        password: {
            type: String,
            require: [true, "Password is required"],
        },

        refreshToken: {
            type: String,
        },
    },
    {
        timestamps: true,
    }
);

// encription of password using bcrypt on save password will be encrypt;

userSchema.pre("save", async function(next) {
    if(!this.isModified("password")) return next();

    this.password = bcrypt.hash(this.password, 10)
    next()
})

userSchema.methods.isPasswordCorrect = async function (password){
    return await bcrypt.compare(password, this.password)
}

userSchema.methods.genrateAccessToken = function () {
    return jwt.sign(
        {
            _id: this._id,
            email: this.email,
            username: this.username,
            fullname: this.fullname,
        },

        process.env.ACCESS_TOKEN,
        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY
        }
    )
};

userSchema.methods.genrateRefreshToken = function () {
    return Jwt.sign(
        {
            _id: this._id,
        },
        
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn: process.env.REFRESH_TOKEN_EXPIRY
        }
    )
};

export const user = mongoose.model("user", userSchema);
