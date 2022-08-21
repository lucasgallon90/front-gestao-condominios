import AssignmentIcon from "@mui/icons-material/Assignment";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import InsightsIcon from "@mui/icons-material/Insights";
import SettingsIcon from "@mui/icons-material/Settings";
import { ChartBar as ChartBarIcon } from "../../icons/chart-bar";
import { Users as UsersIcon } from "../../icons/users";

const itemsMorador = [
  {
    href: "/",
    icon: <ChartBarIcon fontSize="small" />,
    title: "Dashboard",
  },
  {
    href: "/cobrancas",
    icon: <AttachMoneyIcon fontSize="small" />,
    title: "Cobranças",
  },
  {
    href: "/ocorrencias",
    icon: <InsightsIcon fontSize="small" />,
    title: "Ocorrências",
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

export default itemsMorador;