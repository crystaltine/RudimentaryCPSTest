const clickButton = document.getElementById('click-here');
const clickCounter = document.getElementById('click-counter');
const timerBox = document.getElementById('timer-box');

const finishPopup = document.getElementById('finish-popup')
finishPopup.style.display = 'none';

let timer;

const reset = document.getElementById('reset');

let clicks = 0;
let timeElapsed = 0;
let testOngoing = false;

const maxTime = 10000;

reset.onclick = () => {

    testOngoing = false;

    clicks = 0; // reset click counter
    clickCounter.innerHTML = `Clicks: 0`

    timeElapsed = 0;
    timerBox.innerHTML = `Time: <b>0s</b>`

    finishPopup.style.display = 'none';

    clearTimeout(timer);
}

clickButton.onclick = () => {

    if (!testOngoing) {
        testOngoing = true;
        timer = setInterval(() => {

            // console.log(`Interval running again; timeElapsed=${timeElapsed}`)

            if (timeElapsed >= maxTime / 1000) {
                testOngoing = false;

                finishPopup.style.display = 'flex';
                finishPopup.innerHTML = `
                    <div>Clicks: ${clicks}</div>
                    <div>CPS: ${(clicks/(maxTime / 1000)).toFixed(2)}</div>
                    <button onclick="document.getElementById('finish-popup').style.display = 'none';">Close</button>
                `

                clicks = 0; // reset click counter
                clickCounter.innerHTML = `Clicks: 0`

                timeElapsed = 0;
                timerBox.innerHTML = `Time: <b>0s</b>`

                clearTimeout(timer);
            } else {
        
                // time elapsed stores in seconds
                timeElapsed += 0.1
                // console.log(`updating timerbox: timeElapsed=${timeElapsed}, tofixed=${timeElapsed.toFixed(2)}`)
                timerBox.innerHTML = `Time: <b>${timeElapsed.toFixed(2)}s</b>`
            }
        }, 100)
    }

    clicks++;
    clickCounter.innerHTML = `Clicks: ${clicks}`
}