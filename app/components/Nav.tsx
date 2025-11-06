"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";

const navItems = [
  {
    name: "Task 1",
    path: "/",
  },
  {
    name: "Task 2",
    path: "/task2",
  },
  {
    name: "Task 3",
    path: "/task3",
  },
];

const Navigation = () => {
  const pathname = usePathname();

  return (
    <nav className="bg-indigo-100 shadow-lg">
      <ul className="flex gap-8 py-4 px-8">
        {navItems.map((item) => (
          <li
            key={item.path}
            className={`rounded-4xl ${
              pathname === item.path
                ? "bg-indigo-300 text-white"
                : "text-indigo-900 hover:bg-indigo-300 hover:text-white"
            }`}
          >
            <Link href={item.path}>
              <div className="text-center p-2 font-medium">{item.name}</div>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Navigation;
