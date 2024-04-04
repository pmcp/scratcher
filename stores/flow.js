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

    const getProject = async function(projectId, subscriptionCallback){
        console.log('getting project', projectId)
        const ProjectsStore = useProjectsStore()
        // It comes in with a slash at the beginning, remove
        const project = await ProjectsStore.getProject(projectId.substring(1))
        console.log('got project', project)

        // Set nodes (if there are any)
        if(project.expand) {
            const NodesStore = useNodesStore()
            NodesStore.setNodes(project.expand.items)
        }

        // Set project as Active
        ProjectsStore.setProject(project)

        if(!subscriptionCallback) {
            console.log('going to subscribe')
            ProjectsStore.subscribeProject(project)
        }

        return project
    }


    const uploadFiles = async function(files, position, project){
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

        // If project is just a hash, we are at home, so new project needs to be created

        console.log(project)
        if(project === '/') {

            const project = {
                bpm: ProjectsStore.defaultBpm,
                items: nodeIds
            }
            const router = useRouter()
            const createdProject = await ProjectsStore.create(project)
            router.push({ path: `/${createdProject.id}` })

        } else {
            console.log('updating project')
            // Update project
            // Project comes in with a slash at the beginning, remove
            const existingProjectId = project.substring(1)

            // Get existing Data
            // Maybe shouldn't do this, just get it from the State
            const activeProject = await Pb.getItem('projects', existingProjectId, '')

            // Add new items
            const updatedData = {
                ...activeProject, items: [...activeProject.items, ...nodeIds]
            }

            const updatedProject = await ProjectsStore.update(existingProjectId, updatedData)
            console.log(updatedProject)
        }



        // return createdProject.id

    }

    const draggingFiles = function(draggingOver){
        const UiStore = useUiStore()
        console.log({
            store: 'flow',
            var: 'draggingFiles',
            param: draggingOver
        })
        UiStore.setDraggingFiles(draggingOver)

    }

    const flowUpdate = async function(event, val){
        const projectsStore = useProjectsStore()
        const nodesStore = useNodesStore()
        if(event === 'onNodeDragStop') {
            const newPosition = val.node.position
            const activeNode = nodesStore.allNodes.find(node => node.id === val.node.id);
            const newData = {...activeNode, position: newPosition}
            const updatedNode = await nodesStore.update(val.node.id, newData)
             console.log('updatedNode', updatedNode)
            // HOW TO MAKE NODES UPDATE?
        }
    }

    return { login, getProject, draggingFiles, uploadFiles, flowUpdate }
})