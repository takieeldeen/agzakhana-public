import {
  useGetAllActiveBranches,
  useGetAllActiveUsers,
} from "@/app/dashboard-api/valueHelp";
import { RHFComboxbox } from "@/components/rhf-combobox";
import RHFForm from "@/components/rhf-form";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Switch } from "@/components/ui/switch";
import { useLocale, useTranslations } from "next-intl";
import { useForm } from "react-hook-form";

export default function StaffAllocationForm() {
  const methods = useForm();
  const t = useTranslations();
  const locale = useLocale();
  const { data: branches, isLoading: branchesLoading } =
    useGetAllActiveBranches();
  const { data: users, isLoading: usersLoading } = useGetAllActiveUsers();
  const onSubmit = () => {};
  return (
    <Dialog open>
      <DialogContent
        className="bg-white rounded-lg p-3"
        showCloseButton={false}
      >
        <DialogTitle>
          <h3 className="text-xl font-semibold">Employee Allocation</h3>
          <p className="text-base font-normal">
            Enter the required information to allocate the user to branch
          </p>
        </DialogTitle>
        <RHFForm methods={methods} onSubmit={onSubmit}>
          <div className=" flex flex-col">
            <RHFComboxbox
              name="branch"
              placeholder="Branch"
              label="Branch"
              options={branches}
              isLoading={branchesLoading}
              getOptionLabel={(option) =>
                option?.[locale === "ar" ? "nameAr" : "nameEn"] ?? ""
              }
              optionValueComparator={(option, value) =>
                option?._id === value?._id
              }
            />
            <RHFComboxbox
              name="user"
              placeholder="User"
              label="User"
              options={users}
              isLoading={usersLoading}
              getOptionLabel={(option) =>
                option?.[locale === "ar" ? "nameAr" : "nameEn"] ?? ""
              }
              optionValueComparator={(option, value) =>
                option?._id === value?._id
              }
            />
            <div className="flex flex-col gap-1">
              <div className="w-full bg-gray-100 p-2 flex flex-row justify-between rounded-lg items-center h-12">
                <p className="font-semibold">Saturday</p>
                <Switch />
              </div>
            </div>
          </div>
        </RHFForm>
      </DialogContent>
    </Dialog>
  );
}
