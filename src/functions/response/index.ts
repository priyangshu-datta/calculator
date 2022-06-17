type error = {
    code: string;
    index: `${number}..${number}` | number[];
}[];

const response = (
    error: error | null,
    result: string | null
): { error: error; result: string } => {
    if (error !== null)
        return {
            error,
            result: "",
        };
    if (result !== null)
        return {
            error: [],
            result,
        };
    return {
        error: [],
        result: "",
    };
};

export { response };
