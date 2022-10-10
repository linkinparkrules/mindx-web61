const {findAllUser} = require('../database/user.js');

const getUser = async () => {
    const admin = await findAllUser();
    return admin;
}

module.exports = {getUser};

