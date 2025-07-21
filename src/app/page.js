import Hero from "./components/hero";
import Header from "./components/header";
import Features from "./components/feature";
import Network from "./components/network";
import Stats from "./components/stats";
import Testimonials from "./components/testimonials";
import CTA from "./components/cta";
import Footer from "./components/footer";
import BlogsSection from "./components/blogs";
import IrelandPhysiotherapistMap from "./components/map";
import { getCurrentUser } from "../lib/auth";

export default async function Home() {
  const user = await getCurrentUser();

  return (
    <div className="min-h-screen bg-white">
      <Header user={user} />
      <main>
        <Hero />
        <Features />
        <Network />
        <Stats />
        <IrelandPhysiotherapistMap />
        <BlogsSection />
        <Testimonials />
        <CTA />
        <Footer />
      </main>
    </div>
  );
}
