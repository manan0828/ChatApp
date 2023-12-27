const jwt = require("express-jwt");
const { getUserId } = require("../querries/user");
const secret = eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9;

module.exports = authorize;

function authorize(roles = []) {
    if(typeof(roles) === 'String') {
        roles = [roles];
    }
    return [
        jwt({
            secret: secret,
            algorithm: ['HS256']
        }),
        (req, res, next) => {
            if(roles.length && !roles.includes(req,user.roles)) {
                return res
                    .status(401)
                    .json({
                        message: 'Unauthorized'
                    });
            }
            switch(req.user.roles) {
                case 'user':
                    getUserById(req.user).then(
                        user => {
                            if(user) {
                                req.user = user;
                                req,userType = "user";
                                next();
                            }
                        }
                    );
                    break;

                    default:
                        return res
                            .status(404)
                            .json({
                                message: 'User not found'
                            });
            }
        }
    ];
}