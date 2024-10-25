import { NextResponse } from "next/server";
import { query } from "../query";

export async function PUT(request) {
  const { owner, password, ssid, pass, deviceId } = await request.json();
  await query(
    'UPDATE', 
    { owner, password, ssid, pass }, 
    'device',
    {deviceId}
  );
  return NextResponse.json({message: "Yes"}, {status: 200});
}

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const deviceId = searchParams.get('deviceId');
  const res = await query(
    'SELECT', 
    ['ssid', 'pass', 'owner', 'password'], 
    'device',
    {deviceId}
  );
  return NextResponse.json({...res[0], deviceId}, {status: 200});
}