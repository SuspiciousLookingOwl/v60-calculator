import { Component, JSX } from "solid-js";
import { Adjuster, AdjusterProps } from "../Adjuster";

export type FancyInputProps = JSX.InputHTMLAttributes<HTMLInputElement> &
	AdjusterProps & {
		title: string;
		value: number;
		unit: string;
	};

export const FancyInput: Component<FancyInputProps> = (props) => {
	return (
		<div class="flex flex-col">
			<div class="text-center text-3xl">{props.title}</div>
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
			<Adjuster steps={props.steps} onAdjust={(v) => props.onAdjust(v)} />
		</div>
	);
};
