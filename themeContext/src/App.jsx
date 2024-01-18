import { useEffect, useState } from "react";
import { Card, ThemeBtn } from "./components";
import { ThemeProvider } from "./contexts/theme";

function App() {
  const [themeMode, setThemeMode] = useState("light");
  const darkTheme = () => {
    setThemeMode("dark");
  };
  const lightTheme = () => {
    setThemeMode("light");
  };

  useEffect(() => {
    document.querySelector("html").classList.remove("light", "dark");
    document.querySelector("html").classList.add(themeMode);
  }, [themeMode]);

  return (
    <ThemeProvider value={{ themeMode, darkTheme, lightTheme }}>
      <div className="flex flex-wrap items-center min-h-screen w-full dark:bg-slate-800">
        <div className="w-full">
          <div className="w-full  max-w-sm mx-auto flex justify-end m-4">
            <ThemeBtn />
          </div>
        </div>
        <div className="w-full max-w-sm mx-auto mb-3">
          <Card />
        </div>
      </div>
    </ThemeProvider>
  );
}

export default App;
