import { Component, createEffect, createSignal } from "solid-js";
import { Adjuster, FancyInput, Icon } from "./components";
import { useBrewCalculator, useComplicatedNumber } from "./hooks";

const App: Component = () => {
	const [waterValue, setWaterValue, water] = useComplicatedNumber(500);
	const [coffeeValue, setCoffeeValue, coffee] = useComplicatedNumber(30);
	const brew = useBrewCalculator(waterValue, coffeeValue);
	const [timerStage, setTimerStage] = createSignal(0);
	const [timer, setTimer] = createSignal(0);
	let timerInterval = 0;

	const onWaterChange = (value: number | ((v: number) => number)) => {
		const finalValue = typeof value === "number" ? value : value(waterValue());
		setWaterValue(finalValue);
		setCoffeeValue(Math.round((finalValue / 1000) * 60));
	};

	const onCoffeeChange = (value: number | ((v: number) => number)) => {
		const finalValue = typeof value === "number" ? value : value(coffeeValue());
		setCoffeeValue(finalValue);
		setWaterValue(Math.round((finalValue / 60) * 1000));
	};

	const startTimer = () => {
		if (timerInterval) return;
		setTimerStage(1);
		setTimer(0);
		timerInterval = setInterval(() => setTimer((t) => t + 0.1), 100);
	};

	const resetTimer = (clearStage = false) => {
		setTimer(0);
		clearInterval(timerInterval);
		timerInterval = 0;
		if (clearStage) setTimerStage(0);
	};

	createEffect(() => {
		if (timer() >= 135) {
			setTimerStage(5);
			resetTimer();
		} else if (timer() >= 105) setTimerStage(4);
		else if (timer() >= 75) setTimerStage(3);
		else if (timer() >= 45) setTimerStage(2);
	});

	return (
		<div class="flex flex-col text-neutral-800">
			<div
				class="h-64 flex justify-center items-center"
				style={{
					"background-image": "url(./img/coffee-bg-min.jpg)",
				}}
			>
				<h1 class="text-center text-7xl my-8 text-neutral-100 font-light bg-black bg-opacity-60 px-12 py-6">
					V60 Coffee Brewing Calculator
				</h1>
			</div>

			<div class="w-full max-w-5xl mx-auto">
				<div class="grid grid-cols-2 my-12">
					<div class="mx-auto">
						<div class="text-center text-3xl">Water</div>
						<FancyInput
							value={waterValue()}
							onKeyUp={(e) => onWaterChange(+e.currentTarget.value)}
							onChange={water.serialize}
							unit="ml"
						/>
						<Adjuster steps={[-100, -50, -25, 25, 50, 100]} onAdjust={(v) => onWaterChange((w) => w + v)} />
					</div>

					<div class="mx-auto">
						<div class="text-center text-3xl">Coffee</div>
						<FancyInput
							value={coffeeValue()}
							onKeyUp={(e) => onCoffeeChange(+e.currentTarget.value)}
							onChange={coffee.serialize}
							unit="gr"
						/>
						<Adjuster steps={[-10, -5, -1, 1, 5, 10]} onAdjust={(v) => onCoffeeChange((c) => c + v)} />
					</div>
				</div>

				<div class="mt-24 px-12">
					<div class="flex flex-row space-x-1 ml-1 mb-2">
						<button onClick={startTimer}>
							<Icon name="play" extraClass="w-6 h-6 fill-neutral-500" />
						</button>
						<button onClick={() => resetTimer(true)}>
							<Icon name="restart" extraClass="w-5 h-5 fill-neutral-500" />
						</button>
					</div>
					<div class="relative w-full border-b-4 border-neutral-300 left-2">
						<div
							class="absolute top-0 left-0 border-b-4 border-amber-700 w-0 transition-all ease-linear"
							style={{
								width: `${Math.min(timerStage(), 4) * 25}%`,
								"transition-duration": timerStage() === 0 ? "0s" : timerStage() === 1 ? "45s" : "30s",
							}}
						/>

						<Icon
							name="coffee"
							extraClass="absolute fill-neutral-200 w-16 h-16 bottom-4 left-[calc(100%-1.5rem)]"
							extraClassList={{ "fill-amber-700": timerStage() >= 5 }}
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
				</div>
			</div>
		</div>
	);
};

export default App;
