// logic planning
// timer set function
// break set function
// timer run function
// break run function after timer

// display 
function display(tag, length) {
    // convert milliseconds to minutes and seconds
    let minutes = Math.floor(length / (1000 * 60))
    let seconds = Math.floor(length % (1000 * 60) / (1000))
    function pad(n, z) {
        z = z || 2 // pad to set digits or 2 by default. 
        return `00${n}`.slice(-z) // slice last 2 digits. 
    }
    tag.text(`${pad(minutes)}:${pad(seconds)}`)
}

// timer set
let sessionLength = 25 * 60 * 1000 // minutes to milliseconds
display($('#session-length'), sessionLength)
display($('#time-left'), sessionLength)

// break set
let breakLength = 5 * 60 * 1000// minutes to milliseconds
display($('#break-length'), breakLength)

// timer run
function countDown() {
    setInterval(() => {

        if (sessionLength < 0) {
            clearInterval(countDown)
        }

    }, 1000)
}

// break run