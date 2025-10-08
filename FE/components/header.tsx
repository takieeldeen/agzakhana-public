import { Icon } from "@iconify/react/dist/iconify.js";
import AccountOptions from "./account-options";
// import SearchBox from "./search-box";
import Logo from "./logo";
import { Button } from "./ui/button";
import { DrawerTrigger } from "./ui/drawer";
import LanguageSwitcher from "./language-switcher";
import { ModeToggle } from "./theme-toggle";

export default async function Header() {
  return (
    <header className="py-2 flex flex-row justify-between items-center border-b-2 border-gray-200 dark:border-gray-600 px-8">
      <DrawerTrigger asChild>
        <Button className="h-12 w-12 aspect-square bg-gray-200 text-gray-600 dark:bg-card-background-dark dark:text-gray-200 block md:hidden">
          <Icon icon="mingcute:menu-fill" className="h-6! w-6!" />
        </Button>
      </DrawerTrigger>
      <Logo />
      {/* <SearchBox /> */}
      <ul className="flex flex-row gap-6">
        <li className="flex flex-row gap-3 items-end">
          <LanguageSwitcher />
        </li>

        <li className="hidden md:flex flex-row gap-3 items-end">
          <ModeToggle />
        </li>
        <AccountOptions />
      </ul>
    </header>
  );
}
