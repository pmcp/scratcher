export const useFlowStore = defineStore('flow', () => {
    const Pb = usePbStore()
    const login = async function(name, pass){
        // Login
        console.log('logging in user', name, pass)
        const UserStore = useUserStore()
        const user = await Pb.doAuth(name, pass)
        await UserStore.setUser(user)
        console.log('login done')

        console.log('getting teams')
        const teamsStore = useTeamsStore()
        const teams = await teamsStore.getTeams()
        console.log('getting teams done')
    }

    const getProject = async function(projectId){
        console.log('getting project', projectId)
        const ProjectsStore = useProjectsStore()
        // It comes in with a slash at the beginning, remove
        const project = await ProjectsStore.getProject(projectId.substring(1))

        // Set project as Active
        await ProjectsStore.setProject(project)

        // Set nodes
        const NodesStore = useNodesStore()
        NodesStore.allNodes.value = project.expand.items

        return project

        // const teamsStore = useTeamsStore()
        // const teams = await teamsStore.getTeams()
        // console.log('getting teams done')
    }

    const createProject = async function(files, position){
        const ProjectsStore = useProjectsStore()
        const NodesStore = useNodesStore()

        // For every file, create a new item in Pocketbase
        const nodeIds = await Promise.all(files.map(async (file) => {
            const fileId = await Pb.uploadFiles(file);
            // For each file, create a Node
            const node = {
                type: 'song-default',
                position: position,
                data: fileId
            }
            const nodeId = await NodesStore.create(node)
            return nodeId.id;
        }));
        console.log('got Node Ids')

        const project = {
            bpm: ProjectsStore.defaultBpm,
            items: nodeIds
        }

        const createdProject = await ProjectsStore.create(project)
        return createdProject.id

    }
    return { login, getProject, createProject }
})