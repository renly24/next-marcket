"use client"
import { useEffect, useState } from "react"
import "./globals.css"
import Header from "./components/header"
import Footer from "./components/footer"

export default function RootLayout({ children }) {
  const [userEmail, setUserEmail] = useState("")

  useEffect(() => {
    const token = localStorage.getItem("token")
    if (token) {
      try {
        const payload = JSON.parse(atob(token.split('.')[1]))
        setUserEmail(payload.email)
      } catch {}
    }
  }, [])


  return (
    <html lang="ja">
      <body>
        <header style={{padding: '1em', background: '#f0f0f0', display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
          <div>Next Market</div>
          {userEmail && (
            <div style={{display: 'flex', alignItems: 'center', gap: '1em'}}>
              <span style={{color: 'green', fontWeight: 'bold'}}>ログイン中: {userEmail}</span>
            </div>
          )}
        </header>
        <Header/>
        {children}
        <Footer/>
      </body>
    </html>
  )
}