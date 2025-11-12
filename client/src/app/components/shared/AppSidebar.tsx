import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/app/components/ui/sidebar"
import { useNavigateTo } from "@/hooks/use-navigate"
import { CreditCard, Package, ShoppingBag } from "lucide-react"

const items = [
    // {
    //     title: "Home",
    //     url: "/",
    //     icon: Home,
    // },
    // {
    //     title: "Dashboard",
    //     url: "/dashboard",
    //     icon: Inbox,
    // },
    // {
    //     title: "Feature",
    //     url: "/feature",
    //     icon: Calendar,
    // },
    // {
    //     title: "Container Demo",
    //     url: "/container-demo",
    //     icon: Box,
    // },
    {
        title: "Productos",
        url: "/products",
        icon: Package,
    },
    {
        title: "Pedidos",
        url: "/orders",
        icon: ShoppingBag,
    },
    {
        title: "Pagos",
        url: "/payments",
        icon: CreditCard,
    },
]

export function AppSidebar() {
    const navigate = useNavigateTo()

    return (
        <Sidebar>
            <SidebarHeader />
            <SidebarContent>
                <SidebarGroupLabel>
                    Menu
                </SidebarGroupLabel>
                <SidebarGroupContent>
                    <SidebarMenu>
                        {items.map((item) => (
                            <SidebarMenuItem key={item.title}>
                                <SidebarMenuButton onClick={() => navigate(item.url)}>
                                    <item.icon />
                                    <span>{item.title}</span>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                        ))}
                    </SidebarMenu>
                </SidebarGroupContent>
            </SidebarContent>
            <SidebarFooter />
        </Sidebar>
    )
}