import { NextResponse } from "next/server";
import { query } from "../query";

export async function POST(request) {
  const { kuisId, deviceId } = await request.json();
  const kuis = await query(
    'SELECT', 
    ['title','class', 'kuisId', 'updated'], 
    'kuis',
    {kuisId},
  )
  const questions = await query(
    'SELECT', 
    ['questionsId',	'quest',	'ansA',	'ansB', 'valid'], 
    'questions',
    {kuisId}
  )
  const result = {...kuis[0], questions}
  return NextResponse.json(result, {status: 200});
}