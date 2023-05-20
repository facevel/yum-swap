import {NextResponse} from 'next/server';
import {PrismaClient} from "@prisma/client";

const prisma = new PrismaClient()

// export interface Orders {
//   id: number;
//   user: User;
//   total: number;
//   items: Json;
//   timestamp: Date;
//   created_at: Date;
// }
export async function POST(request: Request) {
//add a new product to prisma

  // @ts-ignore
  const {user, total, items, timestamp, created_at} = await request.json();

  const product = await prisma.orders.create({
    data: {
      total,
      items,
      timestamp,
      created_at,
      user
    },
  });
  return NextResponse.json({"result": `Order with id: ${product.id} was created`});
}

//get request to get all products
export async function GET() {
  const products = await prisma.orders.findMany();
  return NextResponse.json(products);
}

// delete all products on delete request
export async function DELETE() {
  const products = await prisma.orders.deleteMany();
  return NextResponse.json(products);
}
