import { Component } from "solid-js";
import Button from "./Button";

const index: Component<{}> = (props) => {
    return (
        <div class="w-[min(100%-2rem)] py-2 grid grid-cols-4 gap-4 place-items-center mx-auto my-2">
            {"(,),%,AC,7,8,9,/,4,5,6,*,1,2,3,-,0,.,=,+".split(",").map((v) => {
                let n = v;
                if (v === "/") {
                    v = "÷";
                } else if (v === "*") {
                    v = "×";
                } else if (v === "-") {
                    v = "−";
                }
                return <Button name={n} value={v} />;
            })}
        </div>
    );
};

export default index;
