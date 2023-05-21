"use client"

import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle,} from "@/components/ui/card"
import {Button} from "@/components/ui/button";
import {useState} from "react";
import {addDoc, collection, getFirestore} from "@firebase/firestore";
import firebase from "@/lib/firebase";
import {formatISO} from "date-fns";
import {CgSpinner} from "react-icons/cg";
import {useRouter} from "next/navigation";

interface Product {
  id: number
  name: string
  description: string
  price: number
  expiry: Date
  manufacturer: string
  manufacturer_date: Date
  image: string
}

const ProductCard = ({product}: { product: Product }) => {
  const [loading, setLoading] = useState<boolean>(false)
  let router = useRouter()
  // @ts-ignore
  return (
    <Card>
      <CardHeader>
        <CardTitle>{product.name}</CardTitle>
        <CardDescription>{product.description}</CardDescription>
        <p>₹ {product.price}</p>
      </CardHeader>
      <CardContent className={"flex flex-col justify-center"}>

        <img src={product.image}
             alt={"Product"}
             className={"h-64 w-full rounded-lg object-cover"}

        />
      </CardContent>
      <CardFooter>

        <Button onClick={() => {
          setLoading(true)
          setTimeout(async () => {
            setLoading(false)
            //add the data to firebase


            const d = formatISO(new Date(), {
              // @ts-ignore
              timeZone: 'Asia/Kolkata',
            })
            await addDoc(collection(getFirestore(firebase!), 'orders'), {
              items: `1${product.name}`,
              status: "Received",
              timestamp: d,
              image: product.image,
              total: product.price,
              user_id: "gUXNV1Numbhay0qklszAzAFVfVP2"
            })
            router.push("/orders")
          }, 3000)
        }
        } className={"flex w-full items-center justify-center"} size={"lg"}>{!loading ? "Buy Now" : (
          <CgSpinner className={"animate-spin text-2xl"}/>
        )}</Button>
      </CardFooter>
    </Card>
  )
}

export default ProductCard
