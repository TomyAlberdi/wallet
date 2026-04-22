import { useEffect, useState } from "react"
import { BrowserRouter, Outlet, Route, Routes } from "react-router-dom"
import Sidebar from "./components/sidebar"
import { Toaster } from "./components/ui/sonner"
import { TooltipProvider } from "./components/ui/tooltip"
import TransactionContextComponent from "./context/transaction/TransactionContextComponent"
import WalletContextComponent from "./context/wallet/WalletContextComponent"
import Home from "./pages/home/Home"

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

function AppLayout() {
  return (
    <div className="h-screen flex">
      <Sidebar />
      <main className="h-full w-4/5 overflow-scroll">
        <Outlet />
      </main>
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
              <Route element={<AppLayout />}>
                <Route path="/" element={<Home />} />
              </Route>
            </Routes>
          </TransactionContextComponent>
        </WalletContextComponent>
      </TooltipProvider>
    </BrowserRouter>
  )
}

export default App
