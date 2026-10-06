// components/news-center.tsx
import Image from "next/image";
import Link from "next/link";

type NewsItem = {
  title: string;
  date: string;
  image: string; // put the files in /public/news/
  href: string;
};

const news: NewsItem[] = [
  {
    title:
      "Olympia Chemical's Taozi Bay Water Project Awarded India's Top Civil Engineering Honor — lorem epusum",
    date: "28/09/2026",
    image: "https://en.whchem.com/repository/image/0ff91a4d-7f20-4976-83e9-64c1251cd89c.jpg_560xa.jpg",
    href: "#",
  },
  {
    title: "Olympia Chemical Named to 2026 Southern Weekly CSR Survey List",
    date: "28/08/2026",
    image: "https://en.whchem.com/repository/image/0ff91a4d-7f20-4976-83e9-64c1251cd89c.jpg_560xa.jpg",
    href: "#",
  },
  {
    title:
      "Olympia Chemical’s Industry-Chain Transformation: A Strategic Move into the New Energy Sector",
    date: "28/08/2026",
    image: "https://en.whchem.com/repository/image/72ac7908-ee82-47ca-9ffb-658b34f164a0.jpeg",
    href: "#",
  },
];

export default function NewsCenter() {
  return (
    <section className="bg-white py-16">
      <div className="mx-auto w-full max-w-[1200px] px-4 xl:px-0">
        {/* Header */}
        <div className="flex items-baseline justify-between">
          <h2 className="text-[32px] font-light leading-tight text-[#333] md:text-[36px]">
            News center
          </h2>
          <Link
            href="#"
            className="text-lg font-light text-[#1677ff] hover:underline focus-visible:underline"
          >
            More
          </Link>
        </div>

        {/* Cards */}
        <ul className="mt-5 grid grid-cols-1 gap-x-[5px] gap-y-10 md:grid-cols-3">
          {news.map((item) => (
            <li key={item.title}>
              <Link href={item.href} className="group block">
                <div className="relative aspect-[16/9] w-full overflow-hidden bg-neutral-200">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    sizes="(min-width: 1200px) 396px, (min-width: 768px) 33vw, 100vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>

                <h3 className="mt-3 pr-10 text-xl font-light leading-[30px] text-[#333] group-hover:text-[#1677ff]">
                  {item.title}
                </h3>

                <time className="mt-4 block text-base font-normal text-[#333]">
                  {item.date}
                </time>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}