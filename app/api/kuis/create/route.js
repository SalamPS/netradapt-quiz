import { NextResponse } from "next/server";
import { query } from "../../query";

export async function POST(request) {
  const { deviceId, title, Class, questions } = await request.json();
  const quest = questions ? questions.map(item => item) : undefined
  const newKuis = await query(
    'INSERT', 
    {title, class: Class, updated: new Date().getTime()},
    'kuis'
  ); 
  await query(
    'INSERT', 
    {deviceId, kuisId: newKuis.insertId},
    'access'
  );
  quest.forEach(async item => {
    await query(
      'INSERT', 
      {
        kuisId: newKuis.insertId,
        quest: item.quest,
        ansA: item.ansA,
        ansB: item.ansB,
        valid: item.valid,
      },
      'questions',
      questions.length
    );
  });
  
  return NextResponse.json({message: "Berhasil menambahkan kuis"}, {status: 200});
}