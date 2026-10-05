"use client";

import Image from "next/image";
import { Menu, Search, X } from "lucide-react";
import { useState } from "react";

const navItems = [
  { label: "Home", href: "#home" },
  {
    label: "About Us",
    href: "#about",
    children: [
      { label: "Profile", href: "#about" },
      { label: "Innovation", href: "#about" },
    ],
  },
  {
    label: "Products and Services",
    href: "#products",
    children: [
      { label: "Business Units", href: "#products" },
      { label: "Products", href: "#products" },
      { label: "Solutions", href: "#products" },
      { label: "Product Catalogue", href: "#products" },
    ],
  },
  {
    label: "Sustainability",
    href: "#team",
    children: [
      { label: "Strategies & Goals", href: "#team" },
      { label: "Compliance", href: "#team" },
      { label: "Information", href: "#team" },
    ],
  },
  { label: "News Center", href: "#products" },
  { label: "Investor Relations", href: "#contact" },
];

export function SiteNavbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="relative z-50 w-full bg-white text-[#222]">
      <div className="h-[38px] border-b border-black/10 bg-white">
        <div className="mx-auto flex h-full w-[94%] max-w-[1280px] items-center justify-end">
          <a
            href="#home"
            className="text-[14px] leading-none text-[#2d5da7] transition-colors duration-300 hover:text-[#127fef]"
          >
            CN
          </a>
        </div>
      </div>

      <nav
        aria-label="Main navigation"
        className="relative h-[60px]  bg-white transition-all duration-200 ease-in-out md:h-[90px]"
      >
        <div className="mx-auto flex h-full w-[94%] max-w-[1280px] items-center justify-between">
          <a
            href="#home"
            aria-label="Olympia home"
            className="flex  shrink-0 items-center"
            onClick={() => setMobileOpen(false)}
          >
            <Image
              src="/logo.png"
              alt="Olympia"
              width={186}
              height={45}
              className="h-auto w-[150px] md:w-[186px]"
              style={{ height: "auto" }}
              priority
            />
          </a>

          <div className="hidden items-center lg:flex">
            <ul className="flex h-[90px] items-center">
              {navItems.map((item) => (
                <li
                  key={item.label}
                  className="group  relative flex h-[90px] items-center px-[15px] text-center min-[1281px]:px-[25px]"
                >
                  <a
                    href={item.href}
                    className="relative font-bold inline-flex h-full items-center pb-[15px] pt-[15px] text-[18px] lg:text-[20px]  leading-[90px] text-[#222] transition-colors duration-300 hover:text-[#127fef] focus-visible:text-[#127fef] focus-visible:outline-none"
                  >
                    {item.label}
                    <span className="absolute bottom-[15px] left-1/2 h-[2px] w-0 -translate-x-1/2 bg-[#127fef] transition-all delay-100 duration-500 ease-in-out group-hover:w-full group-focus-within:w-full" />
                  </a>

                  {item.children ? (
                    <div className="invisible absolute left-1/2 top-[90px] min-w-[220px] -translate-x-1/2 translate-y-2 bg-white/80 opacity-0 backdrop-blur-sm transition-all delay-100 duration-300 ease-out group-hover:visible group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:visible group-focus-within:translate-y-0 group-focus-within:opacity-100">
                      <div className="py-0">
                        {item.children.map((child) => (
                          <a
                            key={child.label}
                            href={child.href}
                            className="block h-[54px] min-w-[120px] px-8 text-center text-[12px] lg:text-[16px] font-normal leading-[54px] text-[#222] transition-colors duration-300 hover:bg-[#127fef] hover:text-white focus-visible:bg-[#127fef] focus-visible:text-white focus-visible:outline-none"
                          >
                            {child.label}
                          </a>
                        ))}
                      </div>
                    </div>
                  ) : null}
                </li>
              ))}
            </ul>

            <button
              type="button"
              aria-label="Search"
              className="ml-[20px] grid h-8 w-[18px] place-items-center text-[#333] transition-colors duration-300 hover:text-[#127fef] focus-visible:text-[#127fef] focus-visible:outline-none"
            >
              <Search aria-hidden="true" className="size-[22px]" strokeWidth={2.3} />
            </button>
          </div>

          <button
            type="button"
            aria-label={mobileOpen ? "Close navigation" : "Open navigation"}
            aria-expanded={mobileOpen}
            aria-controls="mobile-navigation"
            onClick={() => setMobileOpen((open) => !open)}
            className="relative grid h-10 w-10 place-items-center lg:hidden"
          >
            {mobileOpen ? <X aria-hidden="true" className="size-7" /> : <Menu aria-hidden="true" className="size-7" />}
          </button>
        </div>

        <div
          id="mobile-navigation"
          aria-hidden={!mobileOpen}
          className={`fixed inset-x-0 top-[98px] overflow-hidden bg-white transition-[max-height,opacity] duration-500 ease-in-out md:top-[128px] lg:hidden ${
            mobileOpen ? "max-h-[calc(100vh-98px)] opacity-100 md:max-h-[calc(100vh-128px)]" : "max-h-0 opacity-0"
          }`}
        >
          <ul className="mx-auto flex w-[94%] flex-col py-3 text-center">
            {navItems.map((item) => (
              <li key={item.label} className="border-b border-black/10">
                <a
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  className="relative block py-3 text-[16px] leading-[26px] text-[#222] transition-colors duration-300 hover:text-[#127fef]"
                >
                  {item.label}
                </a>
                {item.children ? (
                  <div className="grid grid-cols-1 border-t border-black/10 sm:grid-cols-3">
                    {item.children.map((child) => (
                      <a
                        key={child.label}
                        href={child.href}
                        onClick={() => setMobileOpen(false)}
                        className="border-b border-black/10 py-2.5 text-[12px] leading-5 text-[#222] transition-colors duration-300 hover:bg-[#127fef] hover:text-white sm:border-l sm:first:border-l-0"
                      >
                        {child.label}
                      </a>
                    ))}
                  </div>
                ) : null}
              </li>
            ))}
          </ul>
        </div>
      </nav>
    </header>
  );
}

export default SiteNavbar;
