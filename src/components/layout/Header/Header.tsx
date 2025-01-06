import { routes } from "@/utils/routes";
import styles from "./styles.module.scss";
import { NavLink } from "react-router-dom";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { useState } from "react";
export default function Header() {
  const appRoutes = routes;

  const classs = ({ isActive }: { isActive: boolean }) => {
    return [isActive && styles.isActive].join(" ");
  };

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <header className={styles.header}>
      {appRoutes.map((route) => {
        return (
          <>
            <NavLink
              className={classs}
              to={route.path}
              onClick={(e) => {
                if (route.childrens.length === 0) return;
                e.preventDefault();
                handleClick(e as any);
              }}>
              <span>{route.title}</span>
            </NavLink>
            <Menu
              id='basic-menu'
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              MenuListProps={{
                "aria-labelledby": "basic-button",
              }}>
              {route.childrens.map((child) => {
                return (
                  <MenuItem
                    style={{
                      fontFamily: "iran-sans",
                    }}>
                    <NavLink
                      to={child.path}
                      onClick={handleClose}>
                      {child.title}
                    </NavLink>
                  </MenuItem>
                );
              })}
            </Menu>
          </>
        );
      })}
    </header>
  );
}
