import Link from 'next/link'
import { useRouter } from 'next/navigation'

export default function Navbar ({active, text, actions}) {
  const router = useRouter()
  if (active == 'kuis') return (
    <nav className='quizNavbar' id={text == 'Profil' ? 'profile' : ''}>
      <div className="left">
        <div onClick={() => {router.back()}}>
          <i className="bi bi-arrow-left"></i>
        </div>
        <span>{text}</span>
      </div>
      <div className="right">
        {!actions ? '' : actions.map((item,i) => (
          <div className={`action ${item.type}`} key={i} onClick={item.action}>
            {item.text}
          </div>
        ))}
      </div>
    </nav>
  )
  else return (
    <nav className='solid-white'>
      <div className="left">
        <h1 className="title">AudioVista</h1>
        
        <Link href={'kuis/new'} className={`menu${active == 'new' ? ' active' : ''}`}>Buat Kuis</Link>
        <Link href={'kuis'} className={`menu${active == 'res' ? ' active' : ''}`}>Daftar Kuis</Link>
      </div>
      <div className="right">
        <Link href={'profile'} className="act profile">
          <i className="bi bi-person profile-icon"></i>
        </Link>
      </div>
    </nav>
  )
}