import { NextResponse } from "next/server"
import connectDB  from "@/app/utils/database"
import { ItemModel } from "@/app/utils/schemaModels"

export async function DELETE(request, context){
    const reqBody = await request.json()
    try{
        await connectDB()
        await ItemModel.deleteOne({_id: context.params.id}, reqBody)
        return NextResponse.json({message: "アイテム削除成功"})
    } catch {
        return NextResponse.json({message: "アイテム削除失敗"})
    }
}