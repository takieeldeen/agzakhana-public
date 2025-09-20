"use client";
import { CartPopover } from "./cart-popover";
// import { WhishlistPopover } from "./whishlist-popover";
import UserOptions from "./user-options";

export default function AccountOptions() {
  return (
    <ul className="flex flex-row gap-6 ">
      {/* <li className="flex flex-row gap-3 items-end">
        <WhishlistPopover />
      </li> */}

      <li className="flex flex-row gap-3 items-end">
        <CartPopover />
      </li>
      <li className="flex flex-row gap-1 items-end">
        <UserOptions />
      </li>
    </ul>
  );
}
