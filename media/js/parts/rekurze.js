import Console from "../modules/console.js";
import LineHighlighter from "../modules/lineHighlighter.js";
import Timer from "../modules/timer.js";
import CallStack from "../modules/callStack.js";
import initExamples from "../modules/interactiveExample.js";

const config = [
    {
        exampleId: 1,
        console: new Console("console-1"),
        lineHighlighter: new LineHighlighter("code-1"),
        timer: new Timer(),
        callStack: new CallStack("call-stack-1"),
        code: async function() {
            let proceed;

            const pozdrav = async function(pocet) {
                this.callStack.push("pozdrav");

                this.lineHighlighter.highlight(2);
                proceed = await this.timer.wait(500); if (!proceed) return;
                this.lineHighlighter.clear();
                if (pocet <= 0) {
                    this.callStack.pop();
                    return;
                }


                this.console.log("ahoj");
                this.lineHighlighter.highlight(3);
                proceed = await this.timer.wait(500); if (!proceed) return;
                this.lineHighlighter.clear();

                this.lineHighlighter.highlight(6);
                proceed = await this.timer.wait(500); if (!proceed) return;
                this.lineHighlighter.clear();
                await pozdrav.call(this, pocet-1);

                this.callStack.pop();
            }

            this.lineHighlighter.highlight(9);
            proceed = await this.timer.wait(500); if (!proceed) return;
            this.lineHighlighter.clear();

            await pozdrav.call(this, 3);

            this.finish();
        }
    },
    {
        exampleId: 2,
        console: new Console("console-2"),
        lineHighlighter: new LineHighlighter("code-2"),
        timer: new Timer(),
        callStack: new CallStack("call-stack-2"),
        code: async function() {
            let proceed = true;

            const soucet = async (cislo1, cislo2) => {
                this.callStack.push("soucet");

                this.lineHighlighter.highlight(1);
                proceed = await this.timer.wait(500); if (!proceed) return;
                this.lineHighlighter.clear();

                this.callStack.pop();

                return cislo1 + cislo2;
            };
            const prumer = async (cislo1, cislo2) => {
                this.callStack.push("prumer");

                this.lineHighlighter.highlight(4);
                proceed = await this.timer.wait(500); if (!proceed) return;
                this.lineHighlighter.clear();

                const result = await soucet(cislo1, cislo2) / 2;

                if (!proceed) return;

                this.lineHighlighter.highlight(4);
                proceed = await this.timer.wait(500); if (!proceed) return;
                this.lineHighlighter.clear();

                this.callStack.pop();

                return result;
            };
            const vypisPrumer = async (cislo1, cislo2) => {
                this.callStack.push("vypisPrumer");

                this.lineHighlighter.highlight(7);
                proceed = await this.timer.wait(500); if (!proceed) return;
                this.lineHighlighter.clear();

                const vysledek = await prumer(cislo1, cislo2);

                if (!proceed) return;

                this.lineHighlighter.highlight(7);
                proceed = await this.timer.wait(500); if (!proceed) return;
                this.lineHighlighter.clear();

                this.console.log("Průměr: " + vysledek);

                this.lineHighlighter.highlight(8);
                proceed = await this.timer.wait(500); if (!proceed) return;
                this.lineHighlighter.clear();

                this.callStack.pop();
            }

            this.lineHighlighter.highlight(11);
            proceed = await this.timer.wait(500); if (!proceed) return;
            this.lineHighlighter.clear();

            await vypisPrumer(3, 5);

            this.finish();
        }
    },
    {
        exampleId: 3,
        console: new Console("console-3"),
        lineHighlighter: new LineHighlighter("code-3"),
        timer: new Timer(),
        callStack: new CallStack("call-stack-3"),
        code: async function() {
            let proceed = true;

            const factorial = async (n) => {
                this.callStack.push("factorial");

                this.lineHighlighter.highlight(1);
                proceed = await this.timer.wait(500); if (!proceed) return;
                this.lineHighlighter.clear();

                if (n === 0 || n === 1){

                    this.lineHighlighter.highlight(3);
                    proceed = await this.timer.wait(500); if (!proceed) return;
                    this.lineHighlighter.clear();

                    this.callStack.pop();
                    return 1;
                } else {
                    this.lineHighlighter.highlight(7);
                    proceed = await this.timer.wait(500); if (!proceed) return;
                    this.lineHighlighter.clear();

                    const result = n * await factorial(n-1);

                    if (!proceed) return;

                    this.lineHighlighter.highlight(7);
                    proceed = await this.timer.wait(500); if (!proceed) return;
                    this.lineHighlighter.clear();

                    this.callStack.pop();
                    return result;
                }
            }

            this.lineHighlighter.highlight(11);
            proceed = await this.timer.wait(500); if (!proceed) return;
            this.lineHighlighter.clear();

            const vysledek = await factorial(5);

            if (!proceed) return this.finish();

            this.lineHighlighter.highlight(11);
            proceed = await this.timer.wait(500); if (!proceed) return;
            this.lineHighlighter.clear();
            
            this.console.log("Faktoriál 5 je: " + vysledek);

            this.lineHighlighter.highlight(12);
            proceed = await this.timer.wait(500); if (!proceed) return;
            this.lineHighlighter.clear();

            this.finish();
        }
    }
];

initExamples(config);