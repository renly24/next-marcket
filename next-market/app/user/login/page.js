"use client"
import { useState } from "react" 

const Login = () => {
    const [User, setUser] = useState({
       email: "",
       password: ""
    })

    const handlechange = (e) => {
        setUser({
            ...User,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = async(e) => {
        e.preventDefault()
        try{
                const response = await fetch("http://localhost:3000/api/user/login",
                {
                    method: "POST",
                    headers: {
                        "Accept": "application/json",
                        "Content-Type": "application/json"
                    },

                    body: JSON.stringify(User)
                })

                const jsonData = await response.json()
                localStorage.setItem("token", jsonData.token)
                alert(jsonData.message)
            } catch {
                alert("ログイン失敗")
            }
        }

        return (
            <div>
                <h1>ログイン</h1>
                <form onSubmit = {handleSubmit}>
                    <input value={User.email} onChange={handlechange} type="text" name="email" placeholder="メールアドレス" required/> 
                    <input value={User.password} onChange={handlechange} type="text" name="password" placeholder="パスワード" required/> 
                    <button>ログイン</button>
                </form> 
            </div>
        )
    }
export default Login