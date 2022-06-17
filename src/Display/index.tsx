import { Component } from "solid-js";
import History from "./icons/history";
import { expression } from "../store/current";
import { previous } from "../store/previous";

const index: Component = () => {
    return (
        <div class="w-[min(100%-2rem)] m-auto px-4 py-2 mt-3 grid text-black font-semibold rounded-md bg-blue-100 relative ">
            <History className="w-fit cursor-pointer" />
            <div class="w-fit ml-auto ">{previous()}</div>
            <div class="w-full overflow-x-auto overflow-y-hidden [scrollbar-width:none] text-3xl col-span-2 flex flex-row-reverse">
                {expression()}
            </div>
        </div>
    );
};

export default index;
