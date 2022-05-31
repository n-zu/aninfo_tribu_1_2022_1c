import Link from "next/link";

import styles from "./Navbar.module.css";

const Navbar = () => {
  const links = [
    { href: "/", label: "Home" },
    { href: "/rrhh", label: "rrhh" },
    { href: "/projects", label: "projects" },
    { href: "/support", label: "support" },
  ];

  return (
    <div className={styles.Navbar}>
      {links.map((link) => (
        <Link href={link.href} key={link.href}>
          <a>{link.label}</a>
        </Link>
      ))}
    </div>
  );
};

export default Navbar;
