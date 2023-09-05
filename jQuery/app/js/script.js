// logic planning
// timer set function
// break set function
// timer run function
// break run function after timer

// to dos
// generalize inc and dec variables and functions?
// adjust code to use lengths arr. idk if going to use object or not. 
// session label swap on countdown change
// audio
// space to start/stop
// styling

// state // all state in one place for redux
let lengths = [ // name and order
    {
        name: 'Session',
        length: 25 * 60 * 1000 // 25 minutes
    },
    {
        name: 'Break',
        length: 5 * 60 * 1000 // 5 minutes
    }]
let currentLength = 0
let runningLength
let isRunning = false

// display 
function display(tag, length, padded) {
    // milliseconds to minutes and seconds
    let minutes = Math.floor(length / (1000 * 60))
    let seconds = Math.floor(length % (1000 * 60) / (1000))
    if (padded === true) {
        function pad(n, z) {
            z = z || 2 // pad to set digits or 2 by default. 
            return `00${n}`.slice(-z) // slice last 2 digits. 
        }
        tag.text(`${pad(minutes)}:${pad(seconds)}`)
    } else {
        tag.text(`${minutes}`)
    }
}

// timer set
const timeLeftTag = $('#time-left')
display(timeLeftTag, lengths[0].length, true)

const sessionLengthTag = $('#session-length')
const sessionIncTag = $('#session-increment')
const sessionDecTag = $('#session-decrement')
display(sessionLengthTag, lengths[0].length) // initialize
sessionIncTag.click(() => {
    if (lengths[0].length < 60 * 60 * 1000) { // greater than 0 and less than 60 minutes
        lengths[0].length += 60 * 1000 // 1 minute
        display(sessionLengthTag, lengths[0].length)
        display(timeLeftTag, lengths[0].length, true)
    }
})
sessionDecTag.click(() => {
    if (lengths[0].length > 0) { // greater than 0 and less than 60 minutes
        lengths[0].length -= 60 * 1000 // 1 minute
        display(sessionLengthTag, lengths[0].length)
        display(timeLeftTag, lengths[0].length, true)
    }
})

// break set
const breakLengthTag = $('#break-length')
const breakIncTag = $('#break-increment')
const breakDecTag = $('#break-decrement')
display(breakLengthTag, lengths[1].length) // initialize 
breakIncTag.click(() => {
    if (lengths[1].length < 60 * 60 * 1000) { // greater than 0 and less than 60 minutes
        lengths[1].length += 60 * 1000 // 1 minute
        display(breakLengthTag, lengths[1].length)
    }
})
breakDecTag.click(() => {
    if (lengths[1].length > 0) { // greater than 0 and less than 60 minutes
        lengths[1].length -= 60 * 1000 // 1 minute
        display(breakLengthTag, lengths[1].length)
    }
})

// timer run
function countDown() {
    runningLength = lengths[currentLength].length
    const curCntDwn = setInterval(() => {
        if (runningLength === 0) { // end of current countdown 
            clearInterval(curCntDwn)
            if (currentLength < lengths.length - 1) { // alternator
                currentLength += 1
            } else {
                currentLength = 0
            }
            countDown()
        } else {
            runningLength -= 1000 // 1 second
            display(timeLeftTag, runningLength, true)
        }
    }, 1000)
    isRunning = curCntDwn
}
const startStopTag = $('#start_stop')
startStopTag.click(() => {
    countDown()
})

// reset
const resetTag = $('#reset')
resetTag.click(() => {
    if (isRunning) {
        clearInterval(isRunning)
        isRunning = false
    }
    lengths[0].length = 25 * 60 * 1000
    lengths[1].length = 5 * 60 * 1000
    display(sessionLengthTag, lengths[0].length)
    display(breakLengthTag, lengths[1].length)
    display(timeLeftTag, lengths[0].length, true)
})