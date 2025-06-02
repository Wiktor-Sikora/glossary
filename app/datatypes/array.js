
export  function getArray() {

}
export default class ExtendedArray {
    constructor(length, maxValue = 50, minValue = 1, shouldBeSorted = false) {
        this.array = new Array(length);
        this.generateRandomArray(maxValue, minValue);

        if (shouldBeSorted) {
            this.array.sort((a, b) => a.value - b.value);
        }

        return this
    }

    changeStateArea(startIndex, endIndex, stateValue) {
        for (let i = startIndex; i < endIndex; i++) {
            this.array[i].state = stateValue;
        }

        return this
    }

    generateRandomArray(maxValue = 50, minValue = 1) {
        for (let i = 0; i < this.array.length; i++) {
            this.array[i] = {
                value: Math.floor(Math.random() * (maxValue - minValue) + minValue),
                state: 1
            }
        }

        return this
    }

    reorder() {
        let currentIndex = this.array.length;

        while (currentIndex !== 0) {

            let randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex--;

            [this.array[currentIndex], this.array[randomIndex]] = [this.array[randomIndex], this.array[currentIndex]];
        }

        return this
    }
}