
export const useNodesStore = defineStore('nodes', () => {
    const Pb = usePbStore()
    const allNodes = ref([])

    const setNodes = function(items){
        console.log({
            store: 'nodes',
            var: 'setNodes',
            input: items
        })
        allNodes.value = items
    }
    const all = computed(() => {
        return allNodes.value.map(node => {
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
                    // TODO: Move url to env
                    src: `http://127.0.0.1:8090/api/files/rtge3objv4nrxgx/${node.expand.data.id}/${node.expand.data.src}`
                }
            }
        })
    })

    const update = async function(nodeId, data){
        const updatedNode = await Pb.update('nodes', nodeId, data)
        return updatedNode;
    }

    const create = async function(node){
        const createdNode = await Pb.create('nodes', node)
        console.log('created node', createdNode)
        return createdNode
    }

    const remove = async function(nodeId){
        console.log('removing Node', nodeId)
        const removedNode = await Pb.deleteSingle('nodes', nodeId)
        return removedNode
    }

    const getSingle = async function(nodeId){
        console.log('get single Node', nodeId)
        const node = await Pb.getItem('nodes', nodeId, '')
        return node
    }

    return { allNodes, all, update, create, setNodes, remove, getSingle }
})