
export const useNodesStore = defineStore('nodes', () => {
    const Pb = usePbStore()
    const library = useLibraryStore()


    // const allNoData = [
    //     {
    //         id: 'a',
    //         type: 'song-default',
    //         label: 'Speed',
    //         position: { x: 250, y: 5 },
    //         data: 1
    //     },
    //     {
    //         id: 'b',
    //         type: 'song-default',
    //         label: '138 Trek',
    //         position: { x: 550, y: 5 },
    //         data: 2
    //     },
    //     {
    //         id: 'c',
    //         type: 'song-default',
    //         label: 'Barracuda',
    //         position: { x: 150, y: 5 },
    //         data: 3
    //     }
    // ]
    //
    //

    //
    // const getLibraryItem = function(node){
    //     const libraryItem = library.all.find(i => i.id === node.data);
    //     return {...node, data: libraryItem }
    // }
    //
    // const all = computed(() => allNodes.value.map(x => getLibraryItem(x)))

    const allNodes = ref([])
    const projectStore = useProjectsStore()
    const all = computed(() => {
        console.log('HERE', allNodes.value)
        const

        allNodes.value.map(node => {
            return {
                id: node.id,
                type: node.type,
                label: node.label,
                position: { x: node.position.x, y: node.position.y },
                data: {
                    artist: node.expand.data.artist,
                    id: node.expand.data.id,
                    title: node.expand.data.title,
                    bpm: node.expand.data.bpm,
                    peaks: node.expand.data.peaks,
                    src: `https://scritch.pockethost.io/api/files/rtge3objv4nrxgx/${node.expand.data.id}/${node.expand.data.src}`
                }
            }
        })

    })


    const create = async function(node){
        const createdNode = await Pb.create('nodes', node)
        console.log('created project', createdNode)
        return createdNode
    }


    return { allNodes, all, create }
})