import { Component } from "solid-js";
import { setState } from "../../store/modal";

const history: Component<{ className: string }> = ({ className }) => {
    return (
        <div class={`${className} stroke-2 scale-90`} onClick={()=>setState(true)}>
            <svg xmlns="http://www.w3.org/2000/svg" height="40" width="40">
                <path d="M25.25 26.625 19 20.417V11.625H21.083V19.542L26.708 25.125ZM19.917 34.167Q14.292 34.167 10.229 30.312Q6.167 26.458 5.875 20.833H7.958Q8.292 25.583 11.708 28.833Q15.125 32.083 19.917 32.083Q25 32.083 28.521 28.521Q32.042 24.958 32.042 19.875Q32.042 14.875 28.5 11.396Q24.958 7.917 19.917 7.917Q17.208 7.917 14.812 9.104Q12.417 10.292 10.667 12.333H14.917V14.417H7.083V6.625H9.167V10.792Q11.208 8.458 14 7.146Q16.792 5.833 19.917 5.833Q22.875 5.833 25.458 6.938Q28.042 8.042 29.958 9.958Q31.875 11.875 33 14.438Q34.125 17 34.125 19.958Q34.125 22.917 33 25.5Q31.875 28.083 29.958 30Q28.042 31.917 25.458 33.042Q22.875 34.167 19.917 34.167Z" />
            </svg>
        </div>
    );
};

export default history;
