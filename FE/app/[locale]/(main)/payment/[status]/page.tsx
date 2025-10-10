import { getOrderDetails } from "@/client-api/orders";
import ErrorHandler from "@/components/error-handler";
import PaymentSuccess from "@/sections/payment-status/views/payment-success";

export default async function PaymentConfirmation({
  params,
  searchParams,
}: {
  params: Promise<{ status: string }>;
  searchParams: Promise<{ session: string }>;
}) {
  const { session } = await searchParams;
  const { order, error } = await getOrderDetails(session);
  const { status } = await params;
  const SUCCESSFUL = status === "success";
  if (SUCCESSFUL)
    return (
      <ErrorHandler error={error}>
        <PaymentSuccess order={order as any} />
      </ErrorHandler>
    );
  return null;
}
