class Node {
    constructor(value, priority) {
        this.value = value;
        this.priority = priority;

        this._createElement(value, priority);

        this.hasLeftChild = false;
        this.hasRightChild = false;
    }

    _createElement(value, priority) {
        this._element = document.createElement("div");
        this._element.classList.add("tree__node");

        this._circleElement = document.createElement("div");
        this._circleElement.classList.add("tree__node-circle");
        if (priority === Infinity) priority = "&infin;";
        this._circleElement.innerHTML = '<span>' + value + '</span><div class="tree__node-priority"><span>' + priority + '</span></div>';
        this._element.appendChild(this._circleElement);
    }

    setValueAndPriority(value, priority) {
        this.value = value;
        this.priority = priority;
        if (priority === Infinity) priority = "&infin;"
        this._circleElement.innerHTML = '<span>' + value + '</span><div class="tree__node-priority"><span>' + priority + '</span></div>';
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

    removeChild() {
        if (this.hasRightChild) this.hasRightChild = false;
        else if (this.hasLeftChild) this.hasLeftChild = false;
    }

    attachPointer(pointerEl) {
        this._element.appendChild(pointerEl);
    }

    removeElement(parentNode) {
        this._element.remove();
        if (parentNode) parentNode.removeChild();
    }
}

class VisualPriorityQueue {
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

    enqueueWithoutBubbleUp(value, priority, twoLevels = false) {
        const newNode = new Node(value, priority);
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

    enqueue(value, priority, twoLevels = false, minVersion = false) {
        const newNode = new Node(value, priority);
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

        this.bubbleUp(minVersion);
    }

    bubbleUp(minVersion = false) {
        let idx = this.values.length-1;

        while (idx > 0) {
            const parentIndex = Math.trunc((idx-1)/2);

            if (!minVersion && this.values[idx].priority <= this.values[parentIndex].priority) break;
            else if (minVersion && this.values[idx].priority >= this.values[parentIndex].priority) break;

            const parentValue = this.values[parentIndex].value;
            const parentPriority = this.values[parentIndex].priority;
            this.values[parentIndex].setValueAndPriority(this.values[idx].value, this.values[idx].priority);
            this.values[idx].setValueAndPriority(parentValue, parentPriority);

            idx = parentIndex;
        }
    }

    dequeue(minVersion = false) {
        const max = this.values[0];
        const parentIdx = Math.trunc((this.values.length-2)/2);
        const end = this.values.pop();
        if (parentIdx >= 0) end.removeElement(this.values[parentIdx]);
        else end.removeElement();
        if (this.values.length > 0) {
            this.values[0].setValueAndPriority(end.value, end.priority);
            this.sinkDown(minVersion);
        }
        return max;
    }

    sinkDown(minVersion = false) {
        let idx = 0;
        const length = this.values.length;
        const element = this.values[0];

        while (true) {
            let leftChildIdx = 2 * idx + 1;
            let rightChildIdx = 2 * idx + 2;
            let leftChild, rightChild;
            let swap = null;

            if (leftChildIdx < length) {
                leftChild = this.values[leftChildIdx];
                if ((!minVersion && leftChild.priority > element.priority) || (minVersion && leftChild.priority < element.priority)) {
                    swap = leftChildIdx;
                }
            }
            if (rightChildIdx < length) {
                rightChild = this.values[rightChildIdx];
                if (!minVersion) {
                    if (
                        (swap === null && rightChild.priority > element.priority) ||
                        (swap !== null && rightChild.priority > leftChild.priority)
                    ) {
                        swap = rightChildIdx;
                    }
                } else {
                    if (
                        (swap === null && rightChild.priority < element.priority) ||
                        (swap !== null && rightChild.priority < leftChild.priority)
                    ) {
                        swap = rightChildIdx;
                    }
                }
            }

            if (swap === null) break;
            const swapValue = this.values[swap].value;
            const swapPriority = this.values[swap].priority;
            const idxValue = this.values[idx].value;
            const idxPriority = this.values[idx].priority;
            this.values[idx].setValueAndPriority(swapValue, swapPriority);
            this.values[swap].setValueAndPriority(idxValue, idxPriority);
            idx = swap;
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

    setValueOfNode(index, value, priority) {
        if (this.values[index]) this.values[index].setValueAndPriority(value, priority);
    }

    reset() {
        while (this.values.length !== 0) {
            const node = this.values.pop();
            node.removeElement();
        }
    }
}

export default VisualPriorityQueue;