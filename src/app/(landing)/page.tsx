import WhyAuditScore from "./components/WhyAuditScore";
import Hero from "./components/Hero";
import Cta from "./components/Cta";
import Stats from "./components/Stats";
import Solution from "./components/Solution";
export default function Page() {
  return (
    <>
      <Hero/>
      <WhyAuditScore/>
      <Solution/>
      <Stats/>
      <Cta/>
    </>
  );
}
