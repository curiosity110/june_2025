"use client";
import { useState, useEffect } from 'react';
import Link from 'next/link';

interface PricingTier {
  name: string;
  description: string;
  price: number;
  period: string;
  features: string[];
  highlighted?: boolean;
  badge?: string;
  cta: string;
  originalPrice?: number;
}

export default function PricingSection() {
  const [timeLeft, setTimeLeft] = useState({
    hours: 23,
    minutes: 59,
    seconds: 59
  });

  // Countdown timer
  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft(prev => {
        let { hours, minutes, seconds } = prev;
        
        if (seconds > 0) {
          seconds--;
        } else if (minutes > 0) {
          minutes--;
          seconds = 59;
        } else if (hours > 0) {
          hours--;
          minutes = 59;
          seconds = 59;
        } else {
          // Reset timer
          hours = 23;
          minutes = 59;
          seconds = 59;
        }
        
        return { hours, minutes, seconds };
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  // Single pricing tier for UBC with MRR
  const pricingTier: PricingTier = {
    name: "Ultimate Branding Course",
    description: "Complete course with Master Resell Rights - Build your digital empire",
    price: 499,
    period: "one-time",
    highlighted: true,
    badge: "MASTER RESELL RIGHTS",
    features: [
      "✅ 419+ Video Lessons (37+ Hours of Training)",
      "✅ Available in 4 Languages (EN, ES, FR, DE)",
      "✅ 100% Master Resell Rights - Keep 100% Profit",
      "✅ Sell for $499 USD (Required Minimum Price)",
      "✅ Private Community Access",
      "✅ Weekly Live Strategy Calls",
      "✅ Done-for-You Sales Funnels",
      "✅ Email Marketing Templates",
      "✅ Lifetime Access & Updates",
      "✅ No Monthly Fees or Upsells",
      "✅ Instant Digital Access",
      "✅ Full Commercial Rights Included"
    ],
    cta: "Get Instant Access - $499"
  };

  const benefits = [
    {
      icon: "💎",
      title: "Master Resell Rights",
      description: "100% profit on every sale"
    },
    {
      icon: "🚀",
      title: "Fixed $499 Price", 
      description: "Required minimum - no discounts"
    },
    {
      icon: "🌍",
      title: "37+ Hours Content",
      description: "419+ professional video lessons"
    },
    {
      icon: "📱",
      title: "4 Languages",
      description: "English, Spanish, French, German"
    }
  ];

  return (
    <section className="section-padding relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-accent/5 to-black/20" />
      
      <div className="container relative z-10">
        {/* Header */}
        <div className="text-center mb-16 animate-slide-up">
          <div className="inline-block glass-strong px-6 py-3 rounded-full mb-6">
            <span className="text-accent font-semibold text-sm uppercase tracking-wider">
              💰 MASTER RESELL RIGHTS
            </span>
          </div>
          <h2 className="text-4xl md:text-6xl font-heading font-black mb-6">
            <span className="text-gradient">ULTIMATE BRANDING</span><br />
            <span className="text-white">COURSE</span>
          </h2>
          <p className="text-xl text-secondary max-w-3xl mx-auto mb-8">
            Get the complete course with full Master Resell Rights. 
            Learn the skills, then sell the course and keep 100% of the profits.
          </p>

          {/* Urgency timer */}
          <div className="glass-strong p-6 rounded-xl max-w-md mx-auto mb-8">
            <div className="text-sm text-accent font-semibold mb-2">⏰ LIMITED TIME OFFER</div>
            <div className="flex justify-center space-x-4 text-2xl font-black">
              <div className="text-center">
                <div className="text-accent">{timeLeft.hours.toString().padStart(2, '0')}</div>
                <div className="text-xs text-secondary">HOURS</div>
              </div>
              <div className="text-white">:</div>
              <div className="text-center">
                <div className="text-accent">{timeLeft.minutes.toString().padStart(2, '0')}</div>
                <div className="text-xs text-secondary">MINS</div>
              </div>
              <div className="text-white">:</div>
              <div className="text-center">
                <div className="text-accent">{timeLeft.seconds.toString().padStart(2, '0')}</div>
                <div className="text-xs text-secondary">SECS</div>
              </div>
            </div>
            <div className="text-sm text-gray-300 mt-2">Get instant access today!</div>
          </div>
        </div>

        {/* Single Pricing Card */}
        <div className="max-w-2xl mx-auto mb-16">
          <div className="glass-card rounded-2xl p-8 relative overflow-hidden ring-2 ring-accent/50 scale-105 animate-scale-in">
            {/* Badge */}
            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
              <div className="bg-gradient-to-r from-accent to-secondary px-6 py-2 rounded-full">
                <span className="text-black font-bold text-sm">{pricingTier.badge}</span>
              </div>
            </div>

            {/* Header */}
            <div className="text-center mb-8 mt-4">
              <h3 className="text-3xl font-bold mb-3 text-gradient">{pricingTier.name}</h3>
              <p className="text-gray-300 text-lg mb-6">{pricingTier.description}</p>
              
              {/* Price */}
              <div className="mb-6">
                <div className="flex items-baseline justify-center">
                  <span className="text-5xl font-black text-accent">${pricingTier.price}</span>
                  <span className="text-gray-400 ml-2">USD {pricingTier.period}</span>
                </div>
                <div className="glass bg-accent/20 px-4 py-2 rounded-full mt-3 inline-block">
                  <span className="text-accent text-sm font-bold">
                    FIXED PRICE - NO DISCOUNTS ALLOWED
                  </span>
                </div>
              </div>
            </div>

            {/* Features */}
            <div className="space-y-3 mb-8">
              {pricingTier.features.map((feature: string, featureIndex: number) => (
                <div key={featureIndex} className="flex items-start space-x-3">
                  <svg className="w-5 h-5 text-accent mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span className="text-gray-300 text-sm">{feature}</span>
                </div>
              ))}
            </div>

            {/* CTA */}
            <Link 
              href="/checkout" 
              className="block w-full text-center py-4 rounded-xl font-bold btn-primary text-xl"
            >
              {pricingTier.cta}
            </Link>

            {/* Money back guarantee */}
            <div className="text-center mt-4">
              <div className="text-xs text-gray-400">
                💎 14-day money-back guarantee
              </div>
            </div>

            {/* Highlight glow */}
            <div className="absolute inset-0 bg-gradient-to-r from-accent/10 to-secondary/10 rounded-2xl -z-10" />
          </div>
        </div>

        {/* Benefits row */}
        <div className="grid md:grid-cols-4 gap-6 mb-16">
          {benefits.map((benefit, index) => (
            <div 
              key={index}
              className={`glass p-6 rounded-xl text-center animate-slide-up delay-${index * 100}`}
            >
              <div className="text-3xl mb-3">{benefit.icon}</div>
              <h4 className="font-bold text-white mb-2">{benefit.title}</h4>
              <p className="text-sm text-gray-400">{benefit.description}</p>
            </div>
          ))}
        </div>

        {/* Money back guarantee */}
        <div className="text-center mb-16 animate-slide-up delay-600">
          <div className="glass-strong p-8 rounded-2xl max-w-2xl mx-auto">
            <div className="text-4xl mb-4">🛡️</div>
            <h3 className="text-2xl font-bold mb-4 text-gradient">
              14-Day Money-Back Guarantee
            </h3>
            <p className="text-gray-300 mb-6">
              We're confident in the Ultimate Branding Course. If you're not satisfied within 14 days, 
              we'll refund your purchase - no questions asked.
            </p>
            <div className="glass px-6 py-3 rounded-full inline-block">
              <span className="text-accent font-semibold">Risk-Free Investment</span>
            </div>
          </div>
        </div>

        {/* MRR Rules */}
        <div className="text-center mb-16">
          <h3 className="text-2xl font-bold mb-6 text-gradient">Master Resell Rights Rules</h3>
          <div className="space-y-4 max-w-3xl mx-auto mb-8">
            <div className="glass p-6 rounded-xl text-left">
              <h4 className="font-bold text-white mb-2">✅ What You CAN Do:</h4>
              <p className="text-gray-300 text-sm">
                • Sell the course for exactly $499 USD (required minimum price)<br/>
                • Keep 100% of every sale you make<br/>
                • Use your own payment processor and branding<br/>
                • Resell to unlimited customers
              </p>
            </div>
            <div className="glass p-6 rounded-xl text-left">
              <h4 className="font-bold text-white mb-2">❌ What You CANNOT Do:</h4>
              <p className="text-gray-300 text-sm">
                • Sell for less than $499 USD<br/>
                • Sell for more than $499 USD<br/>
                • Modify the course content<br/>
                • Give it away for free or as a bonus
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
