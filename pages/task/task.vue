<template>
	<view class="delivery-task-container">
		<view class="task-card-box">
			<view class="module-title">选择配送任务</view>
			<scroll-view class="scroll-view_H" scroll-x="true" @scroll="scroll" scroll-left="120">
				
				
				<view v-for="(item,index) in deliveryTasks" :key="item.id" class="scroll-view-item_H uni-bg-red">
					
					<scroll-view 
						class="scroll-view_task-step" 
						scroll-y="true"
					>
						<u-steps
							class="task-card"
							:list="item.places"
							direction="column"
							un-active-color="#091b48"
						></u-steps>
					</scroll-view>
					
					<view class="action-btn-box">
						<u-button
							type="primary"
							shape="circle"
							:custom-style="{
								height: '38rpx',
								fontSize: '15rpx'
							}"
						>
							<u-icon 
								name="arrow-rightward" 
								color="#ffffff" 
								size="18"
								label="开始"
								label-pos="left"
								label-color="#ffffff"
								label-size="16"
								margin-right="10"
							></u-icon>
						</u-button>
					</view>
				</view>
			</scroll-view>
		</view>
		<u-divider 
			bg-color="transparent" 
			half-width="280" 
			border-color="#d9d9d9" 
			color="rgba(9,27,72,0.4)" 
			fontSize="24"
			margin-top="24"
			margin-bottom="24"
		>OR</u-divider>
		<view class="task-select-box">
			<view class="module-title">选择目的地</view>
			<scroll-view class="scroll-view_destination" scroll-x="true" @scroll="scroll" scroll-left="120">
				<view v-for="(item,index) in placeTasks" :key="item.id" class="scroll-view-item_destination uni-bg-red">
					<u-button 
						:plain="true"
						type="primary"
						shape="circle"
						:custom-style="{
							height: '38rpx',
							fontSize: '15rpx'
						}"
					>{{ item.place ? item.place.name : '' }}</u-button>
				</view>
			</scroll-view>
		</view>
		
	</view>
</template>

<script>
	import { deliveryTask } from "@/api/delivery-task.js"
	export default {
		data() {
			return {
				stepColor:['#ff6db8','#14cce1','#4678f9','#ff6355'],
				scrollTop: 0,
				old: {
					scrollTop: 0
				},
				stepList:[
					{
						name:'仓库',
						color:'#2e34a1'
					},
					{
						name:'工1',
						color:'#f13a11'
					},
					{
						name:'工2',
						color:'#12ffe2'
					}
				],
				deliveryTasks:[],
				placeTasks:[]
			}
		},
		onLoad() {
			// #ifdef APP-PLUS
			plus.key.addEventListener('keydown',(keyEvent) => {
				uni.showToast({
				    title: keyEvent.keyCode,
				    duration: 2000
				});
			})
			// #endif
			
			this.loadData()
		},
		methods: {
			loadData(){
				deliveryTask({vehicle_id:1}).then((res)=>{
					console.log("-----配送任务-------")
					console.log(res)
					let deliveryTasks = res.data.delivery_tasks;
					deliveryTasks.map((task)=>{
						if(task.places && task.places.length){
							task.places.map((place,index)=>{
								//alert(index%4)
								place['color'] = this.stepColor[index%4]
							})
						}
					})
					this.deliveryTasks = deliveryTasks;
					this.placeTasks = res.data.place_tasks;
				})
			},
			scroll: function(e) {
				console.log(e)
				this.old.scrollTop = e.detail.scrollTop
			},
		}
	}
</script>



<style lang="scss">
	uni-page-body{
		height: 100%!important;
		background-color: #EEEFF4;
	}
	#app{
		height: 100%!important;
		background-color: #EEEFF4;
	}
	page{
		width: 100%;
		height: 100%!important;
		background-color: #EEEFF4;
	}
	
	.delivery-task-container{
		padding: 0 30rpx;
	}
	.u-steps__item--column{
		height: 40rpx!important;
	}
	
	.task-card-box{
		padding-top: 30rpx;
	}
	.module-title{
		font-size: 24rpx;
		color: rgba(9,27,72,0.4);
		letter-spacing: 1.54rpx;
		padding-bottom: 18rpx;
		
	}
	.scroll-view_H {
		white-space: nowrap;
		width: 100%;
	}

	.scroll-view-item_H {
		display: inline-block;
		width: 160upx;
		height: 290rpx;
		font-size: 10rpx;
		background-color: #FFFFFF;
		border:1upx solid #d9d9d9;
		border-radius:6rpx;
		margin-right: 25upx;
	}
	
	.scroll-view-item_H:last-child{
		margin-right: 0;
	}
	
	.action-btn-box{
		width: 100%;
		padding: 20rpx;
	}
	
	.scroll-view_destination {
		white-space: nowrap;
		width: 100%;
	}
	
	.scroll-view-item_destination {
		display: inline-block;
		width: 120upx;
		height: 40rpx;
		margin-right: 38rpx;
	}
	
	.scroll-view-item_destination:last-child{
		margin-right: 0;
	}
	
	.scroll-view_task-step{
		height: 210rpx;
	}
</style>
