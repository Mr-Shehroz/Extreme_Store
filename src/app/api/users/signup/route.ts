import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/app/db/dbconnect";
import User from "@/models/user";
import bcrypt from "bcryptjs";


connectDB()


export async function POST(request: NextRequest) {
    const reqBody = await request.json();
    const { username, email, password } = reqBody;
    console.log(reqBody);

    try {
        const user = await User.findOne({ email })

        if (user) {
            return NextResponse.json({ message: "User already exists" }, { status: 400 })
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new User({
            username,
            email,
            password: hashedPassword
        })

        const saveUser = await newUser.save();
        return NextResponse.json({ message: "User created successfully", user: saveUser }, { status: 201 })


    } catch (error: any) {
        console.log(error);
        return NextResponse.json({ error: error.message }, { status: 500 })

    }

}