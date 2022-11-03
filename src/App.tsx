import { Component } from "solid-js";
import { Adjuster, FancyInput, Icon } from "./components";
import { useBrewCalculator, useComplicatedNumber } from "./hooks";

const App: Component = () => {
	const [waterValue, setWaterValue, water] = useComplicatedNumber(500);
	const [coffeeValue, setCoffeeValue, coffee] = useComplicatedNumber(30);
	const brew = useBrewCalculator(waterValue, coffeeValue);

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
						<Adjuster steps={[-25, -15, -5, 5, 15, 25]} onAdjust={(v) => onCoffeeChange((c) => c + v)} />
					</div>
				</div>

				<div class="mt-24 px-12">
					<div class="relative w-full border-b-2 border-neutral-300 left-1">
						<Icon
							name="coffee"
							extraClass="absolute fill-neutral-200 w-16 h-16 bottom-4 left-[calc(100%-1.5rem)]"
						/>

						<div class="absolute w-2 h-2 bg-neutral-300 rounded-full -top-[0.175rem]" />
						<div class="absolute w-2 h-2 bg-neutral-300 rounded-full -top-[0.175rem] left-[25%]" />
						<div class="absolute w-2 h-2 bg-neutral-300 rounded-full -top-[0.175rem] left-[50%]" />
						<div class="absolute w-2 h-2 bg-neutral-300 rounded-full -top-[0.175rem] left-[75%]" />
						<div class="absolute w-2 h-2 bg-neutral-300 rounded-full -top-[0.175rem] left-[100%]" />
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
