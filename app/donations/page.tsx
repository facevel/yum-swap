"use client"

import { useEffect, useState } from "react"
import { ethers } from "ethers"

import { ContractAddress } from "@/config/smartContractConfig"
import abi from "@/lib/donationABI.json"
import {CgSpinner} from "react-icons/cg";

const AllDonationsPage = () => {
  const [correctNetwork, setCorrectNetwork] = useState(false)
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false)
  const [currentAccount, setCurrentAccount] = useState("")

  const connectWallet = async () => {
    try {
      // @ts-ignore
      const { ethereum } = window
      if (!ethereum) {
        alert("Get MetaMask!")
        return
      }
      const chainId = await ethereum.request({ method: "eth_chainId" })
      console.log(chainId)
      if (chainId != "0x3e5") {
        alert("You are not connected to test network")
        setCorrectNetwork(false)
        return
      } else {
        setCorrectNetwork(true)
      }

      const accounts = await ethereum.request({ method: "eth_requestAccounts" })
      console.log("found accounts", accounts[0])
      setCurrentAccount(accounts[0])
      setIsUserLoggedIn(true)
    } catch (error) {
      console.log(error)
    }
  }

  const [fetchingData, setFetchingData] = useState(true)

  const getAllDonations = async () => {
    await connectWallet()
    try {
      // @ts-ignore
      const { ethereum } = window
      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum)
        const signer = provider.getSigner()
        const contract = new ethers.Contract(ContractAddress, abi, signer)
        return contract.getAllDonations()

      }
    } catch (error) {
      console.log(error)
      return error
    }
  }

  const [donations, setDonations] = useState([])

  useEffect(() => {
    getAllDonations().then((res: any) => {
      console.log(res)
      setDonations(res)
      setFetchingData(false)

    })
      .catch((err: any) => {
        console.log(err)
        setFetchingData(false)
      })
  }, [])

  return (
    <>
      <div className="flex min-h-screen flex-col justify-center py-2">
        <main className="flex flex-1 min-h-screen flex-col items-center justify-center px-20 text-center">
          <h1 className="text-6xl font-bold">All Donations</h1>
          {
            fetchingData &&
            <div className={'my-5 flex flex-row gap-2 items-center p-2 bg-gray-900 border rounded-2xl'}>
              <h1 className="text-md font-light">Fetcing Data from <span className={'font-bold'}>5ire</span> Blockchain</h1>
              <CgSpinner className={'animate-spin text-xl'}/>
            </div>
          }
          <div className="mt-6 flex max-w-4xl flex-wrap items-center justify-around sm:w-full">
            {donations?.map((donation: any) => (
              <div className="mt-6 w-96 rounded-xl border p-6 text-left shadow-2xl">
                <h3 className="text-2xl font-bold">{donation[1]}</h3>
                <p className="mt-4 text-xl font-semibold">
                  {donation[3]}
                </p>
                <p className="mt-4 text-xl font-semibold">
                  {new Date(parseInt(donation[4],16)).getDate() }
                </p>
              </div>
            ))}
          </div>
        </main>
      </div>
    </>
  )
}

export default AllDonationsPage
