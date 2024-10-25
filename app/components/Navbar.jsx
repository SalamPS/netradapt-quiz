/* eslint-disable @next/next/no-img-element */
import Link from 'next/link'
import { useRouter } from 'next/navigation'

export default function Navbar ({children, title, big, dark, actions}) {
  const router = useRouter()
  if (!big) return (
    <nav className={`py-5 px-36 flex flex-row justify-between border-b-4 border-[#5abe22] ${dark ? 'bg-[#00312d] text-white' : 'bg-white text-black'}`}>
      <div className="flex flex-row items-center">
        <div onClick={() => {router.back()}}>
          <i className="bi bi-arrow-left mr-12 cursor-pointer"/>
        </div>
        <span>
          <b>{title}</b>
        </span>
      </div>
      <div className="flex flex-row items-center">
        {!actions ? '' : actions.map((item,i) => (
          <div className={`action ${item.type}`} key={i} onClick={item.action}>
            {item.text}
          </div>
        ))}
      </div>
    </nav>
  )
  else return (
    <nav className="py-5 px-36 flex flex-row justify-between items-center border-b-4 border-[#5abe22] bg-white">
      <div className="left flex flex-row items-center">
        <Link href={"/"} className='flex items-center'>
          <img className='inline' src={title+".png"} width={50} alt={title} />
          <span className='ml-3 text-xl text-[#008b47]'>
            <b>Quizsense</b>
          </span>
        </Link> 
        {children}
      </div>
      <div className="right flex flex-row items-center">
        <Link href={'profile'} className="act flex justify-center items-center text-white rounded-full w-[72px] h-[72px] bg-[#00312d]">
          <i className="bi bi-person-fill text-2xl"></i>
        </Link>
      </div>
    </nav>
  )
}