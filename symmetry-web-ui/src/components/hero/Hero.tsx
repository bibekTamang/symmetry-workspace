import HeroSectionLeft from "./HeroSectionLeft";
import HeroSectionRight from "./HeroSectionRight";

const Hero = () => {
  return (
    <section className="relative overflow-hidden bg-linear-to-br from-[#93c5f1] via-green-100/30 to-purple-200/50 px-6 py-16 md:py-24 border-b border-[#E2E8F0]">
      <div className="absolute -top-40 -right-40 h-96 w-96 rounded-full bg-blue-400/10 blur-3xl"></div>
      <div className="absolute -bottom-20 -left-20 h-96 w-96 rounded-full bg-indigo-400/10 blur-3xl"></div>

      <div className="mx-auto max-w-6xl relative z-10">
        <div className="grid gap-12 md:grid-cols-2 md:items-center">
          <HeroSectionLeft />
          <HeroSectionRight />
        </div>
      </div>
    </section>
  );
};

export default Hero;
