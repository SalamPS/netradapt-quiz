import "./css/globals.css";
import "./css/main.css";
import { Nunito_Sans } from "next/font/google";
const mainFont = Nunito_Sans({weight: '400', subsets: ['latin']})

export const metadata = {
  title: {
    absolute: 'QuizSense | Pembelajaran Interaktif Tunarungu',
    default: 'QuizSense | Pembelajaran Interaktif Tunarungu',
    template: '%s | QuizSense'
  },
  description: "Alat kuis interaktif ini dirancang sebagai media pembelajaran untuk siswa tunanetra. Dengan fitur text-to-speech dan tombol respon yang intuitif, alat ini memungkinkan siswa untuk mendengarkan soal dan menjawab dengan mudah.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.2/font/bootstrap-icons.min.css"/>
      </head>
      <body className={mainFont.className}>{children}</body>
    </html>
  );
}
