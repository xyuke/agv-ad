<template>
	<view class="page-container">
		<view class="ad-video-container">
			
			<video
				class="video-player"
				id="ad-video" 
				src="https://img.cdn.aliyun.dcloud.net.cn/guide/uniapp/%E7%AC%AC1%E8%AE%B2%EF%BC%88uni-app%E4%BA%A7%E5%93%81%E4%BB%8B%E7%BB%8D%EF%BC%89-%20DCloud%E5%AE%98%E6%96%B9%E8%A7%86%E9%A2%91%E6%95%99%E7%A8%8B@20181126-lite.m4v"
			    @error="videoErrorCallback" 
				:autoplay="true"
				loop
				controls
				:show-play-btn="false"
				:show-center-play-btn="true"
				play-btn-position="center"
				object-fit="contain"
			></video>
			
		</view>
		
		<view class="device-control-container">
			
			<view v-for="(item,index) in controlMenu" :key="index" class="control-item" @click="btnClick(item)">
				<luButtonRipple :rippleBackgroundColor="item.rippleColor" :rippleOpacity="item.rippleOpcity" :buttonRippleId="item.id">
					<view class="icon" :class="item.icon"></view>
					<text class="title">{{item.name}}</text>
				</luButtonRipple>
				
			</view>
			
		</view>
	</view>
</template>

<script>
	import luButtonRipple from '@/components/lu-button-ripple/lu-button-ripple.vue';
	export default {
		components: { luButtonRipple },
		data() {
			return {
				videoProps:{
					autoplay: true,
					loop: true,
					controls: true
				},
				controlMenu:[
					{id:1,name:'语义互动',icon:'icon-semantic',rippleColor:'#A5C3FF',rippleOpcity:1},
					{id:2,name:'远程对讲',icon:'icon-remote-talk',rippleColor:'#A5C3FF',rippleOpcity:1},
					{id:3,name:'声光告警',icon:'icon-sound-light-warning',rippleColor:'#A5C3FF',rippleOpcity:1},
					{id:4,name:'灭火喷雾',icon:'icon-extingguishing',rippleColor:'#A5C3FF',rippleOpcity:1},
					{id:5,name:'灯光',icon:'icon-light',rippleColor:'#A5C3FF',rippleOpcity:1},
					{id:6,name:'小车充电',icon:'icon-recharge',rippleColor:'#A5C3FF',rippleOpcity:1},
					{id:7,name:'其他',icon:'icon-others',rippleColor:'#A5C3FF',rippleOpcity:1,route:'/pages/task/task'},
				]
			}
		},
		onLoad() {
			//const subNvue = uni.getSubNVueById("ScrollTitle");
			//subNvue.show()
		},
		methods: {
			videoErrorCallback: function(e) {
				uni.showModal({
					content: e.target.errMsg,
					showCancel: false
				})
			},
			btnClick(item){
				if(item.route){
					uni.navigateTo({
					    url: item.route
					});
				}
			}
		}
	}
</script>

<style lang="scss">
	uni-page-body{
		height: 100%!important;
	}
	#app{
		height: 100%!important;
	}
	page{
		width: 100%;
		height: 100%!important;
	}
	.page-container {
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: space-between;
		width:100%;
		height: 100%;
		.ad-video-container{
			width:564rpx;
			height: 100%;
			overflow: hidden;
			.video-player{
				width:100%;
				height: 100%;
			}
			
		}
		.test-item{
			flex: 1;
			background-color: red;
			height: 100upx;
		}
		.ad-video-container{
			width:564rpx;
			height: 100%;
			background-color: #4CD964;
			#ad-video{
				width:100%;
				height: 100%;
			}
		}
		.device-control-container{
			display: flex;
			flex-direction: column;
			height: 100%;
			.control-item{
				width:158.1rpx;
				flex: 1;
				display: flex;
				flex-direction: row;
				align-items: center;
				
				position: relative;
				&:after{
					position: absolute;
					top: 0;
					left: 0;
					box-sizing: border-box;
					width: 200%;
					height: 200%;
					border-bottom: 1upx solid #d9d9d9;
					border-radius: inherit;
					content: " ";
					transform: scale(.5);
					transform-origin: 0 0;
					pointer-events: none
				}
				&:last-child{
					&::after{
						border: none;
					}
				}
				.icon{
					width: 26.4rpx;
					height: 26.4rpx;
					background-size: 100%;
					background-repeat: no-repeat;
					margin-right: 25.3rpx;
					&.icon-semantic{
						background-image: url(../../static/icon/semantic.svg);
					}
					&.icon-remote-talk{
						background-image: url(../../static/icon/remote-talk.svg);
					}
					&.icon-sound-light-warning{
						background-image: url(../../static/icon/sound-light-warning.svg);
					}
					&.icon-extingguishing{
						background-image: url(../../static/icon/extingguishing.svg);
					}
					&.icon-light{
						background-image: url(../../static/icon/light.svg);
					}
					&.icon-recharge{
						background-image: url(../../static/icon/recharge.svg);
					}
					&.icon-others{
						background-image: url(../../static/icon/others.svg);
					}
					
				}
				.title{
					font-size: 15.4rpx;
					color:#091b48;
					letter-spacing: 0.82rpx;
					text-indent: 0.82rpx;
				}
			}
		}
	}

	.logo {
		height: 200rpx;
		width: 200rpx;
		
		margin-left: auto;
		margin-right: auto;
	
	}

	.text-area {
		display: flex;
		justify-content: center;
	}

	.title {
		font-size: 36rpx;
		color: #8f8f94;
	}
</style>
