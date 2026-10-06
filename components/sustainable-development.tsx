"use client";

// components/sustainable-development.tsx
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";

const logos = [
  { src: "/sustainability/logo-un.png", alt: "UN Global Compact", w: 36, h: 44 },
  { src: "/sustainability/logo-hse.png", alt: "HSE", w: 66, h: 44 },
  { src: "/sustainability/logo-reach.png", alt: "REACH", w: 44, h: 44 },
  { src: "/sustainability/logo-ecovadis.png", alt: "EcoVadis", w: 120, h: 44 },
  { src: "/sustainability/logo-chb.png", alt: "CHB", w: 70, h: 44 },
];

/** Fires once when the element scrolls into view. */
function useInViewOnce<T extends HTMLElement>(threshold = 0.3) {
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

export default function SustainableDevelopment() {
  const { ref, inView } = useInViewOnce<HTMLElement>(0.3);

  const base =
    "transition-all duration-1000 ease-out motion-reduce:translate-x-0 motion-reduce:opacity-100 motion-reduce:transition-none";
  const fromLeft = inView ? "translate-x-0 opacity-100" : "-translate-x-20 opacity-0";
  const fromRight = inView ? "translate-x-0 opacity-100" : "translate-x-40 opacity-0";

  return (
    <section
      ref={ref}
      className="relative overflow-hidden bg-sky-300 py-14 md:py-[70px]"
    >
      {/* Background */}
      <Image
        src="/sustainability/bg.jpg"
        alt=""
        fill
        sizes="100vw"
        className="object-cover"
      />

      <div className="relative mx-auto grid w-full max-w-[1200px] items-center gap-12 px-4 md:grid-cols-[minmax(0,1fr)_minmax(0,570px)] md:gap-8 xl:px-0">
        {/* Left: text slides in from the left */}
        <div className="max-w-[480px]">
          <h2
            className={`${base} ${fromLeft} text-[32px] font-light leading-tight text-[#333] md:text-[36px]`}
          >
            Sustainable Development
          </h2>

          <p
            className={`${base} ${fromLeft} mt-9 text-lg font-light leading-[27px] text-[#333]`}
            style={{ transitionDelay: "150ms" }}
          >
            We are committed to environmentally friendly science and technology
            that benefits the community.
            <br />
            We are dedicated to independent innovation and the creation of a
            low-carbon economy.
          </p>

          <ul
            className={`${base} ${fromLeft} mt-9 flex flex-wrap items-center gap-x-6 gap-y-4`}
            style={{ transitionDelay: "300ms" }}
          >
            {logos.map((logo) => (
              <li key={logo.alt}>
                <Image
                  src={logo.src}
                  alt={logo.alt}
                  width={logo.w}
                  height={logo.h}
                  className="h-9 w-auto object-contain md:h-11"
                />
              </li>
            ))}
          </ul>

          <Link
            href="#"
            className={`${base} ${fromLeft} mt-10 inline-block text-lg font-light text-[#3b6fd4] hover:underline`}
            style={{ transitionDelay: "450ms" }}
          >
            More
          </Link>
        </div>

        {/* Right: circle 1 slides in from the right, then circle 2 follows on top */}
        <div className="relative mx-auto aspect-[570/325] w-full max-w-[570px]">
          <div
            className={`${base} ${fromRight} absolute left-0 top-0 aspect-square w-[57%] overflow-hidden rounded-full`}
            style={{ transitionDelay: "200ms" }}
          >
            <Image
              src="https://en.whchem.com/repository/image/5939023f-48f0-4f53-ad91-4d4d8eb5c49d.png"
              alt="Fish swimming underwater"
              fill
              sizes="(min-width: 768px) 325px, 57vw"
              className="object-cover"
            />
          </div>

          <div
            className={`${base} ${fromRight} absolute right-0 top-0 aspect-square w-[57%] overflow-hidden rounded-full`}
            style={{ transitionDelay: "1000ms" }}
          >
            <Image
              src="https://en.whchem.com/repository/image/5939023f-48f0-4f53-ad91-4d4d8eb5c49d.png"
              alt="Water droplet"
              fill
              sizes="(min-width: 768px) 325px, 57vw"
              className="object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}