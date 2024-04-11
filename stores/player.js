import {guess} from "web-audio-beat-detector";

export const usePlayerStore = defineStore('player', () => {
    const defaultOptions = ref({
        height: 160,
        progressColor: '#FA5F28',
        waveColor: '#F2F2F2',
        cursorColor: '#F2F2F2',
        // barWidth: 6,
        barGap: 1,
        barRadius: 8,
        barAlign: 'center',
        mediaControls: false,
        backend: 'MediaElement',
        // scrollParent:true,
        interact: true,
        // normalize: true,
        // minPxPerSec: 60,
        // autoCenter: true,
        autoScroll: false,
        hideScrollbar: true,
        audioRate: 1, // set the initial playback rate
        xhr: {
            mode: 'no-cors'
        }
    })


    const calculateBPM = function (file) {
        return guess(audioBuffer, { maxTempo: 190, minTempo: 70 })
            .then(({ bpm, offset, tempo }) => {
                console.log(bpm, offset, tempo)
                // Calculate diff = (final - original)/ original
                const BpmDiff = (targetBpm - bpm) / bpm
                const newPlaybackRate = 1 + BpmDiff
                console.log(`new PlaybackRate = ${newPlaybackRate}`)
                // set playback rate
            })
            .catch((err) => {
                console.log(err)
                // something went wrong
            });
    }
    return { defaultOptions, calculateBPM }
})