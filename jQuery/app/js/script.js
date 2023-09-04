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
let lengths = [.15 * 60 * 1000, .1 * 60 * 1000] // order // 25 minutes // 5 minutes
let currentLength = 0
let runningLength
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
display(sessionLengthTag, lengths[0]) // initialize
display(timeLeftTag, lengths[0])
sessionIncTag.click(() => {
    if (lengths[0] < 60 * 60 * 1000) { // greater than 0 and less than 60 minutes
        lengths[0] += 5 * 1000 // 1 minute
        display(sessionLengthTag, lengths[0])
        display(timeLeftTag, lengths[0])
    }
})
sessionDecTag.click(() => {
    if (lengths[0] > 0) { // greater than 0 and less than 60 minutes
        lengths[0] -= 5 * 1000 // 1 minute
        display(sessionLengthTag, lengths[0])
        display(timeLeftTag, lengths[0])
    }
})

// break set
const breakLengthTag = $('#break-length')
const breakIncTag = $('#break-increment')
const breakDecTag = $('#break-decrement')
display(breakLengthTag, lengths[1]) // initialize 
breakIncTag.click(() => {
    if (lengths[1] < 60 * 60 * 1000) { // greater than 0 and less than 60 minutes
        lengths[1] += 5 * 1000 // 1 minute
        display(breakLengthTag, lengths[1])
    }
})
breakDecTag.click(() => {
    if (lengths[1] > 0) { // greater than 0 and less than 60 minutes
        lengths[1] -= 5 * 1000 // 1 minute
        display(breakLengthTag, lengths[1])
    }
})

// timer run
function countDown() {
    runningLength = lengths[currentLength]
    let curCntDwn = setInterval(() => {
        runningLength -= 1000 // 1 second
        display(timeLeftTag, runningLength)
        if (runningLength === 0) {
            clearInterval(curCntDwn)
            if (currentLength < lengths.length - 1) { // alternator
                currentLength += 1
            } else {
                currentLength = 0
            }
            countDown()
        }
    }, 1000)
}
const startStopTag = $('#start_stop')
startStopTag.click(() => {
    countDown()
})


