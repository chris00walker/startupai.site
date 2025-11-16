'use client';

import * as React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, Sparkles, Zap, Shield } from 'lucide-react';

export function Hero() {
  const [hoveredFeature, setHoveredFeature] = React.useState<number | null>(null);

  return (
    <section className="business-gradient text-foreground py-16 md:py-24 relative overflow-hidden tech-grid">
      {/* Layered background graphics for depth */}
      <div className="absolute inset-0 bg-[url('/pattern.svg')] opacity-10"></div>
      <div className="absolute inset-0 bg-[url('/graphics/abstract-mesh.svg')] bg-cover bg-center opacity-30"></div>
      
      {/* Animated neural network graphic */}
      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[600px] h-[400px] opacity-20">
        <Image 
          src="/graphics/neural-network.svg" 
          alt="" 
          width={600} 
          height={400} 
          className="w-full h-full object-contain"
          priority={false}
        />
      </div>
      
      {/* Enhanced floating geometric elements */}
      <div className="absolute top-20 left-10 w-20 h-20 border border-primary/20 rounded-lg floating-element opacity-30 backdrop-blur-sm"></div>
      <div className="absolute top-40 right-20 w-16 h-16 bg-gradient-to-br from-primary/10 to-primary/5 rounded-full floating-element shadow-lg" style={{animationDelay: '2s'}}></div>
      <div className="absolute bottom-32 left-1/4 w-12 h-12 border border-primary/15 rotate-45 floating-element backdrop-blur-sm" style={{animationDelay: '4s'}}></div>
      <div className="absolute top-1/3 right-1/3 w-24 h-24 bg-gradient-to-tr from-primary/5 to-transparent rounded-full blur-xl floating-element" style={{animationDelay: '3s'}}></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          
          <Badge variant="secondary" className="mb-4">
            <Sparkles className="mr-1 h-3 w-3" />
            Private Beta - Only 200 Spots
          </Badge>
          
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            The AI Co-Founder That Validates Your Startup Idea
          </h1>
          
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed">
            We build your MVP, test it with real customers, and tell you if your idea works—or how to pivot. Join our private beta.
          </p>
          
          
          <div className="mt-12 flex flex-wrap justify-center gap-6 text-sm text-muted-foreground">
            {[
              { icon: Zap, text: "Evidence-Based Validation", index: 0 },
              { icon: Shield, text: "Private-by-Design AI", index: 1 }
            ].map((feature) => {
              const IconComponent = feature.icon;
              const isHovered = hoveredFeature === feature.index;
              const isOtherHovered = hoveredFeature !== null && hoveredFeature !== feature.index;
              
              return (
                <div 
                  key={feature.index}
                  onMouseEnter={() => setHoveredFeature(feature.index)}
                  onMouseLeave={() => setHoveredFeature(null)}
                  className={`flex items-center transition-all duration-300 cursor-pointer ${
                    isHovered 
                      ? 'scale-110 text-foreground' 
                      : isOtherHovered 
                        ? 'scale-95 opacity-60' 
                        : 'scale-100'
                  }`}
                >
                  {IconComponent && (
                    <IconComponent className={`h-4 w-4 text-primary mr-2 transition-all duration-300 ${
                      isHovered ? 'glow-effect scale-125' : ''
                    }`} />
                  )}
                  {feature.text}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
