"use client";

// components/investor-staff.tsx
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUp, GraduationCap, Handshake, Store } from "lucide-react";
import type { LucideIcon } from "lucide-react";

// Static demo values — replace with real data from your stock API.
const stock = {
  company: "Olympia Chemical Group Co. 600309.SH",
  price: "68.90",
  change: "+1.24",
  percent: "+1.83%",
  time: "2026-10-06 13:07:20",
};

type StaffLink = {
  label: string;
  href: string;
  Icon: LucideIcon;
  submenu?: { label: string; href: string }[];
};

const staffLinks: StaffLink[] = [
  {
    label: "SRM",
    href: "https://srm.whchem.com/#/supplier-portal/home-page",
    Icon: Store,
    // Revealed on hover/focus — same as the reference site
    submenu: [
      { label: "SRM", href: "https://srm.whchem.com/#/supplier-portal/home-page" },
      { label: "Ebidding", href: "https://ebidding.whchem.com/ywwz" },
    ],
  },
  {
    label: "Wanchem@i",
    href: "https://wanchem.cloud.whchem.com:9943/login",
    Icon: GraduationCap,
  },
  { label: "OA", href: "https://ecs.whchem.com", Icon: Store },
  { label: "CRM", href: "https://ebidding.whchem.com/ywwz", Icon: Handshake },
];

/** Fires once when the element scrolls into view. */
function useInViewOnce<T extends HTMLElement>(threshold = 0.25) {
  const ref = useRef<T>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          io.disconnect();
        }
      },
      { threshold }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [threshold]);

  return { ref, inView };
}

const EASE = "ease-[cubic-bezier(0.22,1,0.36,1)]"; // smooth, slow settle
const reduce = "motion-reduce:transform-none motion-reduce:opacity-100 motion-reduce:transition-none";

export default function InvestorStaff() {
  const { ref, inView } = useInViewOnce<HTMLElement>(0.25);

  // Cards slide in from the sides
  const cardBase = `transition-all duration-[1600ms] ${EASE} ${reduce}`;
  const leftCard = inView ? "translate-x-0 opacity-100" : "-translate-x-32 opacity-0";
  const rightCard = inView ? "translate-x-0 opacity-100" : "translate-x-32 opacity-0";

  // Inner content fades up after the card has landed
  const item = (delay: number) => ({
    className: `transition-all duration-1000 ${EASE} ${reduce} ${
      inView ? "translate-y-0 opacity-100" : "translate-y-5 opacity-0"
    }`,
    style: { transitionDelay: `${delay}ms` },
  });

  return (
    <section ref={ref} className="overflow-hidden bg-white py-12 md:py-[66px]">
      <div className="mx-auto grid w-full max-w-[1200px] gap-6 px-4 md:h-[434px] md:grid-cols-[804fr_372fr] xl:px-0">
        {/* ───────── Left: Investor Relations (bigger) ───────── */}
        <div
          className={`${cardBase} ${leftCard} group relative min-h-[420px] overflow-hidden bg-white`}
          style={{ transitionDelay: "0ms" }}
        >
          <Image
            src="https://en.whchem.com/repository/image/930992ce-db98-4aed-9834-4834ca0215c1.jpg_560xa.jpg"
            alt="something appears"
            fill
            sizes="(min-width: 768px) 804px, 100vw"
            className="object-cover object-right transition-transform duration-[1800ms] ease-out group-hover:scale-105"
          />
          {/* white fade on the left so the text stays readable */}
          <div
            aria-hidden
            className="absolute inset-0 bg-white/70 md:bg-[linear-gradient(90deg,#fff_0%,rgba(255,255,255,0.88)_22%,rgba(255,255,255,0)_58%)]"
          />
          <div
            aria-hidden
            className="absolute inset-x-0 bottom-0 hidden h-32 bg-gradient-to-t from-white/80 to-transparent md:block md:w-1/2"
          />

          <div className="relative flex h-full flex-col px-6 pt-10 pb-8 md:px-[45px] md:pt-[46px]">
            <h2
              {...item(500)}
              className={`${item(500).className} text-[32px] font-light leading-tight text-[#333] md:text-[36px]`}
            >
              Investor Relations
            </h2>

            <p
              {...item(650)}
              className={`${item(650).className} mt-3 text-lg font-light text-[#333]`}
            >
              {stock.company}
            </p>

            <div
              {...item(800)}
              className={`${item(800).className} mt-10 flex items-end gap-2 text-[#e0163c] md:mt-[52px]`}
            >
              <span className="pb-1 text-[44px] font-extralight leading-none md:text-[56px]">
               
              </span>
              <span className="text-[72px] font-light leading-[0.9] tracking-tight md:text-[100px]">
                {stock.price}
              </span>
              <ArrowUp
                aria-label="Up"
                strokeWidth={4}
                className="mb-12 size-5 md:mb-[72px] md:size-6"
              />
            </div>

            <div
              {...item(950)}
              className={`${item(950).className} mt-6 flex flex-wrap items-center gap-x-6 gap-y-1 text-sm`}
            >
              <span className="text-[#e0163c]">{stock.change}</span>
              <span className="text-[#e0163c]">{stock.percent}</span>
              <span className="text-[#333]">{stock.time}</span>
            </div>

            <Link
              href="https://en.whchem.com/column/84/"
              {...item(1100)}
              className={`${item(1100).className} mt-auto inline-block pt-10 text-sm text-[#1677ff] hover:underline md:pt-0`}
            >
              More
            </Link>
          </div>
        </div>

        {/* ───────── Right: Staff Only ───────── */}
        <div
          className={`${cardBase} ${rightCard} group/card relative min-h-[420px] overflow-visible`}
          style={{ transitionDelay: "300ms" }}
        >
          <div className="absolute inset-0 overflow-hidden bg-sky-500">
            <Image
              src="/investor/staff.jpg"
              alt=""
              fill
              sizes="(min-width: 768px) 372px, 100vw"
              className="object-cover transition-transform duration-[1800ms] ease-out group-hover/card:scale-105"
            />
          </div>

          <div className="relative px-6 pt-10 md:px-[39px] md:pt-[34px]">
            <h2
              {...item(800)}
              className={`${item(800).className} text-[32px] font-light leading-tight text-white md:text-[36px]`}
            >
              Staff Only
            </h2>

            <ul className="mt-8 grid max-w-[290px] grid-cols-2 gap-y-[70px] md:mt-9">
              {staffLinks.map(({ label, href, Icon, submenu }, i) => (
                <li
                  key={label}
                  {...item(1000 + i * 150)}
                  className={`${item(1000 + i * 150).className} group/item relative`}
                >
                  <Link
                    href={href}
                    target="_blank"
                    rel="noreferrer"
                    className="block w-fit text-white outline-none transition-transform duration-300 hover:-translate-y-1 focus-visible:-translate-y-1"
                  >
                    <Icon strokeWidth={1.4} className="size-[46px]" />
                    <span className="mt-3 block text-lg font-light">{label}</span>
                  </Link>

                  {/* Hover / focus reveal (SRM → SRM + Ebidding) */}
                  {submenu && (
                    <ul
                      className="invisible absolute left-0 top-full z-20 mt-1 w-[150px] translate-y-2 bg-white/95 py-2 opacity-0 shadow-lg transition-all duration-300 group-focus-within/item:visible group-focus-within/item:translate-y-0 group-focus-within/item:opacity-100 group-hover/item:visible group-hover/item:translate-y-0 group-hover/item:opacity-100"
                    >
                      {submenu.map((s) => (
                        <li key={s.label}>
                          <Link
                            href={s.href}
                            target="_blank"
                            rel="noreferrer"
                            className="block px-4 py-1.5 text-base font-light text-[#333] hover:bg-sky-50 hover:text-[#1677ff]"
                          >
                            {s.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}