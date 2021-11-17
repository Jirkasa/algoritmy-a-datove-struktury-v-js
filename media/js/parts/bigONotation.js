import Console from "../modules/console.js";
import initExamples from "../modules/interactiveExample.js";

const config = [
    {
        exampleId: 1,
        console: new Console("console-1"),
        code: function() {
            let cas1 = performance.now();

            let pocet = 0;
            for (let i = 0; i < 5000000; i++) {
                pocet++;
            }

            let cas2 = performance.now();
            this.console.log(`Provedení kódu trvalo ${cas2 - cas1} milisekund.`);

            this.finish();
        }
    }
];

initExamples(config);