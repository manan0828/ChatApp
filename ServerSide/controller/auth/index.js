const userQuery = require("../../querries/user");
const bcrypt = require('bcrypt');
const jwt = require('express-jwt');

module.exports = {
    async signIn(req, res) {
        let email = req.body.email;
        let userName = req.body.userName;
        let password = req.body.password;
        try {
            if(!email && !userName && !password) {
                return res
                    .status(422)
                    .send({
                        status: "Invalid Credentials"
                    });
            }

            let userExist = await userQuery.getUniqueUser(email);
            if(userExist) {
                return res
                    .status(400)
                    .send({
                        code: 400,
                        status: "user already exists"
                    });
            }
            password = await bcrypt.hash(password, 10);
            let data = {
                email: email,
                userName: userName,
                password: password
            };
            let user = await userQuery.createUser(data);
            return res
                .status(200)
                .send({
                    code: 200,
                    status: "success",
                    data: user
                });
        } catch (err) {
            return res
                .status(422)
                .send({
                    code: 422,
                    status: "failed",
                    msg: err.message
                });
        }
    },

    async login(req, res) {
        let email = req.body.email;
        let userName = req.body.userName;
        let password = req.body.password;
        let data = {
            email: email,
            userName: userName,
            password: password
        };
        console.log(data);
        try {
            if(userName != null && userName != undefined && userName != '') {
                let userExist = await userQuery.getUniqueUserByUserName(userName);
                bcrypt.compare(password, userExist.password).then((result) => {
                    if(result) {
                        return res
                            .status(200)
                            .send({
                                code: 200,
                                status: "successful",
                                data: userExist
                            });
                    }
                    return res
                        .status(400)
                        .send({
                            code: 400,
                            status: "Incorrect Password"
                    })
                });
            } else {
                let userExist = await userQuery.getUniqueUser(email);
                bcrypt.compare(password, userExist.password).then((result) => {
                    if(result) {
                        return res
                            .status(200)
                            .send({
                                code: 200,
                                status: "successful",
                                data: userExist
                            });
                    }
                    return res
                        .status(400)
                        .send({
                            code: 400,
                            status: "Incorrect Password"
                        })
                });
            }
        } catch (err) {
            return res
                .status(400)
                .send({
                    code: 400,
                    status: "Incorrect Username"
                })
        }
    }
}