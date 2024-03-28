
export const useNodesStore = defineStore('nodes', () => {
    const library = useLibraryStore()

    const allNoData = [
        {
            id: 'a',
            type: 'song-default',
            label: 'Speed',
            position: { x: 250, y: 5 },
            data: 1
        },
        {
            id: 'b',
            type: 'song-default',
            label: '138 Trek',
            position: { x: 550, y: 5 },
            data: 2
        },
        {
            id: 'c',
            type: 'song-default',
            label: 'Barracuda',
            position: { x: 150, y: 5 },
            data: 3
        }
    ]

    const getLibraryItem = function(node){
        const libraryItem = library.all.find(i => i.id === node.data);
        return {...node, data: libraryItem }
    }

    const all = computed(() => allNoData.map(x => getLibraryItem(x)))



    return { all }
})