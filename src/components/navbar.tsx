import { Button } from "@/components/ui/button"
import {
    NavigationMenu, NavigationMenuItem, NavigationMenuLink, NavigationMenuList
} from "@/components/ui/navigation-menu"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { ModeToggle } from "./mode-toggle"
import profileImage from "@/assets/k.png"
import { HomeIcon, UserIcon } from "lucide-react"
import { FloatingDock } from "./ui/floating-dock"
import { useAppStore } from "@/store/appStore";
import { memo, useMemo } from "react"

const Component = memo(() => {
    const dockItems = useMemo(() => [
        { title: "Home", icon: <HomeIcon size={20} />, href: "/" },
        { title: "Profile", icon: <UserIcon size={20} />, href: "/profile" },
    ], [])
    
    // Optimized selectors
    const tip = useAppStore((state) => state.tip)
    const setRoute = useAppStore((state) => state.setRoute)
    const setFinalTip = useAppStore((state) => state.setFinalTip)
    
    const handleRandomTip = () => {
        const randomTip = Math.floor(Math.random() * (300 - 20 + 1)) + 20;
        setFinalTip(randomTip, true);
    };

    const handleNavigation = (route: 'home' | 'profile') => {
        setRoute(route);
    };

    return (
        <header className=" px-4 md:px-6">
            <div className="flex h-24 items-center justify-between gap-4">
                {/* Left side */}
                <div className="flex flex-1 items-center gap-2">
                    {/* the logo */}
                    <img
                        src={profileImage}
                        alt="Profile"
                        className="w-8 h-8 object-cover max-md:sr-only"
                    />
                    {/* Mobile menu trigger */}
                    <Popover>
                        <PopoverTrigger asChild>
                            <Button
                                className="group size-8 sm:hidden"
                                variant="ghost"
                                size="icon"
                            >
                                <svg
                                    className="pointer-events-none"
                                    width={16}
                                    height={16}
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        d="M4 12L20 12"
                                        className="origin-center -translate-y-[7px] transition-all duration-300 ease-[cubic-bezier(.5,.85,.25,1.1)] group-aria-expanded:translate-x-0 group-aria-expanded:translate-y-0 group-aria-expanded:rotate-[315deg]"
                                    />
                                    <path
                                        d="M4 12H20"
                                        className="origin-center transition-all duration-300 ease-[cubic-bezier(.5,.85,.25,1.8)] group-aria-expanded:rotate-45"
                                    />
                                    <path
                                        d="M4 12H20"
                                        className="origin-center translate-y-[7px] transition-all duration-300 ease-[cubic-bezier(.5,.85,.25,1.1)] group-aria-expanded:translate-y-0 group-aria-expanded:rotate-[135deg]"
                                    />
                                </svg>
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent align="start" className="w-48 p-1 md:hidden">
                            <NavigationMenu className="max-w-none *:w-full">
                                <NavigationMenuList className="flex-col items-start gap-0 md:gap-2">
                                    {dockItems.map((item, index) => {
                                        return (
                                            <NavigationMenuItem key={index} className="w-full">
                                                <NavigationMenuLink
                                                    onClick={() => handleNavigation(item.title.toLowerCase() as 'home' | 'profile')}
                                                    className="flex-row items-center gap-2 py-1.5 cursor-pointer"
                                                >
                                                    {item.icon}
                                                    <span>{item.title}</span>
                                                </NavigationMenuLink>
                                            </NavigationMenuItem>
                                        )
                                    })}
                                </NavigationMenuList>
                            </NavigationMenu>
                        </PopoverContent>
                    </Popover>
                </div>
                {/* Middle area */}
                <FloatingDock
                    items={dockItems}
                    desktopClassName=""
                    mobileClassName="max-md:sr-only"
                    onItemClick={(title) => handleNavigation(title.toLowerCase() as 'home' | 'profile')}
                />
                {/* Right side */}
                <div className="flex flex-1 items-center justify-end gap-4">
                    <Button
                        onClick={handleRandomTip}
                        variant="gradient"
                        size="sm"
                    >
                        {tip.isRandom && tip.finalTip ? `${tip.finalTip} ETB` : "Random Tip"}
                    </Button>
                    <ModeToggle />
                </div>
            </div>
        </header>
    )
})

Component.displayName = 'Navbar'

export default Component