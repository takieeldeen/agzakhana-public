"use client";

import { XIcon } from "lucide-react";
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
import {
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  useMapEvents,
} from "react-leaflet";
import { LatLng, LeafletMouseEvent } from "leaflet";
import { endpoints } from "@/app/dashboard-api/axios";
import { Spinner } from "./ui/spinner";
import { Input } from "./ui/input";
import { useGetLocationSuggestions } from "@/app/dashboard-api/common";
import { useDebounce } from "@/hooks/use-debounce";
import EllipsisTypography from "./ellipsis-typography";
import axios from "axios";

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
  const [zoomLevel, setZoomLevel] = useState<number>(25);
  const [fieldValue, setFieldValue] = useState<string>("");
  const [opened, setOpened] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const form = useFormContext();
  const buttonRef = React.useRef<HTMLButtonElement>(null);
  const t = useTranslations();
  const showSuggestions = fieldValue.length > 0 && opened;

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
                        "w-full h-12 text-left justify-between rtl:text-right  font-normal dark:text-gray-300 ",
                        !field.value && "text-muted-foreground",
                        "bg-transparent!"
                      )}
                    >
                      {field?.value
                        ? getLocationLabel?.(field.value) ??
                          Object.values(field?.value)?.join(", ")
                        : placeholder}
                      <div className="flex flex-row items-center gap-3">
                        {isLoading && <Spinner />}

                        <Icon icon="tdesign:location" />
                        {clearable && field.value && (
                          <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            className=" h-6 w-6 p-0 text-muted-foreground hover:text-destructive "
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
                      <Input
                        className="h-12"
                        value={fieldValue}
                        onChange={(e) => {
                          setFieldValue(e.target.value);
                          setZoomLevel(10);
                        }}
                      />
                    </div>

                    <div className="flex flex-row gap-2 h-64">
                      <div className="flex-1 h-full rounded-lg overflow-hidden">
                        {!showSuggestions && (
                          <p className="text-gray-400">
                            {t("USERS_MANAGEMENT.LOCATION_PLACEHOLDER")}
                          </p>
                        )}
                        {showSuggestions && data?.length === 0 && (
                          <p className="text-gray-400">
                            {t("USERS_MANAGEMENT.LOCATION_NO_RESULTS")}
                          </p>
                        )}
                        {showSuggestions && (
                          <ul className="min-h-36 overflow-y-auto flex flex-col w-full h-full">
                            {loadingSuggestions && (
                              <div className="flex items-center justify-center h-full w-full">
                                <Spinner className="h-24 w-24 text-emerald-600" />
                              </div>
                            )}

                            {!loadingSuggestions &&
                              Array.isArray(data) &&
                              data?.map((suggestion: any) => (
                                <li
                                  onClick={() => {
                                    setOpened(false);
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
                                  key={suggestion?.display_name}
                                  className="text-sm h-12 flex flex-row gap-2 items-center shrink-0  border-b-2 border-gray-100 cursor-pointer hover:bg-gray-200 transition-all duration-300"
                                >
                                  <Icon
                                    icon="weui:location-outlined"
                                    className="h-8 w-8 text-emerald-600"
                                  />
                                  <EllipsisTypography className="max-w-[90%]">
                                    {suggestion?.display_name}
                                  </EllipsisTypography>
                                </li>
                              ))}
                          </ul>
                        )}
                      </div>
                      <div className="rounded-lg overflow-hidden flex-1 h-full">
                        <MapContainer
                          key={JSON.stringify(bounds)}
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
                          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                          {Array.isArray(data) &&
                            data?.map((suggestion: any) => (
                              <Marker
                                key={suggestion?.lat}
                                position={[suggestion?.lat, suggestion?.lon]}
                              >
                                <Popup>You are here</Popup>
                              </Marker>
                            ))}
                          <LocationMarker
                            field={field}
                            onClick={handleLocationClick}
                          />
                        </MapContainer>
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
