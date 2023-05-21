"use client"

import { useEffect, useRef } from "react"
import Image from "next/image"
import { TbChefHat } from "react-icons/tb"
import {FaUserAlt} from "react-icons/fa";

// @ts-ignore
const Chat = ({ chatData }) => {
  const messageEl = useRef(null)

  useEffect(() => {
    if (messageEl) {
      // @ts-ignore
      messageEl.current.addEventListener("DOMNodeInserted", (event) => {
        const { currentTarget: target } = event
        target.scroll({ top: target.scrollHeight, behavior: "smooth" })
      })
    }
  }, [])
  // @ts-ignore
  // @ts-ignore
  return (
    <div
      className={"mx-auto flex h-[calc(90vh-4.7rem)] w-full max-w-3xl flex-col"}
    >
      <div
        className="scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent flex flex-col items-center overflow-y-scroll text-sm"
        ref={messageEl}
      >
        {
          //@ts-ignore
          chatData.map((message, index) => {
            return (
              <div
                className="group w-full border-b border-black/10 text-gray-800 dark:border-gray-900/50 dark:text-gray-100"
                key={index}
              >
                <div className="m-auto flex gap-4 p-4 text-base md:max-w-2xl md:gap-6 md:py-6 lg:max-w-xl lg:px-0 xl:max-w-3xl">
                  <div className="relative flex w-[30px] flex-shrink-0 flex-col items-end">
                    {message?.role === "assistant" && (
                      <span className="relative flex h-[30px] w-[30px] items-center justify-center rounded-sm bg-green-400 text-white">
                        <TbChefHat />
                      </span>
                    )}
                    {message?.role === "user" && (
                      <span className="relative flex h-[40px] w-[40px] items-center justify-center rounded-sm text-white">
                        <FaUserAlt/>
                      </span>
                    )}
                  </div>

                  <div className="relative flex w-[calc(100%-50px)] flex-col gap-1 md:gap-3 lg:w-[calc(100%-115px)]">
                    <div className="flex flex-grow flex-col gap-3">
                      <div className="flex min-h-[20px] flex-col items-start gap-4 whitespace-pre-wrap break-words">
                        {message?.content}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )
          })
        }
      </div>
    </div>
  )
}

export default Chat
