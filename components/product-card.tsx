"use client"

import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle,} from "@/components/ui/card"
import {Button} from "@/components/ui/button";
import {CgSpinner} from "react-icons/cg";
import {useState} from "react";
import {addDoc, collection, getFirestore} from "@firebase/firestore";
import firebase from "@/lib/firebase";
import {formatISO} from "date-fns";

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
  // @ts-ignore
  return (
    <Card>
      <CardHeader>
        <CardTitle>{product.name}</CardTitle>
        <CardDescription>{product.description}</CardDescription>
        <p>₹ {product.price}</p>
      </CardHeader>
      <CardContent>
        {!loading &&
          <img src={product.image}
               alt={"Product"}
               className={"h-64 w-full rounded-lg object-cover"}
          />}
        {loading &&
          <CgSpinner/>
        }
      </CardContent>
      <CardFooter>
        {/*<p>Best Before: {product.expiry.toLocaleDateString("en-US", {*/}
        {/*  year: "numeric",*/}
        {/*  month: "2-digit",*/}
        {/*  day: "2-digit"*/}
        {/*})}</p>*/}
        {/*<p>Manufactured: {product.manufacturer_date.toLocaleDateString("en-US", {*/}
        {/*  year: "numeric",*/}
        {/*  month: "2-digit",*/}
        {/*  day: "2-digit"*/}
        {/*})}</p>*/}
        <Button onClick={() => {
          setLoading(true)
          setTimeout(() => {
            setLoading(false)
            //add the data to firebase


            const d = formatISO(new Date(), {
              // @ts-ignore
              timeZone: 'Asia/Kolkata',
            })
            addDoc(collection(getFirestore(firebase!), 'orders'), {
              items: `1${product.name}`,
              status: "Received",
              timestamp: d,
              image: product.image,
              total: product.price,
              user_id: "gUXNV1Numbhay0qklszAzAFVfVP2"


            })
          }, 3000)
        }
        } className={"w-full"} size={"lg"}>Buy Now</Button>
      </CardFooter>
    </Card>
  )
}

export default ProductCard
