import { createSignal } from "solid-js";
import { ERROR } from "../functions/constants";
import { expr_eval, parser } from "../functions/parse";
import { createHistory } from "./history";
import { setState, state } from "./modal";
import { previous, setPrevious } from "./previous";

const [expression, setExpression] = createSignal("0");

const updateExpression = (btn_name: string | null) => {
    if (btn_name === null) return;
    if (btn_name === "H") {
        setState(true);
        return;
    }
    if (state()) {
        if (["=", "ESCAPE"].includes(btn_name)) {
            setState(false);
            return;
        } else {
            return;
        }
    }
    if (btn_name === "AC") {
        setPrevious(() => `Ans=${expression()}`);
        setExpression(() => "0");
        var x = document.querySelector("[data-value='AC']");
        if (x !== null) {
            x.innerHTML = "CE";
        }
        return;
    }
    if (btn_name === "CE") {
        setExpression((prev) => {
            let exp = prev.slice(0, -1);
            return exp.length > 0 ? exp : "0";
        });
    }
    if (
        //initially allow only numbers, open brackets
        expression() === "0" &&
        ["+", "/", "*", "%", ")", "=", "AC", "CE", "ESCAPE"].includes(btn_name)
    )
        return;
    if (expression() === "0") {
        setExpression(() =>
            btn_name === "." ? `0${btn_name}` : `${btn_name}`
        );
        setPrevious((prev) => {
            if (prev !== "Ans=0") {
                return prev;
            }
            return "Ans=0";
        });
        var x = document.querySelector("[data-value='AC']");
        if (x !== null) {
            x.innerHTML = "CE";
        }
    } else if (
        expression() !== "0" &&
        !["=", "AC", "CE", "ESCAPE"].includes(btn_name)
    ) {
        let err = parser(`${expression()}${btn_name}`);
        if (err.length > 0) {
            if (err.some((er) => er.code !== ERROR.bracket_error)) return;
        }
        if (
            previous().includes("=") &&
            expression().match(/^\d+(\.\d+)?$/g) &&
            "1234567890.".includes(btn_name)
        ) {
            setPrevious(() => `Ans=${expression()}`);
            setExpression(() => `${btn_name}`);
        } else setExpression((prev) => `${prev}${btn_name}`);
        var x = document.querySelector("[data-value='AC']");
        if (x !== null) {
            x.innerHTML = "CE";
        }
    }
    if (btn_name === "=") {
        let err = parser(`${expression()}${btn_name}`);
        for (let i = 0; i < err.length; i++) {
            let er = err[i];
            if (er.code === ERROR.bracket_error) {
                return;
            }
        }
        var x = document.querySelector("[data-value='AC']");
        if (x !== null) {
            x.innerHTML = "AC";
        }
        let response = expr_eval(expression());
        setPrevious(`${expression()}=`);
        createHistory((prev) => [
            ...prev,
            {
                expression: expression(),
                result: response.result,
            },
        ]);
        setExpression(response.result);
    }
};

export { expression, setExpression, updateExpression };
