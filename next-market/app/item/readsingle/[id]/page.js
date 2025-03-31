import Link from "next/link"
import Image from "next/image"

const getSingleItem = async(id) => {
  console.log(id)
  const response = await fetch(`http://localhost:3000/api/item/readsingle/${id}`,
    {cache: "no-cache"}
  )
  const jsondata = await response.json()
  const singleItem = jsondata.singleItem
  console.log(jsondata)
  return singleItem
}

const ReadSingleItem = async(context) => {
  const params = await context.params
  const singleItem = await getSingleItem(params.id)
  return (
    <div>
        <div>
            <Image src={singleItem.image} width={750} height={500}
    alt="item-image" priority/>
        </div>
        <div>
            <h2>{singleItem.price}</h2>
            <h3>{singleItem.title}</h3>
            <p>{singleItem.description}</p>
        </div> 
    </div>
  )
}
export default ReadSingleItem