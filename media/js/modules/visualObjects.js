class VisualObjects {
    constructor(...objects) {
        this._objects = objects;
    }

    get(index) {
        return this._objects[index];
    }

    reset() {
        for (let object of this._objects) {
            object.reset();
        }
    }
}

export default VisualObjects;