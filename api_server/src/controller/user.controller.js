import UsersModel from "../models/users.model.js";
import CryptoJS from "crypto-js";

import jwt from 'jsonwebtoken'
const secretKeyValue = 'secretKeyValue'



// user signup
/* const userSignaup = ((req, resp) => {
    let newUserObj = req.body;

    const userSignupData = {
        f_name: newUserObj.f_name,
        l_name: newUserObj.l_name,
        e_mail: newUserObj.e_mail,
        password: newUserObj.password,
        is_deleted: 0,
        created_at: new Date(),
        updated_at: new Date()
    }
    
    const createNewuser = new UsersModel(userSignupData)
    if (req.body.contructor === Object && Object.keys(req.body).length === 0) {
        return resp.status(400).send({ success: false, message: "Please fill all the required fields" })
    } else {
        UsersModel.userSignup(createNewuser, (err, result) => {
            if (err) {
                return resp.status(500).send({ status:500, success: false, message: "some error show in userSignaup model" })
            } else {
                return resp.status(200).send({ status: 200, success: true, message: "User added successafully", data: result })
            }
        })
    }
}) */

const userSignaup = async (req, resp) => {
    try {
        if (req.body.contructor === Object && Object.keys(req.body).length === 0) {
            return resp.status(400).json({
                success: false,
                message: "Please fill all the required fields"
            })
        }
        let newUserObj = req.body;

        if (newUserObj.e_mail) {
            const existingUser = await UsersModel.findUserEmailId(newUserObj.e_mail);
            if (existingUser.status === 409) {
                return resp.status(200).json({
                    status: 200,
                    success: false,
                    message: "Email already exists"
                });
            } else {
                var ciphertext = CryptoJS.AES.encrypt(newUserObj.password, process.env.SECRET_KEY).toString();

                const userSignupData = {
                    f_name: newUserObj.f_name,
                    l_name: newUserObj.l_name,
                    e_mail: newUserObj.e_mail,
                    password: ciphertext,
                    is_deleted: 0,
                    created_at: new Date(),
                    updated_at: new Date()
                }

                const createNewuser = await UsersModel.userSignup(userSignupData)
                return resp.status(200).json({
                    status: 200,
                    success: true,
                    message: "User added successafully",
                    data: createNewuser
                })
            }
        }
    } catch (error) {
        /* if (error.status === 409) {
            console.log("Error----------------------------")
            return resp.status(409).json({
                status: 409,
                success: false,
                message: "Email already exists"
            });
        } */
        return resp.status(500).json({
            status: 500,
            success: false,
            message: "some error show in userSignaup model"
        })
    }
}



const userLogin = async (req, resp) => {
    try {
        const loginUser = await UsersModel.userLogin(req.body)

        if (loginUser === null) {
            return resp.status(401).json({
                status: 401,
                success: false,
                message: "Invalid email or password"
            })
        } else {
            const { password, ...userWithoutPassword } = loginUser[0]; //remove password from response
            jwt.sign({ logingUserData: userWithoutPassword }, secretKeyValue, { expiresIn: '10300s' }, (error, token) => {
                if (error) {
                    return resp.status(500).json({ error: "Token generation failed" });
                } else {
                    return resp.status(200).json({
                        status: 200,
                        success: true,
                        message: "User data fectch successafully",

                        data: { ...userWithoutPassword, token: token }
                    })
                }
            })

        }
    } catch (error) {
        if (error.message === "Invalid email or password") {
            return resp.status(401).json({
                status: 401,
                success: false,
                message: error.message
            })
        }
        return resp.status(500).json({
            status: 500,
            success: false,
            message: "some error show in userSignaup model"
        })
    }
}

export default { userSignaup, userLogin }