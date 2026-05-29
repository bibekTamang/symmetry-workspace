import { Trans, useTranslation } from "react-i18next";
import { Link } from "react-router";

const HeroSectionLeft = () => {
  const { t } = useTranslation();
  return (
    <div className="space-y-6">
      <h1 className="text-4xl font-extrabold tracking-tight text-brand-dark sm:text-5xl md:leading-[1.15]">
        <Trans
          i18nKey="landing.hero_title"
          components={{
            gradient: (
              <span className="bg-linear-to-r from-brand-primary to-indigo-600 bg-clip-text text-transparent" />
            ),
          }}
        />
      </h1>
      <p className="text-lg text-brand-muted leading-relaxed">
        {t("landing.hero_description")}
      </p>
      <div className="flex flex-col sm:flex-row gap-4 pt-2">
        <Link
          to="/auth/register"
          className="rounded-lg bg-brand-primary px-6 py-3 font-semibold text-white shadow-md shadow-blue-500/10 hover:bg-brand-hover hover:shadow-lg transition-all text-center"
        >
          {t("button.register_as_gym")}
        </Link>
        <Link
          to="/auth/login"
          className="rounded-lg border border-brand-border bg-white px-6 py-3 font-semibold text-brand-muted shadow-sm hover:bg-slate-50 hover:text-brand-dark transition-all text-center"
        >
          {t("button.register_as_individual")}
        </Link>
      </div>
    </div>
  );
};

export default HeroSectionLeft;
