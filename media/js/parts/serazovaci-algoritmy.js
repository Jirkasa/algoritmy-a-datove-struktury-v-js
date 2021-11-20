import Console from "../modules/console.js";
import LineHighlighter from "../modules/lineHighlighter.js";
import Timer from "../modules/timer.js";
import VisualArray from "../modules/visualArray.js";
import VisualArrays from "../modules/visualArrays.js";
import CallStack from "../modules/callStack.js";
import initExamples from "../modules/interactiveExample.js";
import VisualVariables from "../modules/visualVariables.js";

const config = [
    {
        exampleId: 1,
        console: new Console("console-1"),
        lineHighlighter: new LineHighlighter("code-1"),
        timer: new Timer(),
        visualArray: new VisualArray("visual-array-1", 8, true, true, [{id: "array-pointer-bubble-sort-1", index: 8, hide: true}, {id: "array-pointer-bubble-sort-2", index: 0, hide: true}]),
        code: async function() {
            let proceed;

            const bubbleSort = async (pole) => {
                let noSwaps;

                this.lineHighlighter.highlight(2);
                proceed = await this.timer.wait(500); if (!proceed) return;
                this.lineHighlighter.clear();

                this.visualArray.showPointer("array-pointer-bubble-sort-1");
                this.visualArray.setPointerPos("array-pointer-bubble-sort-1", pole.length);

                this.lineHighlighter.highlight(4);
                proceed = await this.timer.wait(500); if (!proceed) return;
                this.lineHighlighter.clear();

                for(let i = pole.length; i > 0; i--){
                    noSwaps = true;

                    this.lineHighlighter.highlight(5);
                    proceed = await this.timer.wait(500); if (!proceed) return;
                    this.lineHighlighter.clear();

                    this.visualArray.showPointer("array-pointer-bubble-sort-2");
                    this.visualArray.setPointerPos("array-pointer-bubble-sort-2", 0);

                    this.lineHighlighter.highlight(7);
                    proceed = await this.timer.wait(500); if (!proceed) return;
                    this.lineHighlighter.clear();

                    for(let j = 0; j < i - 1; j++){

                        this.lineHighlighter.highlight(9);
                        proceed = await this.timer.wait(500); if (!proceed) return;
                        this.lineHighlighter.clear();

                        if(pole[j] > pole[j+1]){


                            let temp = pole[j];

                            this.lineHighlighter.highlight(11);
                            proceed = await this.timer.wait(500); if (!proceed) return;
                            this.lineHighlighter.clear();

                            pole[j] = pole[j+1];

                            this.visualArray.setValueOfItem(j, pole[j+1]);

                            this.lineHighlighter.highlight(12);
                            proceed = await this.timer.wait(500); if (!proceed) return;
                            this.lineHighlighter.clear();

                            pole[j+1] = temp;

                            this.visualArray.setValueOfItem(j+1, temp);

                            this.lineHighlighter.highlight(13);
                            proceed = await this.timer.wait(500); if (!proceed) return;
                            this.lineHighlighter.clear();

                            noSwaps = false;

                            this.lineHighlighter.highlight(15);
                            proceed = await this.timer.wait(500); if (!proceed) return;
                            this.lineHighlighter.clear();
                        }

                        this.visualArray.setPointerPos("array-pointer-bubble-sort-2", j+1);

                        this.lineHighlighter.highlight(7);
                        proceed = await this.timer.wait(500); if (!proceed) return;
                        this.lineHighlighter.clear();
                    }

                    this.visualArray.hidePointer("array-pointer-bubble-sort-2");

                    if(noSwaps) {
                        this.lineHighlighter.highlight(19);
                        proceed = await this.timer.wait(500); if (!proceed) return;
                        this.lineHighlighter.clear();

                        this.visualArray.hidePointer("array-pointer-bubble-sort-1");

                        break;
                    }

                    this.visualArray.setPointerPos("array-pointer-bubble-sort-1", i-1);

                    this.lineHighlighter.highlight(4);
                    proceed = await this.timer.wait(500); if (!proceed) return;
                    this.lineHighlighter.clear();
                }
                this.lineHighlighter.highlight(21);
                proceed = await this.timer.wait(500); if (!proceed) return;
                this.lineHighlighter.clear();
                return pole;
            }

            this.lineHighlighter.highlight(24);
            proceed = await this.timer.wait(500); if (!proceed) return;
            this.lineHighlighter.clear();

            const serazenePole = await bubbleSort([25,5,30,24,10,8,40,28]);

            if (!proceed) return;

            this.lineHighlighter.highlight(24);
            proceed = await this.timer.wait(500); if (!proceed) return;
            this.lineHighlighter.clear();

            this.console.log("Seřazené pole:");

            this.lineHighlighter.highlight(25);
            proceed = await this.timer.wait(500); if (!proceed) return;
            this.lineHighlighter.clear();

            this.console.log("[" + serazenePole + "]");

            this.lineHighlighter.highlight(26);
            proceed = await this.timer.wait(500); if (!proceed) return;
            this.lineHighlighter.clear();

            this.finish();
        }
    },
    {
        exampleId: 2,
        console: new Console("console-2"),
        lineHighlighter: new LineHighlighter("code-2"),
        timer: new Timer(),
        visualArray: new VisualArray("visual-array-2", 8, true, true, [{id: "array-pointer-selection-sort-middle", index: 0, hide: true}, {id: "array-pointer-selection-sort-i", index: 0, hide: true}, {id: "array-pointer-selection-sort-j", index: 0, hide: true}]),
        code: async function() {
            let proceed;

            const selectionSort = async (pole) => {
                let nejmensi;

                this.lineHighlighter.highlight(2);
                proceed = await this.timer.wait(500); if (!proceed) return;
                this.lineHighlighter.clear();

                this.visualArray.showPointer("array-pointer-selection-sort-i");

                this.lineHighlighter.highlight(4);
                proceed = await this.timer.wait(500); if (!proceed) return;
                this.lineHighlighter.clear();

                for (let i = 0; i < pole.length; i++) {
                    nejmensi = i;

                    this.visualArray.showPointer("array-pointer-selection-sort-middle");
                    this.visualArray.setPointerPos("array-pointer-selection-sort-middle", i);

                    this.lineHighlighter.highlight(6);
                    proceed = await this.timer.wait(500); if (!proceed) return;
                    this.lineHighlighter.clear();

                    this.visualArray.showPointer("array-pointer-selection-sort-j");
                    this.visualArray.setPointerPos("array-pointer-selection-sort-j", i+1);

                    this.lineHighlighter.highlight(8);
                    proceed = await this.timer.wait(500); if (!proceed) return;
                    this.lineHighlighter.clear();

                    for (let j = i+1; j < pole.length; j++){

                        this.lineHighlighter.highlight(10);
                        proceed = await this.timer.wait(500); if (!proceed) return;
                        this.lineHighlighter.clear();

                        if (pole[j] < pole[nejmensi]) {
                            nejmensi = j;

                            this.visualArray.setPointerPos("array-pointer-selection-sort-middle", j);

                            this.lineHighlighter.highlight(11);
                            proceed = await this.timer.wait(500); if (!proceed) return;
                            this.lineHighlighter.clear();
                        }

                        this.visualArray.setPointerPos("array-pointer-selection-sort-j", j+1);

                        this.lineHighlighter.highlight(8);
                        proceed = await this.timer.wait(500); if (!proceed) return;
                        this.lineHighlighter.clear();
                    }

                    this.visualArray.hidePointer("array-pointer-selection-sort-j");

                    this.lineHighlighter.highlight(15);
                    proceed = await this.timer.wait(500); if (!proceed) return;
                    this.lineHighlighter.clear();

                    if (i !== nejmensi) {
                        let temp = pole[i];

                        this.lineHighlighter.highlight(17);
                        proceed = await this.timer.wait(500); if (!proceed) return;
                        this.lineHighlighter.clear();

                        pole[i] = pole[nejmensi];

                        this.visualArray.setValueOfItem(i, pole[nejmensi]);

                        this.lineHighlighter.highlight(18);
                        proceed = await this.timer.wait(500); if (!proceed) return;
                        this.lineHighlighter.clear();

                        pole[nejmensi] = temp;

                        this.visualArray.setValueOfItem(nejmensi, temp);

                        this.lineHighlighter.highlight(19);
                        proceed = await this.timer.wait(500); if (!proceed) return;
                        this.lineHighlighter.clear();
                    }

                    this.visualArray.setPointerPos("array-pointer-selection-sort-i", i+1);

                    this.lineHighlighter.highlight(4);
                    proceed = await this.timer.wait(500); if (!proceed) return;
                    this.lineHighlighter.clear();
                }

                this.visualArray.hidePointer("array-pointer-selection-sort-i");

                this.lineHighlighter.highlight(22);
                proceed = await this.timer.wait(500); if (!proceed) return;
                this.lineHighlighter.clear();

                return pole;
            }

            this.lineHighlighter.highlight(25);
            proceed = await this.timer.wait(500); if (!proceed) return;
            this.lineHighlighter.clear();

            const serazenePole = await selectionSort([25,5,30,24,10,8,40,28]);

            if (!proceed) return;

            this.visualArray.hidePointer("array-pointer-selection-sort-middle");

            this.lineHighlighter.highlight(25);
            proceed = await this.timer.wait(500); if (!proceed) return;
            this.lineHighlighter.clear();

            this.console.log("Seřazené pole:");

            this.lineHighlighter.highlight(26);
            proceed = await this.timer.wait(500); if (!proceed) return;
            this.lineHighlighter.clear();

            this.console.log("[" + serazenePole + "]");

            this.lineHighlighter.highlight(27);
            proceed = await this.timer.wait(500); if (!proceed) return;
            this.lineHighlighter.clear();

            this.finish();
        }
    },
    {
        exampleId: 3,
        console: new Console("console-3"),
        lineHighlighter: new LineHighlighter("code-3"),
        timer: new Timer(),
        visualArray: new VisualArray("visual-array-3", 8, true, true, [{id: "array-pointer-insertion-sort-i", index: 1, hide: true}, {id: "array-pointer-insertion-sort-j", index: 0, hide: true}]),
        visualVariables: new VisualVariables([{id: "variable-insertion-sort-current", value: 0, hide: true}]),
        code: async function() {
            let proceed;

            const insertionSort = async (pole) => {
                let aktualniHodnota;

                this.lineHighlighter.highlight(2);
                proceed = await this.timer.wait(500); if (!proceed) return;
                this.lineHighlighter.clear();

                this.visualArray.showPointer("array-pointer-insertion-sort-i");

                this.lineHighlighter.highlight(4);
                proceed = await this.timer.wait(500); if (!proceed) return;
                this.lineHighlighter.clear();

                for (let i = 1; i < pole.length; i++) {
                    aktualniHodnota = pole[i];

                    this.visualVariables.show("variable-insertion-sort-current");
                    this.visualVariables.setValue("variable-insertion-sort-current", pole[i]);

                    this.lineHighlighter.highlight(6);
                    proceed = await this.timer.wait(500); if (!proceed) return;
                    this.lineHighlighter.clear();

                    let j = i-1;

                    this.visualArray.showPointer("array-pointer-insertion-sort-j");
                    this.visualArray.setPointerPos("array-pointer-insertion-sort-j", i-1);

                    this.lineHighlighter.highlight(8);
                    proceed = await this.timer.wait(500); if (!proceed) return;
                    this.lineHighlighter.clear();

                    this.lineHighlighter.highlight(11);
                    proceed = await this.timer.wait(500); if (!proceed) return;
                    this.lineHighlighter.clear();

                    for (; j >= 0 && pole[j] > aktualniHodnota; j--) {
                        pole[j+1] = pole[j];

                        this.visualArray.setValueOfItem(j+1, pole[j]);

                        this.lineHighlighter.highlight(13);
                        proceed = await this.timer.wait(500); if (!proceed) return;
                        this.lineHighlighter.clear();

                        this.visualArray.setPointerPos("array-pointer-insertion-sort-j", j-1);

                        this.lineHighlighter.highlight(11);
                        proceed = await this.timer.wait(500); if (!proceed) return;
                        this.lineHighlighter.clear();
                    }
                    pole[j+1] = aktualniHodnota;

                    this.visualArray.setValueOfItem(j+1, aktualniHodnota);

                    this.lineHighlighter.highlight(16);
                    proceed = await this.timer.wait(500); if (!proceed) return;
                    this.lineHighlighter.clear();

                    this.visualArray.setPointerPos("array-pointer-insertion-sort-i", i+1);

                    this.lineHighlighter.highlight(4);
                    proceed = await this.timer.wait(500); if (!proceed) return;
                    this.lineHighlighter.clear();
                }

                this.visualArray.hidePointer("array-pointer-insertion-sort-i");
                this.visualArray.hidePointer("array-pointer-insertion-sort-j");

                this.lineHighlighter.highlight(18);
                proceed = await this.timer.wait(500); if (!proceed) return;
                this.lineHighlighter.clear();

                return pole;
            }

            this.lineHighlighter.highlight(21);
            proceed = await this.timer.wait(500); if (!proceed) return;
            this.lineHighlighter.clear();
            
            const serazenePole = await insertionSort([25,5,30,24,10,8,40,28]);

            if (!proceed) return;

            this.visualVariables.hide("variable-insertion-sort-current");

            this.lineHighlighter.highlight(21);
            proceed = await this.timer.wait(500); if (!proceed) return;
            this.lineHighlighter.clear();

            this.console.log("Seřazené pole:");

            this.lineHighlighter.highlight(22);
            proceed = await this.timer.wait(500); if (!proceed) return;
            this.lineHighlighter.clear();

            this.console.log("[" + serazenePole + "]");

            this.lineHighlighter.highlight(23);
            proceed = await this.timer.wait(500); if (!proceed) return;
            this.lineHighlighter.clear();

            this.finish();
        }
    },
    {
        exampleId: 4,
        console: new Console("console-4"),
        lineHighlighter: new LineHighlighter("code-4"),
        timer: new Timer(),
        visualArrays: new VisualArrays([
            {
                id: "visual-array-merge-1",
                arrayLength: 5,
                hideArray: true,
                toMiddle: true,
                pointers: [{id: "array-pointer-merge-i", index: 0, hide: true}]
            },
            {
                id: "visual-array-merge-2",
                arrayLength: 4,
                hideArray: true,
                toMiddle: true,
                pointers: [{id: "array-pointer-merge-j", index: 0, hide: true}]
            },
            {
                id: "visual-array-merge-vysledek",
                arrayLength: 0,
                hideArray: true,
                toMiddle: true
            }
        ]),
        code: async function() {
            let proceed;

            const merge = async (pole1, pole2) => {
                let vysledek = [];

                this.visualArrays.get("visual-array-merge-1").show();
                this.visualArrays.get("visual-array-merge-2").show();
                this.visualArrays.get("visual-array-merge-vysledek").show();

                this.lineHighlighter.highlight(3);
                proceed = await this.timer.wait(500); if (!proceed) return;
                this.lineHighlighter.clear();

                let i = 0;

                this.visualArrays.get("visual-array-merge-1").showPointer("array-pointer-merge-i");

                this.lineHighlighter.highlight(4);
                proceed = await this.timer.wait(500); if (!proceed) return;
                this.lineHighlighter.clear();

                let j = 0;

                this.visualArrays.get("visual-array-merge-2").showPointer("array-pointer-merge-j");

                this.lineHighlighter.highlight(5);
                proceed = await this.timer.wait(500); if (!proceed) return;
                this.lineHighlighter.clear();

                this.lineHighlighter.highlight(7);
                proceed = await this.timer.wait(500); if (!proceed) return;
                this.lineHighlighter.clear();

                while (i < pole1.length && j < pole2.length) {
                    this.lineHighlighter.highlight(8);
                    proceed = await this.timer.wait(500); if (!proceed) return;
                    this.lineHighlighter.clear();

                    if (pole2[j] > pole1[i]) {
                        vysledek.push(pole1[i]);

                        this.visualArrays.get("visual-array-merge-vysledek").pushItem(pole1[i]);

                        this.lineHighlighter.highlight(10);
                        proceed = await this.timer.wait(500); if (!proceed) return;
                        this.lineHighlighter.clear();

                        i++;

                        this.visualArrays.get("visual-array-merge-1").setPointerPos("array-pointer-merge-i", i);

                        this.lineHighlighter.highlight(12);
                        proceed = await this.timer.wait(500); if (!proceed) return;
                        this.lineHighlighter.clear();
                    } else {
                        vysledek.push(pole2[j]);

                        this.visualArrays.get("visual-array-merge-vysledek").pushItem(pole2[j]);

                        this.lineHighlighter.highlight(15);
                        proceed = await this.timer.wait(500); if (!proceed) return;
                        this.lineHighlighter.clear();

                        j++;

                        this.visualArrays.get("visual-array-merge-2").setPointerPos("array-pointer-merge-j", j);

                        this.lineHighlighter.highlight(17);
                        proceed = await this.timer.wait(500); if (!proceed) return;
                        this.lineHighlighter.clear();
                    }

                    this.lineHighlighter.highlight(7);
                    proceed = await this.timer.wait(500); if (!proceed) return;
                    this.lineHighlighter.clear();
                }

                this.lineHighlighter.highlight(21);
                proceed = await this.timer.wait(500); if (!proceed) return;
                this.lineHighlighter.clear();

                while (i < pole1.length) {
                    vysledek.push(pole1[i]);

                    this.visualArrays.get("visual-array-merge-vysledek").pushItem(pole1[i]);

                    this.lineHighlighter.highlight(22);
                    proceed = await this.timer.wait(500); if (!proceed) return;
                    this.lineHighlighter.clear();

                    i++;

                    this.visualArrays.get("visual-array-merge-1").setPointerPos("array-pointer-merge-i", i);

                    this.lineHighlighter.highlight(23);
                    proceed = await this.timer.wait(500); if (!proceed) return;
                    this.lineHighlighter.clear();

                    this.lineHighlighter.highlight(21);
                    proceed = await this.timer.wait(500); if (!proceed) return;
                    this.lineHighlighter.clear();
                }

                this.lineHighlighter.highlight(26);
                proceed = await this.timer.wait(500); if (!proceed) return;
                this.lineHighlighter.clear();

                while (j < pole2.length) {
                    vysledek.push(pole2[j]);

                    this.visualArrays.get("visual-array-merge-vysledek").pushItem(pole2[j]);

                    this.lineHighlighter.highlight(27);
                    proceed = await this.timer.wait(500); if (!proceed) return;
                    this.lineHighlighter.clear();

                    j++;

                    this.visualArrays.get("visual-array-merge-2").setPointerPos("array-pointer-merge-j", j);

                    this.lineHighlighter.highlight(28);
                    proceed = await this.timer.wait(500); if (!proceed) return;
                    this.lineHighlighter.clear();

                    this.lineHighlighter.highlight(26);
                    proceed = await this.timer.wait(500); if (!proceed) return;
                    this.lineHighlighter.clear();
                }

                this.lineHighlighter.highlight(30);
                proceed = await this.timer.wait(500); if (!proceed) return;
                this.lineHighlighter.clear();

                return vysledek;
            }

            this.lineHighlighter.highlight(33);
            proceed = await this.timer.wait(500); if (!proceed) return;
            this.lineHighlighter.clear();

            const pole = await merge([6, 9, 51, 63, 70], [5, 8, 50, 52]);

            if (!proceed) return;

            this.visualArrays.get("visual-array-merge-1").hide();
            this.visualArrays.get("visual-array-merge-2").hide();

            this.lineHighlighter.highlight(33);
            proceed = await this.timer.wait(500); if (!proceed) return;
            this.lineHighlighter.clear();

            this.console.log("spojená pole:");

            this.lineHighlighter.highlight(34);
            proceed = await this.timer.wait(500); if (!proceed) return;
            this.lineHighlighter.clear();

            this.console.log("[" + pole + "]");

            this.lineHighlighter.highlight(35);
            proceed = await this.timer.wait(500); if (!proceed) return;
            this.lineHighlighter.clear();

            this.finish();
        }
    },
    {
        exampleId: 5,
        console: new Console("console-5"),
        lineHighlighter: new LineHighlighter("code-5"),
        timer: new Timer(),
        callStack: new CallStack("call-stack-1"),
        visualArrays: new VisualArrays([
            {
                id: "visual-array-merge-sort-1",
                arrayLength: 0,
                hideArray: true,
                toMiddle: true,
                pointers: [{id: "array-pointer-merge-sort-i", index: 0, hide: true}]
            },
            {
                id: "visual-array-merge-sort-2",
                arrayLength: 0,
                hideArray: true,
                toMiddle: true,
                pointers: [{id: "array-pointer-merge-sort-j", index: 0, hide: true}]
            },
            {
                id: "visual-array-merge-sort-vysledek",
                arrayLength: 0,
                hideArray: true,
                toMiddle: true
            },
            {
                id: "visual-array-merge-sort-pole",
                arrayLength: 8,
                hideArray: true,
                toMiddle: true,
                pointers: [{id: "array-pointer-merge-sort-middle", index: 0, hide: true}]
            },
            {
                id: "visual-array-merge-sort-left",
                arrayLength: 8,
                hideArray: true,
                toMiddle: true
            },
            {
                id: "visual-array-merge-sort-right",
                arrayLength: 8,
                hideArray: true,
                toMiddle: true
            }
        ]),
        code: async function() {
            let proceed;

            const merge = async (pole1, pole2) => {
                let vysledek = [];

                this.callStack.push("merge");

                this.visualArrays.get("visual-array-merge-sort-1").show();
                this.visualArrays.get("visual-array-merge-sort-1").setItems(pole1);
                this.visualArrays.get("visual-array-merge-sort-2").show();
                this.visualArrays.get("visual-array-merge-sort-2").setItems(pole2);
                this.visualArrays.get("visual-array-merge-sort-vysledek").show();
                this.visualArrays.get("visual-array-merge-sort-vysledek").setItems([]);

                this.lineHighlighter.highlight(1);
                proceed = await this.timer.wait(500); if (!proceed) return;
                this.lineHighlighter.clear();

                let i = 0;

                this.visualArrays.get("visual-array-merge-sort-1").showPointer("array-pointer-merge-sort-i");
                this.visualArrays.get("visual-array-merge-sort-1").setPointerPos("array-pointer-merge-sort-i", i);

                this.lineHighlighter.highlight(2);
                proceed = await this.timer.wait(500); if (!proceed) return;
                this.lineHighlighter.clear();

                let j = 0;

                this.visualArrays.get("visual-array-merge-sort-2").showPointer("array-pointer-merge-sort-j");
                this.visualArrays.get("visual-array-merge-sort-2").setPointerPos("array-pointer-merge-sort-j", j);

                this.lineHighlighter.highlight(3);
                proceed = await this.timer.wait(500); if (!proceed) return;
                this.lineHighlighter.clear();

                this.lineHighlighter.highlight(4);
                proceed = await this.timer.wait(500); if (!proceed) return;
                this.lineHighlighter.clear();

                while (i < pole1.length && j < pole2.length) {
                    this.lineHighlighter.highlight(5);
                    proceed = await this.timer.wait(500); if (!proceed) return;
                    this.lineHighlighter.clear();

                    if (pole2[j] > pole1[i]) {
                        vysledek.push(pole1[i]);

                        this.visualArrays.get("visual-array-merge-sort-vysledek").pushItem(pole1[i]);

                        this.lineHighlighter.highlight(6);
                        proceed = await this.timer.wait(500); if (!proceed) return;
                        this.lineHighlighter.clear();

                        i++;

                        this.visualArrays.get("visual-array-merge-sort-1").setPointerPos("array-pointer-merge-sort-i", i);

                        this.lineHighlighter.highlight(7);
                        proceed = await this.timer.wait(500); if (!proceed) return;
                        this.lineHighlighter.clear();
                    } else {
                        vysledek.push(pole2[j]);

                        this.visualArrays.get("visual-array-merge-sort-vysledek").pushItem(pole2[j]);

                        this.lineHighlighter.highlight(9);
                        proceed = await this.timer.wait(500); if (!proceed) return;
                        this.lineHighlighter.clear();

                        j++;

                        this.visualArrays.get("visual-array-merge-sort-2").setPointerPos("array-pointer-merge-sort-j", j);

                        this.lineHighlighter.highlight(10);
                        proceed = await this.timer.wait(500); if (!proceed) return;
                        this.lineHighlighter.clear();
                    }

                    this.lineHighlighter.highlight(4);
                    proceed = await this.timer.wait(500); if (!proceed) return;
                    this.lineHighlighter.clear();
                }

                this.lineHighlighter.highlight(13);
                proceed = await this.timer.wait(500); if (!proceed) return;
                this.lineHighlighter.clear();

                while (i < pole1.length) {
                    vysledek.push(pole1[i]);

                    this.visualArrays.get("visual-array-merge-sort-vysledek").pushItem(pole1[i]);

                    this.lineHighlighter.highlight(14);
                    proceed = await this.timer.wait(500); if (!proceed) return;
                    this.lineHighlighter.clear();

                    i++;

                    this.visualArrays.get("visual-array-merge-sort-1").setPointerPos("array-pointer-merge-sort-i", i);

                    this.lineHighlighter.highlight(15);
                    proceed = await this.timer.wait(500); if (!proceed) return;
                    this.lineHighlighter.clear();

                    this.lineHighlighter.highlight(13);
                    proceed = await this.timer.wait(500); if (!proceed) return;
                    this.lineHighlighter.clear();
                }

                this.lineHighlighter.highlight(17);
                proceed = await this.timer.wait(500); if (!proceed) return;
                this.lineHighlighter.clear();

                while (j < pole2.length) {
                    vysledek.push(pole2[j]);

                    this.visualArrays.get("visual-array-merge-sort-vysledek").pushItem(pole2[j]);

                    this.lineHighlighter.highlight(18);
                    proceed = await this.timer.wait(500); if (!proceed) return;
                    this.lineHighlighter.clear();

                    j++;

                    this.visualArrays.get("visual-array-merge-sort-2").setPointerPos("array-pointer-merge-sort-j", j);

                    this.lineHighlighter.highlight(19);
                    proceed = await this.timer.wait(500); if (!proceed) return;
                    this.lineHighlighter.clear();

                    this.lineHighlighter.highlight(17);
                    proceed = await this.timer.wait(500); if (!proceed) return;
                    this.lineHighlighter.clear();
                }

                this.lineHighlighter.highlight(21);
                proceed = await this.timer.wait(500); if (!proceed) return;
                this.lineHighlighter.clear();

                this.callStack.pop();

                return vysledek;
            }

            const mergeSort = async (pole) => {

                this.callStack.push("mergeSort");

                this.visualArrays.get("visual-array-merge-sort-pole").show();
                this.visualArrays.get("visual-array-merge-sort-pole").setItems(pole);

                this.visualArrays.get("visual-array-merge-sort-left").hide();
                this.visualArrays.get("visual-array-merge-sort-right").hide();

                this.lineHighlighter.highlight(26);
                proceed = await this.timer.wait(500); if (!proceed) return;
                this.lineHighlighter.clear();

                if (pole.length <= 1) {
                    this.callStack.pop();

                    return pole;
                }

                let middle = Math.trunc(pole.length/2);

                this.visualArrays.get("visual-array-merge-sort-pole").showPointer("array-pointer-merge-sort-middle");
                this.visualArrays.get("visual-array-merge-sort-pole").setPointerPos("array-pointer-merge-sort-middle", middle);

                this.lineHighlighter.highlight(28);
                proceed = await this.timer.wait(500); if (!proceed) return;
                this.lineHighlighter.clear();

                this.lineHighlighter.highlight(30);
                proceed = await this.timer.wait(500); if (!proceed) return;
                this.lineHighlighter.clear();

                this.visualArrays.get("visual-array-merge-sort-pole").hide();
                this.visualArrays.get("visual-array-merge-sort-pole").hidePointer("array-pointer-merge-sort-middle");

                let left = await mergeSort(pole.slice(0,middle));

                if (!proceed) return;

                this.visualArrays.get("visual-array-merge-sort-right").hide();

                this.visualArrays.get("visual-array-merge-sort-pole").show();
                this.visualArrays.get("visual-array-merge-sort-pole").setItems(pole);
                this.visualArrays.get("visual-array-merge-sort-left").show();
                this.visualArrays.get("visual-array-merge-sort-left").setItems(left);
                this.visualArrays.get("visual-array-merge-sort-pole").showPointer("array-pointer-merge-sort-middle");
                this.visualArrays.get("visual-array-merge-sort-pole").setPointerPos("array-pointer-merge-sort-middle", middle);

                this.lineHighlighter.highlight(30);
                proceed = await this.timer.wait(500); if (!proceed) return;
                this.lineHighlighter.clear();

                this.lineHighlighter.highlight(32);
                proceed = await this.timer.wait(500); if (!proceed) return;
                this.lineHighlighter.clear();

                this.visualArrays.get("visual-array-merge-sort-pole").hide();
                this.visualArrays.get("visual-array-merge-sort-pole").hidePointer("array-pointer-merge-sort-middle");

                let right = await mergeSort(pole.slice(middle));

                if (!proceed) return;

                this.visualArrays.get("visual-array-merge-sort-pole").show();
                this.visualArrays.get("visual-array-merge-sort-pole").setItems(pole);
                this.visualArrays.get("visual-array-merge-sort-left").show();
                this.visualArrays.get("visual-array-merge-sort-left").setItems(left);
                this.visualArrays.get("visual-array-merge-sort-right").show();
                this.visualArrays.get("visual-array-merge-sort-right").setItems(right);
                this.visualArrays.get("visual-array-merge-sort-pole").showPointer("array-pointer-merge-sort-middle");
                this.visualArrays.get("visual-array-merge-sort-pole").setPointerPos("array-pointer-merge-sort-middle", middle);

                this.lineHighlighter.highlight(32);
                proceed = await this.timer.wait(500); if (!proceed) return;
                this.lineHighlighter.clear();

                this.lineHighlighter.highlight(34);
                proceed = await this.timer.wait(500); if (!proceed) return;
                this.lineHighlighter.clear();

                this.visualArrays.get("visual-array-merge-sort-pole").hide();
                this.visualArrays.get("visual-array-merge-sort-left").hide();
                this.visualArrays.get("visual-array-merge-sort-right").hide();

                const result = await merge(left, right);

                if (!proceed) return;

                this.visualArrays.get("visual-array-merge-sort-1").hide();
                this.visualArrays.get("visual-array-merge-sort-2").hide();
                this.visualArrays.get("visual-array-merge-sort-1").hidePointer("array-pointer-merge-sort-i");
                this.visualArrays.get("visual-array-merge-sort-2").hidePointer("array-pointer-merge-sort-j");

                this.visualArrays.get("visual-array-merge-sort-pole").show();
                this.visualArrays.get("visual-array-merge-sort-pole").setItems(pole);
                this.visualArrays.get("visual-array-merge-sort-left").show();
                this.visualArrays.get("visual-array-merge-sort-left").setItems(left);
                this.visualArrays.get("visual-array-merge-sort-right").show();
                this.visualArrays.get("visual-array-merge-sort-right").setItems(right);

                this.lineHighlighter.highlight(34);
                proceed = await this.timer.wait(500); if (!proceed) return;
                this.lineHighlighter.clear();

                this.visualArrays.get("visual-array-merge-sort-vysledek").hide();

                this.callStack.pop();

                return result;
            }

            this.lineHighlighter.highlight(37);
            proceed = await this.timer.wait(500); if (!proceed) return;
            this.lineHighlighter.clear();

            const serazenePole = await mergeSort([25,5,30,24,10,8,40,28]);

            if (!proceed) return;

            this.visualArrays.get("visual-array-merge-sort-pole").hide();
            this.visualArrays.get("visual-array-merge-sort-left").hide();
            this.visualArrays.get("visual-array-merge-sort-right").hide();

            this.visualArrays.get("visual-array-merge-sort-vysledek").show();

            this.lineHighlighter.highlight(37);
            proceed = await this.timer.wait(500); if (!proceed) return;
            this.lineHighlighter.clear();

            this.console.log("Seřazené pole:");

            this.lineHighlighter.highlight(38);
            proceed = await this.timer.wait(500); if (!proceed) return;
            this.lineHighlighter.clear();

            this.console.log("[" + serazenePole + "]");

            this.lineHighlighter.highlight(39);
            proceed = await this.timer.wait(500); if (!proceed) return;
            this.lineHighlighter.clear();

            this.finish();
        }
    },
    {
        exampleId: 6,
        console: new Console("console-6"),
        lineHighlighter: new LineHighlighter("code-6"),
        timer: new Timer(),
        visualVariables: new VisualVariables([{id: "variable-pivot", value: 4, hide: true}]),
        visualArray: new VisualArray("visual-array-pivot", 8, true, true, [{id: "array-pointer-pivot-i", index: 1, hide: true}, {id: "array-pointer-pivot-swapIdx", index: 0, hide: true}, {id: "array-pointer-pivot-start", index: 0, hide: true}, {id: "array-pointer-pivot-konec", index: 7, hide: true}, {id: "array-pointer-pivot-pivotIndex", index: 0, hide: true}]),
        code: async function() {
            let proceed;

            const swap = async (arr, index1, index2) => {
                const temp = arr[index1];

                this.lineHighlighter.highlight(2);
                proceed = await this.timer.wait(500); if (!proceed) return;
                this.lineHighlighter.clear();

                arr[index1] = arr[index2];

                this.visualArray.setValueOfItem(index1, arr[index2]);

                this.lineHighlighter.highlight(3);
                proceed = await this.timer.wait(500); if (!proceed) return;
                this.lineHighlighter.clear();

                arr[index2] = temp;

                this.visualArray.setValueOfItem(index2, temp);

                this.lineHighlighter.highlight(4);
                proceed = await this.timer.wait(500); if (!proceed) return;
                this.lineHighlighter.clear();
            };

            const pivot = async (arr, start = 0, end = arr.length - 1) => {
                let pivot = arr[start];

                this.visualVariables.show("variable-pivot");
                this.visualArray.showPointer("array-pointer-pivot-start");
                this.visualArray.showPointer("array-pointer-pivot-konec");

                this.lineHighlighter.highlight(11);
                proceed = await this.timer.wait(500); if (!proceed) return;
                this.lineHighlighter.clear();

                let swapIdx = start;

                this.visualArray.showPointer("array-pointer-pivot-swapIdx");

                this.lineHighlighter.highlight(13);
                proceed = await this.timer.wait(500); if (!proceed) return;
                this.lineHighlighter.clear();

                this.visualArray.showPointer("array-pointer-pivot-i");

                this.lineHighlighter.highlight(16);
                proceed = await this.timer.wait(500); if (!proceed) return;
                this.lineHighlighter.clear();
                
                for (let i = start + 1; i <= end; i++) {

                    this.lineHighlighter.highlight(19);
                    proceed = await this.timer.wait(500); if (!proceed) return;
                    this.lineHighlighter.clear();

                    if (pivot > arr[i]) {
                        swapIdx++;

                        this.visualArray.setPointerPos("array-pointer-pivot-swapIdx", swapIdx);

                        this.lineHighlighter.highlight(20);
                        proceed = await this.timer.wait(500); if (!proceed) return;
                        this.lineHighlighter.clear();
                        
                        this.lineHighlighter.highlight(21);
                        proceed = await this.timer.wait(500); if (!proceed) return;
                        this.lineHighlighter.clear();

                        await swap(arr, swapIdx, i);

                        if (!proceed) return;

                        this.lineHighlighter.highlight(21);
                        proceed = await this.timer.wait(500); if (!proceed) return;
                        this.lineHighlighter.clear();
                    }

                    this.visualArray.setPointerPos("array-pointer-pivot-i", i+1);

                    this.lineHighlighter.highlight(16);
                    proceed = await this.timer.wait(500); if (!proceed) return;
                    this.lineHighlighter.clear();
                }

                this.visualArray.hidePointer("array-pointer-pivot-i");

                this.lineHighlighter.highlight(26);
                proceed = await this.timer.wait(500); if (!proceed) return;
                this.lineHighlighter.clear();
                
                await swap(arr, start, swapIdx);

                if (!proceed) return;

                this.lineHighlighter.highlight(26);
                proceed = await this.timer.wait(500); if (!proceed) return;
                this.lineHighlighter.clear();

                this.lineHighlighter.highlight(28);
                proceed = await this.timer.wait(500); if (!proceed) return;
                this.lineHighlighter.clear();

                this.visualVariables.hide("variable-pivot");
                this.visualArray.hidePointer("array-pointer-pivot-start");
                this.visualArray.hidePointer("array-pointer-pivot-konec");
                this.visualArray.hidePointer("array-pointer-pivot-swapIdx");

                return swapIdx;
            }

            const pole = [4,8,2,1,5,7,6,3];

            this.lineHighlighter.highlight(31);
            proceed = await this.timer.wait(500); if (!proceed) return;
            this.lineHighlighter.clear();

            this.console.log("Pole před zavoláním funkce pivot:");

            this.lineHighlighter.highlight(32);
            proceed = await this.timer.wait(500); if (!proceed) return;
            this.lineHighlighter.clear();

            this.console.log("[" + pole + "]");

            this.lineHighlighter.highlight(33);
            proceed = await this.timer.wait(500); if (!proceed) return;
            this.lineHighlighter.clear();

            this.lineHighlighter.highlight(36);
            proceed = await this.timer.wait(500); if (!proceed) return;
            this.lineHighlighter.clear();

            const pivotIndex = await pivot(pole);

            if (!proceed) return;

            this.visualArray.showPointer("array-pointer-pivot-pivotIndex");
            this.visualArray.setPointerPos("array-pointer-pivot-pivotIndex", pivotIndex);

            this.lineHighlighter.highlight(36);
            proceed = await this.timer.wait(500); if (!proceed) return;
            this.lineHighlighter.clear();

            this.console.log(`Pivot: ${pivotIndex} (první položka se přesunula na index ${pivotIndex} a před ni se umístili ostatní menší položky)`);

            this.lineHighlighter.highlight(38);
            proceed = await this.timer.wait(500); if (!proceed) return;
            this.lineHighlighter.clear();

            this.console.log("Pole po zavolání funkce pivot:");

            this.lineHighlighter.highlight(40);
            proceed = await this.timer.wait(500); if (!proceed) return;
            this.lineHighlighter.clear();

            this.console.log("[" + pole + "]");

            this.lineHighlighter.highlight(41);
            proceed = await this.timer.wait(500); if (!proceed) return;
            this.lineHighlighter.clear();

            this.finish();
        }
    },
    {
        exampleId: 7,
        console: new Console("console-7"),
        lineHighlighter: new LineHighlighter("code-7"),
        timer: new Timer(),
        callStack: new CallStack("call-stack-2"),
        visualVariables: new VisualVariables([{id: "variable-quick-sort-pivot", value: 4, hide: true}]),
        visualArray: new VisualArray("visual-array-quick-sort", 8, true, true, [{id: "array-pointer-quick-sort-i", index: 1, hide: true}, {id: "array-pointer-quick-sort-swapIdx", index: 0, hide: true}, {id: "array-pointer-quick-sort-start", index: 0, hide: true}, {id: "array-pointer-quick-sort-konec", index: 7, hide: true}, {id: "array-pointer-quick-sort-left", index: 0, hide: true}, {id: "array-pointer-quick-sort-right", index: 0, hide: true}, {id: "array-pointer-quick-sort-pivotIndex", index: 0, hide: true}]),
        code: async function() {
            let proceed;

            const swap = async (pole, index1, index2) => {
                const temp = pole[index1];

                this.callStack.push("swap");

                this.lineHighlighter.highlight(1);
                proceed = await this.timer.wait(500); if (!proceed) return;
                this.lineHighlighter.clear();

                pole[index1] = pole[index2];

                this.visualArray.setValueOfItem(index1, pole[index2]);

                this.lineHighlighter.highlight(2);
                proceed = await this.timer.wait(500); if (!proceed) return;
                this.lineHighlighter.clear();

                pole[index2] = temp;

                this.visualArray.setValueOfItem(index2, temp);

                this.lineHighlighter.highlight(3);
                proceed = await this.timer.wait(500); if (!proceed) return;
                this.lineHighlighter.clear();

                this.callStack.pop();
            };

            const pivot = async (pole, start = 0, konec = pole.length - 1) => {
                let pivot = pole[start];

                this.callStack.push("pivot");

                this.visualVariables.show("variable-quick-sort-pivot")
                this.visualVariables.setValue("variable-quick-sort-pivot", pivot);
                this.visualArray.showPointer("array-pointer-quick-sort-start")
                this.visualArray.setPointerPos("array-pointer-quick-sort-start", start);
                this.visualArray.showPointer("array-pointer-quick-sort-konec")
                this.visualArray.setPointerPos("array-pointer-quick-sort-konec", konec);

                this.lineHighlighter.highlight(7);
                proceed = await this.timer.wait(500); if (!proceed) return;
                this.lineHighlighter.clear();

                let swapIdx = start;

                this.visualArray.showPointer("array-pointer-quick-sort-swapIdx")
                this.visualArray.setPointerPos("array-pointer-quick-sort-swapIdx", swapIdx);

                this.lineHighlighter.highlight(8);
                proceed = await this.timer.wait(500); if (!proceed) return;
                this.lineHighlighter.clear();

                this.visualArray.showPointer("array-pointer-quick-sort-i");
                this.visualArray.setPointerPos("array-pointer-quick-sort-i", start + 1);

                this.lineHighlighter.highlight(10);
                proceed = await this.timer.wait(500); if (!proceed) return;
                this.lineHighlighter.clear();
                
                for (let i = start + 1; i <= konec; i++) {

                    this.lineHighlighter.highlight(11);
                    proceed = await this.timer.wait(500); if (!proceed) return;
                    this.lineHighlighter.clear();

                    if (pivot > pole[i]) {
                        swapIdx++;

                        this.visualArray.setPointerPos("array-pointer-quick-sort-swapIdx", swapIdx);

                        this.lineHighlighter.highlight(12);
                        proceed = await this.timer.wait(500); if (!proceed) return;
                        this.lineHighlighter.clear();

                        this.lineHighlighter.highlight(13);
                        proceed = await this.timer.wait(500); if (!proceed) return;
                        this.lineHighlighter.clear();

                        await swap(pole, swapIdx, i);

                        if (!proceed) return;

                        this.lineHighlighter.highlight(13);
                        proceed = await this.timer.wait(500); if (!proceed) return;
                        this.lineHighlighter.clear();
                    }

                    this.visualArray.setPointerPos("array-pointer-quick-sort-i", i+1);

                    this.lineHighlighter.highlight(10);
                    proceed = await this.timer.wait(500); if (!proceed) return;
                    this.lineHighlighter.clear();
                }

                this.visualArray.hidePointer("array-pointer-quick-sort-i");

                this.lineHighlighter.highlight(17);
                proceed = await this.timer.wait(500); if (!proceed) return;
                this.lineHighlighter.clear();
                
                await swap(pole, start, swapIdx);

                if (!proceed) return;

                this.lineHighlighter.highlight(17);
                proceed = await this.timer.wait(500); if (!proceed) return;
                this.lineHighlighter.clear();

                this.lineHighlighter.highlight(18);
                proceed = await this.timer.wait(500); if (!proceed) return;
                this.lineHighlighter.clear();

                this.visualVariables.hide("variable-quick-sort-pivot");
                this.visualArray.hidePointer("array-pointer-quick-sort-start");
                this.visualArray.hidePointer("array-pointer-quick-sort-konec");
                this.visualArray.hidePointer("array-pointer-quick-sort-swapIdx");

                this.callStack.pop();

                return swapIdx;
            }

            const quickSort = async (pole, left = 0, right = pole.length -1) => {

                this.callStack.push("quickSort");

                this.visualArray.showPointer("array-pointer-quick-sort-left");
                this.visualArray.setPointerPos("array-pointer-quick-sort-left", left);
                this.visualArray.showPointer("array-pointer-quick-sort-right");
                this.visualArray.setPointerPos("array-pointer-quick-sort-right", right);

                this.lineHighlighter.highlight(23);
                proceed = await this.timer.wait(500); if (!proceed) return;
                this.lineHighlighter.clear();

                if (left < right) {

                    this.lineHighlighter.highlight(26);
                    proceed = await this.timer.wait(500); if (!proceed) return;
                    this.lineHighlighter.clear();

                    this.visualArray.hidePointer("array-pointer-quick-sort-left");
                    this.visualArray.hidePointer("array-pointer-quick-sort-right");

                    let pivotIndex = await pivot(pole, left, right);

                    if (!proceed) return;

                    this.visualArray.showPointer("array-pointer-quick-sort-pivotIndex");
                    this.visualArray.setPointerPos("array-pointer-quick-sort-pivotIndex", pivotIndex);
                    this.visualArray.showPointer("array-pointer-quick-sort-left");
                    this.visualArray.setPointerPos("array-pointer-quick-sort-left", left);
                    this.visualArray.showPointer("array-pointer-quick-sort-right");
                    this.visualArray.setPointerPos("array-pointer-quick-sort-right", right);

                    this.lineHighlighter.highlight(26);
                    proceed = await this.timer.wait(500); if (!proceed) return;
                    this.lineHighlighter.clear();

                    this.lineHighlighter.highlight(28);
                    proceed = await this.timer.wait(500); if (!proceed) return;
                    this.lineHighlighter.clear();

                    this.visualArray.hidePointer("array-pointer-quick-sort-pivotIndex");

                    await quickSort(pole, left, pivotIndex-1);

                    if (!proceed) return;

                    this.visualArray.showPointer("array-pointer-quick-sort-pivotIndex");
                    this.visualArray.setPointerPos("array-pointer-quick-sort-pivotIndex", pivotIndex);
                    this.visualArray.showPointer("array-pointer-quick-sort-left");
                    this.visualArray.setPointerPos("array-pointer-quick-sort-left", left);
                    this.visualArray.showPointer("array-pointer-quick-sort-right");
                    this.visualArray.setPointerPos("array-pointer-quick-sort-right", right);

                    this.lineHighlighter.highlight(28);
                    proceed = await this.timer.wait(500); if (!proceed) return;
                    this.lineHighlighter.clear();

                    this.lineHighlighter.highlight(30);
                    proceed = await this.timer.wait(500); if (!proceed) return;
                    this.lineHighlighter.clear();

                    this.visualArray.hidePointer("array-pointer-quick-sort-pivotIndex");

                    await quickSort(pole, pivotIndex+1, right);

                    if (!proceed) return;

                    this.visualArray.showPointer("array-pointer-quick-sort-pivotIndex");
                    this.visualArray.setPointerPos("array-pointer-quick-sort-pivotIndex", pivotIndex);
                    this.visualArray.showPointer("array-pointer-quick-sort-left");
                    this.visualArray.setPointerPos("array-pointer-quick-sort-left", left);
                    this.visualArray.showPointer("array-pointer-quick-sort-right");
                    this.visualArray.setPointerPos("array-pointer-quick-sort-right", right);

                    this.lineHighlighter.highlight(30);
                    proceed = await this.timer.wait(500); if (!proceed) return;
                    this.lineHighlighter.clear();
                }

                this.lineHighlighter.highlight(32);
                proceed = await this.timer.wait(500); if (!proceed) return;
                this.lineHighlighter.clear();

                this.visualArray.hidePointer("array-pointer-quick-sort-pivotIndex");
                this.visualArray.hidePointer("array-pointer-quick-sort-left");
                this.visualArray.hidePointer("array-pointer-quick-sort-right");

                this.callStack.pop();

                return pole;
            }

            this.lineHighlighter.highlight(35);
            proceed = await this.timer.wait(500); if (!proceed) return;
            this.lineHighlighter.clear();

            const serazenePole = await quickSort([25,5,30,24,10,8,40,28]);

            this.lineHighlighter.highlight(35);
            proceed = await this.timer.wait(500); if (!proceed) return;
            this.lineHighlighter.clear();

            if (!proceed) return;

            this.console.log("Seřazené pole:");

            this.lineHighlighter.highlight(36);
            proceed = await this.timer.wait(500); if (!proceed) return;
            this.lineHighlighter.clear();

            this.console.log("[" + serazenePole + "]");

            this.lineHighlighter.highlight(37);
            proceed = await this.timer.wait(500); if (!proceed) return;
            this.lineHighlighter.clear();

            this.finish();
        }
    }
];

initExamples(config);