const userModel = require('../../model').userModel;

module.exports = {
    async createUser(data) {
        return await userModel.create(data);
    },

    async getUser() {
        return await userModel.findAll();
    },

    async getByName(data) {
        return await userModel.findAll({
            where: {
                "name" : data.name
            }
        });
    },

    async getUserById(data) {
        return await userModel.findOne({
            where: {
                "id": data.id
            }
        });
    },

    async getUniqueUser(email) {
        return await userModel.findOne({
            where: {
                "email": email
            }
        });
    },
    
    async getUniqueUserByUserName(userName) {
        return await userModel.findOne({
            where: {
                "userName": userName
            }
        });
    }
}