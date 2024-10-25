import { NextResponse } from "next/server";
import { query } from "../query";

export async function POST(request) {
  const { deviceId, password } = await request.json();
  const result = await query(
    'SELECT', 
    ['deviceId','owner','password'], 
    'device', 
    {deviceId, password}
  );
  
  if (!result.length) return NextResponse.json({logged: false, message: "Wrong username or password"}, {status: 401});
  
  return NextResponse.json({
    owner: result[0].owner,
    deviceId: result[0].deviceId
  }, {status: 200});
}