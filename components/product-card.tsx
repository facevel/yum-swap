"use client"

import { Button } from "@/components/ui/button"
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
    <Card className="w-[350px]">
      <CardHeader/>
      <CardContent>
        <form>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <img
                src={product.image}
                alt={product.name}
                className="h-72 w-full rounded-md object-cover"
              />
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex flex-col gap-2 justify-start items-start">
        <h1>{product.name}</h1>
        <h1>{product.price}</h1>
      </CardFooter>
    </Card>
  )
}

export default ProductCard
