import { NextResponse } from "next/server";
import { hash } from "bcryptjs";
import prisma  from "@/lib/prisma";

export async function POST(req: Request){
    const body = await req.json();
    const { name, email, password } = body;

    if (!name || !email || !password){
        return NextResponse.json ({ error: "Missing fields" }, { status: 400 });
    }

    const existingUser = await prisma.users.findUnique({where: { email }});
    if (existingUser) {
        return NextResponse.json({ error: "Email already registered" }, { status: 409 });
    }

    const hashedPassword = await hash(password, 10);
    await prisma.users.create({
      data: {
        name,
        email,
        pwd: hashedPassword,
        role: "user", // default role
      },
    });
  
    return NextResponse.json({ message: "User created successfully" });
}