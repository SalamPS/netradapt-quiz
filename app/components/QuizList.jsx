import Link from "next/link";

export default function QuizList ({list, play}) {
  return (<div className="quizList my-16">
    {list.map((item) => {
      const length = play.filter(play => play.kuisId == item.kuisId).length;
      return (
        <div className="row flex justify-between bg-white p-8 md:p-10 rounded-3xl mb-8" key={item.kuisId}>
          <div className="left">
            <h2 className="props text-2xl font-bold">{item.title}</h2>
            <div className="props flex items-center mt-3">
              <div className="bi bi-bookmark-fill mr-1"></div> 
              Kelas {item.class}
            </div>
            <div className="props flex items-center mt-3">
              <div className="bi bi-clock-history mr-1"></div>
              {length ? `${length} kali dimainkan` : 'Belum pernah dimainkan'}
            </div>
          </div>
          <div className="right flex flex-col gap-3 justify-around">
            <Link className="view outline-none border-none cursor-pointer p-2 md:pt-3 md:px-5 rounded-full font-inherit font-bold text- transition bg-gray-200 hover:bg-[#5abe22] hover:text-white" href={`kuis/${item.kuisId}/info`}>
              <i className="bi bi-card-heading mr-1"></i> Lihat Kuis
            </Link>
            <Link className="view outline-none border-none cursor-pointer p-2 md:pt-3 md:px-5 rounded-full font-inherit font-bold text- transition bg-gray-200 hover:bg-[#5abe22] hover:text-white" href={`kuis/${item.kuisId}/report`}>
              <i className="bi bi-play-fill mr-1"></i> Riwayat
            </Link>
          </div>
        </div>
      );
    })}
  </div>
  )
}