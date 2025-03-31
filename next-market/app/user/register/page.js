"use client"
import { useState } from "react" 

const Register = () => {

     const [newUser, setNewUser] = useState({
           name: "",
           email: "",
           password: ""
        })

    const handlechange = (e) => {
        setNewUser({
            ...newUser,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = async(e) => {
        e.preventDefault()
        try{
            const response = await fetch("http://localhost:3000/api/user/register",
                {
                   method: "POST",
                   headers: {
                        "Accept": "application/json",
                        "Content-Type": "application/json"
                   },

                   body: JSON.stringify(newUser)
                }
            )
            const jsonData = await response.json()
            alert(jsonData.message)
        }catch{
            alert("ユーザー登録失敗")
        }
    }

    return (
        <div>
            <form onSubmit = {handleSubmit}>
                <input value={newUser.name} onChange={handlechange} type="text" name="name" placeholder="名前" required/> 
                <input value={newUser.email} onChange={handlechange} type="text" name="email" placeholder="メールアドレス" required/> 
                <input value={newUser.password} onChange={handlechange}  type="text" name="password" placeholder="パスワード" required/> 
                <button>登録</button>
            </form> 
        </div>
    )
}

export default Register