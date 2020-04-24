<template>
    <div class="container">
  <div class="list com-form">
    <elForm
				ref="form"
			>
				<!-- 会员名称 -->
				<elFormItem
					label="会员名称"
				>
					<span>{{ form.name }}</span>
				</elFormItem>
        <!-- 会员名称 -->
				<elFormItem
					label="手机号"
				>
					<span>{{ form.telphone }}</span>
				</elFormItem>
				<elFormItem
					label="身份证号"
				>
					<span>{{ form.idNum }}</span>
				</elFormItem>
				<elFormItem
					label="审核状态"
				>
					<span>{{ form.auditType }}</span>
				</elFormItem>
        <elFormItem
					label="相关照片"
          class="img-box"
				>
          <div class="img-item">
            <img :src="$imgURL + form.yingyeImg" alt="" @click="handlePreview(form.yingyeImg)">
                 营业执照
          </div>
          <div class="img-item" @click="handlePreview(form.idcardFront)">
            <img :src="$imgURL + form.idcardFront" alt="">
            身份证人像面
          </div>
          <div class="img-item" @click="handlePreview(form.idcardBack)">
            <img :src="$imgURL + form.idcardBack" alt="">
            身份证国徽面
          </div>
          <div class="img-item" @click="handlePreview(form.idcardHand)">
            <img :src="$imgURL + form.idcardHand" alt="">
            身份证
          </div>
        </elFormItem>
    </elForm>
    <div class="tc-pannel l_page__footer">
			<elRow type="flex" justify="center">
				<!-- 返回 -->
				<elButton
					@click="emitter('list')"
				>
					返回
				</elButton>

				<!-- 不通过 -->
				<elButton
					@click="operation('fail')"
				>
					不通过
				</elButton>

				<!-- 通过 -->
				<elButton
					@click="operation('pass')"
					type="primary"
				>
					通过
				</elButton>
			</elRow>
		</div>
  </div>
  <!-- 图片预览 -->
		<ImagePreviewModal
			ref="imagePreviewModal"
		/>
    </div>
</template>

<script>
import store from "@/vuex/store"
import ImagePreviewModal from '@/components/common/imagePreviewModal'
export default {
  props:{
      propsData: {
          type: Object,
          default() {
              return {}
          }
      }
  },
  components: {ImagePreviewModal},
  data() {
    return {
      form: {}
    }
  },
  activated() {
    this.form = {}
    this.getList()
  },
  methods: {
    emitter(key, data, state={}) {
			this.$emit('view', key, data, state)
    },

    // 审核
    operation(opt) {
      const type = {
        pass: '1',
        fail: '-1'
      }
      const msg = {
        pass: '是否通过审核',
        fail: '是否拒绝审核'
      }
      const url = '/v1/audit'

      this.$confirm(msg[opt], '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
           this.$http.post(url, {
            type: type[opt],
            id: this.form.id
          }).then((res) => {
          if (res.status === 200) {
            this.$message({
              type: 'success',
              message: '操作成功!'
            });
            }
            this.getList()
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消操作'
          });          
        });

    },

    handlePreview(image) {
			this.$refs.imagePreviewModal.show(this.$imgURL + image)
		},

    async getList() {
      const url = `/v1/check?telphone=${this.propsData.telphone}`
      const res = await this.$http.get(url)
      if (res.status === 200) {
          this.form = res.data.auditData
          const wenan = {
						0:'未审核',
						1: '审核成功',
						'-1': '审核失败'/*  */
          }
          this.form.auditType = wenan[this.form.type]
      }
    }
  }
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
.img-item {
  width: 200px;
  text-align: center;
}
.img-box .el-form-item__content {
  display: flex;
  flex-direction: row;
}
.img-item img {
  width: 100%;
  height: 200px;
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