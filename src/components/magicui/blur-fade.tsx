// Magic UI "Blur Fade" (MIT, magicui.design, also listed on 21st.dev).
// Adapted: no movement or blur when the visitor prefers reduced motion.
import { useRef } from 'react';
import { motion, useInView, useReducedMotion, type MotionProps, type UseInViewOptions, type Variants } from 'motion/react';

type MarginType = UseInViewOptions['margin'];

interface BlurFadeProps extends MotionProps {
  children: React.ReactNode;
  className?: string;
  duration?: number;
  delay?: number;
  offset?: number;
  direction?: 'up' | 'down' | 'left' | 'right';
  inView?: boolean;
  inViewMargin?: MarginType;
  blur?: string;
}

export function BlurFade({
  children,
  className,
  duration = 0.5,
  delay = 0,
  offset = 12,
  direction = 'up',
  inView = true,
  inViewMargin = '-60px',
  blur = '6px',
  ...props
}: BlurFadeProps) {
  const ref = useRef(null);
  const reduce = useReducedMotion();
  const inViewResult = useInView(ref, { once: true, margin: inViewMargin });
  const isInView = !inView || inViewResult;
  const axis = direction === 'left' || direction === 'right' ? 'x' : 'y';
  const variants: Variants = reduce
    ? { hidden: { opacity: 1 }, visible: { opacity: 1 } }
    : {
        hidden: { [axis]: direction === 'right' || direction === 'down' ? -offset : offset, opacity: 0, filter: `blur(${blur})` },
        visible: { [axis]: 0, opacity: 1, filter: 'blur(0px)' },
      };
  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      variants={variants}
      transition={{ delay: 0.04 + delay, duration, ease: [0.21, 0.47, 0.32, 0.98] }}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
}
