import Pointer from "./pointer.js";

class Node {
    constructor(value, element) {
        this.value = value;
        this.next = null;

        this._pointers = {};
        this._numOfPointers = 0;

        this.element = element;
        this._valueEl = null;
        this._arrowEl = null;
        this._createElements();
    }

    _createElements() {
        // create value property element
        const valueProperty = document.createElement("div");
        valueProperty.classList.add("node__property");
        valueProperty.innerHTML = '<span class="node__property-name">value: </span>';
        this.element.appendChild(valueProperty);

        this._valueEl = document.createElement("span");
        this._valueEl.classList.add("node__property-value");
        switch (typeof this.value) {
            case 'boolean':
                this._valueEl.classList.add("node__property-value--boolean");
                break;
            case 'number':
                this._valueEl.classList.add("node__property-value--number");
                break;
            case 'string':
                this._valueEl.classList.add("node__property-value--string");
                break;
        }
        if (typeof this.value === "string") {
            this._valueEl.innerText = `"${this.value}"`;
        } else {
            this._valueEl.innerText = this.value;
        }
        valueProperty.appendChild(this._valueEl);

        // create next property element
        const nextProperty = document.createElement("div");
        nextProperty.classList.add("node__property");
        nextProperty.innerHTML = '<span class="node__property-name">next:</span>';
        this.element.appendChild(nextProperty);

        let dotElement = document.createElement("div");
        dotElement.classList.add("node__dot");
        nextProperty.appendChild(dotElement);

        this._arrowEl = document.createElement("div");
        this._arrowEl.classList.add("node__arrow");
        dotElement.appendChild(this._arrowEl);
    }

    displayArrow() {
        this._arrowEl.classList.add("node__arrow--visible");
    }
    hideArrow() {
        this._arrowEl.classList.remove("node__arrow--visible");
    }
    setArrowDoubleWidth(node) {
        this._arrowEl.classList.add("node__arrow--no-rotation");
        this._arrowEl.style.transition = "unset";
        this._arrowEl.style.width = node.getWidth() + "px";
        setTimeout(() => {
            this._arrowEl.style.transition = "opacity .2s, width .5s";
        }, 100);
    }
    setArrowToBack(node) {
        const computedStyle = getComputedStyle(this.element);
        const width = parseFloat(computedStyle.width);
        const rightPadding = parseFloat(computedStyle.paddingRight);

        this._arrowEl.style.width = (node.getRightMargin() + width - 2*rightPadding) + "px";
        this._arrowEl.style.transform = "scaleX(-1)";
    }
    resetArrowWidth() {
        this._arrowEl.classList.remove("node__arrow--no-rotation");
        this._arrowEl.removeAttribute("style");
    }

    getWidth() {
        const computedStyle = getComputedStyle(this.element);
        
        const width = parseFloat(computedStyle.width);
        const rightMargin = parseFloat(computedStyle.marginRight);
        const padding = parseFloat(computedStyle.paddingRight);

        return width + rightMargin * 2 + padding * 2;
    }
    getRightMargin() {
        const computedStyle = getComputedStyle(this.element);

        const rightMargin = parseFloat(computedStyle.marginRight);

        return rightMargin;
    }

    setHeadStatus() {
        this.element.classList.add("node--head");
        this.element.classList.add("node--tail-right");
    }
    removeHeadStatus() {
        this.element.classList.remove("node--head");
        this.element.classList.remove("node--tail-right");
    }

    setTailStatus() {
        this.element.classList.add("node--tail");
    }
    removeTailStatus() {
        this.element.classList.remove("node--tail");
    }

    setFirstStatus() {
        this.element.classList.add("node--first");
        this.element.classList.add("node--tail-right");
    }
    removeFirstStatus() {
        this.element.classList.remove("node--first");
        this.element.classList.remove("node--tail-right");
    }

    setLastStatus() {
        this.element.classList.add("node--last");
    }
    removeLastStatus() {
        this.element.classList.remove("node--last");
    }

    setValue(value) {
        this.value = value;
        this._valueEl.innerText = value;
    }

    removeElement() {
        for (let pName of Object.keys(this._pointers)) {
            if (this._pointers[pName]) this._pointers[pName].reset();
        }
        this.element.remove();
    }

    attachPointer(pointer, el) {
        this.element.appendChild(el);

        if (this._numOfPointers > 0) {
            for (let pName of Object.keys(this._pointers)) {
                if (this._pointers[pName]) this._pointers[pName].setToLeftSide();
            }
            pointer.setToRightSide();
        } else {
            pointer.setToMiddle();
        }

        this._pointers[pointer.name] = pointer;
        this._numOfPointers++;
    }

    detachPointer(pointer) {
        if (this._pointers[pointer.name]) {
            this._pointers[pointer.name] = undefined;
            this._numOfPointers--;

            if (this._numOfPointers === 1) {
                for (let pName of Object.keys(this._pointers)) {
                    if (this._pointers[pName]) this._pointers[pName].setToMiddle();
                }
            }
        }
    }
}

class VisualLinkedList {
    constructor(elementId, pointerNames = []) {
        this.head = null;
        this.tail = null;
        this.length = 0;

        this._element = document.getElementById(elementId);

        this._pointers = {};
        for (let pointerName of pointerNames) {
            const pointer = new Pointer(pointerName);
            pointer.hide();
            this._pointers[pointerName] = pointer;
        }
    }

    showPointer(name) { this._pointers[name].show(); }
    hidePointer(name) { this._pointers[name].hide(); }
    movePointerToNode(name, index) {
        const node = this.get(index);
        if (node) {
            this._pointers[name].moveToNode(node);
        }
    }


    push(value) {
        const newNode = new Node(value, this._createNodeElement(this.length));
        if (!this.head) {
            this.head = newNode;
            this.tail = this.head;
        } else {
            this.tail.next = newNode;
            this.tail = newNode;
        }
        this.length++;
        return this;
    }

    unshift(value) {
        const newNode = new Node(value, this._createNodeElement(0));
        if (!this.head) {
            this.head = newNode;
            this.tail = newNode;
        } else {
            newNode.next = this.head;
            this.head = newNode;
        }
        this.length++;
        return this;
    }

    pop() {
        if (!this.head) return undefined;
        let current = this.head;
        let newTail = current;
        while (current.next) {
            newTail = current;
            current = current.next;
        }
        this.tail = newTail;
        this.tail.next = null;
        this.length--;
        if (this.length === 0) {
            this.head = null;
            this.tail = null;
        }
        current.removeElement();
        return current;
    }

    get(index) {
        if (index < 0 || index >= this.length) return null;

        let current = this.head;

        for (let i = 1; i <= index; i++) {
            current = current.next;
        }

        return current;
    }

    set(index, value) {
        const node = this.get(index);

        if (!node) return false;

        node.setValue(value);
        return true;
    }

    shift() {
        if(!this.head) return undefined;
        var currentHead = this.head;
        this.head = currentHead.next;
        this.length--;
        if(this.length === 0){
            this.tail = null;
        }
        currentHead.removeElement();
        return currentHead;
    }

    insert(index, value) {
        if(index < 0 || index > this.length) return false;

        if(index === this.length) return !!this.push(value);
        if(index === 0) return !!this.unshift(value);

        const newNode = new Node(value, this._createNodeElement(index));
        const prevNode = this.get(index-1);
        newNode.next = prevNode.next;
        prevNode.next = newNode;
        this.length++;

        return true;
    }

    remove(index) {
        if (index < 0 || index >= this.length) return undefined;

        if (index === this.length - 1) return this.pop();
        if (index === 0) return this.shift();

        const prevNode = this.get(index-1);
        const removedNode = prevNode.next;
        prevNode.next = removedNode.next;
        removedNode.next = null;
        removedNode.removeElement();

        this.length--;
        return removedNode;
    }

    _createNodeElement(index) {
        const nodeEl = document.createElement("div");
        nodeEl.classList.add("node");

        if (index === 0) {
            this._element.insertAdjacentElement("afterbegin", nodeEl);
        } else if (index === this.length) {
            this._element.appendChild(nodeEl);
        } else {
            const beforeEl = this.get(index-1).element;
            beforeEl.insertAdjacentElement("afterend", nodeEl);
        }

        return nodeEl;
    }

    reset() {
        while (this.head) this.shift();

        for (let name in this._pointers) {
            this._pointers[name].reset();
        }
    }
}

export default VisualLinkedList;