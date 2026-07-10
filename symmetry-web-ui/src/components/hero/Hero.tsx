import HeroSectionLeft from "./HeroSectionLeft";
import HeroSectionRight from "./HeroSectionRight";

const Hero = () => {
  return (
    <section className="relative overflow-hidden flex flex-1 flex-col justify-center">
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
