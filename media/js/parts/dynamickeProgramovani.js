import LineHighlighter from "../modules/lineHighlighter.js";
import Timer from "../modules/timer.js";
import initExamples from "../modules/interactiveExample.js";
import Console from "../modules/console.js";
import CalculationStructure from "../modules/calculationStructure.js";
import VisualArray from "../modules/visualArray.js";

const config = [
    {
        exampleId: 1,
        lineHighlighter: new LineHighlighter("code-1"),
        timer: new Timer(),
        console: new Console("console-1"),
        calculationStructure: new CalculationStructure("calculation-structure-1"),
        code: async function() {
            let proceed;

            const fib = async (n, parentId, spaceMultiplier) => {
                this.lineHighlighter.highlight(2);
                proceed = await this.timer.wait(500); if (!proceed) return;
                this.lineHighlighter.clear();

                if (n === 1) return 0;

                this.lineHighlighter.highlight(4);
                proceed = await this.timer.wait(500); if (!proceed) return;
                this.lineHighlighter.clear();
                
                if (n <= 3) return 1;

                this.lineHighlighter.highlight(7);
                proceed = await this.timer.wait(500); if (!proceed) return;
                this.lineHighlighter.clear();

                let id = this.calculationStructure.pushItem(`fib(${n-1})`, parentId, true, spaceMultiplier);

                const num1 = await fib(n-1, id, spaceMultiplier-1);

                if (!proceed) return;

                this.calculationStructure.setText(num1, id);

                this.lineHighlighter.highlight(7);
                proceed = await this.timer.wait(500); if (!proceed) return;
                this.lineHighlighter.clear();

                id = this.calculationStructure.pushItem(`fib(${n-2})`, parentId, false, spaceMultiplier);
                this.calculationStructure.addOperationSign("+", parentId);

                const num2 = await fib(n-2, id, spaceMultiplier-1);

                if (!proceed) return;

                this.calculationStructure.setText(num2, id);

                this.lineHighlighter.highlight(7);
                proceed = await this.timer.wait(500); if (!proceed) return;
                this.lineHighlighter.clear();

                return num1 + num2;
            }

            this.lineHighlighter.highlight(10);
            proceed = await this.timer.wait(500); if (!proceed) return;
            this.lineHighlighter.clear();

            const id = this.calculationStructure.pushItem("fib(6)");
            
            const vysledek = await fib(6, id, 3);

            if (!proceed) return;

            this.calculationStructure.setText(vysledek, id);

            this.lineHighlighter.highlight(10);
            proceed = await this.timer.wait(500); if (!proceed) return;
            this.lineHighlighter.clear();

            this.console.log("Šesté číslo ve Fibonacciho posloupnosti je: " + vysledek);

            this.lineHighlighter.highlight(11);
            proceed = await this.timer.wait(500); if (!proceed) return;
            this.lineHighlighter.clear();

            this.finish();
        }
    },
    {
        exampleId: 2,
        lineHighlighter: new LineHighlighter("code-2"),
        timer: new Timer(),
        console: new Console("console-2"),
        calculationStructure: new CalculationStructure("calculation-structure-2"),
        visualArray: new VisualArray("visual-array-1", 7),
        code: async function() {
            let proceed;

            const fib = async (n, memo = [], parentId, spaceMultiplier) => {
                this.lineHighlighter.highlight(3);
                proceed = await this.timer.wait(500); if (!proceed) return;
                this.lineHighlighter.clear();

                if (memo[n] !== undefined) return memo[n];

                this.lineHighlighter.highlight(4);
                proceed = await this.timer.wait(500); if (!proceed) return;
                this.lineHighlighter.clear();

                if (n === 1) return 0;

                this.lineHighlighter.highlight(5);
                proceed = await this.timer.wait(500); if (!proceed) return;
                this.lineHighlighter.clear();

                if (n <= 3) return 1;

                this.lineHighlighter.highlight(6);
                proceed = await this.timer.wait(500); if (!proceed) return;
                this.lineHighlighter.clear();

                let id = this.calculationStructure.pushItem(`fib(${n-1})`, parentId, true, spaceMultiplier);

                const num1 = await fib(n-1, memo, id, spaceMultiplier-1);

                if (!proceed) return;

                this.calculationStructure.setText(num1, id);

                this.lineHighlighter.highlight(6);
                proceed = await this.timer.wait(500); if (!proceed) return;
                this.lineHighlighter.clear();

                id = this.calculationStructure.pushItem(`fib(${n-2})`, parentId, false, spaceMultiplier);
                this.calculationStructure.addOperationSign("+", parentId);

                const num2 = await fib(n-2, memo, id, spaceMultiplier-1);

                if (!proceed) return;

                this.calculationStructure.setText(num2, id);

                this.lineHighlighter.highlight(6);
                proceed = await this.timer.wait(500); if (!proceed) return;
                this.lineHighlighter.clear();

                const result = num1 + num2;

                memo[n] = result;

                if (n === 4) {
                    for (let i = 0; i < 4; i++) {
                        this.visualArray.pushItem("&nbsp;");
                    }
                }
                this.visualArray.pushItem(result);

                this.lineHighlighter.highlight(8);
                proceed = await this.timer.wait(500); if (!proceed) return;
                this.lineHighlighter.clear();

                this.lineHighlighter.highlight(9);
                proceed = await this.timer.wait(500); if (!proceed) return;
                this.lineHighlighter.clear();

                return result;
            }

            this.lineHighlighter.highlight(12);
            proceed = await this.timer.wait(500); if (!proceed) return;
            this.lineHighlighter.clear();

            const id = this.calculationStructure.pushItem("fib(6)");
            
            const vysledek = await fib(6, [], id, 3);

            if (!proceed) return;

            this.calculationStructure.setText(vysledek, id);

            this.lineHighlighter.highlight(12);
            proceed = await this.timer.wait(500); if (!proceed) return;
            this.lineHighlighter.clear();

            this.console.log("Šesté číslo ve Fibonacciho posloupnosti je: " + vysledek);

            this.lineHighlighter.highlight(13);
            proceed = await this.timer.wait(500); if (!proceed) return;
            this.lineHighlighter.clear();

            this.finish();
        }
    },
    {
        exampleId: 3,
        lineHighlighter: new LineHighlighter("code-3"),
        timer: new Timer(),
        console: new Console("console-3"),
        visualArray: new VisualArray("visual-array-2", 6),
        code: async function() {
            let proceed;

            const fib = async (n) => {
                const fibNums = [0, 1, 1];

                this.visualArray.pushItem(0);
                this.visualArray.pushItem(1);
                this.visualArray.pushItem(1);

                this.lineHighlighter.highlight(2);
                proceed = await this.timer.wait(500); if (!proceed) return;
                this.lineHighlighter.clear();

                n--;

                this.lineHighlighter.highlight(4);
                proceed = await this.timer.wait(500); if (!proceed) return;
                this.lineHighlighter.clear();

                this.lineHighlighter.highlight(6);
                proceed = await this.timer.wait(500); if (!proceed) return;
                this.lineHighlighter.clear();

                for (let i = 3; i <= n; i++) {
                    fibNums[i] = fibNums[i-1] + fibNums[i-2];

                    this.visualArray.pushItem(fibNums[i]);

                    this.lineHighlighter.highlight(8);
                    proceed = await this.timer.wait(500); if (!proceed) return;
                    this.lineHighlighter.clear();

                    this.lineHighlighter.highlight(6);
                    proceed = await this.timer.wait(500); if (!proceed) return;
                    this.lineHighlighter.clear();
                }

                this.lineHighlighter.highlight(11);
                proceed = await this.timer.wait(500); if (!proceed) return;
                this.lineHighlighter.clear();

                return fibNums[n];
            }

            this.lineHighlighter.highlight(14);
            proceed = await this.timer.wait(500); if (!proceed) return;
            this.lineHighlighter.clear();
            
            const vysledek = await fib(6);

            if (!proceed) return;

            this.lineHighlighter.highlight(14);
            proceed = await this.timer.wait(500); if (!proceed) return;
            this.lineHighlighter.clear();

            this.console.log("Šesté číslo ve Fibonacciho posloupnosti je: " + vysledek);

            this.lineHighlighter.highlight(15);
            proceed = await this.timer.wait(500); if (!proceed) return;
            this.lineHighlighter.clear();

            this.finish();
        }
    }
];

initExamples(config);