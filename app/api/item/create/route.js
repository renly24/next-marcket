import { NextResponse } from "next/server"
import connectDB from "../../../utils/database"
import { ItemModel } from "../../../utils/schemaModels"

export async function POST(request){
    // リクエストボディの内容をパース前にログ出力
    const rawBody = await request.text();
    console.log('rawBody:', rawBody);
    // もう一度パース用にRequestを再生成
    const reqBody = rawBody ? JSON.parse(rawBody) : {};
    console.log(reqBody)
    try{
        await connectDB()
        await ItemModel.create(reqBody)
        return NextResponse.json({message: "アイテム作成成功"})
    }catch(error){
        console.log('アイテム作成API例外:', error);
        return NextResponse.json({message: "アイテム作成失敗", error: error.message})
    }
}