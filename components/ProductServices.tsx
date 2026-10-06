"use client";

// components/products-services.tsx
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";

const IMG =
  "https://en.whchem.com/repository/image/a628e0b7-c66e-448d-945f-a0d667f3f19c.jpg";

// Cards kitne bhi add/remove karo — sab cards tak scroll apne aap pahunchega.
const products = [
  { title: "Homelife", image: IMG, href: "#" },
  { title: "Electronics", image: IMG, href: "#" },
  { title: "Sports and Leisure", image: IMG, href: "#" },
  { title: "Sport", image: IMG, href: "#" },
  { title: "Spor", image: IMG, href: "#" },
  { title: "Leisure", image: IMG, href: "#" },
  { title: "S Leisure", image: IMG, href: "#" },
  { title: "S and Leisure", image: IMG, href: "#" },
  { title: "SLeisure", image: IMG, href: "#" },
  { title: "S", image: IMG, href: "#" },
  { title: "Sports a", image: IMG, href: "#" },
];

const EDGE = 0.1; // cursor left/right 10% zone = poora left / poora right
const DESKTOP_MIN = 768; // Tailwind md breakpoint

export default function ProductsServices() {
  const sectionRef = useRef<HTMLElement>(null);
  const scrollerRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  /* ───────── Desktop (md+): cursor se scroll control ───────── */
  useEffect(() => {
    const section = sectionRef.current;
    const scroller = scrollerRef.current;
    if (!section || !scroller) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let progress = 0; // 0 = sabse left, 1 = sabse right
    let position = 0; // current scrollLeft (eased)
    let raf = 0;

    const tick = () => {
      // browser ka real scroll range — saare cards isme included hain
      const maxScroll = scroller.scrollWidth - scroller.clientWidth;
      const target = progress * maxScroll;
      position += (target - position) * 0.08; // easing
      scroller.scrollLeft = position;
      raf = Math.abs(target - position) > 0.5 ? requestAnimationFrame(tick) : 0;
    };

    const onMove = (e: PointerEvent) => {
      // Chhoti screen / touch par native swipe use hota hai
      if (e.pointerType === "touch" || window.innerWidth < DESKTOP_MIN) return;
      const rect = section.getBoundingClientRect();
      const ratio = (e.clientX - rect.left) / rect.width;
      progress = Math.min(1, Math.max(0, (ratio - EDGE) / (1 - 2 * EDGE)));
      if (!raf) raf = requestAnimationFrame(tick);
    };

    // user swipe/trackpad/wheel kare to hamari position sync rahe
    const onScroll = () => {
      if (!raf) position = scroller.scrollLeft;
    };

    section.addEventListener("pointermove", onMove);
    scroller.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      section.removeEventListener("pointermove", onMove);
      scroller.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  /* ───────── Mobile/tablet: swipe karte waqt active card highlight ───────── */
  useEffect(() => {
    const scroller = scrollerRef.current;
    if (!scroller) return;

    const onScroll = () => {
      if (window.innerWidth >= DESKTOP_MIN) return;
      const items = Array.from(scroller.querySelectorAll("li"));
      let best = 0;
      let bestDist = Infinity;
      items.forEach((li, i) => {
        const dist = Math.abs(li.offsetLeft - scroller.scrollLeft - 16);
        if (dist < bestDist) {
          bestDist = dist;
          best = i;
        }
      });
      setActive(best);
    };

    scroller.addEventListener("scroll", onScroll, { passive: true });
    return () => scroller.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-[560px] w-full min-w-0 overflow-hidden bg-neutral-200 py-14 md:min-h-[660px]"
    >
      {/* Blurred, washed-out background */}
      <Image
        src="/products/bg.jpg"
        alt=""
        fill
        className="scale-110 object-cover blur-[6px]"
      />
      <div className="absolute inset-0 bg-white/75" aria-hidden />

      <div className="relative">
        <div className="mx-auto w-full max-w-[1200px] px-4 xl:px-0">
          <h2 className="text-[30px] font-light leading-tight text-[#333] md:text-[36px]">
            Products and Services
          </h2>
        </div>

        {/*
          Scroll container (har screen par horizontal):
          - mobile/tablet: native swipe + snap
          - md+: cursor se control (snap off)
        */}
        <div
          ref={scrollerRef}
          className="mt-10 snap-x snap-mandatory overflow-x-auto overflow-y-hidden scroll-pl-4 [scrollbar-width:none] md:mt-[98px] md:snap-none md:scroll-pl-0 [&::-webkit-scrollbar]:hidden"
        >
          {/*
            Row:
            - mobile: 72vw card  -> ~1.3 cards dikhte hain
            - sm:     44vw card  -> ~2.2 cards
            - md+:    342px card, shuru mein ~25% left se (original behaviour)
          */}
          <ul className="flex w-max flex-row gap-4 px-4 sm:gap-6 md:gap-[39px] md:px-0 md:pl-[25vw] md:pr-10">
            {products.map((item, i) => {
              const isActive = active === i;
              return (
                <li
                  key={`${item.title}-${i}`}
                  className="w-[72vw] shrink-0 snap-start sm:w-[44vw] md:w-[342px]"
                  onMouseEnter={() => setActive(i)}
                  onFocus={() => setActive(i)}
                >
                  <Link href={item.href} className="block" draggable={false}>
                    <div className="relative aspect-[8/5] w-full overflow-hidden bg-neutral-300">
                      <Image
                        src={item.image}
                        alt={item.title}
                        fill
                        draggable={false}
                        sizes="(min-width: 768px) 342px, (min-width: 640px) 44vw, 72vw"
                        className="object-cover"
                      />
                    </div>
                    <h3
                      className={`mt-5 font-light transition-all duration-300 md:mt-[26px] ${
                        isActive
                          ? "text-[22px] text-[#1677ff] md:text-[24px]"
                          : "text-[18px] text-[#666] md:text-[19px]"
                      }`}
                    >
                      {item.title}
                    </h3>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>

        {/* More button */}
        <div className="mt-10 flex justify-center">
          <Link
            href="#"
            className="flex h-9 w-[225px] items-center justify-between bg-white px-[10px] text-lg font-light text-[#4a90e2] transition-colors hover:text-[#1677ff]"
          >
            <span>More</span>
            <span aria-hidden className="text-xl leading-none">
              +
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
}