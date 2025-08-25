import jwt from "jsonwebtoken";
import User from "@/models/user"; // adjust path to your user model
import connectDB from "../db/dbconnect"; // your db connection
import { cookies } from "next/headers";

export default async function MyAccount() {
  await connectDB();

  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  if (!token) {
    return (
      <div className="h-screen flex justify-center items-center text-3xl">
        Please login first
      </div>
    );
  }

  try {
    // ✅ Verify JWT
    const decoded: any = jwt.verify(token, process.env.JWT_SECRET!);
    console.log("Decoded JWT:", decoded); // 👈 Debug line

    // ✅ Fetch user from MongoDB
    const user = await User.findById(decoded.id).select("username email");
    console.log("Fetched user:", user);

    if (!user) {
      return (
        <div className="h-screen flex justify-center items-center text-3xl">
          User not found
        </div>
      );
    }

    return (
      <div className="h-screen flex justify-center items-center text-5xl bg-gray-600">
        <h1>{`Welcome Mr "${user.username}" to Extreme Store`}</h1>
      </div>
    );
  } catch (err) {
    return (
      <div className="h-screen flex justify-center items-center text-3xl">
        Invalid or expired token
      </div>
    );
  }
}
