import Link from "next/link";
import "@/app/css/quizList.css"

export default function QuizList ({list, play}) {
  return (<div className="quizList">
    {list.map((item) => {
      const length = play.filter(play => play.kuisId == item.kuisId).length
      return (<div className="row" key={item.kuisId}>
      <div className="left">
        <h2 className="props title">{item.title}</h2>
        <div className="props class"><div className="bi bi-book"></div> Kelas {item.class}</div>
        <div className="props played"><div className="bi bi-arrow-clockwise"></div>
          {length ? `${length} kali dimainkan` : 'Belum pernah dimainkan'}
        </div>
      </div>
      <div className="right">
        <Link className="view" href={`kuis/${item.kuisId}/info`}>
          <i className="bi bi-eye"></i> Lihat Kuis
        </Link>
        <Link className="view" href={`kuis/${item.kuisId}/report`}>
          <i className="bi bi-play"></i> Riwayat
        </Link>
      </div>
    </div>)
    })}
  </div>)
}