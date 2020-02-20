<template>
    <div>
           <div class="container" @click="handleDetail(data.id)">
               <slot name="icon"></slot>
                <img :src="data.images.small" alt="">
                <div class="info">
                    <p class="title">{{data.title}}</p>
                    <p class="author">主演：<span v-for="(item,index) of data.casts" :key="index">{{item.name}} / </span></p>
                    <p class="time">{{data.durations[0]}}</p>
                </div>
           </div>        
    </div>
</template>

<script>
    export default {
        name:"ListItem",
        props:{
            data:{
                type:Object,
                required:true
            }
        },
        methods:{
            handleDetail(id){
                this.$router.push(`/film?id=${id}`)
            }
        }
    }
</script>

<style lang="scss" scoped>
        img{
            width: 150px;
        }
        .container{
            display: flex;
        }
        .title{
            width: 400px;
            font-size: 30px;
        }
        .author{
            width: 500px;
            font-size: 18px;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
        }
        .info{
            margin-left: 20px;
        }
        
        .time{
            font-size: 20px;
        }
        a{
            color: black
        }
</style>