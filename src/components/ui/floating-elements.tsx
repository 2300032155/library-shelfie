import React from 'react';
import { cn } from '@/lib/utils';

interface FloatingElementProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
}

export const FloatingElement: React.FC<FloatingElementProps> = ({ 
  children, 
  className,
  delay = 0,
  duration = 3
}) => {
  return (
    <div 
      className={cn("animate-float", className)}
      style={{
        animationDelay: `${delay}s`,
        animationDuration: `${duration}s`
      }}
    >
      {children}
    </div>
  );
};

interface GlowingElementProps {
  children: React.ReactNode;
  className?: string;
  color?: 'blue' | 'amber' | 'success';
}

export const GlowingElement: React.FC<GlowingElementProps> = ({ 
  children, 
  className,
  color = 'blue'
}) => {
  const glowClasses = {
    blue: 'animate-pulse-glow shadow-library-blue/50',
    amber: 'animate-pulse-glow shadow-library-amber/50', 
    success: 'animate-pulse-glow shadow-library-success/50'
  };

  return (
    <div className={cn(glowClasses[color], className)}>
      {children}
    </div>
  );
};

interface ShimmerElementProps {
  children: React.ReactNode;
  className?: string;
}

export const ShimmerElement: React.FC<ShimmerElementProps> = ({ 
  children, 
  className 
}) => {
  return (
    <div className={cn("shine-effect", className)}>
      {children}
    </div>
  );
};