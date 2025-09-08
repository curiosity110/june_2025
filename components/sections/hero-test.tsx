import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { CheckCircle } from "lucide-react";
import { useState } from "react";
import ebookCover from "@/assets/ebook-cover.jpg";

interface HeroSectionProps {
  onEmailSubmit: (email: string) => void;
}

export const HeroSection = ({ onEmailSubmit }: HeroSectionProps) => {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setIsSubmitting(true);
    // Simulate submission delay
    await new Promise((resolve) => setTimeout(resolve, 1000));
    onEmailSubmit(email);
    setIsSubmitting(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary via-primary/95 to-accent/20 relative overflow-hidden">
      {/* Background Decoration */}
      <div className="absolute inset-0 bg-gradient-to-br from-background/5 to-transparent" />
      <div className="absolute top-20 right-20 w-72 h-72 bg-accent/10 rounded-full blur-3xl" />
      <div className="absolute bottom-20 left-20 w-96 h-96 bg-primary/20 rounded-full blur-3xl" />

      <div className="relative z-10 container mx-auto px-4 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center min-h-[80vh]">
          {/* Left Column - Headlines & Form */}
          <div className="text-white space-y-8">
            <div className="space-y-4">
              <div className="inline-block px-4 py-2 bg-success/20 text-success-foreground rounded-full text-sm font-medium">
                🎯 Free Download Available
              </div>
              <h1 className="text-5xl lg:text-6xl font-bold leading-tight">
                Turn Your{" "}
                <span className="bg-gradient-to-r from-accent to-warning bg-clip-text text-transparent">
                  Social Media
                </span>{" "}
                into a Profit Machine
              </h1>
              <h2 className="text-2xl lg:text-3xl font-semibold text-white/90">
                in 7 Days
              </h2>
              <p className="text-xl text-white/80 leading-relaxed">
                Get instant access to proven strategies that transformed
                ordinary social media accounts into €10K+ monthly income
                streams.
              </p>
            </div>

            {/* Benefits */}
            <div className="space-y-3">
              {[
                "7-day step-by-step action plan",
                "Proven monetization strategies",
                "Real case studies & results",
                "No prior experience needed",
              ].map((benefit, index) => (
                <div key={index} className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-success" />
                  <span className="text-white/90">{benefit}</span>
                </div>
              ))}
            </div>

            {/* Email Form */}
            <Card className="p-6 bg-white/10 backdrop-blur-lg border-white/20">
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-white/90 mb-2"
                  >
                    Enter your email to get instant access:
                  </label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="your@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="bg-white text-gray-900 border-white/30 placeholder:text-gray-500"
                    required
                  />
                </div>
                <Button
                  type="submit"
                  variant="cta"
                  size="xl"
                  className="w-full"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Sending..." : "Get Your Free eBook Now! 📧"}
                </Button>
                <p className="text-xs text-white/70 text-center">
                  No spam. Unsubscribe anytime. Your data is 100% secure.
                </p>
              </form>
            </Card>
          </div>

          {/* Right Column - eBook Mockup */}
          <div className="flex justify-center lg:justify-end">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-accent/30 to-success/30 rounded-lg blur-2xl scale-110" />
              <div className="relative bg-white rounded-lg shadow-2xl p-6 transform rotate-3 hover:rotate-0 transition-transform duration-500">
                <img
                  src={ebookCover}
                  alt="Social Media Profit Machine eBook Cover"
                  className="w-80 h-auto rounded-lg shadow-lg"
                />
                <div className="absolute -top-2 -right-2 bg-warning text-warning-foreground px-3 py-1 rounded-full text-sm font-bold">
                  FREE
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Trust Indicators */}
        <div className="mt-16 text-center text-white/70">
          <p className="mb-4">Trusted by 10,000+ entrepreneurs worldwide</p>
          <div className="flex justify-center items-center gap-8 opacity-60">
            <div className="text-sm">⭐⭐⭐⭐⭐ 4.9/5 Rating</div>
            <div className="text-sm">🔒 100% Secure</div>
            <div className="text-sm">📈 Proven Results</div>
          </div>
        </div>
      </div>
    </div>
  );
};
