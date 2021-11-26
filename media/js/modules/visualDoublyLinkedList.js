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
        this._valueEl.innerText = this.value;
        valueProperty.appendChild(this._valueEl);

        // create next property element
        const nextProperty = document.createElement("div");
        nextProperty.classList.add("node__property");
        nextProperty.innerHTML = '<span class="node__property-name">next:</span>';
        this.element.appendChild(nextProperty);

        let nextDotElement = document.createElement("div");
        nextDotElement.classList.add("node__dot");
        nextProperty.appendChild(nextDotElement);

        this._nextArrowEl = document.createElement("div");
        this._nextArrowEl.classList.add("node__arrow");
        nextDotElement.appendChild(this._nextArrowEl);

        // create prev property element
        const prevProperty = document.createElement("div");
        prevProperty.classList.add("node__property");
        prevProperty.innerHTML = '<span class="node__property-name node__property-name--left-padding">:prev</span>';
        this.element.appendChild(prevProperty);

        let prevDotElement = document.createElement("div");
        prevDotElement.classList.add("node__dot", "node__dot--left");
        prevProperty.appendChild(prevDotElement);

        this._prevArrowEl = document.createElement("div");
        this._prevArrowEl.classList.add("node__arrow", "node__arrow--to-left");
        prevDotElement.appendChild(this._prevArrowEl);
    }

    // next arrow
    displayNextArrow() {
        this._nextArrowEl.classList.add("node__arrow--visible");
    }
    hideNextArrow() {
        this._nextArrowEl.classList.remove("node__arrow--visible");
    }
    setNextArrowDoubleWidth(node) {
        this._nextArrowEl.classList.add("node__arrow--no-rotation");
        this._nextArrowEl.style.transition = "unset";
        this._nextArrowEl.style.width = node.getWidth() + "px";
        setTimeout(() => {
            this._nextArrowEl.style.transition = "opacity .2s, width .5s";
        }, 100);
    }
    resetNextArrowWidth() {
        this._nextArrowEl.classList.remove("node__arrow--no-rotation");
        this._nextArrowEl.removeAttribute("style");
    }

    // prev arrow
    displayPrevArrow() {
        this._prevArrowEl.classList.add("node__arrow--visible");
    }
    hidePrevArrow() {
        this._prevArrowEl.classList.remove("node__arrow--visible");
    }
    setPrevArrowDoubleWidth(node) {
        this._prevArrowEl.classList.add("node__arrow--no-rotation-left");
        this._prevArrowEl.style.transition = "unset";
        this._prevArrowEl.style.width = node.getWidth() + "px";
        setTimeout(() => {
            this._prevArrowEl.style.transition = "opacity .2s, width .5s";
        }, 100);
    }
    resetPrevArrowWidth() {
        this._prevArrowEl.classList.remove("node__arrow--no-rotation-left");
        this._prevArrowEl.removeAttribute("style");
    }

    getWidth() {
        const computedStyle = getComputedStyle(this.element);
        
        const width = parseFloat(computedStyle.width);
        const rightMargin = parseFloat(computedStyle.marginRight);
        const padding = parseFloat(computedStyle.paddingRight);

        return width + rightMargin * 2 + padding * 2;
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

class VisualDoublyLinkedList {
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
            this.tail = newNode;
        } else {
            newNode.prev = this.tail;
            this.tail.next = newNode;
            this.tail = newNode;
        }

        this.length++;

        return this;
    }

    pop() {
        if (!this.head) return undefined;

        const removedNode = this.tail;

        if (this.length === 1) {
            this.head = null;
            this.tail = null;
        } else {
            this.tail = this.tail.prev;
            this.tail.next = null;
            removedNode.prev = null;
        }
        this.length--;

        removedNode.removeElement();

        return removedNode;
    }

    shift() {
        if (!this.head) return undefined;

        const oldHead = this.head;
        
        if (this.length === 1) {
            this.head = null;
            this.tail = null;
        } else {
            this.head = oldHead.next;
            this.head.prev = null;
            oldHead.next = null;
        }
        this.length--;

        oldHead.removeElement();

        return oldHead;
    }

    unshift(value) {
        const newNode = new Node(value, this._createNodeElement(0));

        if (this.length === 0) {
            this.head = newNode;
            this.tail = newNode;
        } else {
            newNode.next = this.head;
            this.head.prev = newNode;
            this.head = newNode;
        }
        this.length++;

        return this;
    }

    insert(index, value){
        if(index < 0 || index > this.length) return false;

        if(index === 0) return !!this.unshift(value);
        if(index === this.length) return !!this.push(value);

        const newNode = new Node(value, this._createNodeElement(index));
        const prevNode = this.get(index-1);
        const nextNode = prevNode.next;
        
        prevNode.next = newNode, newNode.prev = prevNode;
        newNode.next = nextNode, nextNode.prev = newNode;
        this.length++;
        return true;
    }

    remove(index) {
        if (index < 0 || index >= this.length) return undefined;

        if (index === 0) return this.shift();
        if (index === this.length-1) return this.pop();

        let removedNode = this.get(index);
        let prevNode = removedNode.prev;
        let nextNode = removedNode.next;

        prevNode.next = nextNode;
        nextNode.prev = prevNode;

        removedNode.prev = null, removedNode.next = null;

        removedNode.removeElement();

        this.length--;
        return removedNode;
    }

    get(index) {
        if (index < 0 || index >= this.length) return null;

        const middleIndex = this.length / 2;

        if (index <= middleIndex) {
            let currentNode = this.head;
            for (let i = 0; i < this.length; i++) {
                if (index === i) return currentNode;
                currentNode = currentNode.next;
            }
        } else {
            let currentNode = this.tail;
            for (let i = this.length-1; i >= 0; i--) {
                if (index === i) return currentNode;
                currentNode = currentNode.prev;
            }
        }
    }

    set(index, value) {
        const node = this.get(index);

        if (!node) return false;

        node.setValue(value);
        return true;
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

export default VisualDoublyLinkedList;