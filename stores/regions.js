
export const useRegionsStore = defineStore('regions', () => {

    const colors = {
        'color1': 'rgba(250, 95, 40, .4)',
        'color2': 'rgba(241, 38, 24, .4)',
        'color3': 'rgba(230, 44, 94, .4)',
        'color4': 'rgba(66, 156, 206, .4)'
    }

    const buttons = [{
            active: false,
            color: 'color1'
        }, {
            active: false,
            color: 'color2'
        },
        {
            active: false,
            color: 'color3'
        },
        {
            active: false,
            color: 'color4'
        }
    ]
    const colorsToButtons = {
        'rgba(250, 95, 40, .4)': 0,
        'rgba(241, 38, 24, .4)': 1,
        'rgba(230, 44, 94, .4)': 2,
        'rgba(66, 156, 206, .4)': 3
    }


    const regionColors = buttons.map(button => colors[button.color])


    return { regionColors, colorsToButtons, buttons, colors }
})