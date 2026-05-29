import { useTranslation } from "react-i18next";
import ProgressCard from "../common/cards/ProgressCard/ProgressCard";

const HeroSectionRight = () => {
  const { t } = useTranslation();
  return (
    <div className="relative">
      <div className="absolute -inset-1 rounded-2xl bg-linear-to-tr from-blue-600 to-indigo-500 opacity-20 blur-lg"></div>

      <div className="relative rounded-2xl border border-brand-border bg-white p-4 shadow-xl">
        <div className="flex items-center space-x-2 border-b border-brand-border pb-3 mb-3">
          <span className="h-3 w-3 rounded-full bg-red-400"></span>
          <span className="h-3 w-3 rounded-full bg-yellow-400"></span>
          <span className="h-3 w-3 rounded-full bg-green-400"></span>
          <span className="text-xs text-slate-400 font-medium pl-2">
            {t("labels.application_feed")}
          </span>
        </div>
        <div className="relative h-64 sm:h-80 w-full overflow-hidden rounded-xl">
          <img
            src="https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=800&q=80"
            alt="Athlete training in modern functional gym environment"
            className="h-full w-full object-cover object-center brightness-[0.85]"
          />
          <ProgressCard />
        </div>
      </div>
    </div>
  );
};

export default HeroSectionRight;
