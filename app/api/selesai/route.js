import { NextResponse } from "next/server";
import { query } from "../query";

export async function POST(request) {
  const { kuisId, deviceId, answers } = await request.json();
  await query(
    'INSERT',
    {kuisId, deviceId, played: new Date().getTime(), answers}, 
    'plays',
  )
  return NextResponse.json({message: "Sukses menambahkan data"}, {status: 200});
}