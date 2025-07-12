

import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

// GET all categories
export async function GET() {
    try {
        const categories = await prisma.category.findMany({
            include: {
                menu: true,
            },
        });
        return NextResponse.json(categories);
    } catch (error) {
        console.error("[GET /api/category]", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}

// POST create a new category
export async function POST(request: Request) {
    try {
        const { category_title, category_description } = await request.json();
        const newCategory = await prisma.category.create({
            data: {
                category_title,
                category_description,
            },
        });
        return NextResponse.json(newCategory);
    } catch (error) {
        console.error("[POST /api/category]", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}

// PUT update an existing category
export async function PUT(request: Request) {
    try {
        const { category_id, category_title, category_description } = await request.json();
        const updatedCategory = await prisma.category.update({
            where: { category_id },
            data: {
                category_title,
                category_description,
            },
        });
        return NextResponse.json(updatedCategory);
    } catch (error) {
        console.error("[PUT /api/category]", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}

// DELETE a category
export async function DELETE(request: Request) {
    try {
        const { category_id } = await request.json();
        const deletedCategory = await prisma.category.delete({
            where: { category_id },
        });
        return NextResponse.json(deletedCategory);
    } catch (error) {
        console.error("[DELETE /api/category]", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}