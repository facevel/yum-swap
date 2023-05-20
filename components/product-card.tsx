"use client"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

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

const ProductCard = ({ product }: { product: Product }) => {
  // @ts-ignore
  return (
    <Card>
      <CardHeader>
        <CardTitle>{product.name}</CardTitle>
        <CardDescription>{product.description}</CardDescription>
        <img src={product.image}
          alt={"Product"}
             className={"h-64 object-cover rounded-lg"}
        />
      </CardHeader>
      <CardContent>
        <p>Best Before: {product.expiry.toLocaleDateString("en-US", {
          year: "numeric",
          month: "2-digit",
          day: "2-digit"
        })}</p>
      </CardContent>
      <CardFooter>
        <p>Manufactured: {product.manufacturer_date.toLocaleDateString("en-US", {
          year: "numeric",
          month: "2-digit",
          day: "2-digit"
        })}</p>
      </CardFooter>
    </Card>
  )
}

export default ProductCard
