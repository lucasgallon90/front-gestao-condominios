import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import AssignmentIcon from "@mui/icons-material/Assignment";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import CompareArrowsIcon from "@mui/icons-material/CompareArrows";
import FeedIcon from "@mui/icons-material/Feed";
import InsertChartIcon from "@mui/icons-material/InsertChart";
import InsightsIcon from "@mui/icons-material/Insights";
import SettingsIcon from "@mui/icons-material/Settings";
import { ChartBar as ChartBarIcon } from "../../icons/chart-bar";
import { Users as UsersIcon } from "../../icons/users";

const itemsAdmin = [
  {
    href: "/",
    icon: <ChartBarIcon fontSize="small" />,
    title: "Dashboard",
  },
  {
    href: "/caixa",
    icon: <AccountBalanceWalletIcon fontSize="small" />,
    title: "Caixa",
  },
  {
    href: "/moradores",
    icon: <UsersIcon fontSize="small" />,
    title: "Moradores",
  },
  {
    href: "/movimentacoes",
    icon: <AttachMoneyIcon fontSize="small" />,
    title: "Movimentações",
  },
  {
    href: "/cobrancas",
    icon: <AttachMoneyIcon fontSize="small" />,
    title: "Cobranças",
  },
  {
    href: "/leituras",
    icon: <AssignmentIcon fontSize="small" />,
    title: "Leituras",
  },
  {
    href: "/ocorrencias",
    icon: <InsightsIcon fontSize="small" />,
    title: "Ocorrências",
  },
  {
    href: "/graficos",
    icon: <InsertChartIcon fontSize="small" />,
    title: "Gráficos",
  },
  {
    icon: <SettingsIcon fontSize="small" />,
    title: "Configurações",
    items: [
      {
        icon: <FeedIcon fontSize="small" />,
        title: "Tipos de Leitura",
        href: "/tipos-leitura",
      },
      {
        icon: <CompareArrowsIcon fontSize="small" />,
        title: "Tipos de Movimentação",
        href: "/tipos-movimentacao",
      },
      {
        href: "/perfil",
        icon: <UsersIcon fontSize="small" />,
        title: "Meu perfil",
      },
    ],
  },
];

export default itemsAdmin;