"use client";
import { useState } from 'react';

interface FAQ {
  question: string;
  answer: string;
  category: string;
}

export default function FAQSection() {
  const [openFAQ, setOpenFAQ] = useState<number | null>(0);
  const [selectedCategory, setSelectedCategory] = useState<string>('General');

  const faqs: FAQ[] = [
    // General
    {
      question: "What exactly is The Real World?",
      answer: "The Real World is a comprehensive online education platform that teaches you real-world skills to make money online. Unlike traditional education, we focus on practical, profitable skills like e-commerce, copywriting, crypto investing, and more. You'll learn from successful entrepreneurs and join a community of 250,000+ motivated individuals.",
      category: "General"
    },
    {
      question: "Is this another get-rich-quick scheme?",
      answer: "Absolutely not. The Real World teaches legitimate business skills that require effort, dedication, and consistent action. We provide the knowledge, strategies, and community support, but success depends on your commitment to implementing what you learn. There are no shortcuts to real success.",
      category: "General"
    },
    {
      question: "What makes this different from other online courses?",
      answer: "Most courses give you information and leave you alone. The Real World provides ongoing mentorship, a active community, regular live sessions, and constantly updated content. You're not just buying a course - you're joining a movement of people building real businesses.",
      category: "General"
    },
    {
      question: "Can I really make money with these skills?",
      answer: "Yes, our students generate millions in revenue collectively. However, results depend on your effort, consistency, and application of the strategies. We provide the roadmap, but you need to drive the car. Many students see their first results within 30-90 days.",
      category: "General"
    },
    
    // Access & Content
    {
      question: "What campuses/skills are included?",
      answer: "You get access to 10+ campuses including E-commerce, Copywriting, Crypto Investing, Stocks, Business & Finance, Content Creation & AI, Client Acquisition, Fitness, and more. Each campus is run by successful entrepreneurs who've built multi-million dollar businesses.",
      category: "Access"
    },
    {
      question: "How much time do I need to dedicate?",
      answer: "We recommend at least 1-2 hours daily to see meaningful progress. The beauty of our model is flexibility - you can learn on your phone during commutes, lunch breaks, or whenever you have time. Consistency matters more than marathon sessions.",
      category: "Access"
    },
    {
      question: "Is there live support and interaction?",
      answer: "Yes! We have daily live sessions, community chat with 24/7 activity, direct access to professors, and regular Q&A sessions. You're never alone in your journey. The community is incredibly supportive and active.",
      category: "Access"
    },
    {
      question: "Can I access this on mobile?",
      answer: "Absolutely! The Real World has a mobile app that lets you learn anywhere. Most of our students do the majority of their learning on mobile - during commutes, breaks, or travel. The platform is fully optimized for mobile experience.",
      category: "Access"
    },
    
    // Pricing & Guarantees
    {
      question: "Is there a money-back guarantee?",
      answer: "Yes, we offer a 30-day money-back guarantee. If you're not satisfied with the content, community, or value provided, contact our support team for a full refund. We're confident you'll love The Real World.",
      category: "Pricing"
    },
    {
      question: "Can I cancel my subscription anytime?",
      answer: "Yes, you can cancel anytime with no penalties or fees. There are no long-term contracts. If you choose to cancel, you'll retain access until the end of your billing period.",
      category: "Pricing"
    },
    {
      question: "Why is it a monthly subscription vs one-time payment?",
      answer: "The business world evolves rapidly. A monthly model ensures you always get the latest strategies, updated content, and ongoing support. We're constantly adding new campuses, features, and updating existing content based on market changes.",
      category: "Pricing"
    },
    {
      question: "Are there any hidden fees?",
      answer: "No hidden fees whatsoever. The monthly subscription price includes everything - all campuses, live sessions, community access, mobile app, and ongoing support. What you see is what you pay.",
      category: "Pricing"
    },
    
    // Success & Results
    {
      question: "How quickly can I expect to see results?",
      answer: "This varies by individual and the campus you focus on. Some students see their first sales within 2-4 weeks, while others take 2-3 months to build momentum. Success depends on your dedication, chosen skill, and consistent implementation.",
      category: "Results"
    },
    {
      question: "Do I need any prior experience?",
      answer: "No prior experience required! We start from the absolute basics in each campus. Whether you're a complete beginner or have some experience, there's valuable content for your skill level. Our step-by-step approach works for everyone.",
      category: "Results"
    },
    {
      question: "What if I fail or don't succeed?",
      answer: "Failure is part of the learning process. What sets The Real World apart is our community support system. When you struggle, you have thousands of people and professors to help you. Most 'failures' are just learning experiences that lead to breakthrough success.",
      category: "Results"
    },
    {
      question: "Can I focus on multiple campuses at once?",
      answer: "While you have access to all campuses, we recommend focusing on one initially. Master one skill first, then expand. Trying to do everything at once often leads to overwhelm and mediocre results. Focus creates extraordinary outcomes.",
      category: "Results"
    }
  ];

  const categories = ['General', 'Access', 'Pricing', 'Results'];
  
  const filteredFAQs = faqs.filter(faq => faq.category === selectedCategory);

  const toggleFAQ = (index: number) => {
    setOpenFAQ(openFAQ === index ? null : index);
  };

  return (
    <section id="faq" className="section-padding relative overflow-hidden bg-black/30">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-accent/5 to-transparent" />
      
      <div className="container relative z-10">
        {/* Header */}
        <div className="text-center mb-16 animate-slide-up">
          <div className="inline-block glass-strong px-6 py-3 rounded-full mb-6">
            <span className="text-accent font-semibold text-sm uppercase tracking-wider">
              ❓ FREQUENTLY ASKED
            </span>
          </div>
          <h2 className="text-4xl md:text-6xl font-heading font-black mb-6">
            <span className="text-gradient">YOUR QUESTIONS</span><br />
            <span className="text-white">ANSWERED</span>
          </h2>
          <p className="text-xl text-secondary max-w-3xl mx-auto">
            Get instant answers to the most common questions about The Real World. 
            Still have questions? Our support team is here to help 24/7.
          </p>
        </div>

        {/* Category filter */}
        <div className="flex flex-wrap justify-center gap-4 mb-12 animate-slide-up delay-200">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-6 py-3 rounded-full font-semibold transition-all ${
                selectedCategory === category
                  ? 'glass-strong text-accent border border-accent/50'
                  : 'glass text-gray-300 hover:text-accent hover:border-accent/30'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* FAQ Grid */}
        <div className="max-w-4xl mx-auto">
          <div className="space-y-4">
            {filteredFAQs.map((faq, index) => (
              <div
                key={index}
                className={`glass-card rounded-xl overflow-hidden animate-slide-up delay-${index * 100}`}
              >
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full p-6 text-left flex items-center justify-between hover:bg-white/5 transition-colors"
                >
                  <h3 className="text-lg font-semibold text-white pr-4">
                    {faq.question}
                  </h3>
                  <div className={`transform transition-transform ${openFAQ === index ? 'rotate-180' : ''}`}>
                    <svg className="w-6 h-6 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </button>
                
                {/* Answer */}
                <div className={`overflow-hidden transition-all duration-300 ${
                  openFAQ === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                }`}>
                  <div className="px-6 pb-6">
                    <div className="h-px bg-gradient-to-r from-transparent via-accent/30 to-transparent mb-4" />
                    <p className="text-gray-300 leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Contact support */}
        <div className="text-center mt-16 animate-slide-up delay-600">
          <div className="glass-strong p-8 rounded-2xl max-w-2xl mx-auto">
            <div className="text-4xl mb-4">💬</div>
            <h3 className="text-2xl font-bold mb-4 text-gradient">
              Still Need Help?
            </h3>
            <p className="text-gray-300 mb-6">
              Our support team is available 24/7 to answer any questions you might have. 
              We typically respond within 2-4 hours.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <div className="glass px-6 py-3 rounded-full">
                <span className="text-accent font-semibold">📧 support@therealworld.ag</span>
              </div>
              <div className="glass px-6 py-3 rounded-full">
                <span className="text-accent font-semibold">💬 Live Chat Available</span>
              </div>
            </div>
          </div>
        </div>

        {/* Quick stats */}
        <div className="grid md:grid-cols-3 gap-8 mt-16">
          <div className="glass p-6 rounded-xl text-center animate-scale-in delay-200">
            <div className="text-3xl font-black text-accent mb-2">&lt; 2hrs</div>
            <div className="text-sm text-gray-400">Average Response Time</div>
          </div>
          <div className="glass p-6 rounded-xl text-center animate-scale-in delay-400">
            <div className="text-3xl font-black text-accent mb-2">99.8%</div>
            <div className="text-sm text-gray-400">Customer Satisfaction</div>
          </div>
          <div className="glass p-6 rounded-xl text-center animate-scale-in delay-600">
            <div className="text-3xl font-black text-accent mb-2">24/7</div>
            <div className="text-sm text-gray-400">Support Available</div>
          </div>
        </div>
      </div>
    </section>
  );
}
