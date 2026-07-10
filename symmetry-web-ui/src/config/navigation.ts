import type { NavItem } from "../types/ConfigTypes";
import { MdOutlineDashboard } from "react-icons/md";
import { PiUsers } from "react-icons/pi";
import { CgGym } from "react-icons/cg";
import { TbNotes } from "react-icons/tb";

export const NAVIGATION_ITEMS: NavItem[] = [
  {
    label: "Dashboard",
    path: "/gym/dashboard",
    allowedRoles: ["gym_admin", "super_admin"],
    icon: MdOutlineDashboard,
  },
  {
    label: "Workout Plans",
    path: "/gym/workout-plans",
    allowedRoles: ["gym_admin"],
    icon: TbNotes,
  },
  {
    label: "Members",
    path: "/gym/members",
    allowedRoles: ["gym_admin"],
    icon: PiUsers,
  },
  {
    label: "Gyms",
    path: "/admin/gyms",
    allowedRoles: ["super_admin"],
    icon: CgGym,
  },
];
