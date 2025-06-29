const mongoose = require('mongoose');

async function testConnection() {
    try {
        const mongoUri = "mongodb+srv://renly:SwVXWcKch8ZGBLEs@cluster0.3df4c.mongodb.net/test?retryWrites=true&w=majority&appName=Cluster0";
        console.log("MongoDBに接続中...");
        await mongoose.connect(mongoUri);
        console.log("✅ MongoDB接続成功！(test database)");
        
        // データベースの情報を取得
        const db = mongoose.connection.db;
        const collections = await db.listCollections().toArray();
        console.log("📁 利用可能なコレクション:", collections.map(c => c.name));
        
        await mongoose.disconnect();
        console.log("接続を閉じました");
    } catch (error) {
        console.error("❌ MongoDB接続エラー:", error.message);
    }
}

testConnection(); 