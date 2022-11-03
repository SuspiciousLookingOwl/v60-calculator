import { Component, JSX } from "solid-js";

export type FancyInputProps = JSX.InputHTMLAttributes<HTMLInputElement> & {
	value: number;
	unit: string;
};

export const FancyInput: Component<FancyInputProps> = (props) => {
	return (
		<div class="flex flex-row space-x-4 justify-center">
			<input
				{...props}
				type="text"
				pattern="[0-9]*"
				value={props.value}
				style={{ width: props.value.toString().length + 2 + "ch" }}
				class="text-[6rem] border-b border-neutral-300 text-center text-neutral-600 font-light outline-none pl-4"
			/>
			<div class="mt-auto text-2xl">{props.unit}</div>
		</div>
	);
};
