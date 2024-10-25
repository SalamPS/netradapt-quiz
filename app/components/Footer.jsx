import Link from "next/link"

export default function Footer ({children}) {
  return (<footer className="bg-[#00312d] text-[#99adab] text-base p-12 md:px-24 md:py-12">
    <div className="flex justify-between items-center border-b border-[#7f9896] py-12 mb-8">
      <div className="text-[#EAFDE7] text-2xl font-bold">Netradapt</div>
      <div>Jl. Raya Cibiru, KM 15, Bandung 40393</div>
      <div className="text-[#EAFDE7] text-2xl font-bold">Quiz</div>
    </div>
    <div className="text-[#7f9896] grid grid-flow-col grid-cols-1 md:grid-cols-3 mb-8">
      <div>
        <Link className="block mb-6" href="https://netradapt.com/">Halaman Resmi Netradapt</Link>
        <Link className="block mb-6" href="https://instagram.com/netradapt/">Tim Pengembang</Link>
        <Link className="block mb-6" href="https://www.facebook.com/slbncileunyii/">Order Produk</Link>
      </div>
      <div>
        <Link className="block mb-6" href="mailto:business@netradapt.com">
          <i className="bi bi-envelope-fill mr-2"/> 
          business@netradapt.com
        </Link>
        <Link className="block mb-6" href="https://wa.me/081366776988/">
          <i className="bi bi-telephone-fill mr-2"/> 
          <span>081366776988</span>
        </Link>
        <Link className="block mb-6" href="https://instagram.com/netradapt/">
          <i className="bi bi-instagram mr-2"/> 
          @netradapt
        </Link>
      </div>
      <div className="text-justify leading-relaxed">
        {children}
      </div>
    </div>
    <div className="text-center mt-12">
      © 2024 Netradapt Tech. Semua hak dilindungi
    </div>
  </footer>
  )
} 