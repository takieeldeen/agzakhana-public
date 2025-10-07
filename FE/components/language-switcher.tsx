import { Icon } from "@iconify/react/dist/iconify.js";
import { Button } from "./ui/button";

export default function LanguageSwitcher() {
  return (
    <Button className="bg-gray-200 text-primary">
      <Icon icon="tabler:badge-ar" className="h-6! w-6!" />
    </Button>
  );
}
