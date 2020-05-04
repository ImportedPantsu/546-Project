const mongoCollections = require('../config/mongoCollections');
const maps = mongoCollections.maps;
const ObjectId = require('mongodb').ObjectId;
const mapGenerator = require("./generator")


module.exports = {
    
    async createMap(map){
        if (!map.mapName  || !map.mapData || !map.solution || !map.difficulty || ! map.scoreData) throw "Must provide all fields (mapData, solution, difficulty, scoreData)"
        if (!Array.isArray(map.mapData)) throw "Map data must be an array of arrays";
        map.mapData.forEach(element => {
            if(!Array.isArray(element)) throw "Map data must be an array of arrays";
        });
        if (!Array.isArray(map.solution)) throw "Soultion data must be an array of arrays";
        map.solution.forEach(element => {
            if(!Array.isArray(element)) throw "Solution data must be an array of arrays";
        });
        if(typeof(map.mapName) != 'string') throw "Map Name must be a string";
        if(typeof(map.difficulty) != 'string') throw "Difficulty must be a string";
        if(typeof(map.scoreData) != 'object') throw "Score Data must be an object";

        let newMap = {
            mapName: map.mapName,
            mapData: map.mapData,
            solution: map.solution,
            difficulty: map.difficulty,
            scoreData: map.scoreData
        };
        
        const mapsCollection = await maps();
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

    async addNewScore(id, newScoreData){
        if(!id) throw "Error: Must provide id of desired map";
        if (typeof(id) == "string") id = ObjectId(id); // If the id is passed as a string its converted
        if(!ObjectId.isValid(id)) throw "Error: Must provide id as ObjectId";
        
        position = newScoreData['rank'] - 1;
        let update = { "$set": { } }
        update["$set"]["scoreData." + position] = newScoreData;
        const mapsCollection = await maps();
        const scoreUpdate = await mapsCollection.updateOne({_id: id},update);
        return true;
    },

}