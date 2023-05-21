"use client"

import {ColumnDef} from "@tanstack/react-table"
import {format} from "date-fns";
import parseISO from "date-fns/parseISO";
import {Button} from "@/components/ui/button";
import {AppRouterInstance} from "next/dist/shared/lib/app-router-context";
import {Order} from "@/app/orders/page";
import {TbChevronRight} from "react-icons/tb";


// items: string[];
// timestamp: string,
//   total: number,
//   user_id: string
// status: string
export default function getColumns(router: AppRouterInstance): ColumnDef<Order>[] {
  return [
    {
      accessorKey: "id",
      header: "Order ID",
    },
    {
      accessorKey: "timestamp",
      header: "Date",
      cell: ({row}) => {
        return (
          <div>
            <div>
              <p>{format(parseISO((row.getValue("timestamp"))), "dd/MM/yyyy")
              }</p>
            </div>
          </div>
        )
      }
    },
    {
      accessorKey: "items",
      header: "Items",
      cell: ({row}) => {
        return (
          <div>
            <div>
              <p>{row.getValue("items")}</p>
            </div>
          </div>
        )
      }
    },
    {
      accessorKey: "total",
      header: "Total",
      cell: ({row}) => {
        return (
          <p>
            ₹ {row.getValue("total")}
          </p>
        )
      }
    },
    {
      header: "Status",
      accessorKey: "status",
      id: "status",
      cell: ({row}) => {
        console.log({status: row.getValue("status")});
        console.log({status: getColorNames(row.getValue("status"))})
        return (
          <div>
            <div
              className={`w-fit rounded-md bg-opacity-60 px-3 py-1 dark:bg-opacity-40 ${getColorNames(
                (row.getValue("status")
                ))}`}>{row.getValue("status")}
            </div>
          </div>
        )
      }
    },

    {
      id: "actions",
      cell: ({row}) => {
        return (
          <div className={"flex items-center justify-center space-x-3"}>
            <Button variant={"ghost"} className={"ml-4"}>
              <TbChevronRight
                className={"text-md cursor-pointer transition duration-200 ease-in-out hover:scale-125"}/>
            </Button>
          </div>
        )
      },
    },
  ]
}

const getColorNames = (color: string) => {
  switch (color) {
    case "Received":
      return "bg-blue-800 text-blue-400"
    case "Dispatched":
      return "bg-yellow-800 text-yellow-400"
    case "Delivered":
      return "bg-green-800 text-green-400"
    default:
      return "bg-green-800 text-green-400"
  }
}
