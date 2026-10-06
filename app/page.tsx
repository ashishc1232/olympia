import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { SiteFooter } from "@/components/site-footer";
import SiteNavbar from "@/components/SiteNavbar";
import { HeroCarousel } from "@/components/HeroCarousel";
import InnovationSection from "@/components/innovation-section";
import NewsCenter from "@/components/news-center";
import ProductsServices from "../components/ProductServices";
import SustainableDevelopment from "@/components/sustainable-development";
import InvestorStaff from "@/components/Inverstor-staff";

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
      <SiteNavbar />
      <main>
        <HeroCarousel />
        <InnovationSection />
        <NewsCenter />
        <ProductsServices/>
        <SustainableDevelopment/>
        <InvestorStaff/>
       
      </main>
      <SiteFooter />
    </>
  );
}
