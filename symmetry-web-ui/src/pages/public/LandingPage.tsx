import Hero from "../../components/hero/Hero";
import Navbar from "../../components/navigation/Navbar";

const LandingPage = () => {
  return (
    <section className="min-h-screen bg-[#F8FAFC] font-sans text-[#0F172A] antialiased">
      <Navbar />
      <Hero />
    </section>
  );
};

export default LandingPage;
