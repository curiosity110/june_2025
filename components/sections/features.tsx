"use client";
import { useState } from 'react';

interface Feature {
  icon: string;
  title: string;
  description: string;
  benefits: string[];
}

export default function FeaturesSection() {
  const [hoveredFeature, setHoveredFeature] = useState<number | null>(null);

  const features: Feature[] = [
    {
      icon: '🎓',
      title: 'LEARN VITAL LIFE LESSONS',
      description: 'World-class custom built learning application',
      benefits: [
        'Scale from Zero to $10k/month as fast as possible',
        'Master the skills you need to maximise your income',
        'Access to 100+ video courses and tutorials'
      ]
    },
    {
      icon: '🤝',
      title: 'JOIN A PRIVATE NETWORK',
      description: 'Celebrate your wins with people who understand',
      benefits: [
        'Make like-minded friends on your journey',
        'Network with 113,000+ people',
        'Exclusive community chat groups'
      ]
    },
    {
      icon: '💎',
      title: 'ACCESS TO MULTIMILLIONAIRES',
      description: 'Mentors are hyper-successful experts in their field',
      benefits: [
        'Get mentored every step of your journey',
        '1-on-1 advice from industry experts',
        'Daily live sessions with millionaire coaches'
      ]
    }
  ];

  return (
    <section className="section-padding relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-accent/10 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-accent/5 rounded-full blur-3xl animate-float delay-300" />
      </div>

      <div className="container relative z-10">
        {/* Section header */}
        <div className="text-center mb-20 animate-slide-up">
          <div className="inline-block glass-strong px-6 py-3 rounded-full mb-6">
            <span className="text-accent font-semibold text-sm uppercase tracking-wider">
              ✨ A MASSIVE UPGRADE
            </span>
          </div>
          <h2 className="text-4xl md:text-6xl font-heading font-black mb-6 text-gradient">
            WHAT YOU GET ACCESS TO
          </h2>
          <p className="text-xl text-secondary max-w-3xl mx-auto">
            The modern education system is designed to make you poor. 
            Imagine you could get access to multi-millionaire mentors who will give you a 
            step-by-step path to reach your goals as fast as possible…
          </p>
        </div>

        {/* Features grid */}
        <div className="grid lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className={`glass-card p-8 rounded-2xl cursor-pointer group animate-scale-in delay-${(index + 1) * 200}`}
              onMouseEnter={() => setHoveredFeature(index)}
              onMouseLeave={() => setHoveredFeature(null)}
            >
              {/* Icon */}
              <div className="text-6xl mb-6 transform group-hover:scale-110 transition-transform duration-300">
                {feature.icon}
              </div>

              {/* Title */}
              <h3 className="text-2xl font-bold mb-4 text-gradient">
                {feature.title}
              </h3>

              {/* Description */}
              <p className="text-lg text-secondary mb-6 font-medium">
                {feature.description}
              </p>

              {/* Benefits list */}
              <ul className="space-y-3">
                {feature.benefits.map((benefit, benefitIndex) => (
                  <li 
                    key={benefitIndex}
                    className="flex items-start space-x-3 text-sm"
                  >
                    <div className="w-2 h-2 bg-accent rounded-full mt-2 flex-shrink-0" />
                    <span className="text-gray-300">{benefit}</span>
                  </li>
                ))}
              </ul>

              {/* Hover effect overlay */}
              <div 
                className={`absolute inset-0 bg-accent/5 rounded-2xl transition-opacity duration-300 ${
                  hoveredFeature === index ? 'opacity-100' : 'opacity-0'
                }`}
              />
            </div>
          ))}
        </div>

        {/* Call to action */}
        <div className="text-center mt-16 animate-slide-up delay-800">
          <div className="glass-strong p-8 rounded-2xl inline-block">
            <h3 className="text-2xl font-bold mb-4 text-gradient">
              Ready to Transform Your Life?
            </h3>
            <p className="text-gray-300 mb-6 max-w-md">
              Join thousands of students who are already on their path to financial freedom.
            </p>
            <button className="btn-primary">
              JOIN THE REAL COURSE
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
