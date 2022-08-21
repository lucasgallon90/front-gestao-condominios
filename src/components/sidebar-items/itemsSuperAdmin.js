import ApartmentIcon from "@mui/icons-material/Apartment";
import SettingsIcon from "@mui/icons-material/Settings";
import { ChartBar as ChartBarIcon } from "../../icons/chart-bar";
import { User as UserIcon } from "../../icons/user";
import { Users as UsersIcon } from "../../icons/users";

const itemsSuperAdmin = [
  {
    href: "/",
    icon: <ChartBarIcon fontSize="small" />,
    title: "Dashboard",
  },
  {
    href: "/condominios",
    icon: <ApartmentIcon fontSize="small" />,
    title: "Condomínios",
  },
  {
    href: "/usuarios",
    icon: <UserIcon fontSize="small" />,
    title: "Usuários",
  },
  {
    icon: <SettingsIcon fontSize="small" />,
    title: "Configurações",
    items: [
      {
        href: "/perfil",
        icon: <UsersIcon fontSize="small" />,
        title: "Meu perfil",
      },
    ],
  },
];

export default itemsSuperAdmin;
