import Hero from "../../components/hero/Hero";
import Navbar from "../../components/navigation/Navbar";

const LandingPage = () => {
  return (
    <section className="flex flex-col min-h-screen antialiased bg-linear-to-tr from-slate-950 via-slate-900 to-orange-950">
      <Navbar />
      <Hero />
    </section>
  );
};

export default LandingPage;
