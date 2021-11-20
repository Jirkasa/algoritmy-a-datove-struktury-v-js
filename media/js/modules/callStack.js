import Stack from "../modules/stack.js";

class CallStack {
    constructor(elementId) {
        this._element = document.getElementById(elementId);

        this._functionBoxes = new Stack();
        this._availableFunctionBoxes = new Stack();
    }

    push(funcName) {
        if (this._functionBoxes.size !== 0) {
            this._functionBoxes.current.hideIcon();
        }

        let funcBox;
        if (this._availableFunctionBoxes.size !== 0) {
            funcBox = this._availableFunctionBoxes.pop();
            funcBox.show();
            funcBox.showIcon();
            funcBox.changeName(funcName);
        } else {
            funcBox = new FunctionBox(funcName, this._element);
        }
        this._functionBoxes.push(funcBox);
    }

    pop() {
        const funcBox = this._functionBoxes.pop();
        if (funcBox) funcBox.hide();
        if (this._functionBoxes.size !== 0) this._functionBoxes.current.showIcon();
        if (funcBox) this._availableFunctionBoxes.push(funcBox);
    }

    reset() {
        while (this._functionBoxes.size !== 0) this.pop();
    }
}

class FunctionBox {
    constructor(funcName, parentElement) {
        this._el = document.createElement("div");
        this._el.classList.add("call-stack-box");
        parentElement.appendChild(this._el);

        this._icon = document.createElement("span");
        this._icon.innerHTML = `
            <svg class="call-stack-box__icon">
                <use xlink:href="../media/img/icon-sprite.svg#icon-arrow-right"></use>
            <svg>
        `;
        this._el.appendChild(this._icon);

        this._textEl = document.createElement("span");
        this._textEl.innerText = funcName;
        this._el.appendChild(this._textEl);


    }

    changeName(funcName) {
        this._textEl.innerText = funcName;
    }

    show() {
        this._el.style.display = "block";
    }
    showIcon() {
        this._icon.style.display = "block";
    }

    hide() {
        this._el.style.display = "none";
    }
    hideIcon() {
        this._icon.style.display = "none";
    }
}

export default CallStack;