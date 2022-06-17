import { createSignal } from "solid-js";

const [history, createHistory] = createSignal(
    [] as { expression: string; result: string }[]
);

export { history, createHistory };
