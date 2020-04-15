<!-- 预览图片 -->
<template>
	<viewer
		:images="imgUrl"
		ref="viewer"
	>
		<img
			class="preview-image_hidden"
			v-for="src in imgUrl"
			:key="src"
			:src="src"
		>
	</viewer>
</template>

<script>
  import 'viewerjs/dist/viewer.css'
  import Viewer from 'v-viewer'
	import Vue from 'vue'
	Vue.use(Viewer)

	export default {
		name: 'image-preview-modal',

		data() {
			return {
				visible: false,
				imgUrl: [
					'https://www.baidu.com/img/dong_1388792da98c99c5b52f9e39557c31ca.gif'
				]
			}
		},

		methods: {
			show(imgData) {
				// 如果传入的是纯字符串
				if (typeof imgData === 'string') {
					this.imgUrl = [
						imgData
					]
				} else {
					this.imgUrl = [
						...imgData
					]
				}
				this.$nextTick(() => {
					this.$refs.viewer.$viewer.show()
				})
			}
		}
	}
</script>

<style scoped>
	.preview-image_hidden {
		display: none;
		opacity: 0;
	}
</style>
