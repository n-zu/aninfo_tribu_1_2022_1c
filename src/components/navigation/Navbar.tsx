import Link from "next/link";
import { AppBar, Box, Toolbar, Button, Typography } from "@material-ui/core";

import styles from "./Navbar.module.css";

const Navbar = () => {
  const links = [
    { href: "/", label: "Home" },
    { href: "/rrhh", label: "rrhh" },
    { href: "/projects", label: "projects" },
    { href: "/support", label: "support" },
  ];

  return (
    <AppBar>
      <Box sx={{ flexGrow: 1, display: "flex" }}>
        <Toolbar>
          {links.map((link) => (
            <Link key={link.label} href={link.href}>
              <Button>
                <Typography style={{ color: "white" }}>{link.label}</Typography>
              </Button>
            </Link>
          ))}
        </Toolbar>
      </Box>
    </AppBar>
  );
};

export default Navbar;
