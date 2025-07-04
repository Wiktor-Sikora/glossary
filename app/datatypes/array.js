// would do it differently, but reactive arrays are not supported :(

import {getUUID} from "../utils/uujd.js";

export function generateRandomArray(length, maxValue = 50, minValue = 1, shouldBeSorted = false) {
    let array = Array(length);

    for (let i = 0; i < array.length; i++) {
        array[i] = {
            id: getUUID(),
            value: Math.floor(Math.random() * (maxValue - minValue + 1)) + minValue,
            state: 1
        }
    }

    if (shouldBeSorted) {
        array.sort((a, b) => a.value - b.value);
    }

    return array;
}

export function changeStateArea(array, startIndex, endIndex, stateValue) {
    for (let i = startIndex; i <= endIndex; i++) {
        array[i].state = stateValue;
    }
}

export function reorder(array) {
    let currentIndex = array.length;

    while (currentIndex !== 0) {

        let randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;

        [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
    }

    return array
}
