import { Component, onMount } from "solid-js";
import Buttons from "../Buttons";
import Display from "../Display";
import { updateExpression } from "../store/current";
import Modal from "../modal";
import { state } from "../store/modal";

const index: Component = () => {
    onMount(() => {
        document.body.onkeydown = (e) => {
            if (
                "1 2 3 4 5 6 7 8 9 0 % . + - * / ( ) enter backspace delete escape h"
                    .split(" ")
                    .includes(e.key.toLowerCase())
            ) {
                let key = e.key.toLowerCase();
                if (key === "enter") {
                    key = "=";
                }
                if (key === "backspace") {
                    key = "CE";
                }
                if (key === "delete") {
                    key = "AC";
                }
                updateExpression(key.toUpperCase());
            }
            // console.log(e.key);
        };
    });
    return (
        <>
            {state() ? <Modal /> : ""}
            <div class="bg-blue-300 shadow-xl shadow-blue-200 w-[min(100%-2rem)] mx-auto h-max py-2 mt-8 min-w-[350px]">
                <Display />
                <Buttons />
            </div>
        </>
    );
};

export default index;
