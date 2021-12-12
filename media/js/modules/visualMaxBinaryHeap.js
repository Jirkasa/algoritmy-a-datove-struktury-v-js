class Node {
    constructor(value) {
        this.value = value;

        this._createElement(value);

        this.hasLeftChild = false;
        this.hasRightChild = false;
    }

    _createElement(value) {
        this._element = document.createElement("div");
        this._element.classList.add("tree__node");

        this._circleElement = document.createElement("div");
        this._circleElement.classList.add("tree__node-circle");
        this._circleElement.innerHTML = '<span>' + value + '</span>';
        this._element.appendChild(this._circleElement);
    }

    setValue(value) {
        this.value = value;
        this._circleElement.innerHTML = '<span>' + value + '</span>';
    }

    setAsRoot(parentEl) {
        this._element.classList.add("tree__node--root");
        parentEl.appendChild(this._element);
    }

    setAsChild(spaceMultiplier, parentNode) {
        parentNode.addChild(spaceMultiplier, this._element);
    }

    addChild(spaceMultiplier, el) {
        if (!this.hasLeftChild) {
            el.classList.add("tree__left-child");

            switch (spaceMultiplier) {
                case 3:
                    el.classList.add("tree__left-child--triple-space");
                    break;
                case 2:
                    el.classList.add("tree__left-child--double-space");
                    break;
            }

            this.hasLeftChild = true;
        } else {
            el.classList.add("tree__right-child");

            switch (spaceMultiplier) {
                case 3:
                    el.classList.add("tree__right-child--triple-space");
                    break;
                case 2:
                    el.classList.add("tree__right-child--double-space");
                    break;
            }

            this.hasRightChild = true;
        }

        this._element.appendChild(el);
    }

    attachPointer(pointerEl) {
        this._element.appendChild(pointerEl);
    }

    removeElement() {
        this._element.remove();
    }
}

class VisualMaxBinaryHeap {
    constructor(elementId, pointerNames = []) {
        this.values = [];
        this._element = document.getElementById(elementId);

        this._pointers = {};
        for (let pointerName of pointerNames) {
            let pointerEl = document.createElement("div");
            pointerEl.classList.add("tree__node-pointer");
            pointerEl.innerHTML = `<div class="tree__node-pointer-label">${pointerName}</div>`;

            this._pointers[pointerName] = pointerEl;
        }
    }

    insertWithoutBubbleUp(value, twoLevels = false) {
        const newNode = new Node(value);
        this.values.push(newNode);
        const parentIdx = Math.trunc((this.values.length-2)/2);

        let spaceMultiplier = twoLevels ? 2 : 3;
        switch (parentIdx) {
            case 1: case 2:
                spaceMultiplier = twoLevels ? 1 : 2;
                break;
            case 3: case 4: case 5: case 6:
                spaceMultiplier = 1;
                break;
        }
        
        if (this.values.length === 1) {
            newNode.setAsRoot(this._element);
        } else {
            newNode.setAsChild(spaceMultiplier, this.values[parentIdx]);
        }
    }

    insert(value, twoLevels = false) {
        const newNode = new Node(value);
        this.values.push(newNode);
        const parentIdx = Math.trunc((this.values.length-2)/2);

        let spaceMultiplier = twoLevels ? 2 : 3;
        switch (parentIdx) {
            case 1: case 2:
                spaceMultiplier = twoLevels ? 1 : 2;
                break;
            case 3: case 4: case 5: case 6:
                spaceMultiplier = 1;
                break;
        }
        
        if (this.values.length === 1) {
            newNode.setAsRoot(this._element);
        } else {
            newNode.setAsChild(spaceMultiplier, this.values[parentIdx]);
        }

        this.bubbleUp();
    }

    bubbleUp() {
        let idx = this.values.length-1;

        while (idx > 0) {
            const parentIndex = Math.trunc((idx-1)/2);

            if (this.values[idx].value <= this.values[parentIndex].value) break;

            const parent = this.values[parentIndex].value;
            this.values[parentIndex].setValue(this.values[idx].value);
            this.values[idx].setValue(parent);

            idx = parentIndex;
        }
    }

    pop() {
        const removedNode = this.values.pop();
        removedNode.removeElement();
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

    setPointerToNode(pointerName, indexOfNode) {
        this.showPointer(pointerName);
        if (this.values[indexOfNode] && this._pointers[pointerName]) this.values[indexOfNode].attachPointer(this._pointers[pointerName]);
        else this.hidePointer(pointerName);
    }

    setValueOfNode(index, value) {
        if (this.values[index]) this.values[index].setValue(value);
    }

    reset() {
        while (this.values.length !== 0) {
            const node = this.values.pop();
            node.removeElement();
        }
    }
}

export default VisualMaxBinaryHeap;