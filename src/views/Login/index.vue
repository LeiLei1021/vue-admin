<template>
    <div id="login">
        <!-- 内容区 -->
        <div class="login-wrap">
            <ul class="menu-tab">
                <li v-for="item in manuTab" :key="item.id" :class="{'current': item.current}" @click="toggleMenu(item)">{{item.txt}}</li>
            </ul>
            <!-- 表单start -->
            <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm"  class="login-form" size="medium">
                <!-- 邮箱 -->
                <el-form-item prop="mailbox">
                    <label>邮箱</label>
                    <el-input v-model="ruleForm.mailbox" autocomplete="off"></el-input>
                </el-form-item>
                <!-- 密码 -->
                <el-form-item prop="password">
                    <label>密码</label>
                    <el-input type="password" v-model="ruleForm.password" autocomplete="off"></el-input>
                </el-form-item>
                <!-- 重复密码 -->
                <el-form-item prop="passwords" v-show="model === 'register'">
                    <label>重复密码</label>
                    <el-input type="password" v-model="ruleForm.passwords" autocomplete="off"></el-input>
                </el-form-item>
                <!-- 验证码 -->
                <el-form-item prop="verification">
                    <label>验证码</label>
                    <el-row :gutter="11">
                        <el-col :span="15">
                                <el-input v-model.number="ruleForm.verification"></el-input>
                        </el-col>
                        <el-col :span="9">
                                <el-button type="success" class="block">获取验证码</el-button>
                        </el-col>
                    </el-row>
                    
                </el-form-item>
                <el-form-item>
                    <el-button type="danger" @click="submitForm('ruleForm')" class="login-btn block">提交</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>
<script>
import { stripscript } from '@/utils/validate.js';
export default{
    name: "login",
    data(){
        // 验证邮箱
        var validateMailbox = (rule, value, callback) => {
            let reg = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/;
            if (value === '') {
            callback(new Error('请输入邮箱'));
            } else if(!reg.test(value)){
                callback(new Error('请输入正确的邮箱'));
            }else{

                callback();
            }
        };
        // 密码
        var validatePassword = (rule, value, callback) => {
            this.ruleForm.password = stripscript(value);
            value = this.ruleForm.password;
            // stripscript(value);

            let reg =  /^(?!\D+$)(?![^a-zA-Z]+$)\S{6,20}$/;
            if (value === '') {
            callback(new Error('请输入密码'));
            } else if (!reg.test(value)) {
                callback(new Error('密码为8-16位数字+字母'));
            } else {
            callback();
            }
        };
        // 重复密码
        var validatePasswords = (rule, value, callback) => {
            if(this.model == 'login'){
                callback();
            }
            if (value === '') {
            callback(new Error('请再次输入密码'));
            } else if (value != this.ruleForm.password) {
                callback(new Error('重复密码不正确'));
            } else {
            callback();
            }
        };
        // 验证码
        var validateVerification = (rule, value, callback) => {
            let reg =  /^[0-9]{6}$/;
            if (value === '') {
            callback(new Error('请输入验证码'));
            } else if (!reg.test(value)) {
                callback(new Error('请输入6位有效验证码'));
            } else {
            callback();
            }
        };
        return{
            manuTab:[
                {txt:'登录',current:true,type:'login'},
                {txt:'注册',current:false,type:'register'},
            ],
            // 模块值
            model: 'login',
            // 表单数据
            ruleForm: {
            mailbox: '',
            password: '',
            passwords: '',
            verification: ''
            },
            rules: {
            mailbox: [
                { validator: validateMailbox, trigger: 'blur' }
            ],
            password: [
                { validator: validatePassword, trigger: 'blur' }
            ],
            passwords: [
                { validator: validatePasswords, trigger: 'blur' }
            ],
            verification: [
                { validator: validateVerification, trigger: 'blur' }
            ]
            }
        };
    },
    created(){

    },
    mounted(){

    },
    methods:{
        // 数据驱动视图
        toggleMenu(data){           
            this.manuTab.forEach(elem => {
                elem.current = false;
            })
            // 高光
            data.current = true;
            // 修改模块值
            this.model = data.type;
        },
        submitForm(formName) {
            this.$refs[formName].validate((valid) => {
            if (valid) {
                alert('submit!');
            } else {
                console.log('error submit!!');
                return false;
            }
            });
        },

    }
};
</script>
<style lang="scss" scoped>
#login{
    height: 100vh;
    background-color: #344a5f;
}
.login-wrap{
    width: 330px;
    margin:auto;
}
.menu-tab{
    text-align: center;
    li{
        display: inline-block;
        width: 88px;
        line-height: 36px;
        font-size: 14px;
        color:#fff;
        border-radius: 5px;
        cursor: pointer;
    }
    .current{
        background-color: rgba(0,0,0,.1);
    }
}
.login-form{
    margin-top: 9px;
    label{
        display: block;
        margin-bottom: 5px;
        font-size: 14px;
        color: #fff;
    }
    .block{
        width: 100%;
        display:block;
    }
    .login-btn{
        margin-top: 9px;
    }
}
</style>