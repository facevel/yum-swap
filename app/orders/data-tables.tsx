"use client"

import React from "react"
import { collection, getFirestore } from "@firebase/firestore"
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table"
import { useCollection } from "react-firebase-hooks/firestore"

import firebase from "@/lib/firebase"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
}


//hide the id column from the table

export function DataTable<TData, TValue>({
                                           columns,
                                           data,
                                         }: DataTableProps<TData, TValue>) {

  //hide the id column from the table

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  })
  React.useEffect(() => {
    //table.getColumn("id")?.toggleVisibility(false)
    table.getColumn("items")?.toggleVisibility(false)
  }, [table])

  const [value, loading, error] = useCollection(
    collection(getFirestore(firebase!), 'orders'),
    {
      snapshotListenOptions: {includeMetadataChanges: true},
    }
  );


  // @ts-ignore
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                  </TableHead>
                )
              })}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {
            table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (

                <Sheet>
                    <TableRow
                      key={row.id}
                      className={""}
                      data-state={row.getIsSelected() && "selected"}
                    >
                      {row.getVisibleCells().map((cell) => (
                        <TableCell key={cell.id}>
                          <SheetTrigger className={""}>
                          {flexRender(cell.column.columnDef.cell, cell.getContext())}
                          </SheetTrigger>
                        </TableCell>
                      ))}
                    </TableRow>
                  <SheetContent>
                    <SheetHeader>
                      <SheetTitle> <span className={"dark:text-gray-500"}>Order </span>
                        {row.getValue("id")
                        }</SheetTitle>
                      <SheetDescription>
                        <div>
                          <div className="flex flex-col">
                            <hr className="h-px my-3 bg-gray-200 border-0 dark:bg-gray-700"/>
                            <p className={"text-lg"}>{
                              // @ts-ignore
                              row.getValue("items").split(",").map((item: string, index: number) => {
                                return (
                                  // <p className={"text-md"}>{index + 1}. {item.substring(1)} x {item.substring(0, 1)}</p>
                                  <div
                                    className={"w-full bg-gray-100 dark:bg-gray-800 my-2 p-2 rounded-lg flex flex-row"}>
                                    <img src={
                                      item.substring(1).toLowerCase().includes('cola')
                                        ? 'coke.jpg'
                                        : item.substring(1).toLowerCase().includes('pepsi')
                                          ? 'pepsi.webp'
                                          : item.substring(1).toLowerCase().includes('atta')
                                            ? 'atta.jpg'
                                            : ''
                                    }
                                         alt={"img"}
                                         className={"h-24 w-24 rounded-lg object-cover"}
                                    />
                                    <div className={"flex flex-col"}>
                                      <p className={"ml-2 text-black dark:text-white"}>{item.substring(1)} <span
                                        className={"text-sm"}>x{item.substring(0, 1)}</span></p>
                                      <p className={"ml-2 text-black dark:text-white text-sm"}>
                                        {item.substring(1).toLowerCase().includes('cola')
                                          ? 'Expires On: 30/05/2023'
                                          : item.substring(1).toLowerCase().includes('pepsi')
                                            ? 'Expires On: 06/06/2023'
                                            : item.substring(1).toLowerCase().includes('atta')
                                              ? 'Expires on 05/06/2023'
                                              : ''
                                        }
                                      </p>
                                    </div>
                                  </div>
                                )
                              })
                            }
                            </p>
                          </div>
                        </div>
                      </SheetDescription>
                    </SheetHeader>
                  </SheetContent>
                </Sheet>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  No results.
                </TableCell>
              </TableRow>
            )}
        </TableBody>
      </Table>
    </div>
  )
}
