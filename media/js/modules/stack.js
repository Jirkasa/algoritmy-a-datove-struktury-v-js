class Stack {
    constructor() {
        this._first = null;
        this.size = 0;
    }

    get current() {
        if (!this._first) return null;
        return this._first.value;
    }

    push(val) {
        const newNode = new Node(val);

        if (!this._first) {
            this._first = newNode;
        } else {
            const temp = this._first;
            this._first = newNode;
            this._first.next = temp;
        }

        return ++this.size;
    }

    pop() {
        if (!this._first) return null;

        const temp = this._first;

        this._first = this._first.next;
        this.size--;

        return temp.value;
    }
}

class Node {
    constructor(val) {
        this.value = val;
        this.next = null;
    }
}

export default Stack;