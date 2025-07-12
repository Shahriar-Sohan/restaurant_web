import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const menuItems = await prisma.menu.findMany();
    return NextResponse.json(menuItems);
  } catch (error) {
    console.error("[GET /api/menu]", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const {
      name,
      price,
      categoryId,
      availability = true,
      discount = 0,
      image,
      rating,
      prepTime,
      calories,
      ingredients,
    } = await request.json();

    if (!name || price === undefined || !categoryId) {
      return NextResponse.json(
        { error: "Missing required fields: name, price, categoryId" },
        { status: 400 }
      );
    }

    const newMenuItem = await prisma.menu.create({
      data: {
        name,
        price,
        categoryId,
        availability,
        discount,
        image,
        rating,
        prepTime,
        calories,
        ingredients,
      },
    });

    return NextResponse.json(newMenuItem, { status: 201 });
  } catch (error) {
    console.error("[POST /api/menu]", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const { food_id, ...updateData } = await request.json();

    if (!food_id) {
      return NextResponse.json({ error: "Missing food_id" }, { status: 400 });
    }

    const updatedMenu = await prisma.menu.update({
      where: { food_id },
      data: updateData,
    });

    return NextResponse.json(updatedMenu);
  } catch (error) {
    console.error("[PUT /api/menu]", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const { food_id } = await request.json();

    if (!food_id) {
      return NextResponse.json({ error: "Missing food_id" }, { status: 400 });
    }

    const deletedMenu = await prisma.menu.delete({
      where: { food_id },
    });

    return NextResponse.json(deletedMenu, { status: 200 });
  } catch (error) {
    console.error("[DELETE /api/menu]", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}