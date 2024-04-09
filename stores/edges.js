
export const useEdgesStore = defineStore('edges', () => {
    const Pb = usePbStore()

    const all = ref([])

    const create = async function(edge){
        const createdEdge = await Pb.create('edges', edge)
        console.log('created edge', createdEdge)
        return createdEdge
    }
    const setEdges = async function(edges){
        console.log('got edges, setting', edges)
        all.value = edges
    }

    const remove = async function(edgeId){
        console.log('removing Edge', edgeId)
        const removedEdge = await Pb.deleteSingle('edges', edgeId)
        return removedEdge
    }



    return { all, create, setEdges, remove }
})