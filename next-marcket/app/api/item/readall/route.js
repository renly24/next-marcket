import { NextResponse } from "next/server"
import connectDB  from "@/app/utils/database"
import { ItemModel } from "@/app/utils/schemaModels"

export async function GET(){
    try{
        await connectDB()
        const allItems = await ItemModel.find()
        console.log("取得したアイテム数:", allItems.length)
        return NextResponse.json({message: "アイテム読み取り成功（オール）", allItems: allItems})
    } catch (error) {
        console.error("API エラー:", error)
        return NextResponse.json(
            {message: "アイテム読み取り失敗（オール）", allItems: [], error: error.message}, 
            {status: 500}
        )
    }
}

export const revalidate = 0
