function initExamples(config) {
    for (let example of config) {
        const codeBox = document.querySelector(`[data-interactive-example-id="${example.exampleId}"]`);
        const exampleConsole = example.console;
        const playButton = codeBox.querySelector('button[data-interactive-example-play-button]');
        const resetButton = codeBox.querySelector('button[data-interactive-example-reset-button]');

        if (playButton) playButton.addEventListener("click", () => {
            if (exampleConsole) exampleConsole.clear();
            example.code();
        });
        if (resetButton) resetButton.addEventListener("click", () => {
            if (exampleConsole) exampleConsole.clear();
        });
    }
}

export default initExamples;