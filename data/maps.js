const mongoCollections = require('../config/mongoCollections');
const maps = mongoCollections.maps;
const ObjectId = require('mongodb').ObjectId;


module.exports = {
    
    async createMap(mapName){
        if (typeof(mapName) != 'string') throw "Error: Inputs must be string";
        if (!mapName) throw "Error: Must provide name";
        
        const mapsCollection = await maps();
        let newMap = {
            mapName: mapName,
        };

        const addMap = await mapsCollection.insertOne(newMap);
        if (addMap.insertedCount === 0) throw `Error: The following map could not be added: ${newMap}`;
        
        const addedId = addMap.insertedId;
        return await this.getMapById(addedId);
    },

    async getAllMaps(){
        const mapsCollection = await maps();
        const allMaps = await mapsCollection.find({}).toArray();
        if (allMaps == false) throw "Error: No maps found";
        return allMaps;
    },

    async getMapById(id){
        if(!id) throw "Error: Must provide id of desired map";
        if (typeof(id) == "string") id = ObjectId(id); // If the id is passed as a string its converted
        if(!ObjectId.isValid(id)) throw "Error: Must provide id as ObjectId";
        
        const mapsCollection = await maps();
        const getMap = await mapsCollection.findOne({_id:id});
        if(!getMap) throw `Error: No existing map with the id: ${id}`;

        return getMap;
    },

}