class Node {
    constructor(text) {
        this.left = null;
        this.right = null;

        this._createElement(text);
    }

    _createElement(text) {
        this._element = document.createElement("div");
        this._element.classList.add("calculation-structure__node");

        this._itemElement = document.createElement("div");
        this._itemElement.classList.add("calculation-structure__item");
        this._itemElement.innerText = text;
        this._element.appendChild(this._itemElement);
    }

    setText(text) {
        this._itemElement.innerText = text;
    }

    addOperation(operation) {
        const operationEl = document.createElement("div");
        operationEl.classList.add("calculation-structure__operation");
        operationEl.innerText = operation;
        this._element.appendChild(operationEl);
    }

    setAsRoot(parentEl) {
        this._element.classList.add("calculation-structure__node--root");
        parentEl.appendChild(this._element);
    }

    setLeftChild(node, spaceMultiplier = 1) {
        this.left = node;
        node.appendAsLeftChild(this._element, spaceMultiplier);
    }

    appendAsLeftChild(parentEl, spaceMultiplier) {
        this._element.classList.add("calculation-structure__left-child");
        switch (spaceMultiplier) {
            case 3:
                this._element.classList.add("calculation-structure__left-child--triple-space");
                break;
            case 2:
                this._element.classList.add("calculation-structure__left-child--double-space");
                break;
        }
        parentEl.appendChild(this._element);
    }

    setRightChild(node, spaceMultiplier = 1) {
        this.right = node;
        node.appendAsRightChild(this._element, spaceMultiplier);
    }

    appendAsRightChild(parentEl, spaceMultiplier) {
        this._element.classList.add("calculation-structure__right-child");
        switch (spaceMultiplier) {
            case 3:
                this._element.classList.add("calculation-structure__right-child--triple-space");
                break;
            case 2:
                this._element.classList.add("calculation-structure__right-child--double-space");
                break;
        }
        parentEl.appendChild(this._element);
    }

    removeElement() {
        this._element.remove();
    }
}

class CalculationStructure {
    constructor(elementId) {
        this._element = document.getElementById(elementId);
        this._nodes = [];
    }

    pushItem(text, parentNodeId, left = true, spaceMultiplier) {
        const newNode = new Node(text);
        
        if (this._nodes.length === 0) {
            newNode.setAsRoot(this._element);
            this._nodes.push(newNode);
            return this._nodes.length-1;
        }

        if (left) {
            this._nodes[parentNodeId].setLeftChild(newNode, spaceMultiplier);
        } else {
            this._nodes[parentNodeId].setRightChild(newNode, spaceMultiplier);
        }
        this._nodes.push(newNode);
        return this._nodes.length-1;
    }

    addOperationSign(operation, id) {
        this._nodes[id].addOperation(operation);
    }

    setText(text, id) {
        this._nodes[id].setText(text);
    }

    reset() {
        while (this._nodes.length > 0) {
            const node = this._nodes.pop();
            node.removeElement();
        }
    }
}

export default CalculationStructure;