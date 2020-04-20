const mongoCollections = require('../config/mongoCollections');
const users = mongoCollections.users;
const ObjectId = require('mongodb').ObjectId;
const bcrypt = require('bcryptjs');


module.exports = {
    
    async getUser(username){
        if (typeof(username) != 'string') throw 'Username must be a string';
        if (!username) throw 'Must provide username';

        const usersCollection = await users();
        const user = await usersCollection.findOne({"username":username});
        if (!user) throw "Error: No user found!";
        return user;
    },

    async createUser(user){
        if (!user.email || !user.username || !user.password) throw "Email: Must provide all fields (email, username, password)"
        if (!user.email.includes("@")) throw 'Error: Must provide valid email'
        if(typeof(user.email) != 'string') throw "Error: Email must be a string";
        if(typeof(user.username) != 'string') throw "Username must be a string";
        if(typeof(user.password) != 'string') throw "Password must be a string";

        let salt = bcrypt.genSaltSync(10);
        let hash = bcrypt.hashSync(user.password, salt);

        let newUser = {
            email: user.email,
            username: user.username,
            hashedPassword: hash,
            savedMaps: []
        };
        
        const usersCollection = await users();
        const createdUser = await usersCollection.insertOne(newUser);
        if (createdUser.insertedCount === 0) throw `Error: The following user could not be created: ${newUser}`;
        
        const addedId = createdUser.insertedId;
        return await this.getUser(addedId);
    },
}