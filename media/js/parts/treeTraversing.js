import LineHighlighter from "../modules/lineHighlighter.js";
import Timer from "../modules/timer.js";
import initExamples from "../modules/interactiveExample.js";
import VisualTree from "../modules/visualTree.js";
import VisualLinkedList from "../modules/visualLinkedList.js";
import VisualArray from "../modules/visualArray.js";
import Console from "../modules/console.js";
import CallStack from "../modules/callStack.js";


// used for interactive examples
class QueueNode {
    constructor(value) {
        this.value = value;
        this.next = null;
    }
}

// used for interactive examples (methods for interactive examples should be added to instance if needed)
class Queue {
    constructor() {
        this.first = null;
        this.last = null;
        this.size = 0;
    }

    enqueue(value) {
        const newNode = new QueueNode(value);
        if (!this.first) {
            this.first = newNode;
            this.last = newNode;
        } else {
            this.last.next = newNode;
            this.last = newNode;
        }
        return ++this.size;
    }

    dequeue() {
        if (!this.first) return null;
        const value = this.first.value;
        if (this.first === this.last) {
            this.last = null;
        }
        this.first = this.first.next;
        this.size--;
        return value;
    }
}

// used for interactive examples
class Node {
    constructor(value) {
        this.value = value;
        this.left = null;
        this.right = null;
    }
}

// used for interactive examples (methods for interactive examples should be added to instance if needed)
class BinarySearchTree {
    constructor() {
        this.root = null;
    }

    insert(value) {
        const newNode = new Node(value);

        if (!this.root) {
            this.root = newNode;
            return this;
        }

        let current = this.root;

        while (true) {
            if (value === current.value) return undefined;
            if (value > current.value) {
                if (!current.right) {
                    current.right = newNode;
                    return this;
                }
                current = current.right;
            } else {
                if (!current.left) {
                    current.left = newNode;
                    return this;
                }
                current = current.left;
            }
        }
    }

    find(value) {
        if (!this.root) return false;

        let current = this.root;

        while (current) {
            if (value === current.value) return current;

            if (value > current.value) current = current.right;
            else current = current.left;
        }
        return false;
    }
}


const config = [
    {
        exampleId: 1,
        console: new Console("console-1"),
        visualTree: new VisualTree("binary-search-tree-1", ["node"]),
        visualLinkedList: new VisualLinkedList("queue-1"),
        visualArray: new VisualArray("visual-array-1", 11),
        lineHighlighter: new LineHighlighter("code-1"),
        timer: new Timer(),
        code: async function() {
            let proceed;

            const tree = new BinarySearchTree();

            tree.exampleBFS = async function(lineHighlighter, timer, visualLinkedList, visualTree, visualArray) {
                const queue = new Queue();

                lineHighlighter.highlight(6);
                proceed = await timer.wait(500); if (!proceed) return;
                lineHighlighter.clear();

                const data = [];

                lineHighlighter.highlight(8);
                proceed = await timer.wait(500); if (!proceed) return;
                lineHighlighter.clear();

                queue.enqueue(this.root);

                visualLinkedList.push(this.root.value);
                visualLinkedList.get(0).setFirstStatus();
                visualLinkedList.get(0).setLastStatus();

                lineHighlighter.highlight(11);
                proceed = await timer.wait(500); if (!proceed) return;
                lineHighlighter.clear();

                lineHighlighter.highlight(14);
                proceed = await timer.wait(500); if (!proceed) return;
                lineHighlighter.clear();

                while (queue.size > 0) {
                    const node = queue.dequeue();

                    visualLinkedList.shift();
                    if (visualLinkedList.length > 0) visualLinkedList.get(0).setFirstStatus();
                    visualTree.setPointerToNode("node", node.value);

                    lineHighlighter.highlight(16);
                    proceed = await timer.wait(500); if (!proceed) return;
                    lineHighlighter.clear();

                    data.push(node.value);

                    visualArray.pushItem(node.value);

                    lineHighlighter.highlight(18);
                    proceed = await timer.wait(500); if (!proceed) return;
                    lineHighlighter.clear();


                    if (node.left) {
                        queue.enqueue(node.left);

                        if (visualLinkedList.length > 0) visualLinkedList.get(visualLinkedList.length-1).removeLastStatus();
                        visualLinkedList.push(node.left.value);
                        visualLinkedList.get(visualLinkedList.length-1).setLastStatus();
                        if (visualLinkedList.length === 1) visualLinkedList.get(0).setFirstStatus();
                        if (visualLinkedList.length > 1) visualLinkedList.get(visualLinkedList.length-2).displayArrow();

                        lineHighlighter.highlight(21);
                        proceed = await timer.wait(500); if (!proceed) return;
                        lineHighlighter.clear();
                    } else {
                        lineHighlighter.highlight(21);
                        proceed = await timer.wait(500); if (!proceed) return;
                        lineHighlighter.clear();
                    }

                    if (node.right) {
                        queue.enqueue(node.right);

                        if (visualLinkedList.length > 0) visualLinkedList.get(visualLinkedList.length-1).removeLastStatus();
                        visualLinkedList.push(node.right.value);
                        visualLinkedList.get(visualLinkedList.length-1).setLastStatus();
                        if (visualLinkedList.length === 1) visualLinkedList.get(0).setFirstStatus();
                        if (visualLinkedList.length > 1) visualLinkedList.get(visualLinkedList.length-2).displayArrow();

                        lineHighlighter.highlight(22);
                        proceed = await timer.wait(500); if (!proceed) return;
                        lineHighlighter.clear();
                    } else {
                        lineHighlighter.highlight(22);
                        proceed = await timer.wait(500); if (!proceed) return;
                        lineHighlighter.clear();
                    }

                    visualTree.hidePointer("node");

                    lineHighlighter.highlight(14);
                    proceed = await timer.wait(500); if (!proceed) return;
                    lineHighlighter.clear();
                }

                lineHighlighter.highlight(26);
                proceed = await timer.wait(500); if (!proceed) return;
                lineHighlighter.clear();

                return data;
            }

            this.lineHighlighter.highlight(31);
            proceed = await this.timer.wait(500); if (!proceed) return;
            this.lineHighlighter.clear();

            tree.insert(10).insert(5).insert(16).insert(13).insert(6).insert(2);
            tree.insert(17).insert(7).insert(3).insert(14).insert(11);

            this.visualTree.insert(10).insert(5).insert(16).insert(13).insert(6).insert(2);

            this.lineHighlighter.highlight(32);
            proceed = await this.timer.wait(500); if (!proceed) return;
            this.lineHighlighter.clear();

            this.visualTree.insert(17).insert(7).insert(3).insert(14).insert(11);

            this.lineHighlighter.highlight(33);
            proceed = await this.timer.wait(500); if (!proceed) return;
            this.lineHighlighter.clear();

            this.lineHighlighter.highlight(36);
            proceed = await this.timer.wait(500); if (!proceed) return;
            this.lineHighlighter.clear();

            const vysledek = await tree.exampleBFS(this.lineHighlighter, this.timer, this.visualLinkedList, this.visualTree, this.visualArray);

            if (!proceed) return;

            this.lineHighlighter.highlight(36);
            proceed = await this.timer.wait(500); if (!proceed) return;
            this.lineHighlighter.clear();

            this.console.log("Tree se procházel v tomto pořadí:");

            this.lineHighlighter.highlight(37);
            proceed = await this.timer.wait(500); if (!proceed) return;
            this.lineHighlighter.clear();

            this.console.log("[" + vysledek + "]");

            this.lineHighlighter.highlight(38);
            proceed = await this.timer.wait(500); if (!proceed) return;
            this.lineHighlighter.clear();

            this.finish();
        }
    },
    {
        exampleId: 2,
        console: new Console("console-2"),
        visualTree: new VisualTree("binary-search-tree-2", ["node"]),
        visualArray: new VisualArray("visual-array-2", 11),
        lineHighlighter: new LineHighlighter("code-2"),
        callStack: new CallStack("call-stack-1"),
        timer: new Timer(),
        code: async function() {
            let proceed;

            const tree = new BinarySearchTree();

            tree.exampleDFSPreOrder = async function(lineHighlighter, timer, visualTree, visualArray, callStack) {
                callStack.push("DFSPreOrder");

                const data = [];

                lineHighlighter.highlight(6);
                proceed = await timer.wait(500); if (!proceed) return;
                lineHighlighter.clear();
        
                const traverse = async function(node) {
                    callStack.push("traverse");
                    visualTree.setPointerToNode("node", node.value);
                    data.push(node.value);

                    visualArray.pushItem(node.value);

                    lineHighlighter.highlight(11);
                    proceed = await timer.wait(500); if (!proceed) return;
                    lineHighlighter.clear();

                    if (node.left) {
                        lineHighlighter.highlight(13);
                        proceed = await timer.wait(500); if (!proceed) return;
                        lineHighlighter.clear();

                        await traverse(node.left);

                        if (!proceed) return;
                        
                        visualTree.setPointerToNode("node", node.value);

                        lineHighlighter.highlight(13);
                        proceed = await timer.wait(500); if (!proceed) return;
                        lineHighlighter.clear();
                    } else {
                        lineHighlighter.highlight(13);
                        proceed = await timer.wait(500); if (!proceed) return;
                        lineHighlighter.clear();
                    }
                    if (node.right) {
                        lineHighlighter.highlight(15);
                        proceed = await timer.wait(500); if (!proceed) return;
                        lineHighlighter.clear();

                        await traverse(node.right);

                        if (!proceed) return;

                        visualTree.setPointerToNode("node", node.value);

                        lineHighlighter.highlight(15);
                        proceed = await timer.wait(500); if (!proceed) return;
                        lineHighlighter.clear();
                    } else {
                        lineHighlighter.highlight(15);
                        proceed = await timer.wait(500); if (!proceed) return;
                        lineHighlighter.clear();
                    }
                    visualTree.hidePointer("node");
                    callStack.pop();
                }

                lineHighlighter.highlight(9);
                proceed = await timer.wait(500); if (!proceed) return;
                lineHighlighter.clear();

                lineHighlighter.highlight(19);
                proceed = await timer.wait(500); if (!proceed) return;
                lineHighlighter.clear();
        
                await traverse(this.root);

                if (!proceed) return;

                lineHighlighter.highlight(19);
                proceed = await timer.wait(500); if (!proceed) return;
                lineHighlighter.clear();

                lineHighlighter.highlight(22);
                proceed = await timer.wait(500); if (!proceed) return;
                lineHighlighter.clear();
        
                callStack.pop();
                return data;
            }

            this.lineHighlighter.highlight(27);
            proceed = await this.timer.wait(500); if (!proceed) return;
            this.lineHighlighter.clear();

            tree.insert(10).insert(5).insert(16).insert(13).insert(6).insert(2);
            tree.insert(17).insert(7).insert(3).insert(14).insert(11);

            this.visualTree.insert(10).insert(5).insert(16).insert(13).insert(6).insert(2);

            this.lineHighlighter.highlight(28);
            proceed = await this.timer.wait(500); if (!proceed) return;
            this.lineHighlighter.clear();

            this.visualTree.insert(17).insert(7).insert(3).insert(14).insert(11);

            this.lineHighlighter.highlight(29);
            proceed = await this.timer.wait(500); if (!proceed) return;
            this.lineHighlighter.clear();

            this.lineHighlighter.highlight(32);
            proceed = await this.timer.wait(500); if (!proceed) return;
            this.lineHighlighter.clear();

            const vysledek = await tree.exampleDFSPreOrder(this.lineHighlighter, this.timer, this.visualTree, this.visualArray, this.callStack);

            if (!proceed) return;

            this.lineHighlighter.highlight(32);
            proceed = await this.timer.wait(500); if (!proceed) return;
            this.lineHighlighter.clear();

            this.console.log("Tree se procházel v tomto pořadí:");

            this.lineHighlighter.highlight(33);
            proceed = await this.timer.wait(500); if (!proceed) return;
            this.lineHighlighter.clear();

            this.console.log("[" + vysledek + "]");

            this.lineHighlighter.highlight(34);
            proceed = await this.timer.wait(500); if (!proceed) return;
            this.lineHighlighter.clear();

            this.finish();
        }
    },
    {
        exampleId: 3,
        console: new Console("console-3"),
        visualTree: new VisualTree("binary-search-tree-3", ["node"]),
        visualArray: new VisualArray("visual-array-3", 11),
        lineHighlighter: new LineHighlighter("code-3"),
        callStack: new CallStack("call-stack-2"),
        timer: new Timer(),
        code: async function() {
            let proceed;

            const tree = new BinarySearchTree();

            tree.exampleDFSPostOrder = async function(lineHighlighter, timer, visualTree, visualArray, callStack) {
                callStack.push("DFSPreOrder");

                const data = [];

                lineHighlighter.highlight(5);
                proceed = await timer.wait(500); if (!proceed) return;
                lineHighlighter.clear();
        
                const traverse = async function(node) {
                    callStack.push("traverse");
                    visualTree.setPointerToNode("node", node.value);

                    if (node.left) {
                        lineHighlighter.highlight(8);
                        proceed = await timer.wait(500); if (!proceed) return;
                        lineHighlighter.clear();

                        await traverse(node.left);

                        if (!proceed) return;
                        
                        visualTree.setPointerToNode("node", node.value);

                        lineHighlighter.highlight(8);
                        proceed = await timer.wait(500); if (!proceed) return;
                        lineHighlighter.clear();
                    } else {
                        lineHighlighter.highlight(8);
                        proceed = await timer.wait(500); if (!proceed) return;
                        lineHighlighter.clear();
                    }
                    if (node.right) {
                        lineHighlighter.highlight(9);
                        proceed = await timer.wait(500); if (!proceed) return;
                        lineHighlighter.clear();

                        await traverse(node.right);

                        if (!proceed) return;

                        visualTree.setPointerToNode("node", node.value);

                        lineHighlighter.highlight(9);
                        proceed = await timer.wait(500); if (!proceed) return;
                        lineHighlighter.clear();
                    } else {
                        lineHighlighter.highlight(9);
                        proceed = await timer.wait(500); if (!proceed) return;
                        lineHighlighter.clear();
                    }

                    data.push(node.value);

                    visualArray.pushItem(node.value);

                    lineHighlighter.highlight(11);
                    proceed = await timer.wait(500); if (!proceed) return;
                    lineHighlighter.clear();

                    visualTree.hidePointer("node");
                    callStack.pop();
                }

                lineHighlighter.highlight(7);
                proceed = await timer.wait(500); if (!proceed) return;
                lineHighlighter.clear();

                lineHighlighter.highlight(14);
                proceed = await timer.wait(500); if (!proceed) return;
                lineHighlighter.clear();
        
                await traverse(this.root);

                if (!proceed) return;

                lineHighlighter.highlight(14);
                proceed = await timer.wait(500); if (!proceed) return;
                lineHighlighter.clear();

                lineHighlighter.highlight(15);
                proceed = await timer.wait(500); if (!proceed) return;
                lineHighlighter.clear();
        
                callStack.pop();
                return data;
            }

            this.lineHighlighter.highlight(20);
            proceed = await this.timer.wait(500); if (!proceed) return;
            this.lineHighlighter.clear();

            tree.insert(10).insert(5).insert(16).insert(13).insert(6).insert(2);
            tree.insert(17).insert(7).insert(3).insert(14).insert(11);

            this.visualTree.insert(10).insert(5).insert(16).insert(13).insert(6).insert(2);

            this.lineHighlighter.highlight(21);
            proceed = await this.timer.wait(500); if (!proceed) return;
            this.lineHighlighter.clear();

            this.visualTree.insert(17).insert(7).insert(3).insert(14).insert(11);

            this.lineHighlighter.highlight(22);
            proceed = await this.timer.wait(500); if (!proceed) return;
            this.lineHighlighter.clear();

            this.lineHighlighter.highlight(25);
            proceed = await this.timer.wait(500); if (!proceed) return;
            this.lineHighlighter.clear();

            const vysledek = await tree.exampleDFSPostOrder(this.lineHighlighter, this.timer, this.visualTree, this.visualArray, this.callStack);

            if (!proceed) return;

            this.lineHighlighter.highlight(25);
            proceed = await this.timer.wait(500); if (!proceed) return;
            this.lineHighlighter.clear();

            this.console.log("Tree se procházel v tomto pořadí:");

            this.lineHighlighter.highlight(26);
            proceed = await this.timer.wait(500); if (!proceed) return;
            this.lineHighlighter.clear();

            this.console.log("[" + vysledek + "]");

            this.lineHighlighter.highlight(27);
            proceed = await this.timer.wait(500); if (!proceed) return;
            this.lineHighlighter.clear();

            this.finish();
        }
    },
    {
        exampleId: 4,
        console: new Console("console-4"),
        visualTree: new VisualTree("binary-search-tree-4", ["node"]),
        visualArray: new VisualArray("visual-array-4", 11),
        lineHighlighter: new LineHighlighter("code-4"),
        callStack: new CallStack("call-stack-3"),
        timer: new Timer(),
        code: async function() {
            let proceed;

            const tree = new BinarySearchTree();

            tree.exampleDFSInOrder = async function(lineHighlighter, timer, visualTree, visualArray, callStack) {
                callStack.push("DFSPreOrder");

                const data = [];

                lineHighlighter.highlight(5);
                proceed = await timer.wait(500); if (!proceed) return;
                lineHighlighter.clear();
        
                const traverse = async function(node) {
                    callStack.push("traverse");
                    visualTree.setPointerToNode("node", node.value);

                    if (node.left) {
                        lineHighlighter.highlight(8);
                        proceed = await timer.wait(500); if (!proceed) return;
                        lineHighlighter.clear();

                        await traverse(node.left);

                        if (!proceed) return;
                        
                        visualTree.setPointerToNode("node", node.value);

                        lineHighlighter.highlight(8);
                        proceed = await timer.wait(500); if (!proceed) return;
                        lineHighlighter.clear();
                    } else {
                        lineHighlighter.highlight(8);
                        proceed = await timer.wait(500); if (!proceed) return;
                        lineHighlighter.clear();
                    }

                    data.push(node.value);

                    visualArray.pushItem(node.value);

                    lineHighlighter.highlight(10);
                    proceed = await timer.wait(500); if (!proceed) return;
                    lineHighlighter.clear();

                    if (node.right) {
                        lineHighlighter.highlight(11);
                        proceed = await timer.wait(500); if (!proceed) return;
                        lineHighlighter.clear();

                        await traverse(node.right);

                        if (!proceed) return;

                        visualTree.setPointerToNode("node", node.value);

                        lineHighlighter.highlight(11);
                        proceed = await timer.wait(500); if (!proceed) return;
                        lineHighlighter.clear();
                    } else {
                        lineHighlighter.highlight(11);
                        proceed = await timer.wait(500); if (!proceed) return;
                        lineHighlighter.clear();
                    }

                    visualTree.hidePointer("node");
                    callStack.pop();
                }

                lineHighlighter.highlight(7);
                proceed = await timer.wait(500); if (!proceed) return;
                lineHighlighter.clear();

                lineHighlighter.highlight(14);
                proceed = await timer.wait(500); if (!proceed) return;
                lineHighlighter.clear();
        
                await traverse(this.root);

                if (!proceed) return;

                lineHighlighter.highlight(14);
                proceed = await timer.wait(500); if (!proceed) return;
                lineHighlighter.clear();

                lineHighlighter.highlight(15);
                proceed = await timer.wait(500); if (!proceed) return;
                lineHighlighter.clear();
        
                callStack.pop();
                return data;
            }

            this.lineHighlighter.highlight(20);
            proceed = await this.timer.wait(500); if (!proceed) return;
            this.lineHighlighter.clear();

            tree.insert(10).insert(5).insert(16).insert(13).insert(6).insert(2);
            tree.insert(17).insert(7).insert(3).insert(14).insert(11);

            this.visualTree.insert(10).insert(5).insert(16).insert(13).insert(6).insert(2);

            this.lineHighlighter.highlight(21);
            proceed = await this.timer.wait(500); if (!proceed) return;
            this.lineHighlighter.clear();

            this.visualTree.insert(17).insert(7).insert(3).insert(14).insert(11);

            this.lineHighlighter.highlight(22);
            proceed = await this.timer.wait(500); if (!proceed) return;
            this.lineHighlighter.clear();

            this.lineHighlighter.highlight(25);
            proceed = await this.timer.wait(500); if (!proceed) return;
            this.lineHighlighter.clear();

            const vysledek = await tree.exampleDFSInOrder(this.lineHighlighter, this.timer, this.visualTree, this.visualArray, this.callStack);

            if (!proceed) return;

            this.lineHighlighter.highlight(25);
            proceed = await this.timer.wait(500); if (!proceed) return;
            this.lineHighlighter.clear();

            this.console.log("Tree se procházel v tomto pořadí:");

            this.lineHighlighter.highlight(26);
            proceed = await this.timer.wait(500); if (!proceed) return;
            this.lineHighlighter.clear();

            this.console.log("[" + vysledek + "]");

            this.lineHighlighter.highlight(27);
            proceed = await this.timer.wait(500); if (!proceed) return;
            this.lineHighlighter.clear();

            this.finish();
        }
    }
];

initExamples(config);