import PaymentSuccess from "@/sections/payment-status/views/payment-success";

export default async function PaymentConfirmation({
  params,
}: {
  params: Promise<{ status: string }>;
}) {
  const { status } = await params;
  const SUCCESSFUL = status === "success";
  const FAILED = status === "fail";
  if (SUCCESSFUL) return <PaymentSuccess />;
  return null;
}
