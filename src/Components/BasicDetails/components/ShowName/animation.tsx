import { useRef } from "react";
import { useAnimationFrame } from "framer-motion";

export default function Animation() {
	const ref = useRef<any>(null);

	useAnimationFrame((t) => {
		const rotate = Math.sin(t / 500) * 300;

		// Adjust the movement to go from bottom-left to top-right
		const x = (1 - Math.sin(t / 500)) * 500; // Moves from left to right
		const y = (1 - Math.cos(t / 500)) * 100; // Moves from bottom to top

		ref.current.style.transform = `translateX(${x}px) translateY(${y}px) rotateX(${rotate}deg) rotateY(${rotate}deg)`;
	});

	return (
		<div className="hidden lg:container">
			<div className="cube" ref={ref}>
				<div className="side front" />
				<div className="side left" />
				<div className="side right" />
				<div className="side top" />
				<div className="side bottom" />
				<div className="side back" />
			</div>
		</div>
	);
}
