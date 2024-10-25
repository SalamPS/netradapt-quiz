import { NextResponse } from "next/server";
import { query } from "../../query";

export async function PUT(request) {
  const { data, deleted } = await request.json();
  data.questions.forEach(async question => {
    if (question.questionsId) {
      await query(
        'UPDATE', 
        {
          quest: question.quest,
          ansA: question.ansA,
          ansB: question.ansB,
          valid: question.valid || 'RIGHT',
        }, 
        'questions',
        {questionsId: question.questionsId}
      );
    }
    else {
      await query(
        'INSERT', 
        {
          quest: question.quest,
          ansA: question.ansA,
          ansB: question.ansB,
          valid: question.valid || 'RIGHT',
          kuisId: data.kuisId,
        }, 
        'questions',
      );
    }
  })
  deleted.forEach(async del => {
    await query(
      'DELETE', 
      {questionsId: del},
      'questions',
    );
  })
  await query(
    'UPDATE', 
    {
      title: data.title,
      class: data.class,
      updated: new Date().getTime(),
    }, 
    'kuis',
    {kuisId: data.kuisId}
  );
  return NextResponse.json({message: "Yes"}, {status: 200});
}