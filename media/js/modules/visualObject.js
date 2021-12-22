class VisualObject {
    constructor(elementId, valueElementIds) {
        this._el = document.getElementById(elementId);

        this._valueElements = {};
        this._defaultValues = {};
        for (let id of valueElementIds) {
            this._valueElements[id] = document.getElementById(id);
            this._defaultValues[id] = this._valueElements[id].innerText;
        }

        this.hide();
    }

    hide() {
        this._el.style.visibility = "hidden";
    }

    show() {
        this._el.style.visibility = "visible";
    }

    setValue(key, value) {
        this._valueElements[key].innerText = value;
    }

    reset() {
        this.hide();

        for (let key in this._valueElements) {
            this._valueElements[key].innerText = this._defaultValues[key];
        }
    }
}

export default VisualObject;