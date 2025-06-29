import Link from "next/link"
import Image from "next/image"

export const metadata = {
  title: "ホーム画面",
  description: "これはホーム画面です",
}

const getAllItems = async() => {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_URL || 'http://localhost:3000'
    const response = await fetch(`${baseUrl}/api/item/readall`, {cache: "no-cache"})
    const jsondata = await response.json()
    console.log("APIレスポンス:", jsondata)
    const allitems = jsondata.allItems || []
    console.log("取得したアイテム:", allitems)
    return allitems
  } catch (error) {
    console.error("データ取得エラー:", error)
    return []
  }
}

const ReadAllItems = async() => {
  const allItems = await getAllItems()
  
  if (!allItems || allItems.length === 0) {
    return (
      <div className="min-h-screen p-8">
        <h1 className="text-2xl font-bold mb-4">アイテム一覧</h1>
        <p className="text-gray-600">現在アイテムがありません。</p>
        <p className="text-sm text-gray-500 mt-2">新しいアイテムを追加してください。</p>
      </div>
    )
  }

  return (
    <div className="grid-container-in">
      {allItems.map(item =>
      <Link href = {`/item/readsingle/${item._id}`} key={item._id}>
          <Image src={item.image} width={750} height={500}
alt="item-image" priority/>
          <div>
            <h2>{item.price}</h2>
            <h3>{item.title}</h3>
            <p>{item.description.substring(0, 80)}...</p>
          </div> 
        </Link>
      )}
    </div>
  )
}
export default ReadAllItems