import {NextResponse} from 'next/server';

const prisma = new PrismaClient()

export async function POST(request: Request) {
//add a new product to prisma

  // @ts-ignore
  const {name, description, price, expiry, manufacturer, manufacturer_date, image, stock} = await request.json();

  const product = await prisma.product.create({
    data: {
      name,
      description,
      price,
      image,
      expiry,
      manufacturer,
      manufacturer_date,
      stock
    },
  });
  return NextResponse.json({"result": `Product with id: ${product.id} was created`});
}

//get request to get all products
export async function GET() {
  const products = await prisma.product.findMany();
  return NextResponse.json(products);
}

// delete all products on delete request
export async function DELETE() {
  const products = await prisma.product.deleteMany();
  return NextResponse.json(products);
}
