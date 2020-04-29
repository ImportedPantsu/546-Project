const mongoCollections = require('../config/mongoCollections');
const users = mongoCollections.users;
const ObjectId = require('mongodb').ObjectId;
const bcrypt = require('bcryptjs');
const mapFunctions = require('./maps');


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
        if (typeof(user.email) != 'string') throw "Error: Email must be a string";
        if (typeof(user.username) != 'string') throw "Username must be a string";
        if (typeof(user.password) != 'string') throw "Password must be a string";

        let salt = bcrypt.genSaltSync(10);
        let hash = bcrypt.hashSync(user.password, salt);

        let newUser = {
            email: user.email,
            username: user.username,
            hashedPassword: hash,
            savedMaps: {}
        };
        
        const usersCollection = await users();
        const createdUser = await usersCollection.insertOne(newUser);
        if (createdUser.insertedCount === 0) throw `Error: The following user could not be created: ${newUser}`;
        const addedId = createdUser.insertedId;
        return await this.getUser(user.username).catch(function(e) {
            console.error(e)});
    },

    async saveGame(username, mapId, mapData, time){
        if(!username) throw 'Error: Must provide username';
        if(typeof(username) != 'string') throw 'Error: username must be string';
        if (!Array.isArray(mapData)) throw "Map data must be an array of arrays";
        mapData.forEach(element => {
            if(!Array.isArray(element)) throw "Map data must be an array of arrays";
        });
        if(!mapId) throw "Error: Must provide mapId";
        if (typeof(mapId) == "string") mapId = ObjectId(mapId);
        if(!ObjectId.isValid(mapId)) throw "Error: Must provide mapId as ObjectId";
        
        // Ensure map exists
        try{
            await mapFunctions.getMapById(mapId);
        } catch(e){
            return e;
        }
        const usersCollection = await users();
        let newSaveData = {
                mapData: mapData,
                currentTime: time,
            }
        try{
            const user = await this.getUser(username);
            let monogoField = `savedMaps.${mapId}`
            const savedMap = await usersCollection.updateOne({_id: user._id},{$set: {[monogoField]: newSaveData}});
        } catch(e){
            return e;
        }

    },

    async loadGame(username, mapId){
        if(!username) throw 'Error: Must provide username';
        if(typeof(username) != 'string') throw 'Error: username must be string';
        if(!mapId) throw "Error: Must provide mapId";
        if (typeof(mapId) == "string") mapId = ObjectId(mapId);
        if(!ObjectId.isValid(mapId)) throw "Error: Must provide mapId as ObjectId";
        
        try{
            const user = await this.getUser(username);
            return user['savedMaps'][mapId];
        } catch(e){
            return e;
        }
    },
}