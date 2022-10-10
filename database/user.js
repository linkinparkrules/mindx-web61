const {db} = require('./');
const {ObjectId} = require('mongodb');

const findByUsername = async (username) => {
    const user = await db.users.findOne({username: username});
    return user;
};

const insertUser = async (user) => {
    await db.users.insertOne(user);
    return user;
};

const findAllUser = async () => {
    return await db.users.find({}).toArray();
}

const findById = async (id) => {
    const user = await db.users.findOne({_id: ObjectId(id)});
    return user;
}

module.exports = {findByUsername, insertUser, findAllUser, findById};