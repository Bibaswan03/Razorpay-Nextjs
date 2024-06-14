import Image from "next/image";
import PaymentButton from "./Components/PaymentButton";

export default function Home() {
  return (
    <main className="flex min-h-screen  items-center justify-center p-24">
      <script src="https://checkout.razorpay.com/v1/checkout.js"></script>
      <div>
        <div className=""><PaymentButton/></div>
      </div>
    </main>
  );
}
