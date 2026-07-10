import type { IconType } from "react-icons";
import type { UserRole } from "./AuthTypes";

export interface NavItem {
  label: string;
  path: string;
  allowedRoles: UserRole[];
  icon: IconType;
}
