import { AboutUsSection } from "@/components/sections/AboutUs";
import { ApproachSection } from "@/components/sections/Approach";
import { Services } from "@/components/sections/Services";
import { Testimonials3D } from "@/components/sections/Testimonials";
import { CallToAction } from "@/components/sections/CallToAction";

export default function ServicesPage() {
  return (
    <div className="min-h-screen bg-black">
      <Services />
      <AboutUsSection />
      <ApproachSection />
      <Testimonials3D />
      <CallToAction />
    </div>
  );
}
