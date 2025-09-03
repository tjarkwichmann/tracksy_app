"use client";
import { UserGroupIcon, HomeIcon, UserIcon, BoltIcon } from "@heroicons/react/24/outline";
import {
    UserGroupIcon as UserGroupSolidIcon,
    HomeIcon as HomeIconSolid,
    UserIcon as UserIconSolid,
    BoltIcon as BoltIconSolid,
} from "@heroicons/react/24/solid";

import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";

const links = [
    { name: "Home", href: "/dashboard", icon: HomeIcon, solidIcon: HomeIconSolid },
    {
        name: "Community",
        href: "/community",
        icon: UserGroupIcon,
        solidIcon: UserGroupSolidIcon,
    },
    { name: "Activity", href: "/activity", icon: BoltIcon, solidIcon: BoltIconSolid },
    { name: "Profile", href: "/profile", icon: UserIcon, solidIcon: UserIconSolid },
];

export default function NavLinks() {
    const pathname = usePathname();
    return (
        <>
            {links.map((link) => {
                const isActive = pathname === link.href || pathname.startsWith(link.href + "/");
                const LinkIcon = isActive ? link.solidIcon : link.icon;
                return (
                    <Link
                        key={link.name}
                        href={link.href}
                        className={clsx(
                            "flex w-full flex-col  grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-sky-50 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3"
                        )}>
                        <LinkIcon className="w-6" />
                        <p className="block">{link.name}</p>
                    </Link>
                );
            })}
        </>
    );
}
