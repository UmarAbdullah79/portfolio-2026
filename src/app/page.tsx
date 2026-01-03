import Hero from "@/components/Hero";
import Credebility from "@/components/Credebility";
import Services from "@/components/Services";
import ProofOverClaims from "@/components/ProofOverClaims";
import Exp from "@/components/Exp";
import Skills from "@/components/Skills";
import Resume from "@/components/Resume";
import Contact from "@/components/Contact";

export default function Home() {
  return (
    <>
      <Hero />
      {/* <Credebility /> */}
      <Services />
      <ProofOverClaims />
      <Exp />
      <Skills />
      {/* <Resume /> */}
      <Contact />
    </>
  );
}
