"use client"
import { useState, useEffect } from "react" 
import { useRouter } from "next/navigation"

const Login = () => {
    const [User, setUser] = useState({
       email: "",
       password: ""
    })
    const [userEmail, setUserEmail] = useState("")
    const [showPassword, setShowPassword] = useState(false)

    const handlechange = (e) => {
        setUser({
            ...User,
            [e.target.name]: e.target.value
        })
    }

    const router = useRouter()

    useEffect(() => {
        // ログイン済みならトークンからメールアドレスを取得
        const token = localStorage.getItem("token")
        if (token) {
            try {
                const payload = JSON.parse(atob(token.split('.')[1]))
                setUserEmail(payload.email)
            } catch {}
        }
    }, [])

    const handleSubmit = async(e) => {
        e.preventDefault()
        try{
                const response = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/user/login`,
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
                window.location.href = "/"; 


            } catch {
                alert("ログイン失敗")
            }
        }

        return (
            <div>
                <title>ログインページ</title> 
                <meta name="description" content="ログインページです"/>
                <h1 className="page-title">ログイン</h1>
                {userEmail && (
                    <div style={{marginBottom: '1em', color: 'green'}}>ログイン中: {userEmail}</div>
                )}
                <form onSubmit = {handleSubmit}>
                    <input value={User.email} onChange={handlechange} type="text" name="email" placeholder="メールアドレス" required/> 
                    <div style={{position: 'relative', marginBottom: '2em'}}>
                        <input value={User.password} onChange={handlechange} type={showPassword ? "text" : "password"} name="password" placeholder="パスワード" required style={{width: '100%'}}/>
                        <div style={{position: 'absolute', left: 0, bottom: -15, display: 'flex', alignItems: 'center', gap: '0.5em'}}>
                            <input
                                type="checkbox"
                                id="showPassword"
                                checked={showPassword}
                                onChange={e => setShowPassword(e.target.checked)}
                                style={{
                                    width: '1.4em',
                                    height: '1.4em',
                                    margin: 0,
                                    padding: 0
                                }}
                            />
                            <label
                                htmlFor="showPassword"
                                style={{
                                    userSelect: 'none',
                                    cursor: 'pointer',
                                    whiteSpace: 'nowrap',
                                    fontSize: '1.4em',
                                    lineHeight: 1
                                }}
                            >
                                パスワードを表示
                            </label>
                        </div>
                    </div>
                    <button>ログイン</button>
                </form> 
            </div>
        )
    }
export default Login