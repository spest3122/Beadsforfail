import React, { useEffect } from "react";
import { motion } from "framer-motion";

import beadDarkGreen from "../assets/bead_dark_green.png";
import beadLightGreen from "../assets/bead_light_green.png";
import beadBlue from "../assets/bead_blue.png";
import beadTeal from "../assets/bead_teal.png";
import beadOrange from "../assets/bead_orange.png";
import beadPink from "../assets/bead_pink.png";
import beadPurple from "../assets/bead_purple.png";
import beadRed from "../assets/bead_red.png";
import beadYellow from "../assets/bead_yellow.png";

const BEAD_IMAGES = [
    beadDarkGreen,
    beadLightGreen,
    beadBlue,
    beadTeal,
    beadOrange,
    beadPink,
    beadPurple,
    beadRed,
    beadYellow,
];

interface BeadProps {
    id: string;
    x: number;
    y: number;
    imageIndex: number;
    onComplete: (id: string) => void;
}

export const BEAD_LENGTH = BEAD_IMAGES.length;

export const Bead: React.FC<BeadProps> = ({ id, x, y, imageIndex, onComplete }) => {
    // Generate a random trajectory for the bead only once on mount
    const { randomX, heightY, endY } = React.useMemo(() => {
        return {
            randomX: (Math.random() - 0.5) * 300, // Left or right scatter
            heightY: -Math.random() * 200 - 100, // How high it pops up
            endY: window.innerHeight + 100, // Drop off the screen
        };
    }, []);

    useEffect(() => {
        // Ensure cleanup happens even if unmounted early
        const timer = setTimeout(() => {
            onComplete(id);
        }, 3000);
        return () => clearTimeout(timer);
    }, [id, onComplete]);

    const src = BEAD_IMAGES[imageIndex % BEAD_IMAGES.length];

    return (
        <motion.div
            initial={{ x, y, scale: 0.2, opacity: 1, rotate: 0 }}
            animate={{
                x: [x, x + randomX * 0.5, x + randomX],
                y: [y, y + heightY, endY],
                scale: [0.2, 1.2, 1],
                opacity: [1, 1, 0],
                rotate: [0, Math.random() * 360, Math.random() * 720],
            }}
            transition={{
                duration: 2.5,
                ease: [0.3, 0.0, 0.8, 1], // Custom cubic-bezier for gravity effect
                times: [0, 0.4, 1],
            }}
            onAnimationComplete={() => onComplete(id)}
            className="fixed w-16 h-16 pointer-events-none z-50"
            style={{ translateX: "-50%", translateY: "-50%" }}
        >
            <img
                src={src}
                alt="bead"
                className="w-full h-full object-contain drop-shadow-lg"
                draggable={false}
            />
        </motion.div>
    );
};
