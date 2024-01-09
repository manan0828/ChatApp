const userQuery = require('../../querries/user');

module.exports = {
    async createUser(req, res) {
        let userName = req.body.userName;
        let name = req.body.name;
        let password = req.body.password;
        let email = req.body.email;
        let data = {
            name: name,
            userName: userName,
            password: password,
            email: email,
        };

        try {
            let user = await userQuery.createUser(data);
            return res
                .status(200)
                .send({
                    code: 200,
                    status: "success",
                    data: user
                });
        } catch(err) {
            return res
                .status(422)
                .send({
                    code: 422,
                    status: "failed",
                    msg: err.message
                })
        }
    },

    async getUsers(req, res) {
        try {
            let user = await userQuery.getUser();
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

    async getByName(req, res) {
        let name = req.body.name;
        let email = req.body.email;
        let userName = req.body.userName;
        let data = {
            name: name,
            email: email,
            userName: userName
        };

        try {
            let userExist = await userQuery.getByName(data);
            if(userExist != null && userExist != undefined && userExist != '') {
                return res
                    .status(400)
                    .send({
                        code: 200,
                        status: "user exist",
                    });
            }

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
    }
}