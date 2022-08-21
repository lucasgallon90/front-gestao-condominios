import NextLink from "next/link";
import { useRouter } from "next/router";
import PropTypes from "prop-types";
import { Box, Button, Collapse, Divider, List, ListItem } from "@mui/material";
import IconExpandLess from "@mui/icons-material/ExpandLess";
import IconExpandMore from "@mui/icons-material/ExpandMore";
import { useEffect, useState } from "react";

export const NavItem = (props) => {
  const { href, icon, title, items, isSubItem, ...others } = props;
  const router = useRouter();
  const active = href ? router.pathname.split("/")[1] === href.split("/")[1] : false;
  const isExpandable = items && items.length > 0;
  const [open, setOpen] = useState(false);

  function handleClick() {
    setOpen(!open);
  }

  const MenuItemRoot = (
    <ListItem
      onClick={handleClick}
      disableGutters
      sx={{
        display: "flex",
        mb: 0.5,
        py: 0,
        px: 2,
        paddingLeft: isSubItem ? 2 : 0,
      }}
      {...others}
    >
      <Button
        onClick={() => !isExpandable && href && router.push(href)}
        component="a"
        startIcon={icon}
        disableRipple
        sx={{
          backgroundColor: active && "rgba(255,255,255, 0.08)",
          borderRadius: 1,
          color: active ? "secondary.main" : "neutral.300",
          fontWeight: active && "fontWeightBold",
          justifyContent: "flex-start",
          px: 3,
          textAlign: "left",
          textTransform: "none",
          width: "100%",
          "& .MuiButton-startIcon": {
            color: active ? "secondary.main" : "neutral.400",
          },
          "&:hover": {
            backgroundColor: "rgba(255,255,255, 0.08)",
          },
        }}
      >
        <Box sx={{ flexGrow: 1 }}>{title}</Box>
        {isExpandable && !open && <IconExpandMore />}
        {isExpandable && open && <IconExpandLess />}
      </Button>
    </ListItem>
  );

  const MenuItemChildren = isExpandable ? (
    <Collapse in={open} timeout="auto" unmountOnExit>
      <Divider
        sx={{
          marginLeft: "30px",
          marginRight: "30px",
          borderColor: "#9ca3af",
        }}
      />
      <List component="div" disablePadding>
        {items.map((item, index) => (
          <NavItem {...item} key={index} isSubItem={true} />
        ))}
      </List>
    </Collapse>
  ) : null;

  return (
    <>
      {MenuItemRoot}
      {MenuItemChildren}
    </>
  );
};

NavItem.propTypes = {
  href: PropTypes.string,
  icon: PropTypes.node,
  title: PropTypes.string,
};
