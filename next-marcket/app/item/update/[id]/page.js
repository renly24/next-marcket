"use client";
import { useState } from "react"
import { useEffect } from "react"
import { useRouter } from "next/navigation"
import useAuth from "@/app/utils/useAuth"

const UpdateItem = (context) => {
   
    const [title, setTitle] = useState("")
    const [price, setPrice] = useState("")
    const [image, setImage] = useState("")
    const [description, setDescription] = useState("")
    const [email, setEmail] = useState("")

    const router = useRouter()
    const loginUserEmail = useAuth()

    useEffect(() => {
        const getSingleItem = async(id) => {
            const response = await fetch(`http://localhost:3000/api/item/readsingle/${id}`,
                {cache: "no-cache"}
            )
            const jsondata = await response.json()
            const singleItem = jsondata.singleItem

            setTitle(singleItem.title)
            setPrice(singleItem.price)
            setImage(singleItem.image)
            setDescription(singleItem.description)            
            setEmail(singleItem.email)
        }
        (async () => {
            const params = await context.params
            getSingleItem(params.id)
        })();
        
    },[context])

    const handleSubmit = async(e) => {
             
        e.preventDefault()
        try{
            const params = await context.params
            const response = await fetch(`http://localhost:3000/api/item/update/${params.id}`,
                {
                    method: "PUT",
                    headers: {
                        "Accept": "application/json",
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${localStorage.getItem("token")}`
                    },
                    body: JSON.stringify({
                        title: title,
                        price: price,
                        image: image,
                        description: description,
                        email: loginUserEmail
                    })
                }
            )
            const jsonData = await response.json()
            alert(jsonData.message)
            router.push("/")
            router.refresh()
        }catch{
            alert("アイテム編集失敗0")
        }
    }

    if(loginUserEmail){
        return (
            <div>
                <h1 className="page-title"> アイテム編集 </h1> 
                <form onSubmit={handleSubmit}>
                    <input value={title} onChange={(e) => setTitle(e.target.value)} type="text" name="title" placeholder="アイテム名" required/>
                    <input value={price} onChange={(e) => setPrice(e.target.value)} type="text" name="price" placeholder="価格" required/> 
                    <input value={image} onChange={(e) => setImage(e.target.value)} type="text" name="image" placeholder="画像" required/> 
                    <textarea value={description} onChange={(e) => setDescription(e.target.value)} name="description" rows={15} placeholder="商品説明" required></textarea> 
                    <button> 更新 </button>
                </form>
            </div>
        )
    } else { 
        return <h1>権限がありません</h1> 
    }
}
export default UpdateItem