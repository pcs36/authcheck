import CryptoJS from "crypto-js";

import dbConnection from "../dbConnection/dbConnection.js";


import schema from "../schema/dbSchema.js";


// user Signup
/* schema.UsersSchema.userSignup = (newUser, result) => {
    dbConnection.query("INSERT INTO users set?", newUser, (err, res) => {
        if(err){
            console.log("Error while user signup", err);
            result(err, null);
        }else{
            console.log("User signed up successfully");
            result(null, res);
        }
    })
} */

/* 
UserSchema.getUserForLogin = (email, password, result) => {
dbConnection.query('SELECT * FROM users WHERE email_id=? ', email, (error, responseData) => {
    if (error) {
        result(null, error)
    } else {
        result(null, responseData)
    }
})
}
*/

// user Signup with Promise
schema.UsersSchema.userSignup = async (newUser) => {
    return new Promise((resolve, reject) => {
        dbConnection.query("INSERT INTO users SET ?", newUser, (err, res) => {
            if (err) {
                console.error("Error while user signup:", err);
                reject(err);
            } else {
                console.log("User signed up successfully");
                resolve(res);
            }
        });
    });
};


// user e_mail exists or not and login with Promise
schema.UsersSchema.findUserEmailId = async (newUserEmail) => {
    return new Promise((resolve, reject) => {
        console.log("Email to check:", newUserEmail)
        dbConnection.query("SELECT * FROM users WHERE e_mail=?", newUserEmail, (error, result) => {
            if (error) {
                console.error("Error checking email:", error);
                return reject({ status: 500, message: "Database error" });
            }
            if (result && result.length > 0) {
                return resolve({ status: 409, message: "Email already exists" });
            } else {
                return resolve({ status: 200, message: "Email available" })
            }
        })
    });
};


schema.UsersSchema.userLogin = async (newUser) => {
    return new Promise((resolve, reject) => {

        // dbConnection.query("SELECT * FROM users WHERE e_mail=? AND password=?", [newUser.e_mail, newUser.password], (error, result) => {
        dbConnection.query("SELECT * FROM users WHERE e_mail=?", [newUser.e_mail,], (error, result) => {
            if (error) {
                console.error("Error while checking existing email:", error);
                reject(error);
            }
            if (result && result.length > 0) {
                const decryptedPassword = CryptoJS.AES.decrypt(result[0].password, process.env.SECRET_KEY).toString(CryptoJS.enc.Utf8);
                if (decryptedPassword !== newUser.password) {
                    return reject({ message: "Invalid email or password" });
                }
                return resolve(result);
            } else {
                return reject({ message: "Invalid email or password" });
            }
        })

    });
};

export default schema.UsersSchema;