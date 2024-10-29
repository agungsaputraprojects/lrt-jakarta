import { Suspense } from "react";
import TopUpAmountClient from "./TopUpAmountClient";

export default function TopUpAmountPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <TopUpAmountClient />
    </Suspense>
  );
}
