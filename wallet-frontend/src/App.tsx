import { useEffect, useState } from "react"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import { Toaster } from "./components/ui/sonner"
import { TooltipProvider } from "./components/ui/tooltip"
import Home from "./pages/home/Home"
import WalletContextComponent from "./context/wallet/WalletContextComponent"
import TransactionContextComponent from "./context/transaction/TransactionContextComponent"

const DESKTOP_MIN_WIDTH = 1024

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
  )
}

export function App() {
  const [isDesktop, setIsDesktop] = useState(
    () =>
      typeof window !== "undefined" &&
      window.matchMedia(`(min-width: ${DESKTOP_MIN_WIDTH}px)`).matches
  )

  useEffect(() => {
    const mediaQuery = window.matchMedia(`(min-width: ${DESKTOP_MIN_WIDTH}px)`)
    const handler = (e: MediaQueryListEvent) => setIsDesktop(e.matches)
    mediaQuery.addEventListener("change", handler)
    return () => mediaQuery.removeEventListener("change", handler)
  }, [])

  if (!isDesktop) {
    return <MobileTabletMessage />
  }

  return (
    <BrowserRouter>
      <Toaster />
      <TooltipProvider>
        <WalletContextComponent>
          <TransactionContextComponent>
            <Routes>
              <Route path="/" element={<Home />} />
            </Routes>
          </TransactionContextComponent>
        </WalletContextComponent>
      </TooltipProvider>
    </BrowserRouter>
  )
}

export default App
