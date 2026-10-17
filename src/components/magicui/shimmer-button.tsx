// Magic UI "Shimmer Button" (MIT, magicui.design, also listed on 21st.dev).
// Adapted: renders any element (`as`), so the "Coming soon" pill is not a fake button or link.
import React, { type CSSProperties } from 'react';
import { cn } from '@/lib/utils';

export interface ShimmerButtonProps extends React.HTMLAttributes<HTMLElement> {
  as?: 'button' | 'div' | 'a' | 'span';
  href?: string;
  shimmerColor?: string;
  shimmerSize?: string;
  borderRadius?: string;
  shimmerDuration?: string;
  background?: string;
}

export function ShimmerButton({
  as: Tag = 'button',
  shimmerColor = '#ffffff',
  shimmerSize = '0.06em',
  shimmerDuration = '3s',
  borderRadius = '999px',
  background = 'rgba(10, 10, 10, 1)',
  className,
  children,
  ...props
}: ShimmerButtonProps) {
  const Comp = Tag as React.ElementType;
  return (
    <Comp
      style={
        {
          '--spread': '90deg',
          '--shimmer-color': shimmerColor,
          '--radius': borderRadius,
          '--speed': shimmerDuration,
          '--cut': shimmerSize,
          '--bg': background,
        } as CSSProperties
      }
      className={cn(
        'group relative z-0 inline-flex items-center justify-center overflow-hidden [border-radius:var(--radius)] border border-white/10 px-6 py-3 whitespace-nowrap text-white [background:var(--bg)]',
        'transform-gpu transition-transform duration-300 ease-in-out',
        className,
      )}
      {...props}
    >
      <div className="-z-30 blur-[2px] @container-[size] absolute inset-0 overflow-visible">
        <div className="animate-shimmer-slide absolute inset-0 aspect-[1] h-[100cqh] rounded-none [mask:none]">
          <div className="animate-spin-around absolute -inset-full w-auto [translate:0_0] rotate-0 [background:conic-gradient(from_calc(270deg-(var(--spread)*0.5)),transparent_0,var(--shimmer-color)_var(--spread),transparent_var(--spread))]" />
        </div>
      </div>
      {children}
      <div className="absolute inset-0 size-full [border-radius:var(--radius)] shadow-[inset_0_-8px_10px_#ffffff1f] transform-gpu transition-all duration-300 ease-in-out group-hover:shadow-[inset_0_-6px_10px_#ffffff3f]" />
      <div className="absolute inset-(--cut) -z-20 [border-radius:var(--radius)] [background:var(--bg)]" />
    </Comp>
  );
}
