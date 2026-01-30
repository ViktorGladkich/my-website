import { CallToAction } from "@/components/sections/CallToAction";

export default function PortfolioPage() {
  return (
    <div className="min-h-screen bg-black text-white">
      <div className="p-24">
        <h1 className="text-4xl font-bold mb-4">Portfolio</h1>
        <p>Selected works and case studies.</p>
      </div>
      <CallToAction />
    </div>
  );
}
