import { Component } from "solid-js";
import { setState } from "../store/modal";
import { history } from "../store/history";
import { setExpression } from "../store/current";
import { setPrevious } from "../store/previous";

const index: Component = () => {
    // bg-[#606c9042]
    return (
        <div
            class="absolute inset-0 bg-[#606c9042] grid place-items-center cursor-alias z-20"
            onClick={() => setState(false)}
        >
            <div
                onClick={(e) => e.stopImmediatePropagation()}
                class="shadow-md shadow-black min-w-[350px] max-w-[40vw] relative bg-black text-white text-center h-fit pt-8 pb-6 px-4 max-h-[70vh] rounded-md cursor-default"
            >
                <div class="overflow-y-auto grid gap-2 px-2">
                    {history().length > 0 ? (
                        history().map((h) => {
                            return (
                                <div
                                    class="grid grid-cols-3 cursor-pointer"
                                    onClick={() => {
                                        setExpression(h.expression);
                                        setPrevious(`Ans=${h.result}`);
                                    }}
                                    tabIndex="0"
                                >
                                    <div class="border-2 px-4 py-1 rounded-md font-semibold overflow-x-auto">
                                        {h.expression}
                                    </div>
                                    <div class="flex flex-col justify-center">
                                        {"="}
                                    </div>
                                    <div class="border-2 px-4 py-1 rounded-md font-semibold overflow-x-auto">
                                        {h.result}
                                    </div>
                                </div>
                            );
                        })
                    ) : (
                        <span class="text-gray-400 select-none">
                            Nothing yet
                        </span>
                    )}
                </div>
                <button
                    class="bg-[rgb(72,83,90)] px-4 py-2 mt-4 rounded-lg font-semibold select-none"
                    onClick={() => setState(false)}
                >
                    Close
                </button>
            </div>
        </div>
    );
};

export default index;

// hsla(224, 20%, 47%, 0.68)
