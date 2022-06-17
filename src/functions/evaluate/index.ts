
const scope_eval = (str: string | undefined) => {
    if (str === undefined) return "";
    let result: any;
    str = str.replace(/[^\+]\-/g, (expr) => {
        return expr.replace("-", "+-");
    }); // converting - to +- so that subtraction can be handled by addition

    // parse percentage
    str = str.replace(/\d+(\.\d+)?%/g, (match) => {
        return `${parseFloat(match.slice(0, -1)) / 100}`;
    });

    //parse division
    {
        const evalDIV = (expr: string) => {
            let mult: boolean = false; // if a number is to be multipied after division conserve that operation
            if (expr.includes("*")) {
                // remove * so as to operate division
                expr = expr.replace("*", "");
                mult = true;
            }
            let ops: string[] = expr.split("/");
            let result = parseFloat(ops[0]) / parseFloat(ops[1]);
            return mult /* if multiplication is next insert that symbol */
                ? `*${result}`
                : result > 0
                ? /* As + was stripped by parseFloat, + is inserted once again */ `+${result}`
                : /* No need to insert + as it was done at the beginning */ `${result}`;
        };

        str = str.replace(/[\+\-\*]?\d+(\.\d+)?\/-?\d+(\.\d+)?/g, (match) => {
            return evalDIV(match);
        });
    }
    //parse multiplication
    {
        const evalMULT = (expr: string) => {
            let ops: string[] = expr.split("*");
            ops = ops.map((o) => o.replace("+-", "-"));
            let result = parseFloat(ops[0]) * parseFloat(ops[1]);
            return result > 0 ? `+${result}` : `${result}`;
        };

        str = str.replace(/[\+\-]?\d+(\.\d+)?\*(\+-)?\d+(.\d+)?/g, (match) => {
            return evalMULT(match);
        });
    }

    //parse addtion
    {
        result = str.split("+").reduce((sum, num) => {
            return sum + parseFloat(num.length > 0 ? num : "0");
        }, 0);
    }

    return `${result}`;
};

const evaluate = (str: string) => {
    let stack: string[] = [];
    let exps: string[] = [];

    let exp: string = "";

    str.split("").forEach((b) => {
        if (`${stack[stack.length - 1]}${b}` === "()") {
            stack.pop();
            exps.push(exp);
            let result = scope_eval(exps.pop());
            exps.push(`${exps.pop() ?? ""}${result}`);
            exp = exps.pop() as string;
        } else {
            if (["(", ")"].includes(b)) {
                stack.push(b);
                if (exp.length > 0) exps.push(exp);
                exp = "";
            } else {
                exp = exp.concat(b);
            }
        }
    });
    return exp;
};

export { evaluate };
