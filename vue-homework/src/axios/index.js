import axios from "axios";

const authItemName = 'acc_token'
const defaultError = (error) => {
    console.error(error)
    console.log('发生了一些错误，请联系管理员')
}
const defaultFailure = (message, status, url) => {
    console.warn(`请求地址: ${url}, 状态码: ${status}, 错误信息: ${message}`)
}
function internalPost(url,data,headers,success,failure,error = defaultError){
    axios.post(url,data,{headers:headers}).then(({data})=>{
        if(data.code === 200){
            success(data.data)
        }else {
            failure(data.message,data.code,url)
        }
    }).catch(err =>{
        error(err)
    })
}
function post(url,data,success,failure = defaultFailure){
    internalPost(url,data,accessHeader(),success,failure)
}
function internalGet(url,headers,success,failure,error = defaultError){
    axios.get(url,{headers:headers}).then(({data})=>{
        if(data.code === 200){
            success(data.data)
        }else {
            failure(data.message,data.code,url)
        }
    }).catch(err =>{
        error(err)
    })
}
function get(url, success, failure = defaultFailure) {
    internalGet(url, accessHeader(), success, failure)
}
function login(username,password,success,failure = defaultFailure){
    internalPost('/api/login',{
        username:username,
        password:password
    },{
        'Content-Type':'application/x-www-form-urlencoded'
    },(data) =>{
        timeAccToken(data.token,data.time)
        console.log('登录成功')
        success(data)
    },failure)
}
//获取token和时效
function timeAccToken(token, time) {
    const accObj = { token:token, expire:time };
    const str = JSON.stringify(accObj);
    localStorage.setItem(authItemName, str);
}
//处理token
const accessHeader = () => {
    const tokenStr = localStorage.getItem(authItemName);
    if (!tokenStr) {
        return {}; // 不传Authorization头部，避免后端返回403
    }

    const tokenObj = JSON.parse(tokenStr);
    return {
        'Authorization': `Bearer ${tokenObj.token}`
    };
};
//获取用户信息
// 获取用户信息的函数
function getUserInfo(success, failure = defaultFailure) {
    const headers = accessHeader();
    if (!headers['Authorization']) {
        failure('未登录', 403, '/api/user/info');
        return;
    }
    get('/api/user/info', (data) => {
        if (data) {
            success(data);
        } else {
            failure('用户信息获取失败', 500, '/api/user/info');
        }
    }, failure);
}
//删除token
function deleteAccessToken() {
    localStorage.removeItem(authItemName);
}
//获取clz
function getClz(success, failure = defaultFailure) {
    const headers = accessHeader();
    if (!headers['Authorization']) {
        failure('未登录', 403, '/api/adm/clz/findAll');
        return;
    }
    get('/api/adm/clz/findAll', (data) => {
        if (data) {
            success(data);
        } else {
            failure('班级信息获取失败', 500, '/api/adm/clz/findAll');
        }
    }, failure);
}
//获取Course
function getCourse(success, failure = defaultFailure) {
    const headers = accessHeader();
    if (!headers['Authorization']) {
        failure('未登录', 403, '/api/adm/clz/findAll');
        return;
    }
    get('/api/adm/course/findAll', (data) => {
        if (data) {
            success(data);
        } else {
            failure('班级信息获取失败', 500, '/api/adm/clz/findAll');
        }
    }, failure);
}
//获取Tea
//获取Tea
function getTea(success, failure = defaultFailure) {
    const headers = accessHeader();
    if (!headers['Authorization']) {
        failure('未登录', 403, '/api/adm/tea/findAll');
        return;
    }
    get('/api/adm/tea/findAll', (data) => {
        if (data) {
            success(data);
        } else {
            failure('教师信息获取失败', 500, '/api/adm/tea/findAll');
        }
    }, failure);
}
//获取stu
function getStu(success, failure = defaultFailure) {
    const headers = accessHeader();
    if (!headers['Authorization']) {
        failure('未登录', 403, '/api/adm/stu/findAll');
        return;
    }
    get('/api/adm/stu/findAll', (data) => {
        if (data) {
            success(data);
        } else {
            failure('学生信息获取失败', 500, '/api/adm/stu/findAll');
        }
    }, failure);
}
//获取task
// 获取任务（task）
function getTask(success, failure = defaultFailure) {
    const headers = accessHeader();
    if (!headers['Authorization']) {
        failure('未登录', 403, '/api/adm/task/findAll');
        return;
    }
    get('/api/adm/task/findAll', (data) => {
        if (data) {
            success(data);
        } else {
            failure('任务信息获取失败', 500, '/api/adm/task/findAll');
        }
    }, failure);
}
export { login, getUserInfo, deleteAccessToken, getClz, getCourse, getTea, getStu, getTask }