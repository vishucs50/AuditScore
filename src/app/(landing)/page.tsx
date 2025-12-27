import WhyAuditScore from "./components/WhyAuditScore";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Cta from "./components/Cta";
import Stats from "./components/Stats";
import Solution from "./components/Solution";
export default function Page() {
  return (
    <>
      <Navbar/>
      <Hero/>
      <WhyAuditScore/>
      <Solution/>
      <Stats/>
      <Cta/>
    </>
  );
}
