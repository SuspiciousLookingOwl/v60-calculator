import { Accessor, createEffect, createMemo, createSignal } from "solid-js";

export const useBrewCalculator = (water: Accessor<number>, coffee: Accessor<number>) => {
	const [bloom, setBloom] = createSignal(0);
	const [first, setFirst] = createSignal(0);
	const [second, setSecond] = createSignal(0);

	createEffect(() => {
		setBloom(Math.round(coffee() * 2));
		setFirst(Math.round(water() * 0.6 - bloom()));
		setSecond(Math.round(water() - first() - bloom()));
	});

	const totalFirst = createMemo(() => bloom() + first());
	const totalSecond = createMemo(() => totalFirst() + second());

	return { bloom, first, second, totalFirst, totalSecond };
};
