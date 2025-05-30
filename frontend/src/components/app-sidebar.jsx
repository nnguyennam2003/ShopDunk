import NavAdminSetting from "@/components/navsetting-admin"
import { Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "@/components/ui/sidebar"
import { LayoutDashboard, LayoutGrid, Settings, Package2, User } from "lucide-react"
import { Link } from "react-router-dom"

const items = [
    {
        title: "Dashboard",
        url: "/admin/dashboard",
        icon: LayoutDashboard,
    },
    {
        title: "Users",
        url: "/admin/users",
        icon: User,
    },
    {
        title: "Products",
        url: "/admin/products",
        icon: Package2,
    },
    {
        title: "Categories",
        url: "/admin/categories",
        icon: LayoutGrid,
    },
    {
        title: "Settings",
        url: "/admin/categories",
        icon: Settings,
    }
]

export function AppSidebar() {
    return (
        <Sidebar>
            <SidebarContent>
                <div className="flex flex-col h-full justify-between pb-2">
                    <SidebarGroup>
                        <SidebarGroupLabel>Admin ShopDunk</SidebarGroupLabel>
                        <SidebarGroupContent>
                            <SidebarMenu>
                                {items.map((item) => (
                                    <SidebarMenuItem key={item.title}>
                                        <SidebarMenuButton asChild>
                                            <Link to={item.url}>
                                                <item.icon />
                                                <span>{item.title}</span>
                                            </Link>
                                        </SidebarMenuButton>
                                    </SidebarMenuItem>
                                ))}
                            </SidebarMenu>
                        </SidebarGroupContent>
                    </SidebarGroup>
                    <NavAdminSetting />
                </div>
            </SidebarContent>

        </Sidebar>
    )
}
