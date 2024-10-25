import { NextResponse } from "next/server";
import { query } from "../query";

export async function POST(request) {
  const { deviceId } = await request.json();
  const list = await query(
    'SELECT', 
    ['title','class', 'k.kuisId', 'updated'], 
    'device',
    {"a.deviceId":deviceId}, 
    [
      `access AS a ON a.deviceId=d.deviceId`,
      `kuis AS k ON k.kuisId=a.kuisId`,
    ]
  )
  const play = await query(
    'SELECT', 
    ['kuisId'], 
    'plays',
    {deviceId}
  )
  list.sort((a,b) => b.updated - a.updated)
  const result = {list, play}
  return NextResponse.json(result, {status: 200});
}