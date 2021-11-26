import LineHighlighter from "../modules/lineHighlighter.js";
import Timer from "../modules/timer.js";
import initExamples from "../modules/interactiveExample.js";
import VisualDoublyLinkedList from "../modules/visualDoublyLinkedList.js";

// used for interactive examples
class Node {
    constructor(value) {
        this.value = value;
        this.next = null;
        this.prev = null;
    }
}

// used for interactive examples (methods for interactive examples should be added to instance if needed)
class DoublyLinkedList {
    constructor() {
        this.head = null;
        this.tail = null;
        this.length = 0;
    }

    push(value) {
        const newNode = new Node(value);

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

        return oldHead;
    }

    unshift(value) {
        const newNode = new Node(value);

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

    insert(index, value){
        if(index < 0 || index > this.length) return false;

        if(index === 0) return !!this.unshift(value);
        if(index === this.length) return !!this.push(value);

        const newNode = new Node(value);
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

        this.length--;
        return removedNode;
    }
}

const config = [
    {
        exampleId: 1,
        visualLinkedList: new VisualDoublyLinkedList("linked-list-1", ["newNode"]),
        lineHighlighter: new LineHighlighter("code-1"),
        timer: new Timer(),
        code: async function() {
            let proceed;

            const list = new DoublyLinkedList();

            list.examplePush = async function(value, lineHighlighter, timer, visualLinkedList) {
                const newNode = new Node(value);

                visualLinkedList.push(value);
                visualLinkedList.showPointer("newNode");
                visualLinkedList.movePointerToNode("newNode", this.length);

                lineHighlighter.highlight(6);
                proceed = await timer.wait(500); if (!proceed) return;
                lineHighlighter.clear();

                lineHighlighter.highlight(7);
                proceed = await timer.wait(500); if (!proceed) return;
                lineHighlighter.clear();

                if (!this.head) {
                    this.head = newNode;

                    visualLinkedList.get(0).setHeadStatus();

                    lineHighlighter.highlight(9);
                    proceed = await timer.wait(500); if (!proceed) return;
                    lineHighlighter.clear();

                    this.tail = newNode;

                    visualLinkedList.get(0).setTailStatus();

                    lineHighlighter.highlight(11);
                    proceed = await timer.wait(500); if (!proceed) return;
                    lineHighlighter.clear();

                } else {
                    newNode.prev = this.tail;

                    visualLinkedList.get(visualLinkedList.length-1).displayPrevArrow();

                    lineHighlighter.highlight(14);
                    proceed = await timer.wait(500); if (!proceed) return;
                    lineHighlighter.clear();

                    this.tail.next = newNode;

                    visualLinkedList.get(visualLinkedList.length-2).displayNextArrow();

                    lineHighlighter.highlight(16);
                    proceed = await timer.wait(500); if (!proceed) return;
                    lineHighlighter.clear();

                    this.tail = newNode;

                    visualLinkedList.get(visualLinkedList.length-2).removeTailStatus();
                    visualLinkedList.get(visualLinkedList.length-1).setTailStatus();

                    lineHighlighter.highlight(18);
                    proceed = await timer.wait(500); if (!proceed) return;
                    lineHighlighter.clear();
                }
        
                this.length++;

                lineHighlighter.highlight(21);
                proceed = await timer.wait(500); if (!proceed) return;
                lineHighlighter.clear();

                lineHighlighter.highlight(23);
                proceed = await timer.wait(500); if (!proceed) return;
                lineHighlighter.clear();

                visualLinkedList.hidePointer("newNode");
        
                return this;
            }

            this.lineHighlighter.highlight(27);
            proceed = await this.timer.wait(500); if (!proceed) return;
            this.lineHighlighter.clear();

            this.lineHighlighter.highlight(29);
            proceed = await this.timer.wait(500); if (!proceed) return;
            this.lineHighlighter.clear();

            await list.examplePush(3, this.lineHighlighter, this.timer, this.visualLinkedList);

            if (!proceed) return;

            this.lineHighlighter.highlight(29);
            proceed = await this.timer.wait(500); if (!proceed) return;
            this.lineHighlighter.clear();

            this.lineHighlighter.highlight(30);
            proceed = await this.timer.wait(500); if (!proceed) return;
            this.lineHighlighter.clear();

            await list.examplePush(true, this.lineHighlighter, this.timer, this.visualLinkedList);

            if (!proceed) return;

            this.lineHighlighter.highlight(30);
            proceed = await this.timer.wait(500); if (!proceed) return;
            this.lineHighlighter.clear();

            this.lineHighlighter.highlight(31);
            proceed = await this.timer.wait(500); if (!proceed) return;
            this.lineHighlighter.clear();

            await list.examplePush(12, this.lineHighlighter, this.timer, this.visualLinkedList);

            if (!proceed) return;

            this.lineHighlighter.highlight(31);
            proceed = await this.timer.wait(500); if (!proceed) return;
            this.lineHighlighter.clear();

            this.finish();
        }
    },
    {
        exampleId: 2,
        visualLinkedList: new VisualDoublyLinkedList("linked-list-2", ["removedNode"]),
        lineHighlighter: new LineHighlighter("code-2"),
        timer: new Timer(),
        code: async function() {
            let proceed;

            const list = new DoublyLinkedList();

            list.examplePop = async function(lineHighlighter, timer, visualLinkedList) {

                lineHighlighter.highlight(6);
                proceed = await timer.wait(500); if (!proceed) return;
                lineHighlighter.clear();

                if (!this.head) return undefined;

                const removedNode = this.tail;

                visualLinkedList.showPointer("removedNode");
                visualLinkedList.movePointerToNode("removedNode", this.length-1);

                lineHighlighter.highlight(9);
                proceed = await timer.wait(500); if (!proceed) return;
                lineHighlighter.clear();

                lineHighlighter.highlight(11);
                proceed = await timer.wait(500); if (!proceed) return;
                lineHighlighter.clear();

                if (this.length === 1) {
                    this.head = null;
                    this.tail = null;
                } else {
                    this.tail = this.tail.prev;

                    visualLinkedList.get(this.length-1).removeTailStatus();
                    visualLinkedList.get(this.length-2).setTailStatus();

                    lineHighlighter.highlight(17);
                    proceed = await timer.wait(500); if (!proceed) return;
                    lineHighlighter.clear();

                    this.tail.next = null;

                    visualLinkedList.get(this.length-2).hideNextArrow();

                    lineHighlighter.highlight(19);
                    proceed = await timer.wait(500); if (!proceed) return;
                    lineHighlighter.clear();

                    removedNode.prev = null;

                    visualLinkedList.get(this.length-1).hidePrevArrow();

                    lineHighlighter.highlight(21);
                    proceed = await timer.wait(500); if (!proceed) return;
                    lineHighlighter.clear();
                }
                this.length--;

                lineHighlighter.highlight(24);
                proceed = await timer.wait(500); if (!proceed) return;
                lineHighlighter.clear();

                lineHighlighter.highlight(27);
                proceed = await timer.wait(500); if (!proceed) return;
                lineHighlighter.clear();

                visualLinkedList.hidePointer("removedNode");
                visualLinkedList.pop();

                return removedNode;
            }

            this.lineHighlighter.highlight(31);
            proceed = await this.timer.wait(500); if (!proceed) return;
            this.lineHighlighter.clear();

            list.push(3).push(true).push(12).push(23);

            this.visualLinkedList.push(3).push(true).push(12).push(23);
            this.visualLinkedList.get(0).displayNextArrow();
            this.visualLinkedList.get(0).setHeadStatus();
            this.visualLinkedList.get(1).displayNextArrow();
            this.visualLinkedList.get(1).displayPrevArrow();
            this.visualLinkedList.get(2).displayNextArrow();
            this.visualLinkedList.get(2).displayPrevArrow();
            this.visualLinkedList.get(3).displayPrevArrow();
            this.visualLinkedList.get(3).setTailStatus();

            this.lineHighlighter.highlight(32);
            proceed = await this.timer.wait(500); if (!proceed) return;
            this.lineHighlighter.clear();

            this.lineHighlighter.highlight(35);
            proceed = await this.timer.wait(500); if (!proceed) return;
            this.lineHighlighter.clear();

            await list.examplePop(this.lineHighlighter, this.timer, this.visualLinkedList);

            if (!proceed) return;

            this.lineHighlighter.highlight(35);
            proceed = await this.timer.wait(500); if (!proceed) return;
            this.lineHighlighter.clear();

            this.lineHighlighter.highlight(36);
            proceed = await this.timer.wait(500); if (!proceed) return;
            this.lineHighlighter.clear();

            await list.examplePop(this.lineHighlighter, this.timer, this.visualLinkedList);

            if (!proceed) return;

            this.lineHighlighter.highlight(36);
            proceed = await this.timer.wait(500); if (!proceed) return;
            this.lineHighlighter.clear();

            this.finish();
        }
    },
    {
        exampleId: 3,
        visualLinkedList: new VisualDoublyLinkedList("linked-list-3", ["oldHead"]),
        lineHighlighter: new LineHighlighter("code-3"),
        timer: new Timer(),
        code: async function() {
            let proceed;

            const list = new DoublyLinkedList();

            list.exampleShift = async function(lineHighlighter, timer, visualLinkedList) {
                lineHighlighter.highlight(6);
                proceed = await timer.wait(500); if (!proceed) return;
                lineHighlighter.clear();
                
                if (!this.head) return undefined;

                const oldHead = this.head;

                visualLinkedList.showPointer("oldHead");
                visualLinkedList.movePointerToNode("oldHead", 0);

                lineHighlighter.highlight(9);
                proceed = await timer.wait(500); if (!proceed) return;
                lineHighlighter.clear();

                lineHighlighter.highlight(11);
                proceed = await timer.wait(500); if (!proceed) return;
                lineHighlighter.clear();
                
                if (this.length === 1) {
                    this.head = null;
                    this.tail = null;
                } else {
                    this.head = oldHead.next;

                    visualLinkedList.get(0).removeHeadStatus();
                    visualLinkedList.get(1).setHeadStatus();

                    lineHighlighter.highlight(17);
                    proceed = await timer.wait(500); if (!proceed) return;
                    lineHighlighter.clear();

                    this.head.prev = null;

                    visualLinkedList.get(1).hidePrevArrow();

                    lineHighlighter.highlight(19);
                    proceed = await timer.wait(500); if (!proceed) return;
                    lineHighlighter.clear();

                    oldHead.next = null;

                    visualLinkedList.get(0).hideNextArrow();

                    lineHighlighter.highlight(21);
                    proceed = await timer.wait(500); if (!proceed) return;
                    lineHighlighter.clear();
                }
                this.length--;

                lineHighlighter.highlight(24);
                proceed = await timer.wait(500); if (!proceed) return;
                lineHighlighter.clear();

                lineHighlighter.highlight(27);
                proceed = await timer.wait(500); if (!proceed) return;
                lineHighlighter.clear();

                visualLinkedList.hidePointer("oldHead");
                visualLinkedList.shift();

                return oldHead;
            }

            this.lineHighlighter.highlight(31);
            proceed = await this.timer.wait(500); if (!proceed) return;
            this.lineHighlighter.clear();

            list.push(3).push(true).push(12).push(23);

            this.visualLinkedList.push(3).push(true).push(12).push(23);
            this.visualLinkedList.get(0).displayNextArrow();
            this.visualLinkedList.get(0).setHeadStatus();
            this.visualLinkedList.get(1).displayNextArrow();
            this.visualLinkedList.get(1).displayPrevArrow();
            this.visualLinkedList.get(2).displayNextArrow();
            this.visualLinkedList.get(2).displayPrevArrow();
            this.visualLinkedList.get(3).displayPrevArrow();
            this.visualLinkedList.get(3).setTailStatus();

            this.lineHighlighter.highlight(32);
            proceed = await this.timer.wait(500); if (!proceed) return;
            this.lineHighlighter.clear();

            this.lineHighlighter.highlight(35);
            proceed = await this.timer.wait(500); if (!proceed) return;
            this.lineHighlighter.clear();

            await list.exampleShift(this.lineHighlighter, this.timer, this.visualLinkedList);

            if (!proceed) return;

            this.lineHighlighter.highlight(35);
            proceed = await this.timer.wait(500); if (!proceed) return;
            this.lineHighlighter.clear();

            this.lineHighlighter.highlight(36);
            proceed = await this.timer.wait(500); if (!proceed) return;
            this.lineHighlighter.clear();

            await list.exampleShift(this.lineHighlighter, this.timer, this.visualLinkedList);

            if (!proceed) return;

            this.lineHighlighter.highlight(36);
            proceed = await this.timer.wait(500); if (!proceed) return;
            this.lineHighlighter.clear();

            this.finish();
        }
    },
    {
        exampleId: 4,
        visualLinkedList: new VisualDoublyLinkedList("linked-list-4", ["newNode"]),
        lineHighlighter: new LineHighlighter("code-4"),
        timer: new Timer(),
        code: async function() {
            let proceed;

            const list = new DoublyLinkedList();

            list.exampleUnshift = async function(value, lineHighlighter, timer, visualLinkedList) {
                const newNode = new Node(value);

                visualLinkedList.unshift(value);

                visualLinkedList.showPointer("newNode");
                visualLinkedList.movePointerToNode("newNode", 0);

                lineHighlighter.highlight(6);
                proceed = await timer.wait(500); if (!proceed) return;
                lineHighlighter.clear();

                lineHighlighter.highlight(8);
                proceed = await timer.wait(500); if (!proceed) return;
                lineHighlighter.clear();

                if (this.length === 0) {
                    this.head = newNode;

                    visualLinkedList.get(0).setHeadStatus();

                    lineHighlighter.highlight(10);
                    proceed = await timer.wait(500); if (!proceed) return;
                    lineHighlighter.clear();

                    this.tail = newNode;

                    visualLinkedList.get(0).setTailStatus();

                    lineHighlighter.highlight(11);
                    proceed = await timer.wait(500); if (!proceed) return;
                    lineHighlighter.clear();
                } else {
                    newNode.next = this.head;

                    visualLinkedList.get(0).displayNextArrow();

                    lineHighlighter.highlight(14);
                    proceed = await timer.wait(500); if (!proceed) return;
                    lineHighlighter.clear();

                    this.head.prev = newNode;

                    visualLinkedList.get(1).displayPrevArrow();

                    lineHighlighter.highlight(16);
                    proceed = await timer.wait(500); if (!proceed) return;
                    lineHighlighter.clear();

                    this.head = newNode;

                    visualLinkedList.get(1).removeHeadStatus();
                    visualLinkedList.get(0).setHeadStatus();

                    lineHighlighter.highlight(18);
                    proceed = await timer.wait(500); if (!proceed) return;
                    lineHighlighter.clear();
                }
                this.length++;

                lineHighlighter.highlight(21);
                proceed = await timer.wait(500); if (!proceed) return;
                lineHighlighter.clear();

                lineHighlighter.highlight(23);
                proceed = await timer.wait(500); if (!proceed) return;
                lineHighlighter.clear();

                visualLinkedList.hidePointer("newNode");

                return this;
            }

            this.lineHighlighter.highlight(27);
            proceed = await this.timer.wait(500); if (!proceed) return;
            this.lineHighlighter.clear();

            this.lineHighlighter.highlight(30);
            proceed = await this.timer.wait(500); if (!proceed) return;
            this.lineHighlighter.clear();

            await list.exampleUnshift(3, this.lineHighlighter, this.timer, this.visualLinkedList);

            if (!proceed) return;

            this.lineHighlighter.highlight(30);
            proceed = await this.timer.wait(500); if (!proceed) return;
            this.lineHighlighter.clear();

            this.lineHighlighter.highlight(31);
            proceed = await this.timer.wait(500); if (!proceed) return;
            this.lineHighlighter.clear();

            await list.exampleUnshift(true, this.lineHighlighter, this.timer, this.visualLinkedList);

            if (!proceed) return;

            this.lineHighlighter.highlight(31);
            proceed = await this.timer.wait(500); if (!proceed) return;
            this.lineHighlighter.clear();

            this.lineHighlighter.highlight(32);
            proceed = await this.timer.wait(500); if (!proceed) return;
            this.lineHighlighter.clear();

            await list.exampleUnshift(12, this.lineHighlighter, this.timer, this.visualLinkedList);

            if (!proceed) return;

            this.lineHighlighter.highlight(32);
            proceed = await this.timer.wait(500); if (!proceed) return;
            this.lineHighlighter.clear();

            this.finish();
        }
    },
    {
        exampleId: 5,
        visualLinkedList: new VisualDoublyLinkedList("linked-list-5", ["index", "middleIndex", "currentNode", "ziskanaNode"]),
        lineHighlighter: new LineHighlighter("code-5"),
        timer: new Timer(),
        code: async function() {
            let proceed;

            const list = new DoublyLinkedList();

            list.exampleGet = async function(index, lineHighlighter, timer, visualLinkedList) {

                visualLinkedList.showPointer("index");
                visualLinkedList.movePointerToNode("index", index);

                lineHighlighter.highlight(6);
                proceed = await timer.wait(500); if (!proceed) return;
                lineHighlighter.clear();

                if (index < 0 || index >= this.length) return null;

                const middleIndex = Math.trunc(this.length / 2);

                visualLinkedList.showPointer("middleIndex");
                visualLinkedList.movePointerToNode("middleIndex", middleIndex);

                lineHighlighter.highlight(9);
                proceed = await timer.wait(500); if (!proceed) return;
                lineHighlighter.clear();

                lineHighlighter.highlight(11);
                proceed = await timer.wait(500); if (!proceed) return;
                lineHighlighter.clear();
        
                if (index <= middleIndex) {
                    let currentNode = this.head;
                    for (let i = 0; i < this.length; i++) {
                        if (index === i) return currentNode;
                        currentNode = currentNode.next;
                    }
                } else {
                    let currentNode = this.tail;

                    visualLinkedList.showPointer("currentNode");
                    visualLinkedList.movePointerToNode("currentNode", this.length-1);

                    lineHighlighter.highlight(23);
                    proceed = await timer.wait(500); if (!proceed) return;
                    lineHighlighter.clear();

                    lineHighlighter.highlight(25);
                    proceed = await timer.wait(500); if (!proceed) return;
                    lineHighlighter.clear();

                    for (let i = this.length-1; i >= 0; i--) {

                        lineHighlighter.highlight(27);
                        proceed = await timer.wait(500); if (!proceed) return;
                        lineHighlighter.clear();

                        if (index === i) {
                            visualLinkedList.hidePointer("index");
                            visualLinkedList.hidePointer("middleIndex");
                            visualLinkedList.hidePointer("currentNode");

                            return currentNode;
                        }

                        currentNode = currentNode.prev;

                        visualLinkedList.movePointerToNode("currentNode", i-1);

                        lineHighlighter.highlight(29);
                        proceed = await timer.wait(500); if (!proceed) return;
                        lineHighlighter.clear();

                        lineHighlighter.highlight(25);
                        proceed = await timer.wait(500); if (!proceed) return;
                        lineHighlighter.clear();
                    }
                }
            }

            this.lineHighlighter.highlight(35);
            proceed = await this.timer.wait(500); if (!proceed) return;
            this.lineHighlighter.clear();

            list.unshift(3).unshift(8).unshift(12).unshift(23).unshift(14);

            this.visualLinkedList.unshift(3).unshift(8).unshift(12).unshift(23).unshift(14);
            this.visualLinkedList.get(0).displayNextArrow();
            this.visualLinkedList.get(0).setHeadStatus();
            this.visualLinkedList.get(1).displayNextArrow();
            this.visualLinkedList.get(1).displayPrevArrow();
            this.visualLinkedList.get(2).displayNextArrow();
            this.visualLinkedList.get(2).displayPrevArrow();
            this.visualLinkedList.get(3).displayNextArrow();
            this.visualLinkedList.get(3).displayPrevArrow();
            this.visualLinkedList.get(4).displayPrevArrow();
            this.visualLinkedList.get(4).setTailStatus();

            this.lineHighlighter.highlight(36);
            proceed = await this.timer.wait(500); if (!proceed) return;
            this.lineHighlighter.clear();

            this.lineHighlighter.highlight(39);
            proceed = await this.timer.wait(500); if (!proceed) return;
            this.lineHighlighter.clear();

            await list.exampleGet(3, this.lineHighlighter, this.timer, this.visualLinkedList);

            if (!proceed) return;

            this.visualLinkedList.showPointer("ziskanaNode");
            this.visualLinkedList.movePointerToNode("ziskanaNode", 3);

            this.lineHighlighter.highlight(39);
            proceed = await this.timer.wait(500); if (!proceed) return;
            this.lineHighlighter.clear();

            this.finish();
        }
    },
    {
        exampleId: 6,
        visualLinkedList: new VisualDoublyLinkedList("linked-list-6", ["node"]),
        lineHighlighter: new LineHighlighter("code-6"),
        timer: new Timer(),
        code: async function() {
            let proceed;

            const list = new DoublyLinkedList();

            list.exampleSet = async function(index, value, lineHighlighter, timer, visualLinkedList) {
                const node = this.get(index);

                visualLinkedList.showPointer("node");
                visualLinkedList.movePointerToNode("node", index);

                lineHighlighter.highlight(6);
                proceed = await timer.wait(500); if (!proceed) return;
                lineHighlighter.clear();

                lineHighlighter.highlight(9);
                proceed = await timer.wait(500); if (!proceed) return;
                lineHighlighter.clear();
        
                if (!node) return false;

                node.value = value;

                visualLinkedList.set(index, value);

                lineHighlighter.highlight(12);
                proceed = await timer.wait(500); if (!proceed) return;
                lineHighlighter.clear();

                lineHighlighter.highlight(14);
                proceed = await timer.wait(500); if (!proceed) return;
                lineHighlighter.clear();

                visualLinkedList.hidePointer("node");

                return true;
            }

            this.lineHighlighter.highlight(18);
            proceed = await this.timer.wait(500); if (!proceed) return;
            this.lineHighlighter.clear();

            list.unshift(3).unshift(true).unshift(12);

            this.visualLinkedList.unshift(3).unshift(true).unshift(12);
            this.visualLinkedList.get(0).displayNextArrow();
            this.visualLinkedList.get(0).setHeadStatus();
            this.visualLinkedList.get(1).displayNextArrow();
            this.visualLinkedList.get(1).displayPrevArrow();
            this.visualLinkedList.get(2).displayPrevArrow();
            this.visualLinkedList.get(2).setTailStatus();

            this.lineHighlighter.highlight(19);
            proceed = await this.timer.wait(500); if (!proceed) return;
            this.lineHighlighter.clear();

            this.lineHighlighter.highlight(22);
            proceed = await this.timer.wait(500); if (!proceed) return;
            this.lineHighlighter.clear();

            await list.exampleSet(1, false, this.lineHighlighter, this.timer, this.visualLinkedList);

            if (!proceed) return;

            this.lineHighlighter.highlight(22);
            proceed = await this.timer.wait(500); if (!proceed) return;
            this.lineHighlighter.clear();

            this.finish();
        }
    },
    {
        exampleId: 7,
        visualLinkedList: new VisualDoublyLinkedList("linked-list-7", ["newNode", "prevNode", "nextNode"]),
        lineHighlighter: new LineHighlighter("code-7"),
        timer: new Timer(),
        code: async function() {
            let proceed;

            const list = new DoublyLinkedList();

            list.exampleInsert = async function(index, value, lineHighlighter, timer, visualLinkedList) {

                lineHighlighter.highlight(6);
                proceed = await timer.wait(500); if (!proceed) return;
                lineHighlighter.clear();

                if(index < 0 || index > this.length) return false;

                lineHighlighter.highlight(9);
                proceed = await timer.wait(500); if (!proceed) return;
                lineHighlighter.clear();
        
                if(index === 0) return !!this.unshift(value);

                lineHighlighter.highlight(11);
                proceed = await timer.wait(500); if (!proceed) return;
                lineHighlighter.clear();

                if(index === this.length) return !!this.push(value);

                const newNode = new Node(value);

                visualLinkedList.insert(index, value);
                visualLinkedList.get(index-1).setNextArrowDoubleWidth(visualLinkedList.get(index));
                visualLinkedList.get(index+1).setPrevArrowDoubleWidth(visualLinkedList.get(index));

                visualLinkedList.showPointer("newNode");
                visualLinkedList.movePointerToNode("newNode", index);

                lineHighlighter.highlight(14);
                proceed = await timer.wait(500); if (!proceed) return;
                lineHighlighter.clear();

                const prevNode = this.get(index-1);

                visualLinkedList.showPointer("prevNode");
                visualLinkedList.movePointerToNode("prevNode", index-1);

                lineHighlighter.highlight(16);
                proceed = await timer.wait(500); if (!proceed) return;
                lineHighlighter.clear();

                const nextNode = prevNode.next;

                visualLinkedList.showPointer("nextNode");
                visualLinkedList.movePointerToNode("nextNode", index+1);

                lineHighlighter.highlight(18);
                proceed = await timer.wait(500); if (!proceed) return;
                lineHighlighter.clear();
                
                prevNode.next = newNode, newNode.prev = prevNode;

                visualLinkedList.get(index-1).resetNextArrowWidth();
                visualLinkedList.get(index).displayPrevArrow();

                lineHighlighter.highlight(21);
                proceed = await timer.wait(500); if (!proceed) return;
                lineHighlighter.clear();

                newNode.next = nextNode, nextNode.prev = newNode;

                visualLinkedList.get(index).displayNextArrow();
                visualLinkedList.get(index+1).resetPrevArrowWidth();

                lineHighlighter.highlight(23);
                proceed = await timer.wait(500); if (!proceed) return;
                lineHighlighter.clear();

                this.length++;

                lineHighlighter.highlight(25);
                proceed = await timer.wait(500); if (!proceed) return;
                lineHighlighter.clear();

                lineHighlighter.highlight(27);
                proceed = await timer.wait(500); if (!proceed) return;
                lineHighlighter.clear();

                visualLinkedList.hidePointer("newNode");
                visualLinkedList.hidePointer("prevNode");
                visualLinkedList.hidePointer("nextNode");

                return true;
            }

            this.lineHighlighter.highlight(31);
            proceed = await this.timer.wait(500); if (!proceed) return;
            this.lineHighlighter.clear();

            list.unshift(3).unshift(true).unshift(12);

            this.visualLinkedList.unshift(3).unshift(true).unshift(12);
            this.visualLinkedList.get(0).displayNextArrow();
            this.visualLinkedList.get(0).setHeadStatus();
            this.visualLinkedList.get(1).displayNextArrow();
            this.visualLinkedList.get(1).displayPrevArrow();
            this.visualLinkedList.get(2).displayPrevArrow();
            this.visualLinkedList.get(2).setTailStatus();

            this.lineHighlighter.highlight(32);
            proceed = await this.timer.wait(500); if (!proceed) return;
            this.lineHighlighter.clear();

            this.lineHighlighter.highlight(35);
            proceed = await this.timer.wait(500); if (!proceed) return;
            this.lineHighlighter.clear();

            await list.exampleInsert(2, 25, this.lineHighlighter, this.timer, this.visualLinkedList);

            if (!proceed) return;

            this.lineHighlighter.highlight(35);
            proceed = await this.timer.wait(500); if (!proceed) return;
            this.lineHighlighter.clear();

            this.finish();
        }
    },
    {
        exampleId: 8,
        visualLinkedList: new VisualDoublyLinkedList("linked-list-8", ["removedNode", "prevNode", "nextNode"]),
        lineHighlighter: new LineHighlighter("code-8"),
        timer: new Timer(),
        code: async function() {
            let proceed;

            const list = new DoublyLinkedList();

            list.exampleRemove = async function(index, lineHighlighter, timer, visualLinkedList) {

                lineHighlighter.highlight(6);
                proceed = await timer.wait(500); if (!proceed) return;
                lineHighlighter.clear();

                if (index < 0 || index >= this.length) return undefined;

                lineHighlighter.highlight(9);
                proceed = await timer.wait(500); if (!proceed) return;
                lineHighlighter.clear();

                if (index === 0) return this.shift();

                lineHighlighter.highlight(11);
                proceed = await timer.wait(500); if (!proceed) return;
                lineHighlighter.clear();

                if (index === this.length-1) return this.pop();
        
                let removedNode = this.get(index);

                visualLinkedList.showPointer("removedNode");
                visualLinkedList.movePointerToNode("removedNode", index);

                lineHighlighter.highlight(14);
                proceed = await timer.wait(500); if (!proceed) return;
                lineHighlighter.clear();

                let prevNode = removedNode.prev;

                visualLinkedList.showPointer("prevNode");
                visualLinkedList.movePointerToNode("prevNode", index-1);

                lineHighlighter.highlight(16);
                proceed = await timer.wait(500); if (!proceed) return;
                lineHighlighter.clear();

                let nextNode = removedNode.next;

                visualLinkedList.showPointer("nextNode");
                visualLinkedList.movePointerToNode("nextNode", index+1);

                lineHighlighter.highlight(18);
                proceed = await timer.wait(500); if (!proceed) return;
                lineHighlighter.clear();
        
                prevNode.next = nextNode;

                visualLinkedList.get(index-1).setNextArrowDoubleWidth(visualLinkedList.get(index));

                lineHighlighter.highlight(21);
                proceed = await timer.wait(500); if (!proceed) return;
                lineHighlighter.clear();

                nextNode.prev = prevNode;

                visualLinkedList.get(index+1).setPrevArrowDoubleWidth(visualLinkedList.get(index));

                lineHighlighter.highlight(22);
                proceed = await timer.wait(500); if (!proceed) return;
                lineHighlighter.clear();
        
                removedNode.prev = null, removedNode.next = null;

                visualLinkedList.get(index).hidePrevArrow();
                visualLinkedList.get(index).hideNextArrow();

                lineHighlighter.highlight(25);
                proceed = await timer.wait(500); if (!proceed) return;
                lineHighlighter.clear();
        
                this.length--;

                lineHighlighter.highlight(27);
                proceed = await timer.wait(500); if (!proceed) return;
                lineHighlighter.clear();

                lineHighlighter.highlight(29);
                proceed = await timer.wait(500); if (!proceed) return;
                lineHighlighter.clear();

                visualLinkedList.hidePointer("removedNode");
                visualLinkedList.hidePointer("prevNode");
                visualLinkedList.hidePointer("nextNode");

                visualLinkedList.remove(index);

                visualLinkedList.get(index-1).resetNextArrowWidth();
                visualLinkedList.get(index).resetPrevArrowWidth();

                return removedNode;
            }

            this.lineHighlighter.highlight(33);
            proceed = await this.timer.wait(500); if (!proceed) return;
            this.lineHighlighter.clear();

            list.unshift(3).unshift(true).unshift(12);

            this.visualLinkedList.unshift(3).unshift(true).unshift(12);
            this.visualLinkedList.get(0).displayNextArrow();
            this.visualLinkedList.get(0).setHeadStatus();
            this.visualLinkedList.get(1).displayNextArrow();
            this.visualLinkedList.get(1).displayPrevArrow();
            this.visualLinkedList.get(2).displayPrevArrow();
            this.visualLinkedList.get(2).setTailStatus();

            this.lineHighlighter.highlight(34);
            proceed = await this.timer.wait(500); if (!proceed) return;
            this.lineHighlighter.clear();

            this.lineHighlighter.highlight(37);
            proceed = await this.timer.wait(500); if (!proceed) return;
            this.lineHighlighter.clear();

            await list.exampleRemove(1, this.lineHighlighter, this.timer, this.visualLinkedList);

            if (!proceed) return;

            this.lineHighlighter.highlight(37);
            proceed = await this.timer.wait(500); if (!proceed) return;
            this.lineHighlighter.clear();

            this.finish();
        }
    }
];

initExamples(config);