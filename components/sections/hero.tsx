"use client";
import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function HeroSection() {
  const [animatedNumbers, setAnimatedNumbers] = useState(0);
  
  useEffect(() => {
    const timer = setInterval(() => {
      setAnimatedNumbers(prev => {
        if (prev < 113000) return prev + 1000;
        return 113000;
      });
    }, 50);
    
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Advanced background with gradients - extended to cover header area */}
      <div 
        className="absolute inset-0 z-0 -top-32"
        style={{ background: 'var(--gradient-hero)' }}
      />
      
      {/* Subtle animated background elements - removed prominent yellow blob */}
      <div className="absolute inset-0 z-0">
        <div className="absolute bottom-1/4 right-1/3 w-96 h-96 bg-accent/5 rounded-full blur-3xl animate-float delay-1000" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-accent/3 rounded-full blur-3xl animate-glow-pulse" />
      </div>
      
      {/* Glassmorphic particles */}
      <div className="absolute inset-0 z-0">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className={`absolute glass w-4 h-4 rounded-full animate-float delay-${i * 100}`}
            style={{
              left: `${10 + i * 15}%`,
              top: `${20 + i * 10}%`,
            }}
          />
        ))}
      </div>

      <div className="container relative z-10 text-center pt-32">
        <div className="max-w-5xl mx-auto">
          {/* Animated badge */}
          <div className="inline-block mb-8 animate-scale-in">
            <div className="glass-strong px-6 py-3 rounded-full">
              <span className="text-accent font-semibold text-sm uppercase tracking-wider">
                � Master Resell Rights Included
              </span>
            </div>
          </div>
          
          {/* Main headline with advanced animation */}
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-heading font-black mb-8 leading-none animate-slide-up delay-200">
            <span className="block mb-4">
              THE ULTIMATE
            </span>
            <span className="block text-gradient animate-gradient text-shadow">
              BRANDING
            </span>
            <span className="block mt-4 text-glow">
              COURSE
            </span>
          </h1>
          
          {/* Animated subtitle */}
          <p className="text-xl md:text-2xl lg:text-3xl text-secondary mb-12 max-w-4xl mx-auto leading-relaxed animate-slide-up delay-400">
            Master digital branding skills + get <span className="text-accent font-semibold">Master Resell Rights</span>. 
            Learn from 419+ video lessons, then sell this course for 
            <span className="text-accent font-semibold"> $499 and keep 100% profit</span>.
          </p>
          
          {/* Glassmorphic feature highlights */}
          <div className="grid md:grid-cols-3 gap-6 mb-12 animate-slide-up delay-500">
            {[
              { icon: '📚', text: '419+ video lessons included' },
              { icon: '�', text: 'Master Resell Rights included' },
              { icon: '💰', text: 'Sell for $499, keep 100% profit' }
            ].map((feature, i) => (
              <div key={i} className={`glass-card p-6 rounded-xl animate-scale-in delay-${600 + i * 100}`}>
                <div className="text-3xl mb-2">{feature.icon}</div>
                <p className="text-sm font-medium">{feature.text}</p>
              </div>
            ))}
          </div>
          
          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-12 animate-slide-up delay-700">
            <Link 
              href="/course"
              className="btn-primary inline-flex items-center group text-lg px-8 py-4"
            >
              <span>JOIN THE REAL COURSE</span>
              <svg 
                className="ml-3 w-6 h-6 group-hover:translate-x-1 transition-transform" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </Link>
            
            <Link 
              href="/course"
              className="btn-secondary inline-flex items-center text-lg px-8 py-4"
            >
              View Curriculum
            </Link>
          </div>
          
          {/* Social proof with animated counter */}
          <div className="glass-strong p-6 rounded-2xl inline-block animate-scale-in delay-800">
            <div className="flex items-center justify-center space-x-4">
              <div className="flex -space-x-2">
                {[...Array(5)].map((_, i) => (
                  <div
                    key={i}
                    className="w-10 h-10 rounded-full glass border-2 border-accent/30 flex items-center justify-center text-sm font-bold"
                  >
                    {String.fromCharCode(65 + i)}
                  </div>
                ))}
              </div>
              <div className="text-left">
                <div className="text-2xl font-bold text-gradient">
                  {animatedNumbers.toLocaleString()}+
                </div>
                <div className="text-sm text-secondary">like-minded students</div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <div className="glass w-8 h-12 rounded-full flex items-end justify-center pb-2">
            <div className="w-1 h-3 bg-accent rounded-full animate-pulse" />
          </div>
        </div>
      </div>
    </section>
  );
}
