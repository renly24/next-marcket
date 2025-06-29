const mongoose = require('mongoose');

// ユーザースキーマの定義
const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
});

const UserModel = mongoose.models.User || mongoose.model("User", UserSchema);

async function checkUsers() {
    try {
        const mongoUri = "mongodb+srv://renly:SwVXWcKch8ZGBLEs@cluster0.3df4c.mongodb.net/test?retryWrites=true&w=majority&appName=Cluster0";
        console.log("MongoDBに接続中...");
        await mongoose.connect(mongoUri);
        console.log("✅ MongoDB接続成功！");
        
        // ユーザーデータを取得
        const users = await UserModel.find({});
        console.log(`📊 ユーザー数: ${users.length}`);
        
        if (users.length > 0) {
            console.log("👥 登録済みユーザー:");
            users.forEach((user, index) => {
                console.log(`${index + 1}. 名前: ${user.name}, メール: ${user.email}, パスワード: ${user.password}`);
            });
        } else {
            console.log("❌ ユーザーデータが存在しません");
        }
        
        await mongoose.disconnect();
        console.log("接続を閉じました");
    } catch (error) {
        console.error("❌ エラー:", error.message);
    }
}

checkUsers(); 