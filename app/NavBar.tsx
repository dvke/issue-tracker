"use client";
import { Box, Container, Flex } from "@radix-ui/themes";
import classnames from "classnames";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { IoBugSharp } from "react-icons/io5";
import "react-loading-skeleton/dist/skeleton.css";
import AuthStatus from "./components/AuthStatus";
import ThemeSwitch from "./components/ThemeSwitch";
import { useTheme } from "next-themes";

const NavBar = () => {
  const currentPath = usePathname();
  const { theme } = useTheme();

  const Links = [
    { label: "Dashboard", href: "/" },
    { label: "Issues", href: "/issues/list" },
  ];

  return (
    <nav className="border-b mb-5 px-5 py-5">
      <Container>
        <Flex justify="between">
          <Flex align="center" gap="3">
            {" "}
            <Link href={"/"}>
              <IoBugSharp size={25} />
            </Link>
            <ul className="flex space-x-6">
              {Links.map((link) => (
                <li key={link.href}>
                  <Link
                    className={classnames({
                      "font-bold": link.href === currentPath,
                      "": link.href !== currentPath,
                      "hover:text-violet-300 transition-color duration-400": true,
                    })}
                    href={link.href}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </Flex>
          <Box>
            <Flex align="center" gap="4">
              <ThemeSwitch />
              <AuthStatus />
            </Flex>
          </Box>
        </Flex>
      </Container>
    </nav>
  );
};

export default NavBar;
