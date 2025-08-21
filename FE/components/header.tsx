import Image from "next/image";
import AccountOptions from "./account-options";
import Link from "next/link";
import SearchBox from "./search-box";

export default async function Header() {
  return (
    <header className="py-2 flex flex-row justify-between items-center border-b-2 border-gray-200">
      <Link href="/">
        <Image
          src="https://ukbahlwracfvnetnxlba.supabase.co/storage/v1/object/public/agzakahan-public-portal/New%20Project%20(1).png"
          height={140}
          width={280}
          alt="Agzakhana"
          priority
        />
      </Link>
      <SearchBox />
      <AccountOptions />
    </header>
  );
}
