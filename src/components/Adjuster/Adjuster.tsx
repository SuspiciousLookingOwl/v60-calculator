import { Component, For } from "solid-js";

export type AdjusterProps = {
	steps: number[];
	onAdjust: (value: number) => void;
};

export const Adjuster: Component<AdjusterProps> = (props) => {
	return (
		<div class="border border-neutral-300 rounded-lg flex flex-row justify-evenly divide-x mt-6 w-max mx-auto">
			<For each={props.steps}>
				{(step) => (
					<button class="w-full hover:font-semibold px-3" onClick={() => props.onAdjust(step)}>
						{step > 0 ? "+" : ""}
						{step}
					</button>
				)}
			</For>
		</div>
	);
};
