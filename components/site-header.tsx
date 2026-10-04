"use client";
import Image from "next/image";
import Link from "next/link";
import { Menu } from "lucide-react";
import { links } from "@/lib/nav";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTitle, SheetTrigger, SheetClose } from "@/components/ui/sheet";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b bg-background/90 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5">
        <Link href="#home" aria-label="Olympia home">
          <Image src="/logo.png" alt="Olympia" width={160} height={64} className="h-10 w-auto" priority />
        </Link>
        <nav className="hidden items-center gap-8 md:flex" aria-label="Main">
          {links.slice(0, 4).map((l) => (
            <a key={l.href} href={l.href} className="text-sm font-medium text-muted-foreground transition-colors hover:text-accent">{l.label}</a>
          ))}
          <Button asChild className="bg-accent text-accent-foreground hover:bg-accent/90"><a href="#contact">Contact</a></Button>
        </nav>
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="md:hidden" aria-label="Open menu"><Menu /></Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-72">
            <SheetTitle className="sr-only">Menu</SheetTitle>
            <nav className="mt-10 flex flex-col gap-1 px-4" aria-label="Mobile">
              {links.map((l) => (
                <SheetClose asChild key={l.href}>
                  <a href={l.href} className="rounded-md px-3 py-3 font-display text-2xl font-bold italic uppercase hover:bg-secondary">{l.label}</a>
                </SheetClose>
              ))}
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
