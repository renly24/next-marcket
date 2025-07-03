"use client"
import { useRouter } from "next/navigation"
import { useState } from "react"

export default function LogoutPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  const handleLogout = async () => {
    setLoading(true)
    await fetch('/api/user/logout', { method: 'POST' })
    localStorage.removeItem("token")
    window.location.href = "/"; 
  }

  return (
    <div style={{textAlign: 'center', marginTop: '3em'}}>
      <h2>ログアウトしますか？</h2>
      <button onClick={handleLogout} disabled={loading} style={{padding: '0.5em 2em', fontSize: '1.1em', marginTop: '1em'}}>
        {loading ? 'ログアウト中...' : 'ログアウト'}
      </button>
    </div>
  )
} 