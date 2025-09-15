"use client";
import { useState } from 'react';
import Link from 'next/link';

interface Skill {
  title: string;
  description: string;
  icon: string;
  isNew?: boolean;
  color: string;
}

export default function SkillsSection() {
  const [hoveredSkill, setHoveredSkill] = useState<number | null>(null);

  const skills: Skill[] = [
    {
      title: 'E-COMMERCE',
      description: 'Sell profitable products online. Industry experts will train you to find winning products, create the perfect store, and generate traffic on your sites.',
      icon: '🛍️',
      color: 'from-blue-500 to-purple-600'
    },
    {
      title: 'COPYWRITING',
      description: 'Master the art of selling with words. We\'ll give you an easy to follow guide on how to master the art of copywriting and secure a list of high-paying clients.',
      icon: '✍️',
      color: 'from-green-500 to-teal-600'
    },
    {
      title: 'STOCKS',
      description: 'Multiply your capital through the stock market. We\'ll train you to use technical analysis to find situations where there\'s a higher upside than the downside.',
      icon: '📈',
      color: 'from-red-500 to-pink-600'
    },
    {
      title: 'BUSINESS & FINANCE',
      description: 'Master the fundamental skills of business. We\'ll teach you every skill the hyper successful entrepreneur of tomorrow needs to master.',
      icon: '💼',
      color: 'from-yellow-500 to-orange-600'
    },
    {
      title: 'CRYPTO INVESTING',
      description: 'Profit from the world\'s highest-performing assets. We\'ll focus on attacking crypto markets from 3 angles: Long-term, medium-term, and short-term.',
      icon: '₿',
      color: 'from-purple-500 to-indigo-600'
    },
    {
      title: 'CONTENT CREATION & AI',
      description: 'We live in a digital age. There are websites worth more than skyscrapers. We will teach you how to create valuable digital assets.',
      icon: '🤖',
      isNew: true,
      color: 'from-cyan-500 to-blue-600'
    },
    {
      title: 'CLIENT ACQUISITION',
      description: 'If you scroll for hours, but don\'t get paid for it - this is for you. Our students follow a step-by-step process to gain attention to generate 6 figures.',
      icon: '🎯',
      isNew: true,
      color: 'from-pink-500 to-rose-600'
    },
    {
      title: 'FITNESS',
      description: 'The Real World approach to fitness focuses on sculpting a disciplined, resilient character, not just a strong physique.',
      icon: '💪',
      color: 'from-emerald-500 to-green-600'
    }
  ];

  return (
    <section className="section-padding relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-accent/5 to-transparent" />
      
      <div className="container relative z-10">
        {/* Header */}
        <div className="text-center mb-20 animate-slide-up">
          <div className="inline-block glass-strong px-6 py-3 rounded-full mb-6">
            <span className="text-accent font-semibold text-sm uppercase tracking-wider">
              🎯 WHAT YOU'LL LEARN
            </span>
          </div>
          <h2 className="text-4xl md:text-6xl font-heading font-black mb-6">
            <span className="text-gradient">MASTER THE SKILLS</span><br />
            <span className="text-white">YOU NEED TO SUCCEED</span>
          </h2>
          <p className="text-xl text-secondary max-w-4xl mx-auto">
            When a new technology revolutionizes an industry, <strong className="text-accent">THE REAL COURSE</strong> will be 
            the first and only place to teach you how to take advantage of it.
          </p>
        </div>

        {/* Skills grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {skills.map((skill, index) => (
            <div
              key={index}
              className={`glass-card p-6 rounded-xl group cursor-pointer relative overflow-hidden animate-scale-in delay-${index * 100}`}
              onMouseEnter={() => setHoveredSkill(index)}
              onMouseLeave={() => setHoveredSkill(null)}
            >
              {/* New badge */}
              {skill.isNew && (
                <div className="absolute top-4 right-4 glass bg-accent/20 px-2 py-1 rounded-full">
                  <span className="text-accent text-xs font-bold">NEW</span>
                </div>
              )}

              {/* Icon with animated background */}
              <div className="relative mb-4">
                <div 
                  className={`absolute inset-0 bg-gradient-to-r ${skill.color} rounded-lg opacity-20 group-hover:opacity-30 transition-opacity`}
                />
                <div className="relative text-4xl p-4 text-center">
                  {skill.icon}
                </div>
              </div>

              {/* Content */}
              <h3 className="text-lg font-bold mb-3 text-gradient group-hover:text-accent transition-colors">
                {skill.title}
              </h3>
              
              <p className="text-sm text-gray-300 leading-relaxed mb-4 line-clamp-4">
                {skill.description}
              </p>

              {/* Learn more button */}
              <div className="flex items-center text-accent text-sm font-semibold group-hover:translate-x-1 transition-transform">
                <span>Learn More</span>
                <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>

              {/* Hover overlay */}
              <div 
                className={`absolute inset-0 bg-gradient-to-r ${skill.color} opacity-0 group-hover:opacity-5 transition-opacity rounded-xl`}
              />
            </div>
          ))}
        </div>

        {/* AI Integration callout */}
        <div className="mt-16 text-center animate-slide-up delay-800">
          <div className="glass-strong p-8 rounded-2xl max-w-2xl mx-auto">
            <div className="text-4xl mb-4">🤖</div>
            <h3 className="text-2xl font-bold mb-4 text-gradient">
              Artificial Intelligence
            </h3>
            <p className="text-gray-300 mb-6">
              Integrated in all Campuses
            </p>
            <div className="glass px-6 py-3 rounded-full inline-block">
              <span className="text-accent font-semibold">Get access to all 10+ Campuses</span>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center mt-16 animate-slide-up delay-900">
          <Link href="/course" className="btn-primary text-xl px-12 py-4">
            GET ACCESS TO ALL COURSES
          </Link>
          <p className="text-sm text-secondary mt-4">
            Start learning today • No experience required
          </p>
        </div>
      </div>
    </section>
  );
}
