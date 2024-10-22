import React, { useState, useEffect } from "react";
import { Icons } from "../../../../Utils/icons";

type Props = {
	name?: string;
	occupation?: string;
};

const TypingAnimation = (props: Props) => {
	const { name, occupation } = props;
	const [text, setText] = useState("");
	const [isTyping, setIsTyping] = useState(true);
	const [currentMessageIndex, setCurrentMessageIndex] = useState(0); // Track which message is being typed

	useEffect(() => {
		const messages = [name, occupation].filter(Boolean); // Only use non-empty values
		if (messages.length === 0) return; // No valid messages, exit

		const typingDelay = 150; // Delay between typing characters
		const erasingDelay = 100; // Delay between erasing characters
		const pauseBeforeStart = 1000; // Pause before starting the animation

		const animate = async () => {
			while (true) {
				for (let i = 0; i < messages.length; i++) {
					const currentText = messages[i] || ""; // Ensure currentText is never undefined
					setCurrentMessageIndex(i); // Track which message is being typed
					setIsTyping(true);

					// Typing effect
					for (let j = 0; j < currentText.length; j++) {
						setText(currentText.substring(0, j + 1));
						await new Promise((resolve) => setTimeout(resolve, typingDelay));
					}

					await new Promise((resolve) => setTimeout(resolve, pauseBeforeStart));

					setIsTyping(false);

					// Erasing effect
					for (let j = currentText.length; j > 0; j--) {
						setText(currentText.substring(0, j - 1));
						await new Promise((resolve) => setTimeout(resolve, erasingDelay));
					}

					await new Promise((resolve) => setTimeout(resolve, pauseBeforeStart));
				}
			}
		};

		animate();
	}, [name, occupation]);

	// Determine the color based on the message being typed
	const textColor =
		currentMessageIndex === 0 ? "text-red-500" : "text-cyan-500";

	return (
		<React.Fragment>
			<h1 className={`text-[2.5rem] typing-animation underline ${textColor}`}>
				{name && occupation ? (
					text
				) : (
					<Icons.Spinner className="text-blue-600 h-10 w-10 animate-spin" />
				)}
			</h1>
		</React.Fragment>
	);
};

export default TypingAnimation;
