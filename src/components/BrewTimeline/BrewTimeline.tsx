import { Component, createEffect, createSignal, onMount } from "solid-js";
import { useBrewCalculator, useTimer } from "../../hooks";
import { Icon } from "../Icon";

type Props = {
	water: number;
	coffee: number;
};

export const BrewTimeline: Component<Props> = (props) => {
	const [timerStage, setTimerStage] = createSignal(0);
	const brew = useBrewCalculator(
		() => props.water,
		() => props.coffee
	);
	const timer = useTimer();
	const ding = new Audio("./audio/ding.mp3");

	const startTimer = () => {
		if (timer.isRunning()) return;
		setTimerStage(0);
		setTimeout(() => {
			timer.start();
			setTimerStage(1);
		}, 0);
	};

	const resetTimer = () => {
		timer.reset();
		setTimerStage(0);
	};

	createEffect(() => {
		if (timer.value() === 135) {
			setTimerStage(5);
			ding.play();
			timer.reset();
		} else if (timer.value() === 105) {
			setTimerStage(4);
			ding.play();
		} else if (timer.value() === 75) {
			setTimerStage(3);
			ding.play();
		} else if (timer.value() === 45) {
			setTimerStage(2);
			ding.play();
		}
	});

	onMount(() => {
		ding.volume = 0.2;
	});

	return (
		<>
			<div class="flex flex-row space-x-1 ml-1 mb-2">
				<button onClick={() => (timer.isRunning() ? resetTimer() : startTimer())}>
					<Icon
						name={timer.isRunning() ? "restart" : "play"}
						extraClass="w-6 h-6 fill-neutral-400 hover:fill-neutral-500  transition-colors"
					/>
				</button>
			</div>
			<div class="relative w-full border-b-4 border-neutral-300 left-2">
				<div
					class="absolute top-0 left-0 border-b-4 border-amber-700 w-0 transition-all ease-linear"
					style={{
						width: `${Math.min(timerStage(), 4) * 25}%`,
						// TODO use another approach, animation seems to be paused when tab is inactive
						"transition-duration": timerStage() === 0 ? "0s" : timerStage() === 1 ? "45s" : "30s",
					}}
				/>

				<div
					class="absolute w-3 h-3 bg-neutral-300 rounded-full -top-[0.25rem]"
					classList={{ "bg-amber-700": timerStage() >= 1 }}
				/>
				<div
					class="absolute w-3 h-3 bg-neutral-300 rounded-full -top-[0.25rem] left-[25%]"
					classList={{ "bg-amber-700": timerStage() >= 2 }}
				/>
				<div
					class="absolute w-3 h-3 bg-neutral-300 rounded-full -top-[0.25rem] left-[50%]"
					classList={{ "bg-amber-700": timerStage() >= 3 }}
				/>
				<div
					class="absolute w-3 h-3 bg-neutral-300 rounded-full -top-[0.25rem] left-[75%]"
					classList={{ "bg-amber-700": timerStage() >= 4 }}
				/>
				<div
					class="absolute w-3 h-3 bg-neutral-300 rounded-full -top-[0.25rem] left-[100%]"
					classList={{ "bg-amber-700": timerStage() >= 5 }}
				/>

				<Icon
					name="coffee"
					extraClass="absolute fill-neutral-200 w-16 h-16 bottom-4 left-[calc(100%-1.5rem)]"
					extraClassList={{ "fill-amber-700": timerStage() >= 5 }}
				/>
			</div>

			<div class="relative w-full grid grid-cols-4 mt-4">
				<div class="space-y-1">
					<div class="text-neutral-500">0:00</div>
					<ol class="text-lg">
						<li>
							Bloom with <b>{brew.bloom()}ml</b>
						</li>
						<li>Swirl</li>
					</ol>
				</div>
				<div class="space-y-1">
					<div class="text-neutral-500">0:45</div>
					<ol class="text-lg">
						<li>
							Pour <b>{brew.first()}ml</b> in 30s
						</li>
						<li>
							(Total: <b>{brew.totalFirst()}ml</b>)
						</li>
					</ol>
				</div>
				<div class="space-y-1">
					<div class="text-neutral-500">1:15</div>
					<ol class="text-lg">
						<li>
							Pour <b>{brew.second()}ml</b> in 30s
						</li>
						<li>
							(Total: <b>{brew.totalSecond()}ml</b>)
						</li>
					</ol>
				</div>
				<div class="space-y-1">
					<div class="text-neutral-500">1:45</div>

					<ol class="text-lg">
						<li>Stir</li>
						<li>Swirl</li>
						<li>Let it Draw Down</li>
					</ol>
				</div>
			</div>
		</>
	);
};
