import Link from "next/link";
import { AppBar, Box, Toolbar, Button, Typography } from "@mui/material";
import Image from "next/image";

const Navbar = () => {
  const links = [
    { href: "/rrhh", label: "rrhh" },
    { href: "/projects", label: "projects" },
    { href: "/support", label: "support" },
  ];

  return (
    <AppBar>
      <Box>
        <Toolbar>
          <Link href={"/"}>
            <a
              style={{
                marginRight: "10px",
              }}
            >
              <Image src="/psa.png" height="35" width="65" alt="logo" />
            </a>
          </Link>
          {links.map((link) => (
            <Link key={link.label} href={link.href}>
              <a>
                <Button sx={{ ":hover": { background: "#55c" }, py: "1em" }}>
                  <Typography color="white" fontSize={"15pt"}>
                    {link.label}
                  </Typography>
                </Button>
              </a>
            </Link>
          ))}
        </Toolbar>
      </Box>
    </AppBar>
  );
};

export default Navbar;
