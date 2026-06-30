import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Bead } from './Bead';

// Mock framer-motion — render children synchronously without animation
vi.mock('framer-motion', async () => {
  const React = await import('react');
  return {
    motion: {
      div: React.forwardRef(({ children, ...props }: any, ref: any) => {
        const { initial, animate, exit, transition, whileHover, onAnimationComplete, layoutId, ...validProps } = props;
        return (
          <div ref={ref} {...validProps}>
            {children}
          </div>
        );
      }),
    },
  };
});

// Mock all 9 bead image assets with identifiable stub paths
vi.mock('../assets/bead_dark_green.png', () => ({ default: 'bead_dark_green.png' }));
vi.mock('../assets/bead_light_green.png', () => ({ default: 'bead_light_green.png' }));
vi.mock('../assets/bead_blue.png', () => ({ default: 'bead_blue.png' }));
vi.mock('../assets/bead_teal.png', () => ({ default: 'bead_teal.png' }));
vi.mock('../assets/bead_orange.png', () => ({ default: 'bead_orange.png' }));
vi.mock('../assets/bead_pink.png', () => ({ default: 'bead_pink.png' }));
vi.mock('../assets/bead_purple.png', () => ({ default: 'bead_purple.png' }));
vi.mock('../assets/bead_red.png', () => ({ default: 'bead_red.png' }));
vi.mock('../assets/bead_yellow.png', () => ({ default: 'bead_yellow.png' }));

const BEAD_SRCS = [
  'bead_dark_green.png',
  'bead_light_green.png',
  'bead_blue.png',
  'bead_teal.png',
  'bead_orange.png',
  'bead_pink.png',
  'bead_purple.png',
  'bead_red.png',
  'bead_yellow.png',
];
const BEAD_COUNT = BEAD_SRCS.length; // 9

describe('Bead component', () => {
  it('renders an <img> with alt="bead"', () => {
    render(
      <Bead id="b1" x={100} y={200} imageIndex={0} onComplete={vi.fn()} />
    );
    const img = screen.getByAltText('bead');
    expect(img.tagName).toBe('IMG');
  });

  it.each([0, 1, 2, 3, 4, 5, 6, 7, 8])(
    'renders the correct bead image for imageIndex=%i',
    (index) => {
      render(
        <Bead id={`b${index}`} x={0} y={0} imageIndex={index} onComplete={vi.fn()} />
      );
      const img = screen.getByAltText('bead');
      expect(img).toHaveAttribute('src', BEAD_SRCS[index]);
    }
  );

  it('wraps imageIndex out-of-range values safely (mod BEAD_COUNT)', () => {
    // imageIndex = BEAD_COUNT should wrap to index 0
    render(
      <Bead id="wrap-test" x={0} y={0} imageIndex={BEAD_COUNT} onComplete={vi.fn()} />
    );
    const img = screen.getByAltText('bead');
    expect(img).toHaveAttribute('src', BEAD_SRCS[0]);
  });

  it('src is always a known bead filename for any imageIndex', () => {
    for (let index = 0; index < BEAD_COUNT * 2; index++) {
      const { unmount } = render(
        <Bead id={`range-${index}`} x={0} y={0} imageIndex={index} onComplete={vi.fn()} />
      );
      const img = screen.getByAltText('bead');
      expect(BEAD_SRCS).toContain(img.getAttribute('src'));
      unmount();
    }
  });

  it('calls onComplete after the cleanup timer fires', () => {
    vi.useFakeTimers();
    const onComplete = vi.fn();

    render(
      <Bead id="timer-test" x={0} y={0} imageIndex={1} onComplete={onComplete} />
    );

    expect(onComplete).not.toHaveBeenCalled();
    vi.advanceTimersByTime(3000);
    expect(onComplete).toHaveBeenCalledWith('timer-test');

    vi.useRealTimers();
  });
});
