import Header from "@/components/Header";
import Hero from "@/components/Hero";
import News from "@/components/News";
import About from "@/components/About";
import Schedule from "@/components/Schedule";
import AccessMap from "@/components/AccessMap";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <About />
        <News />
        <Schedule />
        <AccessMap />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
