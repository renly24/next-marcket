"use client"
import Image from "next/image"
import Link from "next/link"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"

const Header = () => {
    const [userEmail, setUserEmail] = useState("")
    const router = useRouter()

    useEffect(() => {
        const token = localStorage.getItem("token")
        if (token) {
            try {
                const payload = JSON.parse(atob(token.split('.')[1]))
                setUserEmail(payload.email)
            } catch {}
        } else {
            setUserEmail("")
        }
    }, [])

    const handleLogout = () => {
        localStorage.removeItem("token")
        setUserEmail("")
        router.push("/")
        window.location.reload()
    }

    return (
        <header>
            <div>
                <Link href="/">
                <Image src="/header.svg" width={1330} height={148}
                alt="header-image" priority/>
                </Link>
            </div>
            <nav>
                <ul>
                    {!userEmail && <li><Link className="nav-btn" href="/user/register">ユーザー登録</Link></li>}
                    {userEmail ? (
                        <li>
                          <Link className="nav-btn" href="/user/logout">ログアウト</Link>
                        </li>
                    ) : (
                        <li><Link className="nav-btn" href="/user/login">ログイン</Link></li>
                    )}
                    <li><Link className="nav-btn" href="/item/create">アイテム作成</Link></li>
                </ul>
            </nav>
        </header>
    )
}
export default Header