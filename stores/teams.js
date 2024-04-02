
export const useTeamsStore = defineStore('teams', () => {
    const all = ref([])

    const getTeams = async function(){
        const Pb = usePbStore()
        const all = await Pb.getCollection('teams')
        this.$patch({
            all: [...all]
        })
    }

    return { all, getTeams }
})