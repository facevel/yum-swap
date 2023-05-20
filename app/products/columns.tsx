"use client"

import {ColumnDef} from "@tanstack/react-table"
import {Product} from ".prisma/client";


export const columns: ColumnDef<Product>[] = [
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "price",
    header: "Price",
    cell: ({row}) => {
      console.log({status: productStatus(row.getValue("expiry"))})
      return (
        <p>
          ₹ {row.getValue("price")}
        </p>
      )
    }
  },
  {
    accessorKey: "expiry",
    header: "Expiry",
  },
  {
    accessorKey: "stock",
    header: "Stock",
  },
  {
    header: "Status",
    id: "status",
    cell: ({row}) => {
      console.log({status: productStatus(row.getValue("expiry"))})
      return (
        <div>
          <div
            className={`w-fit rounded-md bg-opacity-60 px-3 py-1 dark:bg-opacity-40 ${getColorNames(
              productStatus(row.getValue("expiry")
              ))}`}>
            {productStatus(row.getValue("expiry"))}
          </div>
        </div>
      )
    }
  },
  {
    accessorKey: "manufacturer",
    header: "Manufacturer",
  }
]

const getColorNames = (color: string) => {
  switch (color) {
    case "Expired":
      return "bg-red-800 text-red-400"
    case "About to Expire":
      return "bg-yellow-800 text-yellow-400"
    case "Active":
      return "bg-green-800 text-green-400"
    default:
      return "bg-green-800 text-green-400"
  }
}
const productStatus = (expiry: Date) => {
  const currentDate = new Date();
  const expiryDate = new Date(expiry);
  const difference = expiryDate.getTime() - currentDate.getTime();
  const hours = difference / (1000 * 60 * 60);

  console.log(hours); // 72
  if (hours < 0) {
    return "Expired"
  } else if (hours > 0 && hours < 120) {
    return "About to Expire"
  } else {
    return "Active"
  }

}
