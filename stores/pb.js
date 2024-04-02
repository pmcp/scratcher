
export const usePbStore = defineStore('Pb', () => {
    // SHOULD GO TO SERVER

    const all = ref([])
    const { $pb } = useNuxtApp();
    const doAuth = async function(name, pass){
        return await $pb.collection('users').authWithPassword(name, pass);

        // console.log($pb.authStore.isValid);
        // console.log($pb.authStore.token);
        // console.log($pb.authStore.model.id);

    }

    const create = async function(name, data){
        return await $pb.collection(name).create(data);

    }

    const getCollection = async function(name){
        const all = await $pb.collection(name).getList()
        if(all.totalPages > 1) {
            // Implement logic for multiple pages
        } else {
            return all.items
        }
    }

    const getFileUrl = async function(id, filename, formats) {
        return $pb.files.getUrl(id, filename, formats);
    }
    const getItem = async function(collection, id, expand){
        return await $pb.collection(collection).getOne(id, {
            expand: expand,
        });
    }

    const uploadFiles = async function(file){
        await $pb.collection('users').authWithPassword('hi@maartenlauwaert.eu', 'pmcppaulmcparty');

        console.log($pb.authStore.isValid);
        console.log($pb.authStore.token);
        console.log($pb.authStore.model.id);

        const formData = new FormData();
        formData.append('src', file);
        console.log(file, formData)
        const createdItems = await $pb.collection('items').create(formData);
        console.log({createdItems})
        return createdItems.id
    }


    return { doAuth, getCollection, uploadFiles, create, getItem, getFileUrl }
})