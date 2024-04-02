

export const useProjectsStore = defineStore('projects', () => {
    const Pb = usePbStore()

    const activeProject = ref(null)
    const defaultBpm = ref(100)
    const defaultProject = {
        'bpm': defaultBpm.value,
        'items': []
    };

    const create = async function(project){
        const createdProject = await Pb.create('projects', project)
        console.log('created project', createdProject)
        return createdProject
    }

    const getProject = async function(projectId) {
        const project = await Pb.getItem('projects', projectId, 'items.data')
        console.log('Got project', project)
        return project
    }

    const setProject =  function(project) {




        activeProject.value = {...project}
    }

    return { defaultBpm, activeProject, create, getProject, setProject }
})