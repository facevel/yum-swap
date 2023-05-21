"use client"

import {useEffect, useState} from "react";
import {DataTable} from "@/app/orders/data-tables";
import getColumns from "@/app/orders/columns";
import {useRouter} from 'next/navigation'
import {useCollection} from "react-firebase-hooks/firestore";
import {collection, getFirestore} from "@firebase/firestore";
import firebase from "@/lib/firebase";


export interface Order {
  id: string;
  items: string;
  timestamp: string,
  total: number,
  user_id: string
  status: string,
  image: string;
}

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([])

  let router = useRouter()
  const [value, loading, error] = useCollection(
    collection(getFirestore(firebase!), 'orders'),
    {
      snapshotListenOptions: {includeMetadataChanges: true},
    }
  );

  useEffect(() => {
    value?.docs.map((doc) => {
      setOrders((prev) => {
        // add id to the object
        return [...prev, {...doc.data(), id: doc.id} as Order]
      })
    })
  }, [value]);

  const [open, setOpen] = useState(true)


  return (
    <div>
      <div>
        <section className="container items-center justify-center gap-6 pb-8 pt-6 md:py-10">
          <div className="mb-6 flex max-w-[980px] flex-col items-start gap-2">
            <h1 className="text-3xl font-extrabold leading-tight tracking-tighter sm:text-3xl md:text-4xl lg:text-4xl">
              Order History <br className="hidden sm:inline"/>
            </h1>
            <p className="max-w-[700px] text-lg text-muted-foreground sm:text-xl">
              Here is your order history from the past.
            </p>
          </div>
          <DataTable columns={getColumns(router)} data={orders}/>
        </section>
      </div>
    </div>
  )

}
