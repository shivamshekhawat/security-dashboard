import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Bell, Search, Settings, ChevronDown } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export function Navbar() {
  const navigationItems = [
    { name: "Dashboard", href: "/", active: true },
    { name: "Scenes", href: "/scenes", active: false },
    { name: "Cameras", href: "/cameras", active: false },
    { name: "Incidents", href: "/incidents", active: false },
    
    { name: "Users", href: "/users", active: false },
    
  ]

  return (
    <nav className="bg-white border-b border-gray-200 px-6 py-3 h-16 flex-shrink-0 shadow-sm">
      <div className="flex items-center justify-between h-full max-w-7xl mx-auto w-full">
        {/* Left side - Logo and Navigation */}
        <div className="flex items-center space-x-8">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-yellow-500 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-xl">M</span>
            </div>
            <span className="text-xl font-bold text-gray-900">MANDLACX</span>
          </div>

          {/* Navigation Items */}
          <div className="hidden md:flex items-center space-x-1">
            {navigationItems.map((item) => (
              <Button
                key={item.name}
                variant={item.active ? "default" : "ghost"}
                className={`relative px-4 py-2 text-sm font-medium transition-colors ${
                  item.active
                    ? "bg-blue-600 text-white hover:bg-blue-700"
                    : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                }`}
              >
                {item.name}
                {item.badge && (
                  <Badge className="ml-2 bg-red-500 text-white text-xs px-1.5 py-0.5 min-w-[20px] h-5">
                    {item.badge}
                  </Badge>
                )}
              </Button>
            ))}
          </div>
        </div>

        {/* Right side - Search, Notifications, User */}
        <div className="flex items-center space-x-4">
          {/* Search */}
          <Button variant="ghost" size="icon" className="text-gray-600 hover:text-gray-900">
            <Search className="h-5 w-5" />
          </Button>

          {/* Notifications */}
          <Button variant="ghost" size="icon" className="relative text-gray-600 hover:text-gray-900">
            <Bell className="h-5 w-5" />
            <Badge className="absolute -top-1 -right-1 bg-red-500 text-white text-xs px-1.5 py-0.5 min-w-[18px] h-4">
              3
            </Badge>
          </Button>

          {/* Settings */}
          <Button variant="ghost" size="icon" className="text-gray-600 hover:text-gray-900">
            <Settings className="h-5 w-5" />
          </Button>

          {/* User Profile Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="flex items-center space-x-2 px-3 py-2">
                <img
                  src="/images/user-avatar.png"
                  alt="User Profile"
                  className="w-8 h-8 rounded-full object-cover border-2 border-gray-200"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement
                    target.src =
                      "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzIiIGhlaWdodD0iMzIiIHZpZXdCb3g9IjAgMCAzMiAzMiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGNpcmNsZSBjeD0iMTYiIGN5PSIxNiIgcj0iMTYiIGZpbGw9IiNGM0Y0RjYiLz4KPHN2ZyB4PSI4IiB5PSI4IiB3aWR0aD0iMTYiIGhlaWdodD0iMTYiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTIwIDIxdi0yYTQgNCAwIDAgMC00LTRIOGE0IDQgMCAwIDAtNCA0djIiIHN0cm9rZT0iIzlDQTNBRiIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiLz4KPGNpcmNsZSBjeD0iMTIiIGN5PSI5IiByPSI0IiBzdHJva2U9IiM5Q0EzQUYiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIi8+Cjwvc3ZnPgo8L3N2Zz4K"
                  }}
                />
                <div className="hidden md:block text-left">
                  <div className="text-sm font-medium text-gray-900">SHIVAM </div>
                  <div className="text-xs text-gray-500">Security Operator</div>
                </div>
                <ChevronDown className="h-4 w-4 text-gray-500" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuItem>
                <div className="flex flex-col">
                  <span className="font-medium">John Doe</span>
                  <span className="text-sm text-gray-500">ABC.com</span>
                </div>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Profile Settings</DropdownMenuItem>
              <DropdownMenuItem>Preferences</DropdownMenuItem>
              <DropdownMenuItem>Help & Support</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-red-600">Sign Out</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Mobile Menu Button */}
          <Button variant="ghost" size="icon" className="md:hidden">
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </Button>
        </div>
      </div>

      {/* Mobile Navigation Menu (hidden by default) */}
      <div className="md:hidden border-t border-gray-200 mt-3 pt-3">
        <div className="flex flex-wrap gap-2">
          {navigationItems.map((item) => (
            <Button
              key={item.name}
              variant={item.active ? "default" : "ghost"}
              size="sm"
              className={`relative ${item.active ? "bg-blue-600 text-white" : "text-gray-600 hover:text-gray-900"}`}
            >
              {item.name}
              {item.badge && <Badge className="ml-1 bg-red-500 text-white text-xs px-1 py-0">{item.badge}</Badge>}
            </Button>
          ))}
        </div>
      </div>
    </nav>
  )
}
