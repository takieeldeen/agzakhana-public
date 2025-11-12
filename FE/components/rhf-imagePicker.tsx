import { useFormContext } from "react-hook-form";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Input } from "./ui/input";
import { ChangeEvent, useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "./ui/button";
import { Icon } from "@iconify/react/dist/iconify.js";
import Image from "next/image";

function getImageData(event: ChangeEvent<HTMLInputElement>) {
  // FileList is immutable, so we need to create a new one
  const dataTransfer = new DataTransfer();

  // Add newly uploaded images
  Array.from(event.target.files!).forEach((image) =>
    dataTransfer.items.add(image)
  );

  const files = dataTransfer.files;
  const displayUrl = URL.createObjectURL(event.target.files![0]);
  return { files, displayUrl };
}

type ImagePickerProps = {
  name: string;
  label?: string;
};
export default function RHFImagePicker({ name, label }: ImagePickerProps) {
  const form = useFormContext();
  const {
    watch,
    // formState: { defaultValues },
  } = form;
  const defaultValue = watch()?.[name];
  const [preview, setPreview] = useState(defaultValue);
  const hasImage = !!preview && preview !== "";
  // useEffect(() => {
  //   console.log(value);
  //   setPreview(value);
  // }, [value]);
  return (
    <div className="flex flex-col items-center relative gap-2 w-fit mx-auto">
      <FormField
        control={form.control}
        name={name}
        render={({ field: { onChange, value, ...rest } }) => {
          console.log(value, preview);
          return (
            <>
              <FormItem>
                <FormLabel className="cursor-pointer">
                  {hasImage && (
                    <div className="w-48 h-48 rounded-full relative overflow-hidden">
                      <Image
                        key={defaultValue}
                        src={preview}
                        alt={preview}
                        fill
                        className="object-fill"
                      />
                    </div>
                  )}
                  {!hasImage && (
                    <div className="w-48 h-48 rounded-full flex items-center justify-center bg-gray-200 dark:bg-dark-background">
                      <Icon
                        icon="solar:user-outline"
                        className="h-36 w-36 text-gray-400 dark:text-dark-card"
                      />
                    </div>
                  )}
                  {/* <Avatar className="w-48 h-48 ">
                    <AvatarImage src={preview} />

                    <AvatarFallback>
                      <Icon
                        icon="solar:user-outline"
                        className="h-36 w-36 text-gray-400"
                      />
                    </AvatarFallback>
                  </Avatar> */}
                </FormLabel>
                <Button
                  type="button"
                  className={cn(
                    "absolute top-3 right-3 w-8! h-8! rounded-full aspect-square p-0! bg-indigo-600 text-white hidden items-center justify-center cursor-pointer border-3 hover:brightness-90 transition-all duration-300 border-white dark:border-card-background-dark",
                    hasImage && "flex"
                  )}
                  onClick={() => {
                    onChange(null);
                    setPreview("");
                  }}
                >
                  <Icon icon={"mynaui:trash"} className={cn("h-6! w-6!")} />
                </Button>
                <FormLabel className="text-center flex items-center justify-center dark:text-gray-200">
                  {label}
                </FormLabel>
                <FormControl>
                  <Input
                    type="file"
                    accept="image/*"
                    {...rest}
                    onChange={(event) => {
                      const { files, displayUrl } = getImageData(event);
                      setPreview(displayUrl);
                      onChange(files);
                    }}
                    className={cn("hidden")}
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            </>
          );
        }}
      />
    </div>
  );
}
