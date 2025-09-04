import { HeartIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { NavigationMenu, NavigationMenuItem, NavigationMenuLink, NavigationMenuList
} from "@/components/ui/navigation-menu"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { ModeToggle } from "./mode-toggle"
import profileImage from "@/assets/k.png"
import { HomeIcon, UserIcon, SettingsIcon } from "lucide-react"
import { FloatingDock } from "./ui/floating-dock"

export default function Component() {
    const dockItems = [
        { title: "Home", icon: <HomeIcon size={20} />, href: "/" },
        { title: "Profile", icon: <UserIcon size={20} />, href: "/profile" },
        { title: "Settings", icon: <SettingsIcon size={20} />, href: "/settings" },
    ]
    return (
        <header className="border-b px-4 md:px-6">
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
                                className="group size-8 md:hidden"
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
                                                    href={item.href}
                                                    className="flex-row items-center gap-2 py-1.5"
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
                />
                {/* Right side */}
                <div className="flex flex-1 items-center justify-end gap-4">
                    <Button size="sm" className="text-sm max-sm:aspect-square max-sm:p-0">
                        <HeartIcon
                            className="opacity-60 sm:-ms-1"
                            size={16}
                            aria-hidden="true"
                        />
                        <span className="max-sm:sr-only">Tip Me</span>
                    </Button>
                    <ModeToggle />
                </div>
            </div>
        </header>
    )
}