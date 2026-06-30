import React, { useRef } from "react";
import { motion, useAnimation } from "framer-motion";
import { cn } from "../utils";
import bagImage from "../assets/bag.png";

interface BagProps {
    onInteract: (x: number, y: number) => void;
    disabled: boolean;
}

export const Bag: React.FC<BagProps> = ({ onInteract, disabled }) => {
    const controls = useAnimation();
    const bagRef = useRef<HTMLDivElement>(null);

    const handleInteraction = async () => {
        if (disabled) return;

        // Trigger the squish animation
        controls.start({
            scale: [1, 0.9, 1.05, 1],
            rotate: [0, -2, 2, 0],
            transition: { duration: 0.3, type: "spring", stiffness: 400, damping: 15 },
        });

        // Get position to spawn bead from the top-centre of the bag image
        if (bagRef.current) {
            const rect = bagRef.current.getBoundingClientRect();
            const spawnX = rect.left + rect.width / 2;
            // Spawn beads near the top of the bag where the beads peek out
            const spawnY = rect.top + rect.height * 0.18;

            // Slight randomization of spawn point
            const offsetX = (Math.random() - 0.5) * 60;
            const offsetY = (Math.random() - 0.5) * 10;

            onInteract(spawnX + offsetX, spawnY + offsetY);
        }
    };

    return (
        <div className="relative flex justify-center items-center w-full max-w-sm mx-auto mt-12 z-20">
            {/* Ambient glow behind the bag */}
            <div className="absolute inset-0 bg-amber-500/10 blur-[80px] rounded-full pointer-events-none" />

            <motion.div
                ref={bagRef}
                animate={controls}
                whileHover={!disabled ? { scale: 1.04, cursor: "pointer" } : {}}
                onClick={handleInteraction}
                className={cn(
                    "relative select-none transition-all duration-300",
                    disabled ? "opacity-50 grayscale cursor-not-allowed" : "cursor-pointer",
                )}
                style={{ touchAction: "manipulation" }}
            >
                <img
                    src={bagImage}
                    alt="bead bag"
                    className="w-72 h-72 object-contain drop-shadow-2xl"
                    draggable={false}
                />
            </motion.div>
        </div>
    );
};
