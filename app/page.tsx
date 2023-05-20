import {RiArrowRightSLine} from "react-icons/ri"

import {Button} from "@/components/ui/button"
import Link from "next/link";

export default function IndexPage() {
  return (
    <section className="container grid items-center gap-6 pb-8 pt-6 md:py-10">
      <div className="flex max-w-[980px] flex-col items-start gap-2">
        <h1 className="text-3xl font-extrabold leading-tight tracking-tighter sm:text-3xl md:text-5xl lg:text-6xl">
          <span className={"text-red-500"}>Yum Swap</span> - Revolutionizing
          Food Waste: Manage, Analyze, Educate
        </h1>
        <p className="text-muted-foreground max-w-[950px] text-justify text-lg sm:text-xl">
          We&apos;re on a mission to reduce food waste, promote sustainability,
          and foster resilient and inclusive communities. Our platform connects
          food establishments with shelters, food banks, and charities to
          facilitate the efficient redistribution of surplus food. With
          real-time inventory management and automated alerts, we ensure safe
          and timely delivery of food to those in need.
        </p>
      </div>
      <div className="flex gap-4">
        <Button variant="outline">Learn More</Button>
        <Link href={"/marketplace"}>
          <Button className={"flex flex-row items-center"}>
            Continue to Marketplace
            <RiArrowRightSLine className={"mt-0.5 text-2xl"}/>
          </Button>
        </Link>
      </div>
      <div className={"mt-10 flex flex-col gap-4"}>
        <h1 className="text-2xl font-semibold leading-tight tracking-tighter sm:text-2xl md:text-4xl lg:text-5xl">
          Features we Provide
        </h1>
      </div>
    </section>
  )
}
