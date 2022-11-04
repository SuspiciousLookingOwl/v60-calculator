import { Component } from "solid-js";
import { BrewTimeline, FancyInput } from "./components";
import { useCoffeeRatio } from "./hooks";

const App: Component = () => {
	const { waterValue, setWaterValue, coffeeValue, setCoffeeValue, serializeWater, serializeCoffee } =
		useCoffeeRatio();

	return (
		<div class="flex flex-col text-neutral-800">
			<div
				class="h-64 flex justify-center items-center bg-no-repeat bg-cover"
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
					<FancyInput
						title="Water"
						unit="ml"
						value={waterValue()}
						onKeyUp={(e) => setWaterValue(+e.currentTarget.value)}
						onAdjust={(v) => setWaterValue((w) => w + v)}
						onChange={serializeWater}
						steps={[-100, -50, -25, 25, 50, 100]}
					/>

					<FancyInput
						title="Coffee"
						unit="gr"
						value={coffeeValue()}
						onKeyUp={(e) => setCoffeeValue(+e.currentTarget.value)}
						onAdjust={(v) => setCoffeeValue((c) => c + v)}
						onChange={serializeCoffee}
						steps={[-10, -5, -1, 1, 5, 10]}
					/>
				</div>

				<div class="mt-24 px-12">
					<BrewTimeline coffee={coffeeValue()} water={waterValue()} />
				</div>
			</div>
		</div>
	);
};

export default App;
