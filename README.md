# Gamified Goal Tracker: Bag of Glass Beads 🎯✨

A beautiful, highly interactive web application designed to help you stay motivated and track your goals in a satisfying, tactile way.

Set a goal, and drop exactly 1,000 glass beads from an interactive virtual bag to achieve it! Each tap drops an independent, physics-simulated glass bead that gracefully pops out and drops down the screen.

## ✨ Features

- **Gamified Progress Tracking:** Instead of just checking boxes, tap a gorgeous stylized bag to drop beads and count down your remaining progress from 1,000.
- **Glassmorphism Aesthetic:** A modern, premium UI combining dark backgrounds, vibrant glowing elements, and semi-transparent frosted-glass components.
- **Satisfying Micro-interactions:** Built with **Framer Motion**, the bag realistically squishes and pulses on interaction, while beads erupt dynamically using cubic-bezier gravity arcs.
- **Journey Log:** A dedicated `/log` page where you can review your currently active goals alongside all the previous goals you've successfully completed.
- **Flawless State Management:** Goal locking mechanisms and persistent counters all dynamically interact through a responsive layout.

## 🛠️ Tech Stack

This project was built using modern frontend technologies focusing on speed and developer experience:

- **Framework:** React 19 via Vite (TypeScript)
- **Styling:** Tailwind CSS v4 (utilizing modern `@import "tailwindcss";` specs)
- **Animation:** Framer Motion
- **Icons:** Lucide React
- **Routing:** React Router v7
- **Testing:** Vitest & React Testing Library (with custom Framer Motion mocks)
