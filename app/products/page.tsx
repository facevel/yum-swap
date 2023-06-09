"use client"

import {useEffect, useState} from "react";
import {DataTable} from "@/app/products/api/data-tables";
import getColumns from "@/app/products/columns";
import {useRouter} from 'next/navigation'
import {useCollection} from "react-firebase-hooks/firestore";
import {collection, getFirestore} from "@firebase/firestore";
import firebase from "@/lib/firebase";

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
  // useEffect(() => {
  //
  //   const options = {method: 'GET'};
  //
  //   fetch('/products/api', options)
  //     .then(response => response.json())
  //     .then(response => {
  //       console.log(response)
  //       setProducts(response)
  //     })
  //     .catch(err => console.error(err));
  // }, []);
  const [value, loading, error] = useCollection(
    collection(getFirestore(firebase!), 'products'),
    {
      snapshotListenOptions: {includeMetadataChanges: true},
    }
  );

  useEffect(() => {
    value?.docs.map((doc) => {
      console.log(doc.data())
      setProducts((prev) => {
        return [...prev, doc.data() as Product]
      })
    })
  }, [value]);


  return (
    <div>
      <div>
        <section className="container items-center justify-center gap-6 pb-8 pt-6 md:py-10">
          {loading ? <div>Loading...</div> :
            (
              <div>
                <div className="mb-6 flex max-w-[980px] flex-col items-start gap-2">
                  <h1
                    className="text-3xl font-extrabold leading-tight tracking-tighter sm:text-3xl md:text-4xl lg:text-4xl">
                    Inventory Managment, <br className="hidden sm:inline"/>
                  </h1>
                  <p className="max-w-[700px] text-lg text-muted-foreground sm:text-xl">
                    Prakhar, here is your current inventory.
                  </p>
                </div>
                <DataTable columns={getColumns(router)} data={products}/>
              </div>
            )
          }
        </section>
      </div>
    </div>
  )

}
