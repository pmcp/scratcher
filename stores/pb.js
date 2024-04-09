
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

    const create = async function(collection, data){
        return await $pb.collection(collection).create(data);

    }

    const update = async function(collection, item, data){
        // TODO: Make this universal and permeated
        await $pb.collection('users').authWithPassword('hi@maartenlauwaert.eu', 'pmcppaulmcparty');
        return await $pb.collection(collection).update(item, data);
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
        // TODO: get this out of here
        await $pb.collection('users').authWithPassword('hi@maartenlauwaert.eu', 'pmcppaulmcparty');

        console.log('pb Store', 'getItem', 'params:', {collection}, {id}, {expand})
        return await $pb.collection(collection).getOne(id, {
            expand: expand,
        });

    }

    const uploadFiles = async function(file){
        // TODO: Make this universal and permeated
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

    const subscribeSingle = async function(collection, record) {
        console.log('subscribing', collection, record);
        const projectsStore = useProjectsStore()
        $pb.collection(collection).subscribe(record, function (e) {
            console.log('subscription', e.record);
            if(collection === 'projects') {
                projectsStore.setProject(e.record)
                // TODO: On subscribing, there is no 'expand' yet, update when available
                // Easiest way to fix this: run getting project again
                // TODO: Should be heavily optimized
                const flowStore = useFlowStore()
                flowStore.getProject(`/${record}`, true)
            }

        });

    }

    const unsubscribeSingle = async function(collection, record) {
        $pb.collection(collection).unsubscribe(record);
    }

    const deleteSingle = async function(collection, record) {
        $pb.collection(collection).delete(record);
    }


    return { doAuth, getCollection, uploadFiles, create, getItem, getFileUrl, update, subscribeSingle, unsubscribeSingle, deleteSingle }
})