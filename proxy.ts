import { NextRequest, NextResponse } from "next/server";
// import { verifyToken } from "./lib/api/auth";
// import api from "./lib/api/axios";
// import { API_END_POINT } from "./lib/api/endpoints";
// import { cookies } from "next/headers";

export default async function proxy(req: NextRequest, res: NextResponse) {
  try {
    // const cookieStore = await cookies();
    // const token = cookieStore.get("token")?.value;
    // const user = await api.get(API_END_POINT.VERIFY_TOKEN, {
    //   headers: { Cookie: `token=${token}` },
    // });
    // console.log(user.data.data.payload.role !== "user");
  } catch (error: any) {
    console.log(error.message);
  }
}
