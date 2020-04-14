<template>
    <div class="container">
  <div class="list com-form">
      SSAD 
  </div>
    </div>
</template>

<script>
import store from "@/vuex/store"
export default {
  props:{
      propsData: {
          type: Object,
          default() {
              return {}
          }
      }
  },
  data() {
    return {
      form: {}
    }
  },
  methods: {
    emitter(key, data, state={}) {
			this.$emit('view', key, data, state)
    },

    async getList() {
      const url = `/v1/check?telphone=${this.propsData.telphone}`
      const res = await this.$http.get(url)
      console.log(res)
      if (res.status === 200) {
          this.form = res.data.auditData
          console.log(this.form)
      }
    }
  },
  created: async function () {
    this.getList();
  },
}

</script>
<style>

   .container {
    height: 100%;
    width: 100%;
    overflow-y: auto;
    box-sizing: border-box;
    padding: 30px;

    background-color: #f5f5f5;
}

.com-form {
    background-color: #fff;
    padding: 20px;
    border-radius: 10px;
    margin-top: 10px;
}

.func-btn {
    margin-top: 10px;
}
</style>