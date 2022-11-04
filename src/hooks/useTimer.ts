import { createSignal } from "solid-js";
import { clearInterval, setInterval } from "worker-timers";

export const useTimer = () => {
	const [timer, setTimer] = createSignal(0);
	const [isRunning, setIsRunning] = createSignal(false);

	let timerInterval = 0;

	const start = () => {
		if (isRunning()) return;
		setIsRunning(true);
		setTimer(0);
		timerInterval = setInterval(() => setTimer((t) => t + 1), 1000);
	};

	const reset = () => {
		setTimer(0);
		clearInterval(timerInterval);
		setIsRunning(false);
	};

	return {
		value: timer,
		isRunning,
		start,
		reset,
	};
};
