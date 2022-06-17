import { Component } from "solid-js";
import { updateExpression } from "../../store/current";

const index: Component<{ name: string; value: string }> = ({ name, value }) => {
    return (
        <button
            onClick={(e) => updateExpression(e.currentTarget.textContent)}
            name={value}
            class="grid place-items-center font-semibold cursor-pointer bg-blue-100 text-black w-full h-full rounded-md py-1 shadow-lg active:shadow-none hover:shadow-md"
            data-value={name}
        >
            {value}
        </button>
    );
};

export default index;
