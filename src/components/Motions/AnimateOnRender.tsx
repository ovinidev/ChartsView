/* eslint-disable @typescript-eslint/ban-ts-comment */
import { chakra, BoxProps } from "@chakra-ui/react";
import { motion, isValidMotionProp } from "framer-motion";
import { ReactNode } from "react";

const ChakraBox = chakra(motion.div, {
	shouldForwardProp: (prop) => isValidMotionProp(prop) || prop === "children",
});

interface MotionProps extends BoxProps {
	children: ReactNode;
}

export const AnimateOnRender = ({ children, ...rest }: MotionProps) => {
	return (
		<ChakraBox
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			exit={{ x: 0, opacity: 1 }}
			// @ts-ignore no problem in operation, although type error appears.
			transition={{
				duration: 0.25,
				ease: "easeIn",
			}}
			{...rest}
		>
			{children}
		</ChakraBox>
	);
};
