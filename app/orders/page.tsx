"use client"

import {useEffect, useState} from "react";
import {DataTable} from "@/app/products/api/data-tables";
import getColumns from "@/app/products/columns";
import {useRouter} from 'next/navigation'

export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  expiry: Date;
  manufacturer: string;
  manufacturer_date: Date;
  image: string;
  stock: number;
}

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([])

  let router = useRouter()
  useEffect(() => {

    const options = {method: 'GET'};

    fetch('/products/api', options)
      .then(response => response.json())
      .then(response => {
        console.log(response)
        setProducts(response)
      })
      .catch(err => console.error(err));
  }, []);


  return (
    <div>
      <div>
        <section className="container items-center justify-center gap-6 pb-8 pt-6 md:py-10">
          <div className="mb-6 flex max-w-[980px] flex-col items-start gap-2">
            <h1 className="text-3xl font-extrabold leading-tight tracking-tighter sm:text-3xl md:text-4xl lg:text-4xl">
              Good Evening, <br className="hidden sm:inline"/>
            </h1>
            <p className="max-w-[700px] text-lg text-muted-foreground sm:text-xl">
              Prakhar, here is your current inventory.
            </p>
          </div>
          <DataTable columns={getColumns(router)} data={products}/>
        </section>
      </div>
    </div>
  )

}
