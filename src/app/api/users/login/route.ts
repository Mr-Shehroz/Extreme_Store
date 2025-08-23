import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/app/db/dbconnect";
import User from "@/models/user";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";


connectDB()


export async function POST(request: NextRequest) {
    const reqBody = await request.json();
    const { email, password } = reqBody;
    console.log(reqBody);

    try {
        const user = await User.findOne({ email })
        if (!user) {
            return NextResponse.json({ message: "Invalid credentials" }, { status: 400 })
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return NextResponse.json({ message: "Invalid credentials" }, { status: 400 })
        }

        const tokenData = {
            id: user._id,
            email: user.email,
            name: user.name,
        }

        const token = jwt.sign(tokenData, process.env.JWT_SECRET!, { expiresIn: '1d' });
        const response = NextResponse.json({
            message: "Login successful",
            success: true,
        })

        response.cookies.set("token", token, {
            httpOnly: true,
        });

        return response;

    } catch (error: any) {
        console.log(error);
        return NextResponse.json({ error: error.message }, { status: 500 })

    }
}