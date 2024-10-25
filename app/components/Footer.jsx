import Link from "next/link"

export default function Footer () {
  return (<footer>
    <div className="top">
      <div className="title">AudioVista</div>
      <div className="copyright">© 2024 Kelompok 5 Kelas 4A Teknik Komputer UPI di Cibiru</div>
      <div className="title">SLB Cileunyi</div>
    </div>
    <div className="bot">
      <div className="col">
        <Link className="row" href="https://tekkom.upi.edu/">TEKKOM UPI Cibiru</Link>
        <Link className="row" href="https://siak.upi.edu">SIAK UPI</Link>
        <Link className="row" href="https://spot.upi.edu">SPOT UPI</Link>
      </div>
      <div className="col">
        <Link className="row" href="https://dapo.kemdikbud.go.id/sekolah/CFFEC2E86699F58D0195">SLB Cileunyi</Link>
        <Link className="row" href="https://www.instagram.com/slbncileunyi/">SLB Cileunyi | Instagram</Link>
        <Link className="row" href="https://www.facebook.com/slbncileunyii/">SLB Cileunyi | Facebook</Link>
      </div>
      <div className="col desc">
        Alat bantu belajar interaktif ini terdiri dari tombol pilihan untuk siswa tunanetra di SLB Cileunyi, menggunakan Raspberry Pi dan kontrol berbasis web untuk membuat kuis serta menyimpan hasil jawaban siswa.
      </div>
    </div>
    <div className="address">
      Jl. Pandanwangi Jl. Cibiru Indah 3, Cibiru Wetan, Kec. Cileunyi, Kabupaten Bandung, Jawa Barat 40625
    </div>
  </footer>)
} 