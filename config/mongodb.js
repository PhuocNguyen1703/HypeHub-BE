import { MongoClient } from 'mongodb';

export const connectDB = async () => {
    const client = new MongoClient(process.env.MONGO_DB, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });

    try {
        //Connect the client to the server
        await client.connect();
        console.log('Connected successfully to server');

        // List database
        // await listDatabase(client);
    } finally {
        //Ensure that the client will close when finish/error
        await client.close();
    }
};

// const listDatabase = async (client) => {
//     const databaseList = await client.db().admin().listDatabases();
//     console.log(databaseList);
// };
