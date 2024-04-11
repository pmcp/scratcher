
export const useRegionsStore = defineStore('regions', () => {

    const regionColors = [
        'rgba(250, 95, 40, .4)',
        'rgba(241, 38, 24, .4)',
        'rgba(230, 44, 94, .4)',
        'rgba(66, 156, 206, .4)'
    ]
    const defaultRegions = [
        {
            status: 0,
            start: 0,
            end: 10,
        },
        {
            status: 0,
            start: 10,
            end: 20
        },
        {
            status: 0,
            start: 20,
            end: 30
        },
        {
            status: 0,
            start: 30,
            end: 40
        }
    ]

    return { defaultRegions, regionColors }
})