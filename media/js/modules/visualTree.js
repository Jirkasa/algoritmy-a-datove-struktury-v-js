class Node {
    constructor(value) {
        this.value = value;
        this.left = null;
        this.right = null;

        this._createElement(value);
    }

    _createElement(value) {
        this._element = document.createElement("div");
        this._element.classList.add("tree__node");

        this._circleElement = document.createElement("div");
        this._circleElement.classList.add("tree__node-circle");
        this._circleElement.innerHTML = '<span>' + value + '</span>';
        this._element.appendChild(this._circleElement);
    }

    setAsRoot(parentEl) {
        this._element.classList.add("tree__node--root");
        parentEl.appendChild(this._element);
    }

    setLeft(node, spaceMultiplier) {
        this.left = node;
        node.appendAsLeftChild(spaceMultiplier, this._element);
    }

    setRight(node, spaceMultiplier) {
        this.right = node;
        node.appendAsRightChild(spaceMultiplier, this._element);
    }

    appendAsLeftChild(spaceMultiplier, parentEl) {
        this._element.classList.add("tree__left-child");

        switch (spaceMultiplier) {
            case 3:
                this._element.classList.add("tree__left-child--triple-space");
                break;
            case 2:
                this._element.classList.add("tree__left-child--double-space");
                break;
        }

        parentEl.appendChild(this._element);
    }

    appendAsRightChild(spaceMultiplier, parentEl) {
        this._element.classList.add("tree__right-child");

        switch (spaceMultiplier) {
            case 3:
                this._element.classList.add("tree__right-child--triple-space");
                break;
            case 2:
                this._element.classList.add("tree__right-child--double-space");
                break;
        }

        parentEl.appendChild(this._element);
    }

    attachPointer(pointerEl) {
        this._element.appendChild(pointerEl);
    }

    removeElement() {
        this._element.remove();
    }
}

class VisualTree {
    constructor(elementId, pointerNames = []) {
        this.root = null;
        this._element = document.getElementById(elementId);

        this._pointers = {};
        for (let pointerName of pointerNames) {
            let pointerEl = document.createElement("div");
            pointerEl.classList.add("tree__node-pointer");
            pointerEl.innerHTML = `<div class="tree__node-pointer-label">${pointerName}</div>`;

            this._pointers[pointerName] = pointerEl;
        }
    }

    insert(value) {
        const newNode = new Node(value);

        if (!this.root) {
            newNode.setAsRoot(this._element);
            this.root = newNode;
            return this;
        }

        let current = this.root;

        let spaceMultiplier = 3;

        while (true) {
            if (value === current.value) return undefined;
            if (value > current.value) {
                if (!current.right) {
                    current.setRight(newNode, spaceMultiplier);
                    return this;
                }
                current = current.right;
            } else {
                if (!current.left) {
                    current.setLeft(newNode, spaceMultiplier);
                    return this;
                }
                current = current.left;
            }
            spaceMultiplier--;
        }
    }

    showPointer(pointerName) {
        if (this._pointers[pointerName]) {
            this._pointers[pointerName].style.display = "block";
        }
    }
    hidePointer(pointerName) {
        if (this._pointers[pointerName]) {
            this._pointers[pointerName].style.display = "none";
        }
    }

    setPointerToNode(pointerName, valueOfNode) {
        this.showPointer(pointerName);

        let current = this.root;

        while (current) {
            if (valueOfNode === current.value) {
                if (this._pointers[pointerName]) current.attachPointer(this._pointers[pointerName]);
                return;
            }
            if (valueOfNode > current.value) {
                current = current.right;
            } else {
                current = current.left;
            }
        }
    }

    reset() {
        if (this.root) {
            this.root.removeElement();
            this.root = null;
        }
    }
}

export default VisualTree;