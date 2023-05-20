"use client"

import {ColumnDef} from "@tanstack/react-table"
import {Product} from ".prisma/client";
import {format} from "date-fns";
import parseISO from "date-fns/parseISO";
import {donatedItemsStore} from "@/app/stores";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import {Button} from "@/components/ui/button";
import {BsThreeDotsVertical} from "react-icons/all";
import {AppRouterInstance} from "next/dist/shared/lib/app-router-context";


export default function getColumns(router: AppRouterInstance): ColumnDef<Product>[] {
  return [
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
      cell: ({row}) => {

        console.log({status: productStatus(row.getValue("expiry"))})
        return (
          <div>
            <div>
              <p>{format(parseISO((row.getValue("expiry"))), "dd/MM/yyyy")
              }</p>
            </div>
          </div>
        )
      }
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
    },
    {
      id: "actions",
      cell: ({row}) => {
        return (
          <div className={"flex items-center justify-center space-x-3"}>
            {/*<VscCopy className={"text-md m-3 cursor-pointer transition duration-200 ease-in-out hover:scale-125"}*/}
            {/*         onClick={() => {*/}
            {/*           navigator.clipboard.writeText(command)*/}
            {/*             .then(() => toast({description: "Copied Command"}))*/}
            {/*         }}/>*/}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant={"ghost"} className={"ml-4"}>
                  <BsThreeDotsVertical
                    className={"text-md cursor-pointer transition duration-200 ease-in-out hover:scale-125"}/>
                </Button>
                {/*<Button variant="ghost" className="h-8 w-8 p-0">*/}
                {/*  <span className="sr-only">Open menu</span>*/}
                {/*  <MoreHorizontal className="h-4 w-4"/>*/}
                {/*</Button>*/}
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className={""}>
                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                <DropdownMenuSeparator/>
                <DropdownMenuItem>List on Market</DropdownMenuItem>
                <DropdownMenuItem onClick={() => {
                  donatedItemsStore.set({
                    ngoName: "",
                    donorName: "Prakhar",
                    units: row.getValue("stock"),
                    product: row.getValue("name"),
                    date: format(new Date(), "dd/MM/yyyy")
                  })
                  console.log(donatedItemsStore.get())
                  router.push('/donate')
                }
                }>Donate</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        )
      },
    },
  ]
}

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
