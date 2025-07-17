import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions"

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
  const session = await getServerSession(authOptions)
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  if (!session.user.role || session.user.role !== "admin") {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }
  try {
    const {
      food_name,
      description,
      category_id,
      price,
      image,
      availability ,
      discount,
      rating,
      prep_time,
      calories,
      ingredients,
    } = await request.json();

    if (!food_name || price === undefined || !category_id) {
      return NextResponse.json(
        { error: "Missing required fields: food_name, price, category_id" },
        { status: 400 }
      );
    }

    if (!Array.isArray(ingredients)) {
      return NextResponse.json(
        { error: "Ingredients must be an array of strings" },
        { status: 400 }
      );
    }

    const newMenuItem = await prisma.menu.create({
      data: {
        food_name,
        description,
        category_id,
        image,
        availability,
        discount: discount !== undefined ? parseFloat(discount) : undefined,
        rating: rating !== undefined ? parseFloat(rating) : undefined,
        price: parseFloat(price),
        prep_time: prep_time !== undefined ? parseInt(prep_time) : undefined,
        calories: calories !== undefined ? parseInt(calories) : undefined,
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
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  if (!session.user.role || session.user.role !== "admin") {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }
  try {
    const {
      food_id,
      food_name,
      description,
      category_id,
      price,
      image,
      availability,
      discount,
      rating,
      prep_time,
      calories,
      ingredients,
    } = await request.json();

    if (!food_id) {
      return NextResponse.json({ error: "Missing food_id" }, { status: 400 });
    }

    const updateData: any = {};

    if (food_name !== undefined) updateData.food_name = food_name;
    if (description !== undefined) updateData.description = description;
    if (category_id !== undefined) updateData.category_id = category_id;
    if (image !== undefined) updateData.image = image;
    if (availability !== undefined) updateData.availability = availability;
    if (discount !== undefined) updateData.discount = parseFloat(discount);
    if (rating !== undefined) updateData.rating = parseFloat(rating);
    if (price !== undefined) updateData.price = parseFloat(price);
    if (prep_time !== undefined) updateData.prep_time = prep_time;
    if (calories !== undefined) updateData.calories = calories;
    if (ingredients !== undefined) {
      if (!Array.isArray(ingredients)) {
        return NextResponse.json(
          { error: "Ingredients must be an array of strings" },
          { status: 400 }
        );
      }
      updateData.ingredients = ingredients;
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
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  if (!session.user.role || session.user.role !== "admin") {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }
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