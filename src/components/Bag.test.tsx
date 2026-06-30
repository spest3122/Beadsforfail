import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { Bag } from './Bag';

// Mock framer-motion
vi.mock('framer-motion', async () => {
  const React = await import('react');
  return {
    motion: {
      div: React.forwardRef(({ children, onClick, ...props }: any, ref: any) => {
        const { initial, animate, exit, transition, whileHover, onAnimationComplete, layoutId, ...validProps } = props;
        return (
          <div ref={ref} onClick={onClick} {...validProps}>
            {children}
          </div>
        );
      }),
      img: React.forwardRef(({ ...props }: any, ref: any) => {
        const { initial, animate, exit, transition, whileHover, onAnimationComplete, layoutId, ...validProps } = props;
        return <img ref={ref} {...validProps} />;
      }),
    },
    useAnimation: () => ({ start: vi.fn() }),
  };
});

// Mock the bag image asset
vi.mock('../assets/bag.png', () => ({ default: 'bag.png' }));

describe('Bag component', () => {
  it('renders the bag as an <img> with alt="bead bag"', () => {
    render(<Bag onInteract={vi.fn()} disabled={false} />);
    const img = screen.getByAltText('bead bag');
    expect(img.tagName).toBe('IMG');
    // src may be stub 'bag.png' or the Vite-resolved path; just confirm it contains 'bag'
    expect(img.getAttribute('src')).toMatch(/bag/);
  });

  it('calls onInteract with (x, y) coordinates when clicked and not disabled', () => {
    const onInteract = vi.fn();
    render(<Bag onInteract={onInteract} disabled={false} />);

    const bagImg = screen.getByAltText('bead bag');
    const bagWrapper = bagImg.parentElement!;

    fireEvent.click(bagWrapper);

    expect(onInteract).toHaveBeenCalledTimes(1);
    const [x, y] = onInteract.mock.calls[0];
    expect(typeof x).toBe('number');
    expect(typeof y).toBe('number');
  });

  it('does NOT call onInteract when disabled', () => {
    const onInteract = vi.fn();
    render(<Bag onInteract={onInteract} disabled={true} />);

    const bagImg = screen.getByAltText('bead bag');
    const bagWrapper = bagImg.parentElement!;
    fireEvent.click(bagWrapper);

    expect(onInteract).not.toHaveBeenCalled();
  });

  it('applies grayscale + opacity class when disabled', () => {
    render(<Bag onInteract={vi.fn()} disabled={true} />);
    const bagImg = screen.getByAltText('bead bag');
    const wrapper = bagImg.parentElement!;
    expect(wrapper.className).toMatch(/opacity-50/);
    expect(wrapper.className).toMatch(/grayscale/);
  });

  it('does NOT apply grayscale when enabled', () => {
    render(<Bag onInteract={vi.fn()} disabled={false} />);
    const bagImg = screen.getByAltText('bead bag');
    const wrapper = bagImg.parentElement!;
    expect(wrapper.className).not.toMatch(/grayscale/);
  });
});
