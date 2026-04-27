import { CircleDollarSign } from "lucide-react"
import { Link } from "react-router-dom"

const Sidebar = () => {
  return (
    <nav className="h-full w-full border-r p-2 bg-black flex flex-col">
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
      <section className="border border-red-500 mt-2">
        links
      </section>
    </nav>
  )
}
export default Sidebar
