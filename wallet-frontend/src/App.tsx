import { Menu, X } from "lucide-react"
import { useState } from "react"
import { BrowserRouter, Outlet, Route, Routes } from "react-router-dom"
import Sidebar from "./components/sidebar"
import { Toaster } from "./components/ui/sonner"
import { TooltipProvider } from "./components/ui/tooltip"
import TransactionContextComponent from "./context/transaction/TransactionContextComponent"
import WalletContextComponent from "./context/wallet/WalletContextComponent"
import Home from "./pages/home/Home"

function AppLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div className="h-screen flex">
      {/* Desktop Sidebar (always visible) */}
      <div className="hidden md:block md:w-1/6">
        <Sidebar />
      </div>

      {/* Main Content */}
      <main className="h-full w-full md:w-5/6 overflow-scroll">
        <Outlet />
      </main>

      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 md:hidden z-40"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Mobile Sidebar (slides in from left) */}
      <div
        className={`fixed top-0 left-0 h-full w-full z-50 transform transition-transform duration-300 md:hidden ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <Sidebar />
      </div>

      {/* Floating Toggle Button (Mobile only) */}
      <button
        onClick={() => setSidebarOpen(!sidebarOpen)}
        className="fixed bottom-6 right-6 md:hidden z-100 p-3 bg-sidebar-primary text-sidebar-primary-foreground rounded-full shadow-lg hover:shadow-xl transition-shadow"
        aria-label={sidebarOpen ? "Close menu" : "Open menu"}
      >
        {sidebarOpen ? (
          <X className="size-6" />
        ) : (
          <Menu className="size-6" />
        )}
      </button>
    </div>
  )
}

export function App() {
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
