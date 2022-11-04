import { createEffect, onMount } from "solid-js";
import { useComplicatedNumber } from "./useComplicatedNumber";

export const useCoffeeRatio = () => {
	const [waterValue, _setWaterValue, water] = useComplicatedNumber(0);
	const [coffeeValue, _setCoffeeValue, coffee] = useComplicatedNumber(30);

	const setWaterValue = (value: number | ((v: number) => number)) => {
		const finalValue = typeof value === "number" ? value : value(waterValue());
		_setWaterValue(finalValue);
		_setCoffeeValue((finalValue / 1000) * 60);
	};

	const setCoffeeValue = (value: number | ((v: number) => number)) => {
		const finalValue = typeof value === "number" ? value : value(coffeeValue());
		_setCoffeeValue(finalValue);
		_setWaterValue((finalValue / 60) * 1000);
	};

	createEffect(() => {
		if (waterValue()) localStorage.setItem("water", waterValue().toString());
	});

	onMount(() => {
		setWaterValue(+(localStorage.getItem("water") || 500));
	});

	return {
		waterValue,
		coffeeValue,
		serializeWater: water.serialize,
		serializeCoffee: coffee.serialize,
		setWaterValue,
		setCoffeeValue,
	};
};
