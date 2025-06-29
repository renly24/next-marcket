import connectDB from "@/app/utils/database";
import { UserModel } from "@/app/utils/schemaModels";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";

export async function POST(request){
    const reqBody = await request.json()
    try{
        await connectDB()
        // パスワードをハッシュ化
        const hashedPassword = await bcrypt.hash(reqBody.password, 10)
        const userData = { ...reqBody, password: hashedPassword }
        await UserModel.create(userData)
        return NextResponse.json({message: "ユーザー登録成功"})
    }catch(error){
        return NextResponse.json({message: "ユーザー登録失敗", error: error.message})
    }
}