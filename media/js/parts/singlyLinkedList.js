import LineHighlighter from "../modules/lineHighlighter.js";
import Timer from "../modules/timer.js";
import initExamples from "../modules/interactiveExample.js";
import VisualLinkedList from "../modules/visualLinkedList.js";

// used for interactive examples
class Node {
    constructor(value) {
        this.value = value;
        this.next = null;
    }
}

// used for interactive examples (methods for interactive examples should be added to instance if needed)
class SinglyLinkedList {
    constructor() {
        this.head = null;
        this.tail = null;
        this.length = 0;
    }

    push(value) {
        const newNode = new Node(value);
        if(!this.head){
            this.head = newNode;
            this.tail = this.head;
        } else {
            this.tail.next = newNode;
            this.tail = newNode;
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
        return current;
    }

    shift() {
        if (!this.head) return undefined;
        let currentHead = this.head;
        this.head = currentHead.next;
        this.length--;
        if (this.length === 0) {
            this.tail = null;
        }
        currentHead.next = null;
        return currentHead;
    }

    unshift(value) {
        const newNode = new Node(value);
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

        node.value = value;
        return true;
    }
    
    insert(index, value) {
        if(index < 0 || index > this.length) return false;

        if(index === this.length) return !!this.push(value);
        if(index === 0) return !!this.unshift(value);

        const newNode = new Node(value);
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

        this.length--;
        return removedNode;
    }

    getIndexOfNode(node) {
        if (!this.head) return -1;
        if (this.head === node) return 0;

        let current = this.head;
        let index = 0;

        while (current.next) {
            current = current.next;
            index++;
            if (current === node) return index;
        }

        return -1;
    }

    getIndexOfNodeForReverse(node) {
        if (!this.tail) return -1;
        if (this.tail === node) return 0;

        let current = this.tail;
        let index = 0;

        while (current.next) {
            current = current.next;
            index++;
            if (current === node) return index;
        }

        return -1;
    }
}

const config = [
    {
        exampleId: 1,
        visualLinkedList: new VisualLinkedList("linked-list-1", ["newNode"]),
        lineHighlighter: new LineHighlighter("code-1"),
        timer: new Timer(),
        code: async function() {
            let proceed;

            const list = new SinglyLinkedList();

            list.examplePush = async function(value, visualLinkedList, lineHighlighter, timer) {
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

                    this.tail = this.head;

                    visualLinkedList.get(0).setTailStatus();

                    lineHighlighter.highlight(11);
                    proceed = await timer.wait(500); if (!proceed) return;
                    lineHighlighter.clear();
                } else {
                    this.tail.next = newNode;

                    visualLinkedList.get(visualLinkedList.length-2).displayArrow();

                    lineHighlighter.highlight(14);
                    proceed = await timer.wait(500); if (!proceed) return;
                    lineHighlighter.clear();

                    this.tail = newNode;

                    visualLinkedList.get(visualLinkedList.length-2).removeTailStatus();
                    visualLinkedList.get(visualLinkedList.length-1).setTailStatus();

                    lineHighlighter.highlight(16);
                    proceed = await timer.wait(500); if (!proceed) return;
                    lineHighlighter.clear();
                }
                this.length++;

                lineHighlighter.highlight(19);
                proceed = await timer.wait(500); if (!proceed) return;
                lineHighlighter.clear();

                lineHighlighter.highlight(21);
                proceed = await timer.wait(500); if (!proceed) return;
                lineHighlighter.clear();

                visualLinkedList.hidePointer("newNode");

                return this;
            }

            this.lineHighlighter.highlight(25);
            proceed = await this.timer.wait(500); if (!proceed) return;
            this.lineHighlighter.clear();

            this.lineHighlighter.highlight(27);
            proceed = await this.timer.wait(500); if (!proceed) return;
            this.lineHighlighter.clear();

            await list.examplePush(3, this.visualLinkedList, this.lineHighlighter, this.timer);

            if (!proceed) return;

            this.lineHighlighter.highlight(27);
            proceed = await this.timer.wait(500); if (!proceed) return;
            this.lineHighlighter.clear();

            this.lineHighlighter.highlight(28);
            proceed = await this.timer.wait(500); if (!proceed) return;
            this.lineHighlighter.clear();

            await list.examplePush(true, this.visualLinkedList, this.lineHighlighter, this.timer);

            if (!proceed) return;

            this.lineHighlighter.highlight(28);
            proceed = await this.timer.wait(500); if (!proceed) return;
            this.lineHighlighter.clear();

            this.lineHighlighter.highlight(29);
            proceed = await this.timer.wait(500); if (!proceed) return;
            this.lineHighlighter.clear();

            await list.examplePush(12, this.visualLinkedList, this.lineHighlighter, this.timer);

            if (!proceed) return;

            this.lineHighlighter.highlight(29);
            proceed = await this.timer.wait(500); if (!proceed) return;
            this.lineHighlighter.clear();

            this.finish();
        }
    },
    {
        exampleId: 2,
        visualLinkedList: new VisualLinkedList("linked-list-2", ["current", "newTail"]),
        lineHighlighter: new LineHighlighter("code-2"),
        timer: new Timer(),
        code: async function() {
            let proceed;

            const list = new SinglyLinkedList();

            list.examplePop = async function(lineHighlighter, timer, visualLinkedList) {

                lineHighlighter.highlight(6);
                proceed = await timer.wait(500); if (!proceed) return;
                lineHighlighter.clear();

                if (!this.head) return undefined;
                let current = this.head;

                visualLinkedList.showPointer("current");
                visualLinkedList.movePointerToNode("current", 0);

                lineHighlighter.highlight(8);
                proceed = await timer.wait(500); if (!proceed) return;
                lineHighlighter.clear();

                let newTail = current;

                visualLinkedList.showPointer("newTail");
                visualLinkedList.movePointerToNode("newTail", 0);

                lineHighlighter.highlight(10);
                proceed = await timer.wait(500); if (!proceed) return;
                lineHighlighter.clear();

                lineHighlighter.highlight(12);
                proceed = await timer.wait(500); if (!proceed) return;
                lineHighlighter.clear();

                while (current.next) {
                    newTail = current;

                    visualLinkedList.movePointerToNode("newTail", list.getIndexOfNode(newTail));

                    lineHighlighter.highlight(13);
                    proceed = await timer.wait(500); if (!proceed) return;
                    lineHighlighter.clear();

                    current = current.next;

                    visualLinkedList.movePointerToNode("current", list.getIndexOfNode(current));

                    lineHighlighter.highlight(14);
                    proceed = await timer.wait(500); if (!proceed) return;
                    lineHighlighter.clear();

                    lineHighlighter.highlight(12);
                    proceed = await timer.wait(500); if (!proceed) return;
                    lineHighlighter.clear();
                }

                visualLinkedList.get(list.getIndexOfNode(this.tail)).removeTailStatus();

                this.tail = newTail;

                visualLinkedList.get(list.getIndexOfNode(this.tail)).setTailStatus();

                lineHighlighter.highlight(17);
                proceed = await timer.wait(500); if (!proceed) return;
                lineHighlighter.clear();

                this.tail.next = null;

                visualLinkedList.get(list.getIndexOfNode(this.tail)).hideArrow();

                lineHighlighter.highlight(19);
                proceed = await timer.wait(500); if (!proceed) return;
                lineHighlighter.clear();

                this.length--;

                lineHighlighter.highlight(21);
                proceed = await timer.wait(500); if (!proceed) return;
                lineHighlighter.clear();

                lineHighlighter.highlight(23);
                proceed = await timer.wait(500); if (!proceed) return;
                lineHighlighter.clear();

                if (this.length === 0) {
                    this.head = null;
                    this.tail = null;
                }

                lineHighlighter.highlight(28);
                proceed = await timer.wait(500); if (!proceed) return;
                lineHighlighter.clear();

                visualLinkedList.pop();
                visualLinkedList.hidePointer("newTail");

                return current;
            }

            this.lineHighlighter.highlight(32);
            proceed = await this.timer.wait(500); if (!proceed) return;
            this.lineHighlighter.clear();

            list.push(3).push(true).push(12).push(23);

            this.visualLinkedList.push(3).push(true).push(12).push(23);
            this.visualLinkedList.get(0).displayArrow();
            this.visualLinkedList.get(0).setHeadStatus();
            this.visualLinkedList.get(1).displayArrow();
            this.visualLinkedList.get(2).displayArrow();
            this.visualLinkedList.get(3).setTailStatus();

            this.lineHighlighter.highlight(34);
            proceed = await this.timer.wait(500); if (!proceed) return;
            this.lineHighlighter.clear();

            this.lineHighlighter.highlight(37);
            proceed = await this.timer.wait(500); if (!proceed) return;
            this.lineHighlighter.clear();

            await list.examplePop(this.lineHighlighter, this.timer, this.visualLinkedList);

            if (!proceed) return;

            this.lineHighlighter.highlight(37);
            proceed = await this.timer.wait(500); if (!proceed) return;
            this.lineHighlighter.clear();

            this.lineHighlighter.highlight(38);
            proceed = await this.timer.wait(500); if (!proceed) return;
            this.lineHighlighter.clear();

            await list.examplePop(this.lineHighlighter, this.timer, this.visualLinkedList);

            if (!proceed) return;

            this.lineHighlighter.highlight(38);
            proceed = await this.timer.wait(500); if (!proceed) return;
            this.lineHighlighter.clear();

            this.finish();
        }
    },
    {
        exampleId: 3,
        visualLinkedList: new VisualLinkedList("linked-list-3", ["currentHead"]),
        lineHighlighter: new LineHighlighter("code-3"),
        timer: new Timer(),
        code: async function() {
            let proceed;

            const list = new SinglyLinkedList();

            list.exampleShift = async function(lineHighlighter, timer, visualLinkedList) {

                lineHighlighter.highlight(6);
                proceed = await timer.wait(500); if (!proceed) return;
                lineHighlighter.clear();

                if (!this.head) return undefined;
                let currentHead = this.head;

                visualLinkedList.showPointer("currentHead");
                visualLinkedList.movePointerToNode("currentHead", 0);

                lineHighlighter.highlight(8);
                proceed = await timer.wait(500); if (!proceed) return;
                lineHighlighter.clear();

                this.head = currentHead.next;

                visualLinkedList.get(0).removeHeadStatus();

                if (this.length > 1) {
                    visualLinkedList.get(1).setHeadStatus();
                }

                lineHighlighter.highlight(10);
                proceed = await timer.wait(500); if (!proceed) return;
                lineHighlighter.clear();

                this.length--;

                lineHighlighter.highlight(12);
                proceed = await timer.wait(500); if (!proceed) return;
                lineHighlighter.clear();

                lineHighlighter.highlight(14);
                proceed = await timer.wait(500); if (!proceed) return;
                lineHighlighter.clear();

                if (this.length === 0) {
                    this.tail = null;

                    visualLinkedList.get(0).removeTailStatus();

                    lineHighlighter.highlight(15);
                    proceed = await timer.wait(500); if (!proceed) return;
                    lineHighlighter.clear();
                }
                currentHead.next = null;

                visualLinkedList.get(0).hideArrow();

                lineHighlighter.highlight(18);
                proceed = await timer.wait(500); if (!proceed) return;
                lineHighlighter.clear();

                lineHighlighter.highlight(20);
                proceed = await timer.wait(500); if (!proceed) return;
                lineHighlighter.clear();

                visualLinkedList.hidePointer("currentHead");
                visualLinkedList.shift();
                
                return currentHead;
            }

            this.lineHighlighter.highlight(24);
            proceed = await this.timer.wait(500); if (!proceed) return;
            this.lineHighlighter.clear();

            list.push(3).push(true).push(12).push(23);

            this.visualLinkedList.push(3).push(true).push(12).push(23);
            this.visualLinkedList.get(0).displayArrow();
            this.visualLinkedList.get(0).setHeadStatus();
            this.visualLinkedList.get(1).displayArrow();
            this.visualLinkedList.get(2).displayArrow();
            this.visualLinkedList.get(3).setTailStatus();

            this.lineHighlighter.highlight(25);
            proceed = await this.timer.wait(500); if (!proceed) return;
            this.lineHighlighter.clear();

            this.lineHighlighter.highlight(28);
            proceed = await this.timer.wait(500); if (!proceed) return;
            this.lineHighlighter.clear();

            await list.exampleShift(this.lineHighlighter, this.timer, this.visualLinkedList);

            if (!proceed) return;

            this.lineHighlighter.highlight(28);
            proceed = await this.timer.wait(500); if (!proceed) return;
            this.lineHighlighter.clear();

            this.lineHighlighter.highlight(29);
            proceed = await this.timer.wait(500); if (!proceed) return;
            this.lineHighlighter.clear();

            await list.exampleShift(this.lineHighlighter, this.timer, this.visualLinkedList);

            if (!proceed) return;

            this.lineHighlighter.highlight(29);
            proceed = await this.timer.wait(500); if (!proceed) return;
            this.lineHighlighter.clear();

            this.finish();
        }
    },
    {
        exampleId: 4,
        visualLinkedList: new VisualLinkedList("linked-list-4", ["newNode"]),
        lineHighlighter: new LineHighlighter("code-4"),
        timer: new Timer(),
        code: async function() {
            let proceed;

            const list = new SinglyLinkedList();

            list.exampleUnshift = async function(value, lineHighlighter, timer, visualLinkedList) {
                const newNode = new Node(value);

                visualLinkedList.unshift(value);
                visualLinkedList.showPointer("newNode");
                visualLinkedList.movePointerToNode("newNode", 0);

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

                    lineHighlighter.highlight(10);
                    proceed = await timer.wait(500); if (!proceed) return;
                    lineHighlighter.clear();
                } else {
                    newNode.next = this.head;

                    visualLinkedList.get(0).displayArrow();

                    lineHighlighter.highlight(13);
                    proceed = await timer.wait(500); if (!proceed) return;
                    lineHighlighter.clear();

                    this.head = newNode;

                    visualLinkedList.get(1).removeHeadStatus();
                    visualLinkedList.get(0).setHeadStatus();

                    lineHighlighter.highlight(15);
                    proceed = await timer.wait(500); if (!proceed) return;
                    lineHighlighter.clear();
                }
                this.length++;

                lineHighlighter.highlight(18);
                proceed = await timer.wait(500); if (!proceed) return;
                lineHighlighter.clear();

                lineHighlighter.highlight(20);
                proceed = await timer.wait(500); if (!proceed) return;
                lineHighlighter.clear();

                visualLinkedList.hidePointer("newNode");

                return this;
            }

            this.lineHighlighter.highlight(24);
            proceed = await this.timer.wait(500); if (!proceed) return;
            this.lineHighlighter.clear();

            this.lineHighlighter.highlight(27);
            proceed = await this.timer.wait(500); if (!proceed) return;
            this.lineHighlighter.clear();

            await list.exampleUnshift(3, this.lineHighlighter, this.timer, this.visualLinkedList);

            if (!proceed) return;

            this.lineHighlighter.highlight(27);
            proceed = await this.timer.wait(500); if (!proceed) return;
            this.lineHighlighter.clear();

            this.lineHighlighter.highlight(28);
            proceed = await this.timer.wait(500); if (!proceed) return;
            this.lineHighlighter.clear();

            await list.exampleUnshift(true, this.lineHighlighter, this.timer, this.visualLinkedList);

            if (!proceed) return;

            this.lineHighlighter.highlight(28);
            proceed = await this.timer.wait(500); if (!proceed) return;
            this.lineHighlighter.clear();

            this.lineHighlighter.highlight(29);
            proceed = await this.timer.wait(500); if (!proceed) return;
            this.lineHighlighter.clear();

            await list.exampleUnshift(12, this.lineHighlighter, this.timer, this.visualLinkedList);

            if (!proceed) return;

            this.lineHighlighter.highlight(29);
            proceed = await this.timer.wait(500); if (!proceed) return;
            this.lineHighlighter.clear();

            this.finish();
        }
    },
    {
        exampleId: 5,
        visualLinkedList: new VisualLinkedList("linked-list-5", ["current", "ziskanaNode"]),
        lineHighlighter: new LineHighlighter("code-5"),
        timer: new Timer(),
        code: async function() {
            let proceed;

            const list = new SinglyLinkedList();

            list.exampleGet = async function(index, lineHighlighter, timer, visualLinkedList) {
                lineHighlighter.highlight(6);
                proceed = await timer.wait(500); if (!proceed) return;
                lineHighlighter.clear();

                if (index < 0 || index >= this.length) return null;
        
                let current = this.head;

                visualLinkedList.showPointer("current");
                visualLinkedList.movePointerToNode("current", 0);

                lineHighlighter.highlight(9);
                proceed = await timer.wait(500); if (!proceed) return;
                lineHighlighter.clear();

                lineHighlighter.highlight(12);
                proceed = await timer.wait(500); if (!proceed) return;
                lineHighlighter.clear();
        
                for (let i = 1; i <= index; i++) {
                    current = current.next;

                    visualLinkedList.movePointerToNode("current", i);

                    lineHighlighter.highlight(14);
                    proceed = await timer.wait(500); if (!proceed) return;
                    lineHighlighter.clear();

                    lineHighlighter.highlight(12);
                    proceed = await timer.wait(500); if (!proceed) return;
                    lineHighlighter.clear();
                }

                lineHighlighter.highlight(18);
                proceed = await timer.wait(500); if (!proceed) return;
                lineHighlighter.clear();

                visualLinkedList.hidePointer("current");
        
                return current;
            }

            this.lineHighlighter.highlight(22);
            proceed = await this.timer.wait(500); if (!proceed) return;
            this.lineHighlighter.clear();

            list.unshift(3).unshift(true).unshift(12);

            this.visualLinkedList.unshift(3).unshift(true).unshift(12);
            this.visualLinkedList.get(0).displayArrow();
            this.visualLinkedList.get(0).setHeadStatus();
            this.visualLinkedList.get(1).displayArrow();
            this.visualLinkedList.get(2).setTailStatus();

            this.lineHighlighter.highlight(23);
            proceed = await this.timer.wait(500); if (!proceed) return;
            this.lineHighlighter.clear();

            this.lineHighlighter.highlight(26);
            proceed = await this.timer.wait(500); if (!proceed) return;
            this.lineHighlighter.clear();

            const ziskanaNode = await list.exampleGet(1, this.lineHighlighter, this.timer, this.visualLinkedList);

            if (!proceed) return;

            this.visualLinkedList.showPointer("ziskanaNode");
            this.visualLinkedList.movePointerToNode("ziskanaNode", 1);

            this.lineHighlighter.highlight(26);
            proceed = await this.timer.wait(500); if (!proceed) return;
            this.lineHighlighter.clear();

            this.finish();
        }
    },
    {
        exampleId: 6,
        visualLinkedList: new VisualLinkedList("linked-list-6", ["node"]),
        lineHighlighter: new LineHighlighter("code-6"),
        timer: new Timer(),
        code: async function() {
            let proceed;

            const list = new SinglyLinkedList();

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
            this.visualLinkedList.get(0).displayArrow();
            this.visualLinkedList.get(0).setHeadStatus();
            this.visualLinkedList.get(1).displayArrow();
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
        visualLinkedList: new VisualLinkedList("linked-list-7", ["newNode", "prevNode"]),
        lineHighlighter: new LineHighlighter("code-7"),
        timer: new Timer(),
        code: async function() {
            let proceed;

            const list = new SinglyLinkedList();

            list.exampleInsert = async function(index, value, lineHighlighter, timer, visualLinkedList) {

                lineHighlighter.highlight(6);
                proceed = await timer.wait(500); if (!proceed) return;
                lineHighlighter.clear();

                if(index < 0 || index > this.length) return false;

                lineHighlighter.highlight(9);
                proceed = await timer.wait(500); if (!proceed) return;
                lineHighlighter.clear();

                if(index === this.length) return !!this.push(value);

                lineHighlighter.highlight(11);
                proceed = await timer.wait(500); if (!proceed) return;
                lineHighlighter.clear();

                if(index === 0) return !!this.unshift(value);

                const newNode = new Node(value);

                visualLinkedList.insert(index, value);
                visualLinkedList.get(1).setArrowDoubleWidth(visualLinkedList.get(2));

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

                newNode.next = prevNode.next;

                visualLinkedList.get(index).displayArrow();

                lineHighlighter.highlight(18);
                proceed = await timer.wait(500); if (!proceed) return;
                lineHighlighter.clear();

                prevNode.next = newNode;

                visualLinkedList.get(index-1).resetArrowWidth();

                lineHighlighter.highlight(20);
                proceed = await timer.wait(500); if (!proceed) return;
                lineHighlighter.clear();

                this.length++;

                lineHighlighter.highlight(22);
                proceed = await timer.wait(500); if (!proceed) return;
                lineHighlighter.clear();

                lineHighlighter.highlight(24);
                proceed = await timer.wait(500); if (!proceed) return;
                lineHighlighter.clear();

                visualLinkedList.hidePointer("newNode");
                visualLinkedList.hidePointer("prevNode");

                return true;
            }

            this.lineHighlighter.highlight(28);
            proceed = await this.timer.wait(500); if (!proceed) return;
            this.lineHighlighter.clear();

            list.unshift(3).unshift(true).unshift(12);

            this.visualLinkedList.unshift(3).unshift(true).unshift(12);
            this.visualLinkedList.get(0).displayArrow();
            this.visualLinkedList.get(0).setHeadStatus();
            this.visualLinkedList.get(1).displayArrow();
            this.visualLinkedList.get(2).setTailStatus();

            this.lineHighlighter.highlight(29);
            proceed = await this.timer.wait(500); if (!proceed) return;
            this.lineHighlighter.clear();

            this.lineHighlighter.highlight(32);
            proceed = await this.timer.wait(500); if (!proceed) return;
            this.lineHighlighter.clear();

            await list.exampleInsert(2, 25, this.lineHighlighter, this.timer, this.visualLinkedList);

            if (!proceed) return;

            this.lineHighlighter.highlight(32);
            proceed = await this.timer.wait(500); if (!proceed) return;
            this.lineHighlighter.clear();

            this.finish();
        }
    },
    {
        exampleId: 8,
        visualLinkedList: new VisualLinkedList("linked-list-8", ["prevNode", "removedNode"]),
        lineHighlighter: new LineHighlighter("code-8"),
        timer: new Timer(),
        code: async function() {
            let proceed;

            const list = new SinglyLinkedList();

            list.exampleRemove = async function(index, lineHighlighter, timer, visualLinkedList) {

                lineHighlighter.highlight(6);
                proceed = await timer.wait(500); if (!proceed) return;
                lineHighlighter.clear();

                if (index < 0 || index >= this.length) return undefined;

                lineHighlighter.highlight(9);
                proceed = await timer.wait(500); if (!proceed) return;
                lineHighlighter.clear();

                if (index === this.length - 1) return this.pop();

                lineHighlighter.highlight(11);
                proceed = await timer.wait(500); if (!proceed) return;
                lineHighlighter.clear();

                if (index === 0) return this.shift();
        
                const prevNode = this.get(index-1);

                visualLinkedList.showPointer("prevNode");
                visualLinkedList.movePointerToNode("prevNode", index-1);

                lineHighlighter.highlight(14);
                proceed = await timer.wait(500); if (!proceed) return;
                lineHighlighter.clear();

                const removedNode = prevNode.next;

                visualLinkedList.showPointer("removedNode");
                visualLinkedList.movePointerToNode("removedNode", index);

                lineHighlighter.highlight(16);
                proceed = await timer.wait(500); if (!proceed) return;
                lineHighlighter.clear();

                prevNode.next = removedNode.next;

                visualLinkedList.get(index-1).setArrowDoubleWidth(visualLinkedList.get(index));

                lineHighlighter.highlight(18);
                proceed = await timer.wait(500); if (!proceed) return;
                lineHighlighter.clear();

                removedNode.next = null;

                visualLinkedList.get(index).hideArrow();

                lineHighlighter.highlight(20);
                proceed = await timer.wait(500); if (!proceed) return;
                lineHighlighter.clear();
        
                this.length--;

                lineHighlighter.highlight(23);
                proceed = await timer.wait(500); if (!proceed) return;
                lineHighlighter.clear();

                lineHighlighter.highlight(25);
                proceed = await timer.wait(500); if (!proceed) return;
                lineHighlighter.clear();

                visualLinkedList.hidePointer("prevNode");
                visualLinkedList.hidePointer("removedNode");
                visualLinkedList.remove(index);
                visualLinkedList.get(index-1).resetArrowWidth();

                return removedNode;
            }

            this.lineHighlighter.highlight(29);
            proceed = await this.timer.wait(500); if (!proceed) return;
            this.lineHighlighter.clear();

            list.unshift(3).unshift(true).unshift(12);

            this.visualLinkedList.unshift(3).unshift(true).unshift(12);
            this.visualLinkedList.get(0).displayArrow();
            this.visualLinkedList.get(0).setHeadStatus();
            this.visualLinkedList.get(1).displayArrow();
            this.visualLinkedList.get(2).setTailStatus();

            this.lineHighlighter.highlight(30);
            proceed = await this.timer.wait(500); if (!proceed) return;
            this.lineHighlighter.clear();

            this.lineHighlighter.highlight(33);
            proceed = await this.timer.wait(500); if (!proceed) return;
            this.lineHighlighter.clear();

            await list.exampleRemove(1, this.lineHighlighter, this.timer, this.visualLinkedList);

            if (!proceed) return;

            this.lineHighlighter.highlight(33);
            proceed = await this.timer.wait(500); if (!proceed) return;
            this.lineHighlighter.clear();

            this.finish();
        }
    },
    {
        exampleId: 9,
        visualLinkedList: new VisualLinkedList("linked-list-9", ["node", "next", "prev"]),
        lineHighlighter: new LineHighlighter("code-9"),
        timer: new Timer(),
        code: async function() {
            let proceed;

            const list = new SinglyLinkedList();

            list.exampleReverse = async function(lineHighlighter, timer, visualLinkedList) {
                let node = this.head;

                visualLinkedList.showPointer("node");
                visualLinkedList.movePointerToNode("node", 0);

                lineHighlighter.highlight(6);
                proceed = await timer.wait(500); if (!proceed) return;
                lineHighlighter.clear();

                this.head = this.tail;

                visualLinkedList.get(0).removeHeadStatus();
                visualLinkedList.get(this.length-1).setHeadStatus();

                lineHighlighter.highlight(8);
                proceed = await timer.wait(500); if (!proceed) return;
                lineHighlighter.clear();

                this.tail = node;

                visualLinkedList.get(this.length-1).removeTailStatus();
                visualLinkedList.get(0).setTailStatus();

                lineHighlighter.highlight(9);
                proceed = await timer.wait(500); if (!proceed) return;
                lineHighlighter.clear();

                let next;

                visualLinkedList.showPointer("next");

                lineHighlighter.highlight(12);
                proceed = await timer.wait(500); if (!proceed) return;
                lineHighlighter.clear();

                let prev = null;

                visualLinkedList.showPointer("prev");

                lineHighlighter.highlight(13);
                proceed = await timer.wait(500); if (!proceed) return;
                lineHighlighter.clear();

                lineHighlighter.highlight(16);
                proceed = await timer.wait(500); if (!proceed) return;
                lineHighlighter.clear();

                let index = 0;

                while (node) {
                    next = node.next;

                    if (next) visualLinkedList.movePointerToNode("next", index+1);
                    else visualLinkedList.hidePointer("next");

                    lineHighlighter.highlight(18);
                    proceed = await timer.wait(500); if (!proceed) return;
                    lineHighlighter.clear();

                    if (index === this.length-1) visualLinkedList.get(index).displayArrow();
                    
                    if (prev) visualLinkedList.get(index).setArrowToBack(visualLinkedList.get(index-1));
                    else visualLinkedList.get(index).hideArrow();

                    node.next = prev;

                    lineHighlighter.highlight(20);
                    proceed = await timer.wait(500); if (!proceed) return;
                    lineHighlighter.clear();

                    prev = node;

                    visualLinkedList.movePointerToNode("prev", index);

                    lineHighlighter.highlight(23);
                    proceed = await timer.wait(500); if (!proceed) return;
                    lineHighlighter.clear();

                    node = next;

                    if (next) visualLinkedList.movePointerToNode("node", index+1);
                    else visualLinkedList.hidePointer("node");

                    lineHighlighter.highlight(25);
                    proceed = await timer.wait(500); if (!proceed) return;
                    lineHighlighter.clear();

                    lineHighlighter.highlight(16);
                    proceed = await timer.wait(500); if (!proceed) return;
                    lineHighlighter.clear();

                    index++;
                }

                lineHighlighter.highlight(27);
                proceed = await timer.wait(500); if (!proceed) return;
                lineHighlighter.clear();

                visualLinkedList.hidePointer("prev");

                return this;
            }

            this.lineHighlighter.highlight(31);
            proceed = await this.timer.wait(500); if (!proceed) return;
            this.lineHighlighter.clear();

            list.unshift(3).unshift(true).unshift(12).unshift(26);

            this.visualLinkedList.unshift(3).unshift(true).unshift(12).unshift(26);
            this.visualLinkedList.get(0).displayArrow();
            this.visualLinkedList.get(0).setHeadStatus();
            this.visualLinkedList.get(1).displayArrow();
            this.visualLinkedList.get(2).displayArrow();
            this.visualLinkedList.get(3).setTailStatus();

            this.lineHighlighter.highlight(32);
            proceed = await this.timer.wait(500); if (!proceed) return;
            this.lineHighlighter.clear();

            this.lineHighlighter.highlight(35);
            proceed = await this.timer.wait(500); if (!proceed) return;
            this.lineHighlighter.clear();

            await list.exampleReverse(this.lineHighlighter, this.timer, this.visualLinkedList);

            if (!proceed) return;

            this.lineHighlighter.highlight(35);
            proceed = await this.timer.wait(500); if (!proceed) return;
            this.lineHighlighter.clear();

            this.finish();
        }
    }
];

initExamples(config);