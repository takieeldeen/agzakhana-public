import AccountOptions from "./account-options";
// import SearchBox from "./search-box";
import Logo from "./logo";

export default async function Header() {
  return (
    <header className="py-2 flex flex-row justify-between items-center border-b-2 border-gray-200 dark:border-gray-600 px-8">
      <Logo />
      {/* <SearchBox /> */}
      <AccountOptions />
    </header>
  );
}
