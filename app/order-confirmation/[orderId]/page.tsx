import Link from "next/link";
import { CheckCircle2, PackageCheck, Truck, ArrowRight } from "lucide-react";

interface Props {
  params: Promise<{ orderId: string }>;
}

export default async function OrderConfirmationPage({ params }: Props) {
  const { orderId } = await params;

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-16 text-center space-y-8">
      {/* Success Badge */}
      <div className="w-20 h-20 mx-auto rounded-full bg-green-950/60 border-2 border-green-500 flex items-center justify-center text-green-400 shadow-[0_0_20px_rgba(34,197,94,0.3)]">
        <CheckCircle2 className="w-10 h-10" />
      </div>

      <div className="space-y-2">
        <span className="text-xs font-black uppercase tracking-widest text-red-500">
          Order Confirmed
        </span>
        <h1 className="text-3xl sm:text-4xl font-black text-white uppercase tracking-wider">
          Thank You For Your Order!
        </h1>
        <p className="text-zinc-400 text-sm font-bold uppercase tracking-wider">
          Order #{orderId}
        </p>
      </div>

      {/* Status Box */}
      <div className="p-6 bg-zinc-950 border border-zinc-800 text-left space-y-4">
        <div className="flex items-start gap-4">
          <Truck className="w-6 h-6 text-red-500 flex-shrink-0 mt-1" />
          <div>
            <h3 className="font-bold text-white text-sm uppercase tracking-wide">
              Shipping &amp; Processing
            </h3>
            <p className="text-xs text-zinc-400 mt-1 leading-relaxed">
              Your order is currently being prepped at our Los Angeles facility. Orders are shipped within 1–7 business days. You will receive an email tracking confirmation as soon as your package ships.
            </p>
          </div>
        </div>

        <div className="flex items-start gap-4 pt-4 border-t border-zinc-900">
          <PackageCheck className="w-6 h-6 text-green-400 flex-shrink-0 mt-1" />
          <div>
            <h3 className="font-bold text-white text-sm uppercase tracking-wide">
              Fastlane Guarantee
            </h3>
            <p className="text-xs text-zinc-400 mt-1 leading-relaxed">
              Every mini bike, roller chassis, and performance part is inspected for race-ready fitment and quality before dispatch.
            </p>
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
        <Link
          href="/collections/all"
          className="btn-fastlane-primary inline-flex items-center gap-2"
        >
          <span>Continue Shopping</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
        <Link
          href="/"
          className="btn-fastlane-secondary inline-flex items-center gap-2"
        >
          <span>Return to Home</span>
        </Link>
      </div>
    </div>
  );
}
