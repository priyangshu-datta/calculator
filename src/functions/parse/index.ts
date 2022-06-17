import { ERROR } from "../constants";
import { evaluate } from "../evaluate";
import { response } from "../response";

type error = {
    code: string;
    index: `${number}..${number}` | number[];
}[];

const error_maker = (
    error: error,
    err: string[] | null,
    str: string,
    code: ERROR
) => {
    if (err !== null) {
        err.forEach((er) => {
            let i = str.indexOf(er);
            error.push({
                code: code,
                index: `${i + 1}..${i + er.length}`,
            });
        });
    }
};

const parser = (str: string) => {
    let error: error = [];

    // bracket error
    let stack: string[] = [];
    str.split("").forEach((b) => {
        if (["(", ")"].includes(b))
            if (`${stack[stack.length - 1]}${b}` === "()") stack.pop();
            else stack.push(b);
    });
    if (stack.length > 0) {
        error.push({
            code: ERROR.bracket_error,
            index: stack.map((b) => stack.lastIndexOf(b)),
        });
    }

    // decimal error
    let deci_err = str.match(/\d+(\.{2,})/g) as string[];
    error_maker(error, deci_err, str, ERROR.decimal_error);
    deci_err = str.match(/(\d+(\.)){2,}/g) as string[];
    error_maker(error, deci_err, str, ERROR.decimal_error);
    // operator error
    let reg1: RegExp = /\d+(\.\d+)?[\+\-\*\/]+[*\/]/g;
    let reg2: RegExp = /\d+(\.\d+)?[\*\/]([\+\-][\+\-\*\/]+)/g;
    let reg3: RegExp = /\D%/g;
    let operator_err = str.match(reg1) as string[];
    error_maker(error, operator_err, str, ERROR.operator_error);
    operator_err = str.match(reg2) as string[];
    error_maker(error, operator_err, str, ERROR.operator_error);
    operator_err = str.match(reg3) as string[];
    error_maker(error, operator_err, str, ERROR.operator_error);

    return error;
};

const expr_eval = (str: string) => {
    let error = parser(str);
    if (error.length > 0) return response(error, null);
    if (str[0] !== "(") {
        str = `(${str})`;
    }

    let result = evaluate(str);
    return response(null, result);
};

export { expr_eval, parser };
