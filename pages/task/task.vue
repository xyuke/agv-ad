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
								height: '28.5rpx',
								fontSize: '11rpx'
							}"
							@click="selectTask(item)"
						>
							<u-icon 
								name="arrow-rightward" 
								color="#ffffff" 
								size="11"
								label="开始"
								label-pos="left"
								label-color="#ffffff"
								label-size="11"
								margin-right="10"
							></u-icon>
						</u-button>
					</view>
				</view>
			</scroll-view>
		</view>
		
		<u-divider 
			class="delivery-task-divider"
			bg-color="transparent" 
			half-width="280" 
			border-color="#d9d9d9" 
			color="rgba(9,27,72,0.4)" 
			fontSize="13"
			margin-top="15.5"
			margin-bottom="15.5"
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
							height: '28.5rpx',
							fontSize: '11rpx'
						}"
						@click="selectTask(item)"
					>{{ item.place ? item.place.name : '' }}</u-button>
				</view>
			</scroll-view>
		</view>
		
		<u-toast ref="uToast"></u-toast>
		<u-top-tips ref="uTips"></u-top-tips>
		<keyboard-listener @keydown="onKeydown"></keyboard-listener>
		
		<!-- 选择任务模态框 -->
		<u-modal 
			v-model="taskSelectVisible"
			title="提示"
			content="是否开始所选任务？"
			width="50%"
			:title-style="{
				fontSize:'15rpx',
				paddingTop:'20rpx'
			}"
			:content-style="{
				fontSize:'15rpx',
				paddingTop:'20rpx',
				paddingBottom:'20rpx'
			}"
			:cancel-style="{
				fontSize:'14rpx',
				height:'45rpx',
				lineHeight:'45rpx'
			}"
			:confirm-style="{
				fontSize:'14rpx',
				height:'45rpx',
				lineHeight:'45rpx'
			}"
			:show-cancel-button="true"
			@confirm="startTaskConfirm"
			@cance="startTaskCancel"
			
		></u-modal>
	</view>
</template>

<script>
	import { deliveryTask, startTask, taskStepFinished } from "@/api/delivery-task.js"
	import keyboardListener from "@/components/keyboard-listener/keyboard-listener.vue"
	export default {
		components: {
			keyboardListener
		},
		data() {
			return {
				statusBarHeight: uni.getSystemInfoSync().statusBarHeight,
				navbarHeight:44,
				taskSelectVisible: false,
				stepColor:['#ff6db8','#14cce1','#4678f9','#ff6355'],
				scrollTop: 0,
				currentTask: null,
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
				placeTasks:[],
				sysInfo: null
			}
		},
		onLoad() {
			
			
			this.loadData()
		},
		
		onReady() {
			let _this = this;
			uni.getSystemInfo({
				success:(res)=>{
					_this.sysInfo = res
				}
			})
			
			
			/**
			const { windowWidth } = uni.getSystemInfoSync();
			this.$refs.uToast.show({
				title: `width: ${windowWidth}`,
				type:'success'
			})
			**/
		},
		methods: {
			//键盘事件
			onKeydown(keyEvent){
				this.$refs.uToast.show({
					title: keyEvent.keyCode,
					type:'success'
				})
				
				let keyCode = keyEvent.keyCode;
				
				if(keyCode === 49){
					taskStepFinished({vehicle_id:2}).then((res)=>{
						console.log("------点击继续的返回信息-----")
						console.log(res)
					}).catch((err) => {
						console.log("----错误------")
						console.log(err)
						this.$refs.uTips.show({
							title: err.data.description,
							type: 'error',
							duration:'2500'
						})
					})
				}
				
			},
			//获取任务数据
			loadData(){
				deliveryTask({vehicle_id:2}).then((res)=>{
					console.log("-----配送任务-------")
					console.log(res)
					let deliveryTasks = res.data.data.delivery_tasks;
					deliveryTasks.map((task)=>{
						if(task.places && task.places.length){
							task.places.map((place,index)=>{
								//alert(index%4)
								place['color'] = this.stepColor[index%4]
							})
						}
					})
					this.deliveryTasks = deliveryTasks;
					this.placeTasks = res.data.data.place_tasks;
				})
			},
			//选择任务
			selectTask(task){
				this.currentTask = task;
				this.taskSelectVisible = true;
			},
			startTaskConfirm(){
				if(this.currentTask){
					startTask({task_id: this.currentTask.id}).then((res) => {
						console.log("-----开始任务返回信息-----")
						console.log(res)
						this.taskSelectVisible = false
					}).catch((err) => {
						console.log("----错误222------")
						console.log(err)
						this.$refs.uTips.show({
							title: err.data.description,
							type: 'error',
							duration:'2500'
						})
					})
				}else{
					this.taskSelectVisible = false
				}
				
			},
			startTaskCancel(){
				this.currentTask = null;
				this.taskSelectVisible = false
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
		padding: 0 22rpx;
		height: 100%;
	}
	.u-steps__item--column{
		height: 22rpx!important;
	}
	
	.task-card-box{
		padding-top: 22rpx;
	}
	

	
	.module-title{
		font-size: 17.6rpx;
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
		width: 110rpx;
		height: 228rpx;
		font-size: 10rpx;
		background-color: #FFFFFF;
		border:1upx solid #d9d9d9;
		border-radius:6rpx;
		margin-right: 16.5rpx;
	}
	
	.scroll-view-item_H:last-child{
		margin-right: 0;
	}
	
	.action-btn-box{
		width: 100%;
		padding: 9rpx;
	}
	
	.scroll-view_destination {
		white-space: nowrap;
		width: 100%;
	}
	
	.scroll-view-item_destination {
		display: inline-block;
		width: 82rpx;
		height: 29rpx;
		margin-right: 27.5rpx;
		vertical-align: top;
	}
	
	.scroll-view-item_destination:last-child{
		margin-right: 0;
	}
	
	.scroll-view_task-step{
		height: 181rpx;
	}
</style>
