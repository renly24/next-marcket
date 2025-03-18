import mongoose from "mongoose"
import { unique } from "next/dist/build/utils"
const Schema = mongoose.Schema
const ItemSchema = new Schema({
    title: String,
    image: String,
    price: String,
    description: String,
    email: String,
})

const UserSchema = new Schema({
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
})

export const UserModel = mongoose.models.User || mongoose.model("User", UserSchema)
export const ItemModel = mongoose.models.Item || mongoose.model("Item", ItemSchema)