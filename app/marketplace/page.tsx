import ProductCard from "@/components/product-card";

export default function IndexPage() {
  const prodArr = [{
    "id": 1,
    "name": " Apple",
    "description": "A delicious and nutritious fruit.",
    "price": 1.99,
    "expiry": new Date("2022-05-01"),
    "manufacturer": "Apple Inc.",
    "manufacturer_date": new Date("2021-05-11"),
    "image": "https://healthjade.com/wp-content/uploads/2017/10/apple-fruit.jpg"
  }, {
    "id": 2,
    "name": "Likely Apple",
    "description": "A delicious and nutritious fruit.",
    "price": 1.99,
    "expiry": new Date("2022-05-01"),
    "manufacturer": "Apple Inc.",
    "manufacturer_date": new Date("2021-05-11"),
    "image": "https://healthjade.com/wp-content/uploads/2017/10/apple-fruit.jpg"
  }, {
    "id": 3,
    "name": "Maybe Apple",
    "description": "A delicious and nutritious fruit.",
    "price": 1.99,
    "expiry": new Date("2022-05-01"),
    "manufacturer": "Apple Inc.",
    "manufacturer_date": new Date("2021-05-11"),
    "image": "https://healthjade.com/wp-content/uploads/2017/10/apple-fruit.jpg"
  }, {
    "id": 4,
    "name": "Definitely Not Apple",
    "description": "A delicious and nutritious fruit.",
    "price": 1.99,
    "expiry": new Date("2022-05-01"),
    "manufacturer": "Apple Inc.",
    "manufacturer_date": new Date("2021-05-11"),
    "image": "https://healthjade.com/wp-content/uploads/2017/10/apple-fruit.jpg"
  }]
  return (
    <section className="container grid items-center gap-6 pb-8 pt-6 md:py-10">
      <h1 className={"text-center font-bold text-4xl"}>Marketplace</h1>
      <div className={"grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"}>
        {
          prodArr.map((item, index) => (
            <div key={index}>
              <ProductCard product={
                {
                  "id": item.id,
                  "name": item.name,
                  "description": item.description,
                  "price": item.price,
                  "expiry": item.expiry,
                  "manufacturer": item.manufacturer,
                  "manufacturer_date": item.manufacturer_date,
                  "image": item.image
                }
              }/>
            </div>
          ))
        }

      </div>
    </section>
  )
}
