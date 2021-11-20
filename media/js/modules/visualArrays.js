import VisualArray from "./visualArray.js";

class VisualArrays {
    constructor(arrConfigs) {

        this._visualArrays = {};

        for (let config of arrConfigs) {
            let visualArray = new VisualArray(config.id, config.arrayLength, config.hideRangeAtBeginning, config.toMiddle, config.pointers, config.hideArray);
            this._visualArrays[config.id] = visualArray;
        }
    }

    get(id) {
        return this._visualArrays[id];
    }

    reset() {
        for (let key in this._visualArrays) {
            this._visualArrays[key].reset();
        }
    }
}

export default VisualArrays;