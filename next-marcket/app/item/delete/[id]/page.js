"use client"
import { useState } from "react"
import { useEffect } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import useAuth from "@/app/utils/useAuth"

const DeleteItem = (context) => {
   
    const [title, setTitle] = useState("")
    const [price, setPrice] = useState("")
    const [image, setImage] = useState("")
    const [description, setDescription] = useState("")
    const [email, setEmail] = useState("")
    const [loading, setLoading] = useState(false)

    const router = useRouter()
    const loginUserEmail = useAuth()

    useEffect(() => {
        const getSingleItem = async(id) => {
            const response = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/item/readsingle/${id}`,
                {cache: "no-cache"}
            )
            const jsondata = await response.json()
            const singleItem = jsondata.singleItem

            setTitle(singleItem.title)
            setPrice(singleItem.price)
            setImage(singleItem.image)
            setDescription(singleItem.description)            
            setEmail(singleItem.email)
            setLoading(true)
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
            const response = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/item/delete/${params.id}`,
                {
                    method: "DELETE",
                    headers: {
                        "Accept": "application/json",
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${localStorage.getItem("token")}`
                    },
                    body: JSON.stringify({
                        email: "loginUserEmail"
                    })
                }
            )
            const jsonData = await response.json()
            alert(jsonData.message)
            router.push("/")
            router.refresh()
        }catch{
            alert("アイテム削除失敗0")
        }
    }
    if(loading){
        if(loginUserEmail){
            return (
                <div>
                    <h1 className="page-title"> アイテム削除 </h1> 
                    <form onSubmit={handleSubmit}>
                        <h2>{title}</h2>
                        <Image src={image} width={750} height={500}
                            alt="item-image" priority/>
                        <h3>{price}</h3>
                        <p>{description}</p>
                        <button>アイテム削除</button>
                    </form>
                </div>
            )
        } else { 
            return <h1>権限がありません</h1> 
        }
    }else{
        return <h1>ローディング中...</h1>
    }
}
export default DeleteItem