import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Marquee from "@/components/Marquee";
import About from "@/components/About";
import Services from "@/components/Services";
import Artists from "@/components/Artists";
import Gallery from "@/components/Gallery";
import Why from "@/components/Why";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import WhatsAppFloat from "@/components/WhatsAppFloat";
import Motion from "@/components/Motion";
import { artists, site } from "@/lib/site";

export default function Home() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "TattooParlor",
    name: site.name,
    alternateName: site.legalName,
    description: site.description,
    url: site.url,
    image: `${site.url}/og.jpg`,
    logo: `${site.url}/images/logo.png`,
    sameAs: [site.instagram.url, ...artists.filter((a) => a.handle).map((a) => `https://www.instagram.com/${a.handle}/`)],
    ...(site.whatsapp && { telephone: `+${site.whatsapp}` }),
    ...(site.email && { email: site.email }),
    ...(site.address && { address: site.address }),
  };

  return (
    <>
      <a href="#contenido" className="sr-only z-[80] rounded bg-bone px-4 py-2 text-ink focus:not-sr-only focus:fixed focus:left-4 focus:top-4">
        Saltar al contenido
      </a>
      <Header />
      <main id="contenido">
        <Hero />
        <Marquee />
        <About />
        <Services />
        <Artists />
        <Gallery />
        <Why />
        <Contact />
      </main>
      <Footer />
      <WhatsAppFloat />
      <Motion />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
    </>
  );
}
