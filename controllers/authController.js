const crypto = require('crypto');
const { findByUsername, insertUser } = require('../database/user')
const jwt = require('jsonwebtoken');

const login = async (username, password) => {
    // step 1: find user by username
    const existedUser = await findByUsername(username);
    if (!existedUser) {
        throw new Error('username is not existed!');
    }
    // step 2: verify password
    if (!verifyPassword(password, existedUser)) {
        throw new Error('wrong password!');
    }
    // step 3: create jwt token
    const token = jwt.sign({userId: existedUser._id}, "thisisprivatekey", {expiresIn: "1h"});
    
    return {user: existedUser, token: token};
};

const register = async (username, email, password) => {
    // step 1: check username is existed
    const existedUser = await findByUsername(username);
    if (existedUser) {
        throw new Error('Username is existed!');
    }
    // step 2: encrypt the password
    const {salt, hashedPassword} = encryptPassword(password);
    // step 3: store inside database
    const insertedUser = await insertUser({
        username: username,
        email: email,
        salt: salt,
        hashedPassword: hashedPassword,
    });
    return insertedUser;
};

const encryptPassword = (password) => {
    // create unique private key for each user
    const salt = crypto.randomBytes(128).toString('hex');
    // hash password
    // crypto.pbkdf2Sync( password, salt, iterations, keylen, digest )
        // Parameters: This method accepts five parameters as mentioned above and described below:
            // password: It is of type string, Buffer, TypedArray, or DataView.
            // salt: It must be as unique as possible. However, it is recommended that a salt is arbitrary and in any case, it is at least 16 bytes long. It is of type string, Buffer, TypedArray, or DataView.
            // iterations: It must be a number and should be set as high as possible. So, the more is the number of iterations, the more secure the derived key will be, but in that case, it takes a greater amount of time to complete. It is of type number.
            // keylen: It is the key of the required byte length and it is of type number.
            // digest: It is a digest algorithm of string type.
    const hashedPassword = crypto.pbkdf2Sync(password, salt, 10000, 64, 'sha512').toString('hex');
    return {
        salt: salt,
        hashedPassword: hashedPassword,
    }
}

const verifyPassword = (password, user) => {
    const hashedPassword = crypto.pbkdf2Sync(password, user.salt, 10000, 64, 'sha512').toString('hex');
    return hashedPassword === user.hashedPassword;
}

module.exports = { login, register };