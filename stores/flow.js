import {useVueFlow} from "@vue-flow/core";

export const useFlowStore = defineStore('flow', () => {

    // A BIT CONFUSING, BUT THIS IS FLOW, AS IN THE APP FLOW, NOT THE VUEFLOW COMPONENT

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
        const ProjectsStore = useProjectsStore()
        // It comes in with a slash at the beginning, remove
        const project = await ProjectsStore.getProject(projectId.substring(1))
        console.log('got project', project)

        // Set nodes or edges (if there are any)
        if(project.expand) {
            if(project.expand.items) {
                const NodesStore = useNodesStore()
                NodesStore.setNodes(project.expand.items)
            }

            if(project.expand.edges) {
                const EdgesStore = useEdgesStore()
                EdgesStore.setEdges(project.expand.edges)
            }
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
        console.log('upload')
        const ProjectsStore = useProjectsStore()
        const NodesStore = useNodesStore()

        // For every file, create a new item in Pocketbase
        const nodeIds = await Promise.all(files.map(async (file) => {
            const fileId = await Pb.uploadFiles(file);
            // For each file, create a Node

            // Get the default regions settings from Regions store
            const RegionsStore = useRegionsStore()
            const node = {
                type: 'song-default',
                position: position,
                data: fileId
            }
            const nodeId = await NodesStore.create(node)
            return nodeId.id;
        }));

        // If project is just a slash, we are at home, so new project needs to be created
        if(project === '/') {

            const project = {
                bpm: ProjectsStore.defaultBpm,
                items: nodeIds
            }
            const router = useRouter()
            const createdProject = await ProjectsStore.create(project)
            router.push({ path: `/${createdProject.id}` })

            return createdProject.id

        } else {
            console.log('updating project', nodeIds)
            const ProjectsStore = useProjectsStore()
            const updatedProject = await ProjectsStore.update(ProjectsStore.activeProject.id, {'items+': nodeIds})
            return updatedProject.id
        }
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
            console.log(activeNode.position, newPosition)
            const newData = {...activeNode, position: newPosition}
            const updatedNode = await nodesStore.update(val.node.id, newData)
        }
    }

    const connectEdge = async function(edge) {
        console.log('connecting edge', edge)
        const ProjectsStore = useProjectsStore()
        const activeProject = ProjectsStore.activeProject

        const edgesStore = useEdgesStore()
        const cleanEdge = {
            source: edge.source,
            target: edge.target
        }
        const createdEdge = await edgesStore.create(cleanEdge)
        // Add edge to the project
        const updatedProject = await ProjectsStore.update(activeProject.id, {'edges+': createdEdge.id})
        return updatedProject.id
    }

    const removeEdges = async function(edges) {
        console.log('removing edges', edges)
        const ProjectsStore = useProjectsStore()
        const EdgesStore = useEdgesStore()
        const activeProject = ProjectsStore.activeProject

        // Remove edges from the project
        const updatedProject = await ProjectsStore.update(activeProject.id, {'edges-': edges})

        // Remove edge from Database
        // TODO: update with transactional or on the server when ready, so can remove multiple at once

        for (var i = 0; i < edges.length; i++) {
            EdgesStore.remove(edges[i])
        }

    }

    const removeNode = async function(nodeId, connectedEdges) {
        // reduce edges to ids
        if(connectedEdges.length > 0) {
            let connectedEdgesIds = []
            for (var i = 0; i < connectedEdges.length; i++) {
                console.log(connectedEdgesIds.push(connectedEdges[i].id))
            }
            // remove edge from project
            this.removeEdges(connectedEdgesIds)
        }

        // remove Node
        const NodesStore = useNodesStore()
        const removedNode = NodesStore.remove(nodeId)
        return removedNode.id


    }

    const cloneNode = async function(nodeId) {
        // TODO: Should go to server: copy node based on Id, and add to project
        const NodesStore = useNodesStore()
        const nodeToCopy = await NodesStore.getSingle(nodeId)


        // Create new node with content of nodeToCopy
        console.log(nodeToCopy)



        const prepNode = {
            data: nodeToCopy.data,
            position: {
                x: nodeToCopy.position.x + 200,
                y: nodeToCopy.position.y + 200
            },
            type: nodeToCopy.type
        }
        const copiedNode = await NodesStore.create(prepNode)

        // Add new Node to project
        const ProjectsStore = useProjectsStore()
        const activeProject = ProjectsStore.activeProject.id
        console.log('COPIED', copiedNode)
        await ProjectsStore.update(activeProject, {'items+': copiedNode.id})
    }


    const updateRegionTiming = async function(nodeId, start, end, regionColor, buttonType) {
        // TODO: Now that I know how to set the Id of the region, can simplify all of this
        console.log(nodeId, start, end, regionColor, buttonType)
        const RegionsStore = useRegionsStore()
        if(regionColor) {
            buttonType = RegionsStore.colorsToButtons[regionColor]
        }
        const NodesStore = useNodesStore()
        let activeNode = NodesStore.allNodes.find(node => node.id === nodeId);


        const activeRegion = activeNode.regions.findIndex(region => region.buttonType === buttonType)
        if(activeRegion > -1) {
            activeNode.regions[activeRegion].start = start
            activeNode.regions[activeRegion].end = end
        } else {
            activeNode.regions.push({start, end, buttonType, active: true })
        }
        await NodesStore.update(nodeId, {'regions': activeNode.regions})
    }

    const toggleSection = async function(nodeId, buttonType) {
        console.log(nodeId, buttonType)
        const NodesStore = useNodesStore()
        // Check if Node already has regions
        let activeNode = NodesStore.allNodes.find(node => node.id === nodeId);
        const start = (buttonType+1)*10;
        const end = (buttonType+1)*20;
        if(!activeNode.regions) {
            activeNode.regions = [{ start, end, buttonType, active: true}]
        } else {
            // check if this region already exists
            if(activeNode.regions[buttonType]) {
                activeNode.regions[buttonType].active = !activeNode.regions[buttonType].active
            } else {
                activeNode.regions.push({ start, end, buttonType, active: true})
            }

        }
        await NodesStore.update(nodeId, {'regions': activeNode.regions})
    }

    const setPeaks = async function(itemId, peaks) {
        // Save peaks to file
        const ItemsStore = useItemsStore()
        const data = {
            peaks: peaks
        }
        console.log('gonna update', itemId, data)
        const updatedItem = await ItemsStore.update(itemId, data)


    }


    return { login, getProject, draggingFiles, uploadFiles, flowUpdate, connectEdge, removeEdges, removeNode, cloneNode, updateRegionTiming, toggleSection, setPeaks }
})