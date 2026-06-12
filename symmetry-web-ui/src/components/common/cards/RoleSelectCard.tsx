import { CgGym } from "react-icons/cg";
import { USER_ROLE } from "../../../constants/enum";
import type { UserRole } from "../../../types/AuthTypes";
import { RiUser5Fill } from "react-icons/ri";
import { useTranslation } from "react-i18next";

interface RoleSelectProps {
  setRole: React.Dispatch<React.SetStateAction<UserRole>>;
  role: UserRole;
}

const RoleSelectCard = ({ role, setRole }: RoleSelectProps) => {
  const { t } = useTranslation();
  return (
    <div className="mt-6">
      <label className="block text-sm font-semibold text-brand-dark mb-2">
        {t("labels.role")}
      </label>
      <div className="grid grid-cols-2 gap-3">
        <button
          type="button"
          onClick={() => setRole("gym_admin")}
          className={`btn-tab ${role === USER_ROLE.GYM_ADMIN ? "active-tab" : "inactive-tab"}`}
        >
          <CgGym size={20} /> {t("auth.role_admin")}
        </button>
        <button
          type="button"
          onClick={() => setRole("individual")}
          className={`btn-tab ${role === USER_ROLE.INDIVIDUAL ? "active-tab" : "inactive-tab"}`}
        >
          <RiUser5Fill size={20} /> {t("auth.role_member")}
        </button>
      </div>
    </div>
  );
};

export default RoleSelectCard;
