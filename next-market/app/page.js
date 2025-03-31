import Link from "next/link"
import Image from "next/image"

const getAllItems = async() => {
  const response = await fetch("http://localhost:3000/api/item/readall",
    {cache: "no-cache"}
  )
  const jsondata = await response.json()
  const allitems = jsondata.allItems
  return allitems
}


const ReadAllItems = async() => {
  const allItems = await getAllItems()
  return (
    <div>
      <h1 className="h1-styele">ホーム画面</h1>
      {allItems.map(item =>
      <Link href = {'/item/readsingle/${item._id}'} key={item._id}>
          <Image src={item.image} width={750} height={500}
alt="item-image" priority/>
          <div>
            <h2>{item.price}</h2>
            <h3>{item.title}</h3>
            <p>{item.description}</p>
          </div> 
        </Link>
      )}
    </div>
  )
}
export default ReadAllItems