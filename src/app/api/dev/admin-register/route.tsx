import { hash } from "bcryptjs";
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma"; // adjust path to your Prisma client

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, password, devSecret } = body;

    // Optional dev-only protection (from .env)
    if (devSecret !== process.env.DEV_ADMIN_SECRET) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    if (!email || !password || !name) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const existingUser = await prisma.users.findUnique({ where: { email } });
    if (existingUser) {
      return NextResponse.json({ error: "Email already exists" }, { status: 409 });
    }

    const hashedPassword = await hash(password, 12);

    const newAdmin = await prisma.users.create({
      data: {
        email,
        name,
        pwd: hashedPassword,
        role: "admin", // 👑
      },
    });

    return NextResponse.json({ message: "Admin registered", userId: newAdmin.user_id }, { status: 201 });
  } catch (err) {
    console.error("Admin registration error:", err);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}