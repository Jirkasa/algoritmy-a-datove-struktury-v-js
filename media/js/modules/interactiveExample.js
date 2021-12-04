/**
 * initializes code examples
 * @param {[object]} config Array with configured code examples
 */
function initExamples(config) {
    for (let example of config) {
        // get code example components and elements
        const codeBox = document.querySelector(`[data-interactive-example-id="${example.exampleId}"]`);
        const exampleConsole = example.console;
        const lineHighlighter = example.lineHighlighter;
        const timer = example.timer;
        const callStack = example.callStack;
        const visualArray = example.visualArray;
        const visualArrays = example.visualArrays;
        const visualVariables = example.visualVariables;
        const visualLinkedList = example.visualLinkedList;
        const visualTree = example.visualTree;
        const playButton = codeBox.querySelector('button[data-interactive-example-play-button]');
        const resetButton = codeBox.querySelector('button[data-interactive-example-reset-button]');
        const speedInput = codeBox.querySelector('select[data-interactive-example-speed-input]');
        const moveButton = codeBox.querySelector('button[data-interactive-example-move-button]');

        // here are stored play button icons
        let playIcon;
        let pauseIcon;
        
        // here is stored example state
        let running = false;
        let paused = false;
        
        // get/create play and pause icons if play button exists
        if (playButton) {
            playIcon = playButton.querySelector("span");
            pauseIcon = document.createElement("span");
            pauseIcon.innerHTML = `
                <svg>
                    <use xlink:href="../media/img/icon-sprite.svg#icon-pause2"></use>
                </svg>
            `;
            pauseIcon.style.display = "none";
            playButton.appendChild(pauseIcon);
        }

        // add event listener for play button
        if (playButton) playButton.addEventListener("click", () => {
            // if example is running
            if (running) {
                if (!paused) {
                    // pause timer
                    if (timer) timer.pause();
                    // update icon
                    playIcon.style.display = "block";
                    pauseIcon.style.display = "none";
                    // update example state
                    paused = true;
                    // display move button
                    if (moveButton) moveButton.style.display = "inline-block";
                } else {
                    // resume timer
                    if (timer) timer.play();
                    // update icon
                    playIcon.style.display = "none";
                    pauseIcon.style.display = "block";
                    // update example state
                    paused = false;
                    // hide move button
                    if (moveButton) moveButton.style.display = "none";
                }

                return;
            }

            // example is not running

            // reset components of example
            if (exampleConsole) exampleConsole.clear();
            if (lineHighlighter) lineHighlighter.clear();
            if (timer) timer.reset();
            if (callStack) callStack.reset();
            if (visualArray) visualArray.reset();
            if (visualArrays) visualArrays.reset();
            if (visualVariables) visualVariables.reset();
            if (visualLinkedList) visualLinkedList.reset();
            if (visualTree) visualTree.reset();

            // update play button icon
            playIcon.style.display = "none";
            pauseIcon.style.display = "block";

            // update example state
            paused = false;
            running = true;

            // run example code
            example.code();
        });
        // add event listener for reset button
        if (resetButton) resetButton.addEventListener("click", () => {
            // reset components of example
            if (exampleConsole) exampleConsole.clear();
            if (lineHighlighter) lineHighlighter.clear();
            if (timer) timer.reset();
            if (callStack) callStack.reset();
            if (visualArray) visualArray.reset();
            if (visualArrays) visualArrays.reset();
            if (visualVariables) visualVariables.reset();
            if (visualLinkedList) visualLinkedList.reset();
            if (visualTree) visualTree.reset();

            // update play button icon
            if (playButton) {
                playIcon.style.display = "block";
                pauseIcon.style.display = "none";
            }
            // hide move button
            if (moveButton) moveButton.style.display = "none";

            // update running state
            running = false;
        });
        // add event listener for speed input
        if (speedInput) speedInput.addEventListener("change", (e) => {
            // change speed of timer
            if (timer) timer.setSpeed(e.currentTarget.value);
        });
        // add event listener for move button and hide it
        if (moveButton) {
            // hide move button
            moveButton.style.display = "none";
            // add event listener to move forward in code example
            if (timer) moveButton.addEventListener("click", () => {
                timer.next();
            });
        }

        // add function to be called when code example is finished (this function must be called from example code)
        example.finish = () => {
            // update play button icon
            if (playButton) {
                playIcon.style.display = "block";
                pauseIcon.style.display = "none";
            }
            // hide move button
            if (moveButton) moveButton.style.display = "none";
            // update example state
            running = false;
        };
    }
}

export default initExamples;