import store from '@/vuex/store'
import leftNav from "@/components/common/LeftNav"
export default {
    components:{
        leftNav
    },
    created() {
            store.state.token = localStorage.getItem("adminIdToken")
            store.state.uid = localStorage.getItem("adminId")
    },
}