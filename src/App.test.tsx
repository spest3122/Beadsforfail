import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import App from './App';

// Mock framer-motion to immediately render children without animation
vi.mock('framer-motion', async () => {
  const actual = await vi.importActual('framer-motion');
  const React = await import('react');
  return {
    ...actual as any,
    AnimatePresence: ({ children }: any) => <>{children}</>,
    motion: {
      div: React.forwardRef(({ children, ...props }: any, ref: any) => {
        const { initial, animate, exit, transition, whileHover, onAnimationComplete, layoutId, ...validProps } = props;
        return <div ref={ref} {...validProps}>{children}</div>;
      }),
      img: React.forwardRef(({ ...props }: any, ref: any) => {
        const { initial, animate, exit, transition, whileHover, onAnimationComplete, layoutId, ...validProps } = props;
        return <img ref={ref} {...validProps} />;
      }),
      h1: React.forwardRef(({ children, ...props }: any, ref: any) => {
        const { initial, animate, exit, transition, whileHover, onAnimationComplete, layoutId, ...validProps } = props;
        return <h1 ref={ref} {...validProps}>{children}</h1>;
      }),
    }
  };
});

// Mock image assets so Vite/jsdom doesn't choke on binary imports
vi.mock('./assets/bag.png', () => ({ default: 'bag.png' }));
vi.mock('./assets/bead_dark_green.png', () => ({ default: 'bead_dark_green.png' }));
vi.mock('./assets/bead_light_green.png', () => ({ default: 'bead_light_green.png' }));
vi.mock('./assets/bead_blue.png', () => ({ default: 'bead_blue.png' }));
vi.mock('./assets/bead_teal.png', () => ({ default: 'bead_teal.png' }));
vi.mock('./assets/bead_orange.png', () => ({ default: 'bead_orange.png' }));
vi.mock('./assets/bead_pink.png', () => ({ default: 'bead_pink.png' }));
vi.mock('./assets/bead_purple.png', () => ({ default: 'bead_purple.png' }));
vi.mock('./assets/bead_red.png', () => ({ default: 'bead_red.png' }));
vi.mock('./assets/bead_yellow.png', () => ({ default: 'bead_yellow.png' }));

describe('Gamified Goal Tracker', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    window.localStorage.clear();
  });

  it('should allow setting a goal and display the bag image', async () => {
    render(<App />);

    // 1. Set a Goal
    const input = screen.getByPlaceholderText('What are you working towards?');
    const lockButton = screen.getByText('Lock In');

    fireEvent.change(input, { target: { value: 'Test Goal' } });
    fireEvent.click(lockButton);

    // Goal should be set
    await waitFor(() => expect(screen.getByText('Test Goal')).toBeInTheDocument());
    expect(screen.getByText('Remaining')).toBeInTheDocument();

    // 2. The bag should now render as an image (not a CSS div)
    const bagImg = screen.getByAltText('bead bag');
    expect(bagImg).toBeInTheDocument();
    expect(bagImg.tagName).toBe('IMG');
    // Vite resolves assets to their real path in test env
    expect(bagImg.getAttribute('src')).toMatch(/bag/);
  });

  it('should spawn bead images (not CSS glass beads) when the bag is clicked', async () => {
    render(<App />);

    // Set up a goal first
    const input = screen.getByPlaceholderText('What are you working towards?');
    fireEvent.change(input, { target: { value: 'Bead Pop Goal' } });
    fireEvent.click(screen.getByText('Lock In'));

    await waitFor(() => expect(screen.getByText('Bead Pop Goal')).toBeInTheDocument());

    // Click the bag image
    const bagImg = screen.getByAltText('bead bag');
    const bagWrapper = bagImg.parentElement!;

    fireEvent.click(bagWrapper);
    fireEvent.click(bagWrapper);
    fireEvent.click(bagWrapper);

    // Bead images should appear in the DOM
    await waitFor(() => {
      const beadImgs = screen.getAllByAltText('bead');
      expect(beadImgs.length).toBe(3);
    });

    // Each bead image src should be one of the 9 known bead assets
    const validSrcs = [
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
    const beadImgs = screen.getAllByAltText('bead');
    beadImgs.forEach((img) => {
      // src may be the mocked stub or the Vite-resolved path — check the filename is valid
      const src = img.getAttribute('src') ?? '';
      const basename = src.split('/').pop() ?? src;
      expect(validSrcs).toContain(basename);
    });
  });

  it('should decrease remaining count when bag is clicked', async () => {
    render(<App />);

    const input = screen.getByPlaceholderText('What are you working towards?');
    fireEvent.change(input, { target: { value: 'Counter Goal' } });
    fireEvent.click(screen.getByText('Lock In'));

    await waitFor(() => expect(screen.getByText('Counter Goal')).toBeInTheDocument());

    const bagImg = screen.getByAltText('bead bag');
    const bagWrapper = bagImg.parentElement!;

    // Tap twice
    fireEvent.click(bagWrapper);
    fireEvent.click(bagWrapper);

    // Remaining should decrease by 2 (from default 1000 → 998)
    await waitFor(() => expect(screen.getByText('998')).toBeInTheDocument());
  });

  it('should navigate to journey log and show active goal', async () => {
    render(<App />);

    // Set a Goal
    const input = screen.getByPlaceholderText('What are you working towards?');
    const lockButton = screen.getByText('Lock In');
    fireEvent.change(input, { target: { value: 'Navigation Goal' } });
    fireEvent.click(lockButton);

    // Go to Log
    const logLink = screen.getByText('Journey Log');
    fireEvent.click(logLink);

    // Journey log should display the goal
    await waitFor(() => expect(screen.getByText('Navigation Goal')).toBeInTheDocument());
  });
});
