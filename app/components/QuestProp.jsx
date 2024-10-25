export default function QuestNew ({action}) {
  return (<div className="newQuest" onClick={action}>
    <span>Tambah Soal</span> {' '}
    <i className="bi bi-plus-circle-fill"></i>
  </div>)
}

export const inputHandler = (origin, setOrigin, index, key, value) => {
  const updated = [...origin.questions]
  updated[index][key] = value

  setOrigin({
    ...origin,
    questions: updated
  })
}

export const spliceHandler = (origin, setOrigin, index, old, setDeleted) => {
  const deleted = [...origin.questions]
  deleted.splice(index, 1)

  setOrigin({
    ...origin,
    questions: deleted
  })
  if (old) setDeleted(prev => [...prev, old])
}

export const insertHandler = (origin, setOrigin) => {
  const pushed = [...origin.questions]
  pushed.push({quest: "Pertanyaan",ansA: "Jawaban_A",ansB: "Jawaban_B",valid: ""})
  
  setOrigin({
    ...origin,
    questions: pushed
  })
}