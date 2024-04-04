
export const useUiStore = defineStore('ui', () => {
    const draggingFiles = ref(false)
    const setDraggingFiles = function(val){
        console.log({
            store: 'ui',
            var: 'setDraggingFiles',
            param: val
        })
        draggingFiles.value = val
    }
    return { draggingFiles, setDraggingFiles }
})