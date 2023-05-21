"use client"

import ProductCard from "@/components/product-card";
import {useCollection} from "react-firebase-hooks/firestore";
import {collection, getFirestore} from "@firebase/firestore";
import firebase from "@/lib/firebase";
import {useEffect, useState} from "react";

export default function IndexPage() {


  const [value, loading, error] = useCollection(
    collection(getFirestore(firebase!), 'market'),
    {
      snapshotListenOptions: {includeMetadataChanges: true},
    }
  );

  const [discountedProducts, setDiscountedProducts] = useState([])
  useEffect(() => {
    value?.docs.map((doc) => {
      // @ts-ignore
      setDiscountedProducts((prev) => {
        // add id to the object
        return [...prev, {...doc.data(), id: doc.id}]
      })
    })
  }, [value]);


  const prodArr = [{
    "id": 1,
    "name": " Ashirvaad Atta",
    "description": "Atta like no other in the country.",
    "price": 299,
    "expiry": new Date("2023-05-01"),
    "manufacturer": "Ashirvaad",
    "manufacturer_date": new Date("2022-05-11"),
    "image": "https://www.jiomart.com/images/product/original/490000041/aashirvaad-whole-wheat-atta-10-kg-product-images-o490000041-p490000041-0-202207051337.jpg"
  }, {
    "id": 2,
    "name": "Tata Salt",
    "description": "Tata salt is sourced from the Himalayas.",
    "price": 35,
    "expiry": new Date("2022-05-01"),
    "manufacturer": "Tata",
    "manufacturer_date": new Date("2022-02-11"),
    "image": "https://m.media-amazon.com/images/I/61aoHG0V6AL._SX522_.jpg"
  }, {
    "id": 3,
    "name": "Rawpressery Apple Juice",
    "description": "Juice made from the best apples.",
    "price": 199,
    "expiry": new Date("2022-08-01"),
    "manufacturer": "Rawpressery Inc",
    "manufacturer_date": new Date("2022-05-11"),
    "image": "https://m.media-amazon.com/images/I/4127k8j6PCL.jpg"
  }, {
    "id": 4,
    "name": "Tata Sampann Cashew",
    "description": "Handpicked cashews from the best farms.",
    "price": 199,
    "expiry": new Date("2023-05-01"),
    "manufacturer": "Apple Inc.",
    "manufacturer_date": new Date("2021-05-11"),
    "image": "https://m.media-amazon.com/images/I/61pjIbiloqL._SX522_.jpg"
  }]
  // @ts-ignore
  return (
    <div>
      <section className="container grid items-center gap-6 pb-8 pt-6 md:py-10">
        <h1 className={"text-center text-4xl font-bold"}>Marketplace</h1>
        <div className={"grid grid-cols-2 gap-4  md:grid-cols-3"}>
          {
            prodArr.map((item, index) => (
              <div key={index}>
                <ProductCard product={
                  {
                    "id": item.id,
                    "name": item.name,
                    "description": item.description,
                    "price": item.price,
                    "expiry": item.expiry,
                    "manufacturer": item.manufacturer,
                    "manufacturer_date": item.manufacturer_date,
                    "image": item.image
                  }
                }/>
              </div>
            ))
          }

        </div>
      </section>
      <hr className="my-8 h-px border-0 bg-gray-200 dark:bg-gray-700"/>
      <section className="container grid items-center gap-6 pb-8 pt-6 md:py-10">
        <h1 className={"text-center text-4xl font-bold"}>Discounted Marketplace</h1>
        <div className={"grid grid-cols-2 gap-4  md:grid-cols-3"}>
          {
            discountedProducts.map((item, index) => (
              <div key={index}>
                <ProductCard product={
                  {
                    // @ts-ignore
                    "id": item.id,
                    // @ts-ignore
                    "name": item.name,
                    // @ts-ignore
                    "description": item.description,
                    // @ts-ignore
                    "price": item.price,
                    // @ts-ignore
                    "expiry": item.expiry,
                    // @ts-ignore
                    "manufacturer": item.manufacturer,
                    // @ts-ignore
                    "manufacturer_date": item.manufacturer_date,
                    // @ts-ignore
                    "image": item.image
                  }
                }/>
              </div>
            ))
          }

        </div>
      </section>
    </div>
  )
}
