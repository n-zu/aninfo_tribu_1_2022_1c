import Link from "next/link";
import {
  AppBar,
  Box,
  Toolbar,
  Button,
  Typography,
  colors,
} from "@mui/material";

const Navbar = () => {
  const links = [
    { href: "/", label: "Home" },
    { href: "/rrhh", label: "rrhh" },
    { href: "/projects", label: "projects" },
    { href: "/support", label: "support" },
  ];

  return (
    <AppBar sx={{ backgroundColor: colors.indigo[700] }}>
      <Box>
        <Toolbar>
          {links.map((link) => (
            <Link key={link.label} href={link.href}>
              <Button sx={{ ":hover": { background: "#55c" }, py: "1em" }}>
                <Typography color="white">{link.label}</Typography>
              </Button>
            </Link>
          ))}
        </Toolbar>
      </Box>
    </AppBar>
  );
};

export default Navbar;
