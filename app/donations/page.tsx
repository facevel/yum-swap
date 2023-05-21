"use client"

import {useEffect, useState} from "react"
import {ethers} from "ethers"
import {utils, BigNumber} from "ethers";

import {ContractAddress} from "@/config/smartContractConfig"
import abi from "@/lib/donationABI.json"
import {CgSpinner} from "react-icons/cg";
import {Card, CardDescription, CardFooter, CardHeader, CardTitle} from "@/components/ui/card";

const AllDonationsPage = () => {
  const [correctNetwork, setCorrectNetwork] = useState(false)
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false)
  const [currentAccount, setCurrentAccount] = useState("")

  const connectWallet = async () => {
    try {
      // @ts-ignore
      const {ethereum} = window
      if (!ethereum) {
        alert("Get MetaMask!")
        return
      }
      const chainId = await ethereum.request({method: "eth_chainId"})
      console.log(chainId)
      if (chainId != "0x3e5") {
        alert("You are not connected to test network")
        setCorrectNetwork(false)
        return
      } else {
        setCorrectNetwork(true)
      }

      const accounts = await ethereum.request({method: "eth_requestAccounts"})
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
      const {ethereum} = window
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
          <h1 className="text-6xl font-bold mb-5">All Donations</h1>
          {
            fetchingData &&
            <div className={'my-5 flex flex-row gap-2 items-center p-2 bg-gray-900 border rounded-2xl'}>
              <h1 className="text-md font-light">Fetcing Data from <span className={'font-bold'}>5ire</span> Blockchain
              </h1>
              <CgSpinner className={'animate-spin text-xl'}/>
            </div>
          }
          <div className="grid md:grid-cols-1 gap-4 lg:grid-cols-3 sm:w-full">
            {
              donations?.map((donation: any) => {
                return (
                  <Card>
                    <CardHeader>
                      <CardTitle>From- {donation[1]}</CardTitle>
                      <CardDescription>
                        {donation[3].length > 3 ? donation[3] : "-"}
                      </CardDescription>
                    </CardHeader>
                    <CardFooter className={"text-center flex justify-center items-center"}>
                      To- {donation[2]}
                      <br/>
                      {/*{new Date(parseInt(donation[4]._hex, 16)).getDate()}*/}
                      {}
                    </CardFooter>
                  </Card>
                )
              })}
          </div>
        </main>
      </div>
    </>
  )
}

export default AllDonationsPage
