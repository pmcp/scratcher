

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
        console.log('Project store', 'getProject', {projectId})
        const project = await Pb.getItem('projects', projectId, 'items.data')
        console.log('Got project', project)
        return project
    }

    const setProject =  function(project) {
        console.log('setting project', project)
        activeProject.value = {...project}
    }

    const subscribeProject = function(project) {
        Pb.subscribeSingle('projects', project.id)
    }


    const update = async function(projectId, data) {
        const updatedProject = await Pb.update('projects', projectId, data)
        return updatedProject
    }

    return { defaultBpm, activeProject, create, update, getProject, setProject, subscribeProject }
})