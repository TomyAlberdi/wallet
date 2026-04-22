import { CircleDollarSign } from "lucide-react"
import { Link } from "react-router-dom"
import { Button } from "./ui/button"

const Sidebar = () => {
  return (
    <nav className="h-full w-1/5 border-r p-2 bg-black flex flex-col">
      <Link
        to="/"
        className="flex w-full items-center hover:bg-sidebar p-2 gap-3"
      >
        <div className="flex aspect-square size-8 items-center justify-center rounded-xs bg-sidebar-primary text-sidebar-primary-foreground">
          <CircleDollarSign className="size-5" color="black" />
        </div>
        <div>
          <span className="truncate text-sm">Wallet</span>
        </div>
      </Link>
      <section className="mt-auto flex flex-col gap-3 border border-red-500">
        <Button>
          Crear wallet
        </Button>
        <Button>
          Crear transacción
        </Button>
      </section>
    </nav>
  )
}
export default Sidebar
