import {RiArrowRightSLine} from "react-icons/ri"

import {Button} from "@/components/ui/button"
import Link from "next/link";

export default function IndexPage() {
  return (
    <section className="items-center gap-6 pb-8 pt-6 px-12 md:py-10 min-h-screen">
      <div className={"flex flex-col md:flex-row lg:flex-row gap-8"}>
        <div className="flex max-w-[980px] flex-col items-start gap-8">
          <h1 className="text-3xl font-extrabold leading-tight tracking-tighter sm:text-3xl md:text-5xl lg:text-6xl">
            <span className={"text-red-500"}>Yum Swap<br/>&gt;</span>Revolutionizing
            Food Waste: Manage, Analyze, Educate
          </h1>
          <p className="text-muted-foreground max-w-[950px] text-justify text-md leading-1">
            We&apos;re on a mission to reduce food waste, promote sustainability,
            and foster resilient and inclusive communities. Our platform connects
            food establishments with shelters, food banks, and charities to
            facilitate the efficient redistribution of surplus food. With
            real-time inventory management and automated alerts, we ensure safe
            and timely delivery of food to those in need.
          </p>
          <div className="flex gap-4">
            <Button variant="outline">Contact Business</Button>
            <Link href={"/marketplace"}>
              <Button className={"flex flex-row items-center"}>
                Continue to Marketplace
                <RiArrowRightSLine className={"mt-0.5 text-2xl"}/>
              </Button>
            </Link>
          </div>
          <hr className={"w-full dark:border-white transition-colors duration-300"}/>
        </div>
        <img
          alt={"Landing Image"}
          src={"/landingimg.png"}
          className={"max-w-sm md:max-w-sm lg:max-w-lg mx-auto rounded-2xl"}
        />
      </div>
    </section>
  )
}
