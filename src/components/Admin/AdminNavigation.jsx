import { useState } from "react";
import {
  Home,
  Package,
  Users,
  UserCheck,
  Briefcase,
  Settings,
  Menu,
  X,
  BarChart3,
  Bell,
  LogOut,
} from "lucide-react";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { cn } from "../../Store/utils";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../../Store/auth";

const navigationItems = [
  { href: "/admin", icon: Home, label: "Dashboard", badge: null },
  { href: "/admin/orders", icon: Package, label: "Orders", badge: "12" },
  { href: "/admin/users", icon: Users, label: "Users", badge: null },
  { href: "/admin/beauticians", icon: UserCheck, label: "Beauticians", badge: null },
  { href: "/admin/services", icon: Briefcase, label: "Services", badge: null },
  { href: "/admin/analytics", icon: BarChart3, label: "Analytics", badge: null },
  { href: "/admin/settings", icon: Settings, label: "Settings", badge: null },
];

export function AdminNavigation() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const { user } = useAuth();


  return (
    <>
      {/* Mobile Header */}
      <div className="lg:hidden bg-white/90 backdrop-blur-sm border-b border-amber-200 sticky top-0 z-50">
        <div className="flex items-center justify-between p-4">
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-amber-800 hover:bg-amber-100"
            >
              {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
            <h1 className="text-xl font-bold text-amber-900">Luxe Admin</h1>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" className="text-amber-800 hover:bg-amber-100 relative">
              <Bell className="h-5 w-5" />
              <Badge className="absolute -top-1 -right-1 h-4 w-4 p-0 bg-red-500 text-white text-xs">3</Badge>
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 z-40 bg-black/50" onClick={() => setIsMobileMenuOpen(false)} />
      )}

      {/* Sidebar */}
      <div
        className={cn(
          "fixed top-0 left-0 z-50 h-full w-64 bg-gradient-to-b from-white/95 to-amber-50/95 backdrop-blur-sm border-r border-amber-200 transform transition-transform duration-300 ease-in-out",
          isMobileMenuOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        )}
      >
        {/* Logo */}
        <div className="p-6 border-b border-amber-200">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-amber-400 to-amber-600 rounded-xl flex items-center justify-center">
              <span className="text-white font-bold text-lg">L</span>
            </div>
            <div>
              <h2 className="text-xl font-bold text-amber-900">Luxe Admin</h2>
              <p className="text-xs text-amber-700">Salon Management</p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="p-4 space-y-2">
          {navigationItems.map(({ href, icon: Icon, label, badge }) => {
            const isActive = location.pathname === href; // ✅ location.pathname
            return (
              <Link
                key={href}
                to={href}
                onClick={() => setIsMobileMenuOpen(false)}
                className={cn(
                  "flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200",
                  isActive
                    ? "bg-gradient-to-r from-amber-100 to-amber-50 text-amber-900 shadow-sm border border-amber-200"
                    : "text-amber-700 hover:bg-amber-50 hover:text-amber-900"
                )}
              >
                <Icon className="h-5 w-5" />
                <span className="font-medium">{label}</span>
                {badge && <Badge className="ml-auto bg-amber-600 text-white text-xs">{badge}</Badge>}
              </Link>
            );
          })}
        </nav>

        {/* User Profile */}
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-amber-200">
          <div className="flex items-center gap-3 p-3 bg-amber-50 rounded-xl">
            {/* User Initials */}
            <div className="w-10 h-10 bg-gradient-to-br from-amber-400 to-amber-600 rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-sm">
                {user.username
                  ?.split(" ")
                  .map(word => word[0])
                  .join("")
                  .toUpperCase()
                  .slice(0, 2)}
              </span>
            </div>

            {/* User Info */}
            <div className="flex-1 overflow-hidden">
              <p className="font-medium text-amber-900 truncate">{user.username}</p>
              <p className="text-xs text-amber-700 truncate">
                {user.email?.length > 22 ? user.email.slice(0, 22) + "..." : user.email}
              </p>
            </div>

            {/* Logout Button */}
            {/* <Button variant="ghost" size="icon" className="text-amber-600 hover:bg-amber-100"> */}
              <Link to="/contact/logout"><LogOut className="h-4 w-4 text-amber-700" /></Link>
            {/* </Button> */}
          </div>
        </div>

      </div>
    </>
  );
}
