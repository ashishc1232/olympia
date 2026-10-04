import Image from "next/image";
import { links } from "@/lib/nav";

export function SiteFooter() {
  return (
    <footer className="border-t-4 border-accent bg-primary text-primary-foreground">
      <div className="mx-auto grid max-w-6xl gap-10 px-5 py-14 md:grid-cols-[1.3fr_1fr_1fr]">
        <div>
          <div className="inline-block rounded-md bg-white p-3">
            <Image src="/logo.png" alt="Olympia" width={160} height={64} className="h-10 w-auto" />
          </div>
          <p className="mt-5 max-w-sm text-sm text-white/70">Binders, polymers and industrial gum for sports surface manufacturers.</p>
        </div>
        <nav aria-label="Footer">
          <h3 className="text-xl">Pages</h3>
          <ul className="mt-3 space-y-2 text-sm text-white/80">
            {links.map((l) => <li key={l.href}><a href={l.href} className="hover:text-accent">{l.label}</a></li>)}
          </ul>
        </nav>
        <div>
          <h3 className="text-xl">Contact</h3>
          <ul className="mt-3 space-y-2 text-sm text-white/80">
            <li>sales@olympia.example</li>
            <li>+91 00000 00000</li>
            <li>Plant address, City, State</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/15 py-5 text-center text-xs text-white/60">© {new Date().getFullYear()} Olympia. All rights reserved.</div>
    </footer>
  );
}
