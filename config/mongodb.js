import { MongoClient } from 'mongodb';

let dbInstance = null;

export const connectDB = async () => {
    const client = new MongoClient(process.env.MONGO_DB, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });

    //Connect the client to the server
    await client.connect();

    //Assign clientDB to our dbInstance
    dbInstance = client.db(process.env.DB_NAME);
};

//Get database instance
export const getDB = () => {
    if (!dbInstance) throw new Error('Must connect to database first');
    return dbInstance;
};

// const listDatabase = async (client) => {
//     const databaseList = await client.db().admin().listDatabases();
//     console.log(databaseList);
// };
