export const useUserStore = defineStore('user', () => {
    const user = ref({})

    const setUser = async function(user){
        console.log('got user', user)
        this.$patch({
            user: {
                name: user.record.name,
                username: user.record.username,
                id: user.record.id,
                created: user.record.created,
                updated: user.record.updated,
                email: user.record.email
            }
        })
    }

    return { user, setUser }
})