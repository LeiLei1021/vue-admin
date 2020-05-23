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
                    <label for="mailbox">邮箱</label>
                    <el-input id="mailbox" v-model="ruleForm.mailbox" autocomplete="off"></el-input>
                </el-form-item>
                <!-- 密码 -->
                <el-form-item prop="password">
                    <label for="password">密码</label>
                    <el-input id="password" type="password" v-model="ruleForm.password" autocomplete="off"></el-input>
                </el-form-item>
                <!-- 重复密码 -->
                <el-form-item prop="passwords" v-show="model === 'register'">
                    <label for="passwords">重复密码</label>
                    <el-input id="passwords" type="password" v-model="ruleForm.passwords" autocomplete="off"></el-input>
                </el-form-item>
                <!-- 验证码 -->
                <el-form-item prop="verification">
                    <label>验证码</label>
                    <el-row :gutter="11">
                        <el-col :span="15">
                                <el-input v-model.number="ruleForm.verification"></el-input>
                        </el-col>
                        <el-col :span="9">
                                <el-button type="success" class="block" @click="getSms()">获取验证码</el-button>
                        </el-col>
                    </el-row>
                </el-form-item>
                <!-- 登录 -->
                <el-form-item>
                    <el-button type="danger" @click="submitForm('ruleForm')" class="login-btn block" :disabled="loginButtonStatus">{{model === 'login' ? '登录' : '注册'}}</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>
<script>
import { GetSms } from '@/api/login.js';
import { reactive, ref, onMounted } from "@vue/composition-api";
import { stripscript, validateEmail, validatePass, validateVCode } from '@/utils/validate.js';
export default{
    name: "login",
    setup(props,{ refs,root }){
        // 邮箱
        let validateMailbox = (rule, value, callback) => {
            if (value === '') {
            callback(new Error('请输入邮箱'));
            } else if(validateEmail(value)){
                callback(new Error('请输入正确的邮箱'));
            }else{

                callback();
            }
        };
        // 密码
        let validatePassword = (rule, value, callback) => {
            ruleForm.password = stripscript(value);
            value = ruleForm.password;
            // stripscript(value);
            if (value === '') {
            callback(new Error('请输入密码'));
            } else if (validatePass(value)) {
                callback(new Error('密码为8-16位数字+字母'));
            } else {
            callback();
            }
        };
        // 重复密码
        let validatePasswords = (rule, value, callback) => {
            if(model.value == 'login'){
                callback();
            }
            if (value === '') {
            callback(new Error('请再次输入密码'));
            } else if (value != ruleForm.password) {
                callback(new Error('重复密码不正确'));
            } else {
            callback();
            }
        };
        // 验证码
        let validateVerification = (rule, value, callback) => {
            if (value === '') {
            callback(new Error('请输入验证码'));
            } else if (validateVCode(value)) {
                callback(new Error('请输入6位有效验证码'));
            } else {
            callback();
            }
        };
        /**
         * 声明数据
         */
        // data数据、生命周期、自定义的函数
        const manuTab = reactive([
                {txt:'登录',current:true,type:'login'},
                {txt:'注册',current:false,type:'register'},
            ])
        // 模块值
        const model = ref('login')
        // 登录按钮禁用状态
        const loginButtonStatus = ref(true)
        // 表单数据
        const ruleForm = reactive({
            mailbox: '',
            password: '',
            passwords: '',
            verification: ''
        })
        // 表单验证
        const rules = reactive({
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
        })
        /*
        * 声明函数
        */
        // 注册登录
        const toggleMenu = (data =>{           
            manuTab.forEach(elem => {
                elem.current = false;
            })
            // 高光
            data.current = true;
            // 修改模块值
            model.value = data.type;
        });
        // 获取验证码
        const getSms = (() => {
            // 进行提示
            if(!ruleForm.mailbox){
                root.$message.error('邮箱不能为空');
                return flase;
            }
            // 请求的接口
            let data = {
                username : ruleForm.mailbox
            }
            GetSms(data).then(response => {

            }).catch(error => {

            })
        })
        // 点击提交
        const submitForm = (formName => {
            refs[formName].validate((valid) => {
            if (valid) {
                alert('submit!');
            } else {
                console.log('error submit!!');
                return false;
            }
            });
        })
        /*
         * 生命周期
         */
        // 挂载完成后
        onMounted(() =>{
            GetSms();
        })
        return{
            manuTab,
            model,
            ruleForm,
            rules,
            toggleMenu,
            submitForm,
            getSms,
            loginButtonStatus
        }
    },
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