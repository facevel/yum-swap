import {Button} from "@/components/ui/button";
import {RiArrowRightSLine} from "react-icons/ri";
import ProductCard from "@/components/product-card";

export default function IndexPage() {
  return (
    <section className="container grid items-center gap-6 pb-8 pt-6 md:py-10">
      <div className={"grid grid-cols-4 gap-4"}>
        <ProductCard product={
          {
            "id": 1,
            "name": "Apple",
            "description": "A delicious and nutritious fruit.",
            "price": 1.99,
            "expiry": new Date("2022-05-01"),
            "manufacturer": "Apple Inc.",
            "manufacturer_date": new Date("2021-05-11"),
            "image": "https://healthjade.com/wp-content/uploads/2017/10/apple-fruit.jpg"
          }
        }/>

      </div>
    </section>
  )
}
