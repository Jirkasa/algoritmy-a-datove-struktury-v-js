import LineHighlighter from "../modules/lineHighlighter.js";
import Timer from "../modules/timer.js";
import initExamples from "../modules/interactiveExample.js";
import VisualTree from "../modules/visualTree.js";
import VisualVariables from "../modules/visualVariables.js";

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
        visualTree: new VisualTree("binary-search-tree-1", ["current"]),
        visualVariables: new VisualVariables([{id: "variable-insert-value", value: 0, hide: true}], true),
        lineHighlighter: new LineHighlighter("code-1"),
        timer: new Timer(),
        code: async function() {
            let proceed;

            const tree = new BinarySearchTree();

            tree.exampleInsert = async function(value, lineHighlighter, timer, visualVariables, visualTree) {
                const newNode = new Node(value);

                visualVariables.show("variable-insert-value");
                visualVariables.setValue("variable-insert-value", value);

                lineHighlighter.highlight(6);
                proceed = await timer.wait(500); if (!proceed) return;
                lineHighlighter.clear();

                lineHighlighter.highlight(9);
                proceed = await timer.wait(500); if (!proceed) return;
                lineHighlighter.clear();
        
                if (!this.root) {
                    this.root = newNode;

                    visualTree.insert(value);

                    lineHighlighter.highlight(10);
                    proceed = await timer.wait(500); if (!proceed) return;
                    lineHighlighter.clear();

                    lineHighlighter.highlight(11);
                    proceed = await timer.wait(500); if (!proceed) return;
                    lineHighlighter.clear();

                    visualVariables.hide("variable-insert-value");
                    return this;
                }
        
                let current = this.root;

                visualTree.setPointerToNode("current", this.root.value);

                lineHighlighter.highlight(15);
                proceed = await timer.wait(500); if (!proceed) return;
                lineHighlighter.clear();

                lineHighlighter.highlight(18);
                proceed = await timer.wait(500); if (!proceed) return;
                lineHighlighter.clear();
        
                while (true) {
                    lineHighlighter.highlight(22);
                    proceed = await timer.wait(500); if (!proceed) return;
                    lineHighlighter.clear();

                    if (value === current.value) {
                        visualVariables.hide("variable-insert-value");
                        visualTree.hidePointer("current");
                        return undefined;
                    }

                    lineHighlighter.highlight(24);
                    proceed = await timer.wait(500); if (!proceed) return;
                    lineHighlighter.clear();

                    if (value > current.value) {
                        lineHighlighter.highlight(26);
                        proceed = await timer.wait(500); if (!proceed) return;
                        lineHighlighter.clear();

                        if (!current.right) {
                            current.right = newNode;

                            visualTree.insert(value);

                            lineHighlighter.highlight(27);
                            proceed = await timer.wait(500); if (!proceed) return;
                            lineHighlighter.clear();

                            lineHighlighter.highlight(28);
                            proceed = await timer.wait(500); if (!proceed) return;
                            lineHighlighter.clear();

                            visualVariables.hide("variable-insert-value");
                            visualTree.hidePointer("current");
                            return this;
                        }
                        current = current.right;

                        visualTree.setPointerToNode("current", current.value);

                        lineHighlighter.highlight(31);
                        proceed = await timer.wait(500); if (!proceed) return;
                        lineHighlighter.clear();
                    } else {
                        lineHighlighter.highlight(35);
                        proceed = await timer.wait(500); if (!proceed) return;
                        lineHighlighter.clear();

                        if (!current.left) {
                            current.left = newNode;

                            visualTree.insert(value);

                            lineHighlighter.highlight(36);
                            proceed = await timer.wait(500); if (!proceed) return;
                            lineHighlighter.clear();

                            lineHighlighter.highlight(37);
                            proceed = await timer.wait(500); if (!proceed) return;
                            lineHighlighter.clear();

                            visualVariables.hide("variable-insert-value");
                            visualTree.hidePointer("current");
                            return this;
                        }
                        current = current.left;

                        visualTree.setPointerToNode("current", current.value);

                        lineHighlighter.highlight(40);
                        proceed = await timer.wait(500); if (!proceed) return;
                        lineHighlighter.clear();
                    }

                    lineHighlighter.highlight(18);
                    proceed = await timer.wait(500); if (!proceed) return;
                    lineHighlighter.clear();
                }
            }

            this.lineHighlighter.highlight(47);
            proceed = await this.timer.wait(500); if (!proceed) return;
            this.lineHighlighter.clear();

            this.lineHighlighter.highlight(49);
            proceed = await this.timer.wait(500); if (!proceed) return;
            this.lineHighlighter.clear();

            await tree.exampleInsert(10, this.lineHighlighter, this.timer, this.visualVariables, this.visualTree);

            if (!proceed) return;

            this.lineHighlighter.highlight(49);
            proceed = await this.timer.wait(500); if (!proceed) return;
            this.lineHighlighter.clear();

            this.lineHighlighter.highlight(50);
            proceed = await this.timer.wait(500); if (!proceed) return;
            this.lineHighlighter.clear();

            await tree.exampleInsert(5, this.lineHighlighter, this.timer, this.visualVariables, this.visualTree);

            if (!proceed) return;

            this.lineHighlighter.highlight(50);
            proceed = await this.timer.wait(500); if (!proceed) return;
            this.lineHighlighter.clear();

            this.lineHighlighter.highlight(51);
            proceed = await this.timer.wait(500); if (!proceed) return;
            this.lineHighlighter.clear();

            await tree.exampleInsert(13, this.lineHighlighter, this.timer, this.visualVariables, this.visualTree);

            if (!proceed) return;

            this.lineHighlighter.highlight(51);
            proceed = await this.timer.wait(500); if (!proceed) return;
            this.lineHighlighter.clear();

            this.lineHighlighter.highlight(52);
            proceed = await this.timer.wait(500); if (!proceed) return;
            this.lineHighlighter.clear();

            await tree.exampleInsert(11, this.lineHighlighter, this.timer, this.visualVariables, this.visualTree);

            if (!proceed) return;

            this.lineHighlighter.highlight(52);
            proceed = await this.timer.wait(500); if (!proceed) return;
            this.lineHighlighter.clear();

            this.lineHighlighter.highlight(53);
            proceed = await this.timer.wait(500); if (!proceed) return;
            this.lineHighlighter.clear();

            await tree.exampleInsert(2, this.lineHighlighter, this.timer, this.visualVariables, this.visualTree);

            if (!proceed) return;

            this.lineHighlighter.highlight(53);
            proceed = await this.timer.wait(500); if (!proceed) return;
            this.lineHighlighter.clear();

            this.lineHighlighter.highlight(54);
            proceed = await this.timer.wait(500); if (!proceed) return;
            this.lineHighlighter.clear();

            await tree.exampleInsert(16, this.lineHighlighter, this.timer, this.visualVariables, this.visualTree);

            if (!proceed) return;

            this.lineHighlighter.highlight(54);
            proceed = await this.timer.wait(500); if (!proceed) return;
            this.lineHighlighter.clear();

            this.lineHighlighter.highlight(55);
            proceed = await this.timer.wait(500); if (!proceed) return;
            this.lineHighlighter.clear();

            await tree.exampleInsert(7, this.lineHighlighter, this.timer, this.visualVariables, this.visualTree);

            if (!proceed) return;

            this.lineHighlighter.highlight(55);
            proceed = await this.timer.wait(500); if (!proceed) return;
            this.lineHighlighter.clear();

            this.lineHighlighter.highlight(56);
            proceed = await this.timer.wait(500); if (!proceed) return;
            this.lineHighlighter.clear();

            await tree.exampleInsert(3, this.lineHighlighter, this.timer, this.visualVariables, this.visualTree);

            if (!proceed) return;

            this.lineHighlighter.highlight(56);
            proceed = await this.timer.wait(500); if (!proceed) return;
            this.lineHighlighter.clear();

            this.finish();
        }
    },
    {
        exampleId: 2,
        visualTree: new VisualTree("binary-search-tree-2", ["current", "vyhledanaNode1", "vyhledanaNode2"]),
        visualVariables: new VisualVariables([{id: "variable-find-value", value: 0, hide: true}], true),
        lineHighlighter: new LineHighlighter("code-2"),
        timer: new Timer(),
        code: async function() {
            let proceed;

            const tree = new BinarySearchTree();

            tree.exampleFind = async function(value, lineHighlighter, timer, visualTree, visualVariables) {

                visualVariables.show("variable-find-value");
                visualVariables.setValue("variable-find-value", value);

                lineHighlighter.highlight(6);
                proceed = await timer.wait(500); if (!proceed) return;
                lineHighlighter.clear();

                if (!this.root) {
                    visualVariables.hide("variable-find-value");
                    return false;
                }
        
                let current = this.root;

                visualTree.setPointerToNode("current", this.root.value);

                lineHighlighter.highlight(9);
                proceed = await timer.wait(500); if (!proceed) return;
                lineHighlighter.clear();

                lineHighlighter.highlight(12);
                proceed = await timer.wait(500); if (!proceed) return;
                lineHighlighter.clear();
        
                while (current) {

                    lineHighlighter.highlight(14);
                    proceed = await timer.wait(500); if (!proceed) return;
                    lineHighlighter.clear();

                    if (value === current.value) {
                        visualTree.hidePointer("current");
                        visualVariables.hide("variable-find-value");
                        return current;
                    }

                    lineHighlighter.highlight(17);
                    proceed = await timer.wait(500); if (!proceed) return;
                    lineHighlighter.clear();
        
                    if (value > current.value) {
                        current = current.right;

                        visualTree.setPointerToNode("current", current.value);

                        lineHighlighter.highlight(18);
                        proceed = await timer.wait(500); if (!proceed) return;
                        lineHighlighter.clear();

                    } else {
                        current = current.left;

                        visualTree.setPointerToNode("current", current.value);

                        lineHighlighter.highlight(21);
                        proceed = await timer.wait(500); if (!proceed) return;
                        lineHighlighter.clear();
                    }

                    lineHighlighter.highlight(12);
                    proceed = await timer.wait(500); if (!proceed) return;
                    lineHighlighter.clear();
                }

                lineHighlighter.highlight(25);
                proceed = await timer.wait(500); if (!proceed) return;
                lineHighlighter.clear();

                visualTree.hidePointer("current");
                return false;
            }

            this.lineHighlighter.highlight(30);
            proceed = await this.timer.wait(500); if (!proceed) return;
            this.lineHighlighter.clear();

            tree.insert(10).insert(5).insert(13).insert(11).insert(2).insert(16).insert(7).insert(3);
            this.visualTree.insert(10).insert(5).insert(13).insert(11).insert(2).insert(16).insert(7).insert(3);

            this.lineHighlighter.highlight(32);
            proceed = await this.timer.wait(500); if (!proceed) return;
            this.lineHighlighter.clear();

            this.lineHighlighter.highlight(35);
            proceed = await this.timer.wait(500); if (!proceed) return;
            this.lineHighlighter.clear();

            await tree.exampleFind(11, this.lineHighlighter, this.timer, this.visualTree, this.visualVariables);
            this.visualTree.setPointerToNode("vyhledanaNode1", 11);

            if (!proceed) return;

            this.lineHighlighter.highlight(35);
            proceed = await this.timer.wait(500); if (!proceed) return;
            this.lineHighlighter.clear();

            this.lineHighlighter.highlight(37);
            proceed = await this.timer.wait(500); if (!proceed) return;
            this.lineHighlighter.clear();

            await tree.exampleFind(3, this.lineHighlighter, this.timer, this.visualTree, this.visualVariables);
            this.visualTree.setPointerToNode("vyhledanaNode2", 3);

            if (!proceed) return;

            this.lineHighlighter.highlight(37);
            proceed = await this.timer.wait(500); if (!proceed) return;
            this.lineHighlighter.clear();

            this.finish();
        }
    }
];

initExamples(config);