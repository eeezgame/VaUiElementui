<template>
    <el-button type="primary" size="default" @click="login">登录</el-button>
</template>

<script>
import Button from 'element-ui/lib/button'

export default {
    name:"LoginForm",
    props:['form'],
    components:{
        [Button.name]: Button
    },
    methods:{
        login(){
            console.log('form:', this.form,);
        }
    }
}
</script>

<style>

</style>