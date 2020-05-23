/**
 * 过滤特殊字符
 */
export function stripscript(str){
    var pattern = new RegExp("[`~!@#$^&*()=|{ }':;',\\[\\].<>/?~！@#￥……&*（）&;——|{}【】‘；：”“’。，、？]")
    var rs = "";
    for (var i = 0; i < str.length; i++){
        rs = rs + str.substr(i,1).replace(pattern,'');
    }
    return rs;
}

/**
 * 验证邮箱
 */
export function validateEmail(value){
    var reg = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/;
    return !reg.test(value) ? true : false;
}

/**
 * 验证密码 6 至20 位的字母和数字
 */
export function validatePass(value){
    let reg =  /^(?!\D+$)(?![^a-zA-Z]+$)\S{6,20}$/;
    return !reg.test(value) ? true : false;
}
/**
 * 验证验证码
 */
export function validateVCode(value){
    let reg =  /^[0-9]{6}$/;
    return !reg.test(value) ? true : false;
}