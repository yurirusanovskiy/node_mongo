const mongoose = require('mongoose');

async function connectToDatabase() {
    const dbUser = process.env.DB_USER;
    const dbPass = process.env.DB_PASS;

    try {
        await mongoose.connect(`mongodb+srv://${dbUser}:${dbPass}@clustery.ueih4.mongodb.net/?retryWrites=true&w=majority&appName=ClusterY`);
        console.log('Connected to MongoDB');
    } catch (err) {
        console.log('Failed to connect to MongoDB:', err);
        throw err;
    }
}

async function disconnectFromDatabase() {
    try {
        await mongoose.disconnect();
        console.log('Disconnected from MongoDB');
    } catch (err) {
        console.log('Failed to disconnect from MongoDB:', err);
        throw err;
    }
}

module.exports = { connectToDatabase, disconnectFromDatabase };
