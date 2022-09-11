import styled from "@emotion/styled";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import MenuIcon from "@mui/icons-material/Menu";
import { AppBar, Avatar, Box, IconButton, Toolbar, Tooltip } from "@mui/material";
import Cookies from "js-cookie";
import { useRouter } from "next/router";
import PropTypes from "prop-types";
import { UserCircle as UserCircleIcon } from "../icons/user-circle";

const DashboardNavbarRoot = styled(AppBar)(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  boxShadow: theme.shadows[3],
}));

export const DashboardNavbar = (props) => {
  const { onSidebarOpen, ...other } = props;
  const router = useRouter();

  function handleClickSair() {
    Cookies.remove("gc.token");
    router.push("/login");
  }

  function handleClickPerfil() {
    router.push("/perfil");
  }

  return (
    <>
      <DashboardNavbarRoot
        sx={{
          left: {
            lg: 280,
          },
          width: {
            lg: "calc(100% - 280px)",
          },
        }}
        {...other}
      >
        <Toolbar
          disableGutters
          sx={{
            minHeight: 64,
            left: 0,
            px: 2,
          }}
        >
          <IconButton
            onClick={onSidebarOpen}
            sx={{
              display: {
                xs: "inline-flex",
                lg: "none",
              },
            }}
          >
            <MenuIcon fontSize="small" />
          </IconButton>
          <Box sx={{ flexGrow: 1 }} />
          <Tooltip title="Sair">
            <IconButton sx={{ ml: 1 }} onClick={handleClickSair}>
              <ExitToAppIcon fontSize="small" />
            </IconButton>
          </Tooltip>
          <Tooltip title="Perfil">
            <Avatar
              sx={{
                height: 40,
                width: 40,
                ml: 1,
                cursor: "pointer",
              }}
              onClick={handleClickPerfil}
            >
              <UserCircleIcon fontSize="small" />
            </Avatar>
          </Tooltip>
        </Toolbar>
      </DashboardNavbarRoot>
    </>
  );
};

DashboardNavbar.propTypes = {
  onSidebarOpen: PropTypes.func,
};
