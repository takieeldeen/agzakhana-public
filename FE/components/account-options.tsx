"use client";
import { CartPopover } from "./cart-popover";
import { ModeToggle } from "./theme-toggle";
// import { WhishlistPopover } from "./whishlist-popover";
import UserOptions from "./user-options";

export default function AccountOptions() {
  return (
    <ul className="md:flex flex-row gap-6 hidden">
      {/* <li className="flex flex-row gap-3 items-end">
        <WhishlistPopover />
      </li> */}

      <li className="flex flex-row gap-3 items-end">
        <ModeToggle />
      </li>
      <li className="flex flex-row gap-3 items-end">
        <CartPopover />
      </li>
      <li className="flex flex-row gap-1 items-end">
        <UserOptions />
      </li>
    </ul>
  );
}
