import Link from "next/link"
import Image from "next/image"

export const metadata = {
  title: "ホーム画面",
  description: "これはホーム画面です",
}

const getAllItems = async() => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/item/readall`,
    {cache: "no-cache"}
  )
  const jsondata = await response.json()
  const allitems = jsondata.allItems
  return allitems
}


const ReadAllItems = async() => {
  const allItems = await getAllItems()
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