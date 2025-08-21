import { APIListResponse } from "@/types/common";

export const MANUFACTURER_LIST: APIListResponse<string> = {
  status: "success",
  results: 5,
  content: ["GSK", "phizer", "Delta Pharma", "Novartis", "Amoun"],
};
