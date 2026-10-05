"use client";

import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import Image from "next/image";
import type { PointerEvent } from "react";

type Slide = {
  eyebrow: string;
  title: string;
  subtitle: string;
  href?: string;
  cta?: string;
  image: string;
  imageAlt: string;
  background: string;
};

const slides: Slide[] = [
  {
    eyebrow: "Olympia Polymers",
    title: "Binders engineered for sports surfaces",
    subtitle:
      "Consistent polyurethane chemistry for tracks, courts and playground systems.",
    image:
      "https://en.whchem.com/repository/image/72ac7908-ee82-47ca-9ffb-658b34f164a0.jpeg",
    imageAlt: "Sports surface material and polymer application",
    background:
      "linear-gradient(105deg, #eef7ff 0%, #d9edff 42%, #f8fbff 70%, #cbe8ff 100%)",
  },
  {
    eyebrow: "Manufacturing Support",
    title: "Stable batches for resilient flooring",
    subtitle:
      "Materials that help rubber granules bond cleanly and cure reliably.",
    image:
      "https://en.whchem.com/repository/image/0757cb9c-63e1-452e-9809-2dbf33383721.jpg",
    imageAlt: "Manufacturing materials for resilient flooring",
    background:
      "linear-gradient(105deg, #f9fbff 0%, #e6eef8 38%, #fff7ef 72%, #ffd8bf 100%)",
  },
  {
    eyebrow: "Industrial Chemistry",
    title: "Polymers, gums and technical supply",
    subtitle:
      "A focused material partner for surface manufacturers and contractors.",
    image:
      "https://en.whchem.com/repository/image/c6cac859-3a43-4c3e-ad5a-5c8c643076c3.jpg",
    imageAlt: "Industrial polymer materials",
    background:
      "linear-gradient(105deg, #f5f7ff 0%, #dfe7ff 40%, #edf8f5 68%, #c9eede 100%)",
  },
  {
    eyebrow: "Performance Surfaces",
    title: "Made for the systems athletes trust",
    subtitle:
      "Responsive, elastic surfaces start with chemistry that holds under use.",
    href: "#contact",
    cta: "Request specifications →",
    image: "/images/hero/hero-4.webp",
    imageAlt: "Performance sports surface",
    background:
      "linear-gradient(105deg, #edf5ff 0%, #d9e8fb 42%, #f7fbff 68%, #bfdcff 100%)",
  },
];

const AUTOPLAY_MS = 4600;
const TRANSITION_MS = 900;
const SWIPE_THRESHOLD = 42;

export function HeroCarousel() {
  /*
   * Internal carousel:
   *
   * [last, 1, 2, 3, 4, first]
   *
   * Actual starting position:
   * 1
   */
  const loopSlides = useMemo(
    () => [slides[slides.length - 1], ...slides, slides[0]],
    [],
  );

  const [position, setPosition] = useState(1);
  const [withTransition, setWithTransition] = useState(true);
  const [paused, setPaused] = useState(false);

  /*
   * Important:
   *
   * We preload the actual slide images before autoplay starts.
   *
   * This prevents the next slide from showing only its background
   * while the image is still downloading.
   */
  const [imagesReady, setImagesReady] = useState(false);

  const dragStartX = useRef<number | null>(null);
  const autoplayRef = useRef<ReturnType<typeof setInterval> | null>(null);

  /*
   * Convert internal position into actual slide index.
   */
  const activeIndex =
    ((position - 1) % slides.length + slides.length) % slides.length;

  /*
   * PRELOAD HERO IMAGES
   *
   * Only preload unique actual slide images.
   * Do not preload clones separately because they use the same URLs.
   */
  useEffect(() => {
    let cancelled = false;

    const preloadImages = async () => {
      const promises = slides.map(
        (slide) =>
          new Promise<void>((resolve) => {
            const image = new window.Image();

            image.onload = () => resolve();

            /*
             * Even if one image fails, don't block the entire carousel.
             */
            image.onerror = () => resolve();

            image.src = slide.image;
          }),
      );

      await Promise.all(promises);

      if (!cancelled) {
        setImagesReady(true);
      }
    };

    preloadImages();

    return () => {
      cancelled = true;
    };
  }, []);

  /*
   * AUTOPLAY
   *
   * Don't start autoplay until all hero images have been requested.
   */
  useEffect(() => {
    if (!imagesReady || paused) {
      if (autoplayRef.current) {
        clearInterval(autoplayRef.current);
        autoplayRef.current = null;
      }

      return;
    }

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (prefersReducedMotion) {
      return;
    }

    autoplayRef.current = setInterval(() => {
      setWithTransition(true);

      setPosition((current) => current + 1);
    }, AUTOPLAY_MS);

    return () => {
      if (autoplayRef.current) {
        clearInterval(autoplayRef.current);
        autoplayRef.current = null;
      }
    };
  }, [imagesReady, paused]);

  /*
   * Move to a specific internal position.
   */
  const goToPosition = useCallback((nextPosition: number) => {
    setWithTransition(true);
    setPosition(nextPosition);
  }, []);

  /*
   * Move to a real slide index.
   */
  const goToSlide = useCallback((index: number) => {
    setWithTransition(true);
    setPosition(index + 1);
  }, []);

  /*
   * Infinite loop correction.
   *
   * [last, 1, 2, 3, 4, first]
   *
   * If we move to cloned "first":
   *
   * position = 5
   *
   * Wait until the animation finishes,
   * then instantly move to real position 1.
   */
  const handleTransitionEnd = useCallback(() => {
    if (position === 0) {
      setWithTransition(false);
      setPosition(slides.length);
      return;
    }

    if (position === slides.length + 1) {
      setWithTransition(false);
      setPosition(1);
    }
  }, [position]);

  /*
   * Restore CSS transition after an instant loop correction.
   */
  useEffect(() => {
    if (!withTransition) {
      const frame = window.requestAnimationFrame(() => {
        setWithTransition(true);
      });

      return () => {
        window.cancelAnimationFrame(frame);
      };
    }
  }, [withTransition]);

  /*
   * POINTER DOWN
   */
  const handlePointerDown = useCallback(
    (event: PointerEvent<HTMLElement>) => {
      /*
       * Don't treat pagination clicks as swipe gestures.
       */
      if ((event.target as HTMLElement).closest(".swiper-pagination")) {
        return;
      }

      dragStartX.current = event.clientX;

      setPaused(true);

      event.currentTarget.setPointerCapture(event.pointerId);
    },
    [],
  );

  /*
   * POINTER UP
   */
  const handlePointerUp = useCallback(
    (event: PointerEvent<HTMLElement>) => {
      if (dragStartX.current === null) {
        return;
      }

      const dragDistance = dragStartX.current - event.clientX;

      dragStartX.current = null;

      setPaused(false);

      /*
       * Ignore tiny movements.
       */
      if (Math.abs(dragDistance) < SWIPE_THRESHOLD) {
        return;
      }

      /*
       * Swipe left -> next
       * Swipe right -> previous
       */
      if (dragDistance > 0) {
        goToPosition(position + 1);
      } else {
        goToPosition(position - 1);
      }
    },
    [goToPosition, position],
  );

  /*
   * POINTER CANCEL
   */
  const handlePointerCancel = useCallback(() => {
    dragStartX.current = null;
    setPaused(false);
  }, []);

  /*
   * While images are loading, keep the first slide's background.
   *
   * Since the first image is preloaded before autoplay,
   * users should not see a blank transition.
   */
  if (!imagesReady) {
    return (
      <section
        id="home"
        aria-label="Featured Olympia slides"
        className="
          relative
          h-[520px]
          overflow-hidden
          bg-[#dcebf9]
          md:h-[560px]
        "
        style={{
          background: slides[0].background,
        }}
      >
        <div className="absolute inset-0">
          <Image
            src={slides[0].image}
            alt={slides[0].imageAlt}
            fill
            priority
            sizes="100vw"
            className="object-cover object-center"
          />
        </div>

        <div
          className="
            pointer-events-none
            absolute
            inset-0
            bg-[linear-gradient(90deg,rgba(255,255,255,0.97)_0%,rgba(255,255,255,0.88)_32%,rgba(255,255,255,0.52)_58%,rgba(255,255,255,0.08)_82%,rgba(255,255,255,0)_100%)]
          "
        />
      </section>
    );
  }

  return (
    <section
      id="home"
      aria-label="Featured Olympia slides"
      className="
        relative
        h-[520px]
        touch-pan-y
        overflow-hidden
        bg-[#dcebf9]
        md:h-[560px]
      "
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={() => setPaused(false)}
      onPointerDown={handlePointerDown}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerCancel}
    >
      {/* SLIDER */}
      <div
        className="
          flex
          h-full
          cursor-grab
          will-change-transform
          active:cursor-grabbing
          motion-reduce:transition-none
        "
        style={{
          transform: `translate3d(${-position * 100}%, 0, 0)`,

          transition: withTransition
            ? `transform ${TRANSITION_MS}ms cubic-bezier(0.22, 1, 0.36, 1)`
            : "none",
        }}
        onTransitionEnd={handleTransitionEnd}
      >
        {loopSlides.map((slide, index) => {
          const isActive = index === position;

          return (
            <article
              key={`${slide.title}-${index}`}
              aria-hidden={!isActive}
              className="
                relative
                h-full
                min-w-full
                overflow-hidden
              "
              style={{
                background: slide.background,
              }}
            >
              {/* HERO IMAGE */}
              <div className="absolute inset-0">
                <Image
                  src={slide.image}
                  alt={slide.imageAlt}
                  fill
                  priority={index === 1}
                  sizes="100vw"
                  className="
                    object-cover
                    object-center
                  "
                />
              </div>

              {/* GENERAL IMAGE OVERLAY */}
              <div
                className="
                  pointer-events-none
                  absolute
                  inset-0
                  bg-white/20
                "
              />

              {/* RIGHT SOFT GLOW */}
              <div
                className="
                  pointer-events-none
                  absolute
                  -right-[12%]
                  top-1/2
                  h-[620px]
                  w-[620px]
                  -translate-y-1/2
                  rounded-full
                  bg-white/35
                  blur-3xl
                "
              />

              {/* ORANGE GLOW */}
              <div
                className="
                  pointer-events-none
                  absolute
                  right-[8%]
                  top-[12%]
                  h-[220px]
                  w-[220px]
                  rounded-full
                  bg-[#f26522]/10
                  blur-3xl
                "
              />

              {/* BLUE GLOW */}
              <div
                className="
                  pointer-events-none
                  absolute
                  bottom-[5%]
                  right-[24%]
                  h-[180px]
                  w-[280px]
                  rounded-full
                  bg-[#127fef]/10
                  blur-3xl
                "
              />

              {/* TEXT READABILITY OVERLAY */}
              <div
                className="
                  pointer-events-none
                  absolute
                  inset-0
                  bg-[linear-gradient(90deg,rgba(255,255,255,0.97)_0%,rgba(255,255,255,0.88)_32%,rgba(255,255,255,0.52)_58%,rgba(255,255,255,0.08)_82%,rgba(255,255,255,0)_100%)]
                "
              />

              {/* BOTTOM FADE */}
              <div
                className="
                  pointer-events-none
                  absolute
                  inset-x-0
                  bottom-0
                  h-32
                  bg-gradient-to-t
                  from-primary/20
                  to-transparent
                "
              />

              {/* CONTENT */}
              <div
                className="
                  relative
                  z-10
                  mx-auto
                  flex
                  h-full
                  w-[88%]
                  max-w-[1280px]
                  items-center
                "
              >
                <div className="max-w-[720px] pt-2">
                  {/* EYEBROW */}
                  <p
                    className="
                      text-[12px]
                      font-semibold
                      uppercase
                      tracking-[0.18em]
                      text-[#127fef]
                      md:text-[14px]
                    "
                  >
                    {slide.eyebrow}
                  </p>

                  {/* TITLE */}
                  <h1
                    className="
                      mt-4
                      max-w-[760px]
                      font-display
                      text-[38px]
                      font-bold
                      uppercase
                      italic
                      leading-[0.96]
                      text-primary
                      sm:text-[46px]
                      md:text-[76px]
                      lg:text-[88px]
                    "
                  >
                    {slide.title}
                  </h1>

                  {/* DESCRIPTION */}
                  <p
                    className="
                      mt-5
                      max-w-[560px]
                      text-[16px]
                      leading-7
                      text-[#4f5870]
                      md:text-[20px]
                    "
                  >
                    {slide.subtitle}
                  </p>

                  {/* CTA */}
                  {slide.href && slide.cta ? (
                    <a
                      href={slide.href}
                      className="
                        mt-7
                        inline-block
                        text-[16px]
                        font-bold
                        text-[#127fef]
                        after:block
                        after:h-px
                        after:w-0
                        after:bg-[#127fef]
                        after:transition-all
                        after:duration-500
                        hover:after:w-full
                        focus-visible:outline-none
                        focus-visible:after:w-full
                      "
                    >
                      {slide.cta}
                    </a>
                  ) : null}
                </div>
              </div>
            </article>
          );
        })}
      </div>

      {/* PAGINATION */}
      <div
        className="
          swiper-pagination
          absolute
          inset-x-0
          bottom-[30px]
          z-20
          flex
          h-[21px]
          items-center
          justify-center
        "
      >
        {slides.map((slide, index) => {
          const isActive = index === activeIndex;

          return (
            <button
              key={slide.title}
              type="button"
              aria-label={`Go to slide ${index + 1}`}
              aria-current={isActive ? "true" : undefined}
              onClick={(event) => {
                event.stopPropagation();

                setPaused(true);
                goToSlide(index);

                window.setTimeout(() => {
                  setPaused(false);
                }, TRANSITION_MS + 300);
              }}
              className={`
                mx-2
                rounded-full
                bg-white
                opacity-100
                shadow-[0_2px_8px_rgba(24,32,74,0.35)]
                transition-all
                duration-500
                ease-out
                focus-visible:outline
                focus-visible:outline-2
                focus-visible:outline-offset-4
                focus-visible:outline-white
                ${
                  isActive
                    ? "size-3 scale-110"
                    : "size-1.5 hover:scale-125"
                }
              `}
            />
          );
        })}
      </div>
    </section>
  );
}