class VisualVariables {
    constructor(variables = []) {
        this._variables = [];

        for (let config of variables) {
            let variable = {};
            variable.element = document.getElementById(config.id);
            variable.valueElement = variable.element.querySelectorAll("span")[1];
            variable.defaultHide = config.hide;
            variable.defaultValue = config.value;

            this._variables[config.id] = variable;

            if (variable.defaultHide) this.hide(config.id);
            variable.valueElement.innerText = config.value;
        }
    }

    hide(variableId) {
        if (this._variables[variableId]) this._variables[variableId].element.style.display = "none";
    }

    show(variableId) {
        if (this._variables[variableId]) this._variables[variableId].element.style.display = "inline-block";
    }

    setValue(variableId, value) {
        if (this._variables[variableId]) {
            this._variables[variableId].valueElement.innerText = value;
        }
    }

    reset() {
        for (let variableId in this._variables) {
            this._variables[variableId].valueElement.innerText = this._variables[variableId].defaultValue;
            if (this._variables[variableId].defaultHide) this.hide(variableId);
        }
    }
}

export default VisualVariables;