"use client"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"

const UpdateItem = () => {
    const [item, setItem] = useState({
        title: "",
        price: "",
        image: "",
        description: "",
        email: "ダミーデータ"
    })

    const router = useRouter()

    const useEffect = useEffect(() => {
        const getSingleItem = async(id) => {
            console.log(id)
            const response = await fetch(`http://localhost:3000/api/item/readsingle/${id}`,
                {cache: "no-cache"}
            )
            const jsondata = await response.json()
            const singleItem = jsondata.singleItem
            
            return singleItem
        }
    })

    const handlechange = (e) => {
        setItem({
            ...item,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = async(e) => {
             
        e.preventDefault()
        try{
            const response = await fetch(`http://localhost:3000/api/item/update/${id}`,
                {
                    method: "PUT",
                    headers: {
                        "Accept": "application/json",
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${localStorage.getItem("token")}`
                    },
                    body: JSON.stringify(item)
                }
            )
            const jsonData = await response.json()
            alert(jsonData.message)
            router.push("/")
            router.refresh()
        }catch{
            alert("アイテム編集失敗")
        }
    }

    return (
        <div>
            <h1> アイテム編集 </h1> 
            <form onSubmit={handleSubmit}>
                <input value={item.title} onChange={handlechange} type="text" name="title" placeholder="アイテム名" required/>
                <input value={item.price} onChange={handlechange} type="text" name="price" placeholder="価格" required/> 
                <input value={item.image} onChange={handlechange} type="text" name="image" placeholder="画像" required/> 
                <textarea value={item.description} onChange={handlechange} name="description" rows={15} placeholder="商品説明" required></textarea> 
                <button> 更新 </button>
            </form>
        </div>
    )
}
export default UpdateItemd