// logic planning
// timer set function
// break set function
// timer run function
// break run function after timer

// to dos
// adjust code to use lengths arr. idk if going to use object or not. 
// session label swap on countdown change
// audio
// space to start/stop
// session length: 25 min, break length 5 min, increments and decrements: 1 minute 
// styling

// state
let lengths = [
    { sessionLength: 1 * 60 * 1000 }, // 25 minutes
    { breakLength: 1 * 60 * 1000 } // 5 minutes
]
let currentLength = 0
let runningLength = lengths[currentLength]
let isRunning = false

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
const sessionLengthTag = $('#session-length')
const timeLeftTag = $('#time-left')
const sessionIncTag = $('#session-increment')
const sessionDecTag = $('#session-decrement')
display(sessionLengthTag, sessionLength) // initialize
display(timeLeftTag, sessionLength)
sessionIncTag.click(() => {
    if (sessionLength < 60 * 60 * 1000) { // greater than 0 and less than 60 minutes
        sessionLength += 5 * 1000 // 1 minute
        display(sessionLengthTag, sessionLength)
        display(timeLeftTag, sessionLength)
    }
})
sessionDecTag.click(() => {
    if (sessionLength > 0) { // greater than 0 and less than 60 minutes
        sessionLength -= 5 * 1000 // 1 minute
        display(sessionLengthTag, sessionLength)
        display(timeLeftTag, sessionLength)
    }
})

// break set
const breakLengthTag = $('#break-length')
const breakIncTag = $('#break-increment')
const breakDecTag = $('#break-decrement')
display(breakLengthTag, breakLength) // initialize 
breakIncTag.click(() => {
    if (breakLength < 60 * 60 * 1000) { // greater than 0 and less than 60 minutes
        breakLength += 5 * 1000 // 1 minute
        display(breakLengthTag, breakLength)
    }
})
breakDecTag.click(() => {
    if (breakLength > 0) { // greater than 0 and less than 60 minutes
        breakLength -= 5 * 1000 // 1 minute
        display(breakLengthTag, breakLength)
    }
})

// timer run
function countDown(length) {
    setInterval(() => {
        if (runningLength < 0) {
            clearInterval(countDown)
            if (currentLength < lengths.length - 1) { // timer alternate
                currentLength += 1
            } else {
                currentLength = 0
            }
            countDown(lengths[currentLength])
        } else {
            runningLength -= 1000 // 1 second
            display(timeLeftTag, runningLength)
        }
    }, 1000)
}
const startStopTag = $('#start_stop')
startStopTag.click(() => {
    countDown(lengths[currentLength])
})

