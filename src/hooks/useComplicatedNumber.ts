import { Accessor, createMemo, createSignal } from "solid-js";

// I know, very creative name
type UseComplicatedNumberReturn = [
	Accessor<number>,
	(v: number) => void,
	{
		serialize: () => void;
		add: (v: number) => void;
	}
];

export const useComplicatedNumber = (initialValue: number): UseComplicatedNumberReturn => {
	const [_value, _setValue] = createSignal(initialValue.toString());

	const value = createMemo(() => +_value() || 0);
	const setValue = (value: number) => {
		const roundedValue = Math.max(0, Math.round(+value));
		_setValue(roundedValue.toString());
	};

	const serialize = () => _setValue((c) => (+c).toString());
	const add = (value: number) => {
		setValue(+_value() + value);
	};

	return [value, setValue, { serialize, add }];
};
