import { useEffect, useState } from "react";

const DESKTOP_MIN_WIDTH = 1024;

function MobileTabletMessage() {
  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "1.5rem",
        textAlign: "center",
        backgroundColor: "hsl(var(--background))",
        color: "hsl(var(--foreground))",
      }}
    >
      <p style={{ fontSize: "1.125rem", maxWidth: "24rem" }}>
        Aplicación no disponible para dispositivos móviles.
      </p>
    </div>
  );
}

export function App() {
  const [isDesktop, setIsDesktop] = useState(
    () =>
      typeof window !== "undefined" &&
      window.matchMedia(`(min-width: ${DESKTOP_MIN_WIDTH}px)`).matches,
  );

  useEffect(() => {
    const mediaQuery = window.matchMedia(`(min-width: ${DESKTOP_MIN_WIDTH}px)`);
    const handler = (e: MediaQueryListEvent) => setIsDesktop(e.matches);
    mediaQuery.addEventListener("change", handler);
    return () => mediaQuery.removeEventListener("change", handler);
  }, []);

  if (!isDesktop) {
    return <MobileTabletMessage />;
  }

}

export default App
