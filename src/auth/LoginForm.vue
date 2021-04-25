<template>
    <div>
        <div>
            <p>uname:</p>
            <p>
                <el-input v-model="uname" placeholder="" size="normal" clearable ></el-input>
            </p>
            <p>password:</p>
            <p>
                <el-input v-model="password" placeholder="" size="normal" clearable ></el-input>
            </p>
        </div>
        <div>
            <login-button :form='{uname,password}'></login-button>
        </div>
    </div>
</template>

<script>
// import { Button, Input } from 'element-ui'
// import Button from 'element-ui/lib/button'
import Input from 'element-ui/lib/input'
import LoginButton from './LoginButton'
export default {
    name:"LoginForm",
    components:{
        LoginButton:LoginButton,
        [Input.name]: Input
    },
    data(){
        return{
            uname:"",
            password:""
        }
    },
    methods:{
        
    },
    mounted(){
    }
}
</script>

<style>

</style>