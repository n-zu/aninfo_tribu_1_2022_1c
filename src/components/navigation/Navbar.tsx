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
      <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "flex" } }}>
        <Toolbar>
          {links.map((link) => (
            <Button key={link.href}>
              <Link href={link.href}>
                <Typography style={{ color: "white" }}>{link.label}</Typography>
              </Link>
            </Button>
          ))}
        </Toolbar>
      </Box>
    </AppBar>
  );
};

export default Navbar;
