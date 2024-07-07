import Link from "next/link";
import { routes } from "@/data/routes";

const SideNav = () => {
  return (
    <div className="bg-orange-300 min-w-24 min-h-svh py-2 flex flex-col items-center">
      <Link href="/">
        <div className="rounded-full bg-white font-semibold size-20 flex items-center justify-center">
          Logo
        </div>
      </Link>
      <nav className="flex gap-2 flex-col items-center mt-40 place-content-center">
        {routes.map((el) => {
          return (
            <Link
              className="bg-gray-300 p-4 size-20 flex items-center justify-center text-center font-medium rounded-md"
              key={el.href}
              href={el.href}
            >
              {el.label}
            </Link>
          );
        })}
      </nav>
    </div>
  );
};

export default SideNav;
