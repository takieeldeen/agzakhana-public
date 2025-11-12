"use client";

import { Check, Pin, XIcon } from "lucide-react";
import {
  ControllerRenderProps,
  FieldValues,
  useFormContext,
} from "react-hook-form";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useTranslations } from "next-intl";
import React, { useCallback, useState } from "react";
import { Icon } from "@iconify/react/dist/iconify.js";
import { Marker, Popup, useMapEvents } from "react-leaflet";
import { LatLng, LeafletMouseEvent } from "leaflet";
import { endpoints } from "@/app/dashboard-api/axios";
import { Spinner } from "./ui/spinner";
import { useGetLocationSuggestions } from "@/app/dashboard-api/common";
import { useDebounce } from "@/hooks/use-debounce";
import axios from "axios";
import Map, { MapMarker } from "./map/map";
import {
  Command,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "./ui/command";
import { CommandLoading } from "cmdk";

export type Location = {
  lat: number;
  lng: number;
  country: string | undefined;
  city: string | undefined;
  neighbourhood: string | undefined;
  hamlet: string | undefined;
  houseNumber: string | undefined;
  road: string | undefined;
  displayName: string | undefined;
  googleMapUrl: string;
};
type RHFLocationPickerProps =
  | {
      name: string;
      label?: string;
      placeholder?: string;
      clearable?: boolean;
      reverseGeoCode?: false;
      getLocationLabel?: (location: LatLng) => string;
      onChange?: (location: LatLng | null) => void;
      mandatoryField?: boolean;
    }
  | {
      name: string;
      label?: string;
      placeholder?: string;
      clearable?: boolean;
      reverseGeoCode?: true;
      getLocationLabel?: (location: Location) => string;
      onChange?: (location: Location | null) => void;
      mandatoryField?: boolean;
    };

export function RHFLocationPicker({
  name,
  label,
  placeholder,
  clearable = true,
  reverseGeoCode = false,
  getLocationLabel,
  onChange,
  mandatoryField,
}: RHFLocationPickerProps) {
  const [val, setVal] = useState<[number, number] | null>(null);
  const [zoomLevel, setZoomLevel] = useState<number>(25);
  const [fieldValue, setFieldValue] = useState<string>("");
  const [opened, setOpened] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const form = useFormContext();
  const buttonRef = React.useRef<HTMLButtonElement>(null);
  const t = useTranslations();

  const debouncedSearch = useDebounce(fieldValue);
  const {
    data,
    isLoading: loadingSuggestions,
    bounds,
  } = useGetLocationSuggestions(debouncedSearch);
  const handleLocationClick = useCallback(
    async (
      e: LeafletMouseEvent,
      field: ControllerRenderProps<FieldValues, string>
    ) => {
      try {
        setIsLoading(true);
        const { lat, lng } = e.latlng;
        if (!reverseGeoCode) {
          field.onChange(e.latlng);
          return;
        }
        setOpened(false);
        const { data } = await axios.get(endpoints.common.geocode(lat, lng));

        const locationData = {
          lat,
          lng,
          country: data?.address?.country,
          city: data?.address?.city ?? data?.address?.state,
          neighbourhood: data?.address?.neighbourhood,
          hamlet: data?.address?.hamlet,
          houseNumber: data?.address?.house_number,
          road: data?.address?.road,
          displayName: data?.display_name,
          googleMapUrl: `https://www.google.com/maps?q=${lat},${lng}`,
        };
        field.onChange(locationData);
        onChange?.(locationData as any);
      } catch {
        field.onChange(null);
      } finally {
        setIsLoading(false);
      }
    },
    [onChange, reverseGeoCode]
  );
  return (
    <div className="w-full flex-1">
      <FormField
        control={form.control}
        name={name}
        render={({ field }) => (
          <FormItem className="flex flex-col w-full flex-1">
            {!!label && (
              <FormLabel className="dark:text-gray-200 ">
                {label}
                {mandatoryField && (
                  <span className="font-bold text-red-700">*</span>
                )}
              </FormLabel>
            )}
            <div className="relative w-full  flex-row items-center">
              <Popover
                open={opened}
                onOpenChange={(open) => setOpened(open)}
                modal
              >
                <PopoverTrigger asChild>
                  <FormControl className="">
                    <Button
                      ref={buttonRef}
                      variant="outline"
                      className={cn(
                        "w-full h-12 justify-between rtl:text-right font-normal dark:text-gray-300 bg-transparent overflow-hidden dark:bg-transparent",
                        !field.value && "text-muted-foreground"
                      )}
                    >
                      <span className="flex-1 truncate text-left rtl:text-right">
                        {field?.value
                          ? getLocationLabel?.(field.value) ??
                            Object.values(field?.value)?.join(", ")
                          : placeholder}
                      </span>

                      <div className="flex flex-row items-center gap-3 flex-shrink-0">
                        {isLoading && <Spinner />}
                        <Icon icon="tdesign:location" />
                        {clearable && field.value && (
                          <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            className="h-6 w-6 p-0 text-muted-foreground hover:text-destructive"
                            onClick={(e) => {
                              field.onChange(null);
                              onChange?.(null);
                              e.stopPropagation();
                            }}
                          >
                            <XIcon className="h-4 w-4" />
                          </Button>
                        )}
                      </div>
                    </Button>
                  </FormControl>
                </PopoverTrigger>

                <PopoverContent
                  className="w-full p-0"
                  align="start"
                  style={{ width: buttonRef.current?.offsetWidth }}
                >
                  <div className="p-3 dark:bg-dark-card relative rounded-lg overflow-hidden flex flex-col gap-2">
                    <div className="relative">
                      {/* <Input
                        className="h-12"
                        value={fieldValue}
                        onChange={(e) => {
                          setFieldValue(e.target.value);
                          setZoomLevel(10);
                        }}
                      /> */}
                      {/* Suggestion Container */}
                      <div>
                        <Command className="dark:bg-dark-card">
                          <CommandInput
                            value={fieldValue}
                            placeholder={t(
                              "USERS_MANAGEMENT.LOCATION_PLACEHOLDER"
                            )}
                            className={cn("h-12 ")}
                            onValueChange={(newVal: string) => {
                              setFieldValue(newVal);
                              setZoomLevel(10);
                            }}
                          />
                          <CommandList className="dark:bg-dark-background">
                            {loadingSuggestions && (
                              <CommandLoading className="text-sm py-2 px-2 text-muted-foreground">
                                {t("COMMON.LOADING")}
                              </CommandLoading>
                            )}
                            {/* <CommandEmpty>
                              {t("USERS_MANAGEMENT.LOCATION_NO_RESULTS")}
                            </CommandEmpty> */}
                            <CommandGroup className="max-h-48 overflow-y-auto">
                              {Array.isArray(data) &&
                                data?.length > 0 &&
                                data?.map((suggestion: any) => (
                                  <CommandItem
                                    className="h-12 "
                                    key={JSON.stringify(suggestion)}
                                    value={suggestion?.display_name}
                                    onSelect={() => {
                                      setOpened(false);
                                      setVal([suggestion.lat, suggestion.lon]);
                                      handleLocationClick(
                                        {
                                          latlng: new LatLng(
                                            suggestion.lat,
                                            suggestion.lon
                                          ),
                                        } as any,
                                        field
                                      );
                                    }}
                                  >
                                    <Pin
                                      className={cn(
                                        val?.[0] === suggestion?.lat &&
                                          val?.[1] === suggestion?.lon &&
                                          "text-emerald-600"
                                      )}
                                    />
                                    <p className="">
                                      {suggestion?.display_name}
                                    </p>

                                    <Check
                                      className={cn(
                                        "ml-auto rtl:mr-auto rtl:ml-0 ",
                                        val?.[0] === suggestion?.lat &&
                                          val?.[1] === suggestion?.lon
                                          ? "opacity-100 text-emerald-600"
                                          : "opacity-0"
                                      )}
                                    />
                                  </CommandItem>
                                ))}
                            </CommandGroup>
                          </CommandList>
                        </Command>
                      </div>
                    </div>

                    <div className="flex flex-row gap-2 h-64">
                      <div className="rounded-lg overflow-hidden flex-1 h-full">
                        <Map
                          bounds={[
                            [bounds.minLat, bounds.minLng], // southwest corner
                            [bounds.maxLat, bounds.maxLng], // northeast corner
                          ]}
                          boundsOptions={{ padding: [50, 50] }}
                          center={
                            field?.value?.lat && field?.value?.lng
                              ? [field?.value?.lat, field?.value?.lng]
                              : [30.0444762, 31.2357545]
                          }
                          zoom={zoomLevel}
                          style={{ height: "100%", width: "100%" }}
                        >
                          <LocationMarker
                            field={field}
                            onClick={handleLocationClick}
                          />
                          {Array.isArray(data) &&
                            data?.map((suggestion: any) => (
                              <MapMarker
                                key={suggestion?.lat}
                                position={[suggestion?.lat, suggestion?.lon]}
                              >
                                <Popup>You are here</Popup>
                              </MapMarker>
                            ))}
                        </Map>
                      </div>
                    </div>
                  </div>
                </PopoverContent>
              </Popover>
            </div>

            <div className="min-h-4">
              <FormMessage />
            </div>
          </FormItem>
        )}
      />
    </div>
  );
}

function LocationMarker({
  field,
  onClick,
}: {
  field: ControllerRenderProps<FieldValues, string>;
  onClick: (
    e: LeafletMouseEvent,
    field: ControllerRenderProps<FieldValues, string>
  ) => void;
}) {
  // const [position, setPosition] = useState<LatLng | null>(null);
  const position = field?.value ?? null;
  const map = useMapEvents({
    click(e) {
      map.locate();
      // field.onChange(e.latlng);
      map.flyTo(e.latlng, map.getZoom());
      onClick(e, field);
    },

    // locationfound(e) {
    //   setPosition(e.latlng);
    //   map.flyTo(e.latlng, map.getZoom());
    // },
  });

  return position === null ? null : (
    <Marker position={position}>
      <Popup>You are here</Popup>
    </Marker>
  );
}
