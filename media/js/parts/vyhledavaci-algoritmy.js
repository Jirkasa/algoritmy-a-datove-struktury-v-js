import Console from "../modules/console.js";
import LineHighlighter from "../modules/lineHighlighter.js";
import Timer from "../modules/timer.js";
import VisualArray from "../modules/visualArray.js";
import initExamples from "../modules/interactiveExample.js";

const config = [
    {
        exampleId: 1,
        console: new Console("console-1"),
        lineHighlighter: new LineHighlighter("code-1"),
        timer: new Timer(),
        visualArray: new VisualArray("visual-array-1", 8, true, true, [{id: "array-pointer-1", index: 0, hide: true}]),
        code: async function() {
            let proceed;

            const binarySearch = async (pole, hodnota) => {
                let min = 0;
                let max = pole.length - 1;
                let middle = Math.trunc((min + max) / 2);

                this.lineHighlighter.highlight(1);
                proceed = await this.timer.wait(500); if (!proceed) return;
                this.lineHighlighter.clear();
                this.visualArray.showRange();
                this.lineHighlighter.highlight(2);
                proceed = await this.timer.wait(500); if (!proceed) return;
                this.lineHighlighter.clear();

                this.visualArray.setPointerPos("array-pointer-1", middle);
                this.visualArray.showPointer("array-pointer-1");
                this.lineHighlighter.highlight(3);
                proceed = await this.timer.wait(500); if (!proceed) return;
                this.lineHighlighter.clear();

                this.visualArray.show

                while(pole[middle] !== hodnota && min <= max) {

                    this.lineHighlighter.highlight(5);
                    proceed = await this.timer.wait(500); if (!proceed) return;
                    this.lineHighlighter.clear();

                    this.lineHighlighter.highlight(8);
                    proceed = await this.timer.wait(500); if (!proceed) return;
                    this.lineHighlighter.clear();

                    if (hodnota < pole[middle]) {
                        max = middle - 1;
                        this.lineHighlighter.highlight(9);
                    }
                    else {
                        min = middle + 1;
                        this.lineHighlighter.highlight(11);
                    }

                    this.visualArray.setRangeLeftPos(min);
                    this.visualArray.setRangeRightPos(max);
                    proceed = await this.timer.wait(500); if (!proceed) return;
                    this.lineHighlighter.clear();

                    middle = Math.trunc((min + max) / 2);

                    this.visualArray.setPointerPos("array-pointer-1", middle);
                    this.lineHighlighter.highlight(15);
                    proceed = await this.timer.wait(500); if (!proceed) return;
                    this.lineHighlighter.clear();
                }

                this.lineHighlighter.highlight(5);
                proceed = await this.timer.wait(500); if (!proceed) return;
                this.lineHighlighter.clear();

                this.lineHighlighter.highlight(19);
                proceed = await this.timer.wait(500); if (!proceed) return;
                this.lineHighlighter.clear();

                return pole[middle] === hodnota ? middle : -1;
            }

            this.lineHighlighter.highlight(22);
            proceed = await this.timer.wait(500); if (!proceed) return;
            this.lineHighlighter.clear();

            const index = await binarySearch([2,5,6,9,13,15,28,30], 13);

            if (!proceed) return;

            this.lineHighlighter.highlight(22);
            proceed = await this.timer.wait(500); if (!proceed) return;
            this.lineHighlighter.clear();

            this.console.log("Hledaná položka se nachází na indexu: " + index);

            this.lineHighlighter.highlight(23);
            proceed = await this.timer.wait(500); if (!proceed) return;
            this.lineHighlighter.clear();

            this.finish();
        }
    }
];

initExamples(config);