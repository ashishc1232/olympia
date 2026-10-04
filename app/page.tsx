import { ArrowRight,FlaskConical, Layers, Droplets } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { Lanes } from "@/components/lanes";

const facts = [
  {
    icon: Layers,
    title: "One binder, thousands of granules",
    text: "A polyurethane binder coats rubber granules and bonds them into a single elastic surface, which is how running tracks get their spring.",
  },
  {
    icon: Droplets,
    title: "It cures with moisture",
    text: "Many PU binders react with humidity in the air to harden, so curing depends on weather as much as on the mix.",
  },
  {
    icon: FlaskConical,
    title: "Polymers are long chains",
    text: "Industrial gums and polymers are long molecular chains. Change the chain length or cross-linking and you change how stiff, sticky or flexible the product is.",
  },
];

// Placeholder copy: replace with Olympia's real products, team and contact details.
const products = [
  { name: "Sports flooring binders", text: "Polyurethane binders that bond rubber granules into running tracks, courts and playgrounds." },
  { name: "Chemical polymers", text: "Polymer chemicals for surface coatings, sealing and adhesion in sports construction." },
  { name: "Industrial gum", text: "Gum grades for industrial bonding and manufacturing, supplied in consistent batches." },
  { name: "Sports manufacturing materials", text: "Raw materials for manufacturers of sports surfaces and related products." },
];
const team = [
  { name: "Full name", role: "Founder & Managing Director" },
  { name: "Full name", role: "Head of Technical" },
  { name: "Full name", role: "Head of Sales" },
  { name: "Full name", role: "Quality & Production" },
];

export default function Home() {
  return (
    <>
      <SiteHeader />
      <main>
       <section id="home" className="relative overflow-hidden">
  <div className="relative mx-auto max-w-6xl px-5 py-24 md:py-36">
    <h1 className="max-w-2xl text-6xl leading-[0.95] md:text-8xl">
      Binders that hold the track together.
    </h1>
    <p className="mt-6 max-w-lg text-lg text-muted-foreground">
      Olympia supplies sports flooring binders, chemical polymers and industrial gum to manufacturers and contractors.
    </p>
    <div className="mt-9 flex flex-wrap gap-3">
      <Button asChild size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90">
        <a href="#products">View products <ArrowRight /></a>
      </Button>
      <Button asChild size="lg" variant="outline">
        <a href="#contact">Request a quote</a>
      </Button>
    </div>

    {/* Did you know */}
    <div className="mt-16 grid gap-4 md:grid-cols-3">
      {facts.map(({ icon: Icon, title, text }) => (
        <div
          key={title}
          className="rounded-lg border border-border bg-card/60 p-5 backdrop-blur-sm"
        >
          <Icon className="size-5 text-accent" aria-hidden="true" />
          <h3 className="mt-3 text-base font-semibold">{title}</h3>
          <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{text}</p>
        </div>
      ))}
    </div>
  </div>
</section>

        <section id="about" className="bg-primary text-primary-foreground">
          <div className="mx-auto grid max-w-6xl gap-10 px-5 py-20 md:grid-cols-2">
            <h2 className="text-5xl md:text-6xl">Built for surfaces athletes run on.</h2>
            <div className="space-y-4 text-white/80">
              <p>Olympia works in the chemical polymer industry, making the binders and materials that sports surfaces depend on. Every batch is made to perform on the track, the court and the playground.</p>
              <p>We work with flooring manufacturers and contractors who need consistent quality, clear technical support and reliable supply.</p>
            </div>
          </div>
        </section>

        <section id="products" className="mx-auto max-w-6xl px-5 py-20">
          <h2 className="text-5xl md:text-6xl">Products</h2>
          <div className="mt-10 grid gap-5 sm:grid-cols-2">
            {products.map((p) => (
              <Card key={p.name} className="border-l-4 border-l-accent">
                <CardHeader>
                  <CardTitle className="text-3xl">{p.name}</CardTitle>
                  <CardDescription className="text-base">{p.text}</CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </section>

        <section id="team" className="bg-secondary">
          <div className="mx-auto max-w-6xl px-5 py-20">
            <h2 className="text-5xl md:text-6xl">Team</h2>
            <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {team.map((m, i) => (
                <Card key={i}>
                  <CardContent className="pt-6">
                    <div className="flex size-20 items-center justify-center rounded-full bg-primary font-display text-2xl font-bold italic text-primary-foreground">OL</div>
                    <p className="mt-4 font-semibold">{m.name}</p>
                    <p className="text-sm text-muted-foreground">{m.role}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section id="contact" className="mx-auto grid max-w-6xl gap-12 px-5 py-20 md:grid-cols-2">
          <div>
            <h2 className="text-5xl md:text-6xl">Talk to us</h2>
            <p className="mt-5 max-w-md text-muted-foreground">Tell us what you are building and the quantity you need. We reply with specifications and pricing.</p>
          </div>
          <form action="#" className="space-y-4">
            <Input name="name" placeholder="Your name" aria-label="Your name" required />
            <Input name="email" type="email" placeholder="Email" aria-label="Email" required />
            <Input name="phone" placeholder="Phone" aria-label="Phone" />
            <Textarea name="message" rows={5} placeholder="What do you need?" aria-label="Message" required />
            <Button type="submit" size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90">Send enquiry</Button>
          </form>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
