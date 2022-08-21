import { Box, Divider, Drawer, useMediaQuery } from "@mui/material";
import NextLink from "next/link";
import { useRouter } from "next/router";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { ChartBar as ChartBarIcon } from "../icons/chart-bar";
import { ShoppingBag as ShoppingBagIcon } from "../icons/shopping-bag";
import { User as UserIcon } from "../icons/user";
import { Users as UsersIcon } from "../icons/users";
import { NavItem } from "./nav-item";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import MoneyOffIcon from "@mui/icons-material/MoneyOff";
import InsightsIcon from "@mui/icons-material/Insights";
import InsertChartIcon from "@mui/icons-material/InsertChart";
import AssignmentIcon from "@mui/icons-material/Assignment";
import ApartmentIcon from "@mui/icons-material/Apartment";
import SettingsIcon from "@mui/icons-material/Settings";
import FeedIcon from "@mui/icons-material/Feed";
import CompareArrowsIcon from "@mui/icons-material/CompareArrows";
import { useUser } from "src/contexts/authContext";
import itemsMorador from "./sidebar-items/itemsMorador";
import itemsAdmin from "./sidebar-items/itemsAdmin";
import itemsSuperAdmin from "./sidebar-items/itemsSuperAdmin";

export const DashboardSidebar = (props) => {
  const { user } = useUser();
  const [items, setItems] = useState([]);
  const { open, onClose } = props;
  const router = useRouter();
  const lgUp = useMediaQuery((theme) => theme.breakpoints.up("lg"), {
    defaultMatches: true,
    noSsr: false,
  });

  useEffect(
    () => {     
      if (!router.isReady) {
        return;
      }

      if (open) {
        onClose?.();
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [router.asPath]
  );

  useEffect(()=>{
    if(user){
      if (user?.tipoUsuario === "morador") {
        setItems(itemsMorador);
      } else if (user?.tipoUsuario === "admin") {
        setItems(itemsAdmin);
      } else if (user?.tipoUsuario === "superAdmin") {
        setItems(itemsSuperAdmin);
      }
    }
  },[user])

  const content = (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          height: "100%",
        }}
      >
        <div>
          <Box sx={{ p: 3 }} style={{ justifyContent: "center", display: "flex" }}>
            <NextLink href="/" passHref>
              <a>
                <img src="/static/logo.png" />
              </a>
            </NextLink>
          </Box>
        </div>
        <Divider
          sx={{
            borderColor: "#2D3748",
          }}
        />
        <Box sx={{ flexGrow: 1 }}>
          {items.map((item) => (
            <NavItem
              key={item.title}
              icon={item.icon}
              href={item.href}
              title={item.title}
              items={item.items}
            />
          ))}
        </Box>
        <Divider sx={{ borderColor: "#2D3748" }} />
      </Box>
    </>
  );

  if (lgUp) {
    return (
      <Drawer
        anchor="left"
        open
        PaperProps={{
          sx: {
            backgroundColor: "neutral.700",
            color: "#FFFFFF",
            width: 280,
          },
        }}
        variant="permanent"
      >
        {content}
      </Drawer>
    );
  }

  return (
    <Drawer
      anchor="left"
      onClose={onClose}
      open={open}
      PaperProps={{
        sx: {
          backgroundColor: "neutral.900",
          color: "#FFFFFF",
          width: 280,
        },
      }}
      sx={{ zIndex: (theme) => theme.zIndex.appBar + 100 }}
      variant="temporary"
    >
      {content}
    </Drawer>
  );
};

DashboardSidebar.propTypes = {
  onClose: PropTypes.func,
  open: PropTypes.bool,
};
