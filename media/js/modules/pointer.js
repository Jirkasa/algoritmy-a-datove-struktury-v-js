class Pointer {
    constructor(name) {
        this._el = document.createElement("div");
        this._el.classList.add("node__pointer");
        this._el.innerHTML = `<div class="node__pointer-label">${name}</div>`;

        this.name = name;

        this._node = null;
    }

    show() {
        this._el.style.display = "block";
        if (this._node) this._node.attachPointer(this, this._el);
    }
    hide() {
        this._el.style.display = "none";
        if (this._node) this._node.detachPointer(this);
    }

    setToLeftSide() {
        this._el.classList.remove("node__pointer--right");
        this._el.classList.add("node__pointer--left");
    }
    setToRightSide() {
        this._el.classList.remove("node__pointer--left");
        this._el.classList.add("node__pointer--right");
    }
    setToMiddle() {
        this._el.classList.remove("node__pointer--left");
        this._el.classList.remove("node__pointer--right");
    }

    moveToNode(node) {
        if (this._node) this._node.detachPointer(this);
        this._node = node;
        node.attachPointer(this, this._el);
    }

    reset() {
        this.hide();
        this._node = null;
    }
}

export default Pointer;