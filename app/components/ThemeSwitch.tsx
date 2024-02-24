import { useState, useEffect, MouseEventHandler } from "react";
import { useTheme } from "next-themes";
import { IoMdSunny, IoMdMoon } from "react-icons/io";
import { Switch } from "@radix-ui/themes";
import React from "react";

const ThemeSwitch = () => {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  // useEffect only runs on the client, so now we can safely show the UI
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  return (
    <div className="cursor-pointer" onClick={toggleTheme}>
      {theme === "light" ? (
        <IoMdSunny fontSize={"1.35rem"} />
      ) : (
        <IoMdMoon fontSize={"1.35rem"} />
      )}
    </div>
  );
};

export default ThemeSwitch;
