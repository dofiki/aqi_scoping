"use client";
import { useState } from "react";
import HeroSection from "./component/Hero/HeroSection";
import WhyAQIMatters from "./component/Why/WhyAqiMatters";
import HowItHelps from "./component/How/HowitHepls";
import EmailNotificationPreview from "./component/Email/EmailNotificationPreview";
import CTASection from "./component/CTA/CtaSection";

export default function Page() {
  const [query, setQuery] = useState("");

  return (
    <div className="min-h-screen bg-black">
      <main className="w-full">
        <HeroSection query={query} setQuery={setQuery} />
        <div className="max-w-7xl px-4 mx-auto space-y-12 md:space-y-20 pb-24">
          <WhyAQIMatters />
          <HowItHelps />
          <EmailNotificationPreview />
          <CTASection />
        </div>
      </main>
    </div>
  );
}
