const mapData = require('../data/maps');
const userData = require('../data/user');
const mongoCollections = require('../config/mongoCollections');
const maps = mongoCollections.maps;
const users = mongoCollections.users;

const map0 = {
    mapName: "Map Demo",
    mapData: [
        [4,3,5,null,6,null,7,null,1],
        [6,8,2,5,7,1,4,9,3],
        [1,9,7,8,3,4,5,6,2],
        [8,2,6,1,9,5,3,4,7],
        [3,7,4,6,8,2,9,1,5],
        [9,5,1,7,4,3,6,2,8],
        [5,1,9,3,2,6,8,7,4],
        [2,4,8,9,5,7,1,3,6],
        [7,6,3,4,1,8,2,5,9]
    ],
    solution: [
        [4,3,5,2,6,9,7,8,1],
        [6,8,2,5,7,1,4,9,3],
        [1,9,7,8,3,4,5,6,2],
        [8,2,6,1,9,5,3,4,7],
        [3,7,4,6,8,2,9,1,5],
        [9,5,1,7,4,3,6,2,8],
        [5,1,9,3,2,6,8,7,4],
        [2,4,8,9,5,7,1,3,6],
        [7,6,3,4,1,8,2,5,9]
    ],
    difficulty: 'easy',
    scoreData: [
        {
            rank: 1,
            user: '-',
            score: 0
        },
        {
            rank: 2,
            user: '-',
            score: 0
        },
        {
            rank: 3,
            user: '-',
            score: 0
        },
    ]
};

const map1 = {
    mapName: "Map 1",
    mapData: [
        [null,null,null,2,6,null,7,null,1],
        [6,8,null,null,7,null,null,9,null],
        [1,9,null,null,null,4,5,null,null],
        [8,2,null,1,null,null,null,4,null],
        [null,null,4,6,null,2,9,null,null],
        [null,5,null,null,null,3,null,2,8],
        [null,null,9,3,null,null,null,7,4],
        [null,4,null,null,5,null,null,3,6],
        [7,null,3,null,1,8,null,null,null]
    ],
    solution: [
        [4,3,5,2,6,9,7,8,1],
        [6,8,2,5,7,1,4,9,3],
        [1,9,7,8,3,4,5,6,2],
        [8,2,6,1,9,5,3,4,7],
        [3,7,4,6,8,2,9,1,5],
        [9,5,1,7,4,3,6,2,8],
        [5,1,9,3,2,6,8,7,4],
        [2,4,8,9,5,7,1,3,6],
        [7,6,3,4,1,8,2,5,9]
    ],
    difficulty: 'easy',
    scoreData: [
        {
            rank: 1,
            user: '-',
            score: 0
        },
        {
            rank: 2,
            user: '-',
            score: 0
        },
        {
            rank: 3,
            user: '-',
            score: 0
        },
    ]
};

const map2 = {
    mapName: "Map 2",
    mapData: [
        [null,2,null,6,null,8,null,null,null],
        [5,8,null,null,null,9,7,null,null],
        [null,null,null,null,4,null,null,null,null],
        [3,7,null,null,null,null,5,null,null],
        [6,null,null,null,null,null,null,null,4],
        [null,null,8,null,null,null,null,1,3],
        [null,null,null,null,2,null,null,null,null],
        [null,null,9,8,null,null,null,3,6],
        [null,null,null,3,null,6,null,9,null]
    ],
    solution: [
        [1,2,3,6,7,8,9,4,5],
        [5,8,4,2,3,9,7,6,1],
        [9,6,7,1,4,5,3,2,8],
        [3,7,2,4,6,1,5,8,9],
        [6,9,1,5,8,3,2,7,4],
        [4,5,8,7,9,2,6,1,3],
        [8,3,6,9,2,4,1,5,7],
        [2,1,9,8,5,7,4,3,6],
        [7,4,5,3,1,6,8,9,2]
    ],
    difficulty: 'intermediate',
    scoreData: [
        {
            rank: 1,
            user: '-',
            score: 0
        },
        {
            rank: 2,
            user: '-',
            score: 0
        },
        {
            rank: 3,
            user: '-',
            score: 0
        }
    ]
};

const map3 = {
    mapName: "Map 3",
    mapData: [
        [null,null,null,6,null,null,4,null,null],
        [7,null,null,null,null,3,6,null,null],
        [null,null,null,null,9,1,null,8,null],
        [null,null,null,null,null,null,null,null,null],
        [null,5,null,1,8,null,null,null,3],
        [null,null,null,3,null,6,null,4,5],
        [null,4,null,2,null,null,null,6,null],
        [9,null,3,null,null,null,null,null,null],
        [null,2,null,null,null,null,1,null,null]
    ],
    solution: [
        [5,8,1,6,7,2,4,3,9],
        [7,9,2,8,4,3,6,5,1],
        [3,6,4,5,9,1,7,8,2],
        [4,3,8,9,5,7,2,1,6],
        [2,5,6,1,8,4,9,7,3],
        [1,7,9,3,2,6,8,4,5],
        [8,4,5,2,1,9,3,6,7],
        [9,1,3,7,6,8,5,2,4],
        [6,2,7,4,3,5,1,9,8]
    ],
    difficulty: 'hard',
    scoreData:  [
        {
            rank: 1,
            user: '-',
            score: 0
        },
        {
            rank: 2,
            user: '-',
            score: 0
        },
        {
            rank: 3,
            user: '-',
            score: 0
        }
    ]
};

const map4 = {
    mapName: "Map 4",
    mapData: [
        [1,null,null,4,8,9,null,null,6],
        [7,3,null,null,null,null,null,4,null],
        [null,null,null,null,null,1,2,9,5],
        [null,null,7,1,2,null,6,null,null],
        [5,null,null,7,null,3,null,null,8],
        [null,null,6,null,9,5,7,null,null],
        [9,1,4,6,null,null,null,null,null],
        [null,2,null,null,null,null,null,3,7],
        [8,null,null,5,1,2,null,null,4]
    ],
    solution: [
        [1,5,2,4,8,9,3,7,6],
        [7,3,9,2,5,6,8,4,1],
        [4,6,8,3,7,1,2,9,5],
        [3,8,7,1,2,4,6,5,9],
        [5,9,1,7,6,3,4,2,8],
        [2,4,6,8,9,5,7,1,3],
        [9,1,4,6,3,7,5,8,2],
        [6,2,5,9,4,8,1,3,7],
        [8,7,3,5,1,2,9,6,4]
    ],
    difficulty: 'easy',
    scoreData:  [
        {
            rank: 1,
            user: '-',
            score: 0
        },
        {
            rank: 2,
            user: '-',
            score: 0
        },
        {
            rank: 3,
            user: '-',
            score: 0
        }
    ]
};

const map5 = {
    mapName: "Map 5",
    mapData: [
        [2,null,null,3,null,null,null,null,null],
        [8,null,4,null,6,2,null,null,3],
        [null,1,3,8,null,null,2,null,null],
        [null,null,null,null,2,null,3,9,null],
        [5,null,7,null,null,null,6,2,1],
        [null,3,2,null,null,6,null,null,null],
        [null,2,null,null,null,9,1,4,null],
        [6,null,1,2,5,null,8,null,9],
        [null,null,null,null,null,1,null,null,2]
    ],
    solution: [
        [2,7,6,3,1,4,9,5,8],
        [8,5,4,9,6,2,7,1,3],
        [9,1,3,8,7,5,2,6,4],
        [4,6,8,1,2,7,3,9,5],
        [5,9,7,4,3,8,6,2,1],
        [1,3,2,5,9,6,4,8,7],
        [3,2,5,7,8,9,1,4,6],
        [6,4,1,2,5,3,8,7,9],
        [7,8,9,6,4,1,5,3,2]
    ],
    difficulty: 'hard',
    scoreData:  [
        {
            rank: 1,
            user: '-',
            score: 0
        },
        {
            rank: 2,
            user: '-',
            score: 0
        },
        {
            rank: 3,
            user: '-',
            score: 0
        }
    ]
};

const map6 = {
    mapName: "Special Map 1",
    mapData: [
        [null,2,null,null,null,null,null,null,null],
        [null,null,null,6,null,null,null,null,3],
        [null,7,4,null,8,null,null,null,null],
        [null,null,null,null,null,3,null,null,2],
        [null,8,null,null,4,null,null,1,null],
        [6,null,null,5,null,null,null,null,null],
        [null,null,null,null,1,null,7,8,null],
        [5,null,null,null,null,9,null,null,null],
        [null,null,null,null,null,null,null,4,null]
    ],
    solution: [
        [1,2,3,4,3,7,9,5,8],
        [8,9,5,6,2,1,4,7,3],
        [3,7,4,9,8,5,1,2,6],
        [4,5,7,1,9,3,8,6,2],
        [9,8,3,2,4,6,5,1,7],
        [6,1,2,5,7,8,3,9,4],
        [2,6,9,3,1,4,7,8,5],
        [5,4,8,7,6,9,2,3,1],
        [7,3,1,8,5,2,6,4,9]
    ],
    difficulty: 'expert',
    scoreData:  [
        {
            rank: 1,
            user: '-',
            score: 0
        },
        {
            rank: 2,
            user: '-',
            score: 0
        },
        {
            rank: 3,
            user: '-',
            score: 0
        }
    ]
};

const test = {
    mapName: "test",
    mapData: [
        [null,1,1,1,1,1,1,1,1],
        [1,1,1,1,1,1,1,1,1],
        [1,1,1,1,1,1,1,1,1],
        [1,1,1,1,1,1,1,1,1],
        [1,1,1,1,1,1,1,1,1],
        [1,1,1,1,1,1,1,1,1],
        [1,1,1,1,1,1,1,1,1],
        [1,1,1,1,1,1,1,1,1],
        [1,1,1,1,1,1,1,1,1],
    ],
    solution: [
        [1,1,1,1,1,1,1,1,1],
        [1,1,1,1,1,1,1,1,1],
        [1,1,1,1,1,1,1,1,1],
        [1,1,1,1,1,1,1,1,1],
        [1,1,1,1,1,1,1,1,1],
        [1,1,1,1,1,1,1,1,1],
        [1,1,1,1,1,1,1,1,1],
        [1,1,1,1,1,1,1,1,1],
        [1,1,1,1,1,1,1,1,1]
    ],
    difficulty: 'easy',
    scoreData: [
        {
            rank: 1,
            user: '-',
            score: 0
        },
        {
            rank: 2,
            user: '-',
            score: 0
        },
        {
            rank: 3,
            user: '-',
            score: 0
        },
    ]
};

const testUser = {
    email: 'joe@doe.com',
    username: 'fake',
    password: 'password'
}

async function main() {
    const mapsCollection = await maps();
    const usersCollection = await users();
    usersCollection.deleteMany({});
    mapsCollection.deleteMany({});
    try{

        await mapData.createMap(map0);

        await mapData.createMap(test);

        await mapData.createMap(map1);
        await mapData.createMap(map2);
        await mapData.createMap(map3);
        await mapData.createMap(map4);
        await mapData.createMap(map5);
        await mapData.createMap(map6);
        await userData.createUser(testUser);
    } catch(e){
        console.log("seed runs error: "+e);
    }
}

module.exports = {main}