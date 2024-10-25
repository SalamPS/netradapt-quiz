import { NextResponse } from "next/server";
import { query } from "../../query";

export async function POST(request) {
  const { deviceId, kuisId } = await request.json();
  const kuis = await query(
    'SELECT', 
    ['title', 'class'], 
    'access',
    {"a.deviceId":deviceId}, 
    [
      `kuis AS k ON k.kuisId=a.kuisId`,
    ]
  )
  const questions = await query(
    'SELECT', 
    ['quest', 'ansA', 'ansB', 'valid'], 
    'questions',
    {kuisId}
  )
  const plays = await query(
    'SELECT', 
    ['deviceId', 'played', 'answers'], 
    'plays',
    {kuisId}
  )
  const result = {...kuis[0], plays, questions}
  return NextResponse.json(result, {status: 200});
}