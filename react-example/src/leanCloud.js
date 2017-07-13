import AV from 'leancloud-storage';

var APP_ID = 'nxNcCXbCzcmwFjcRL7ikY8Hl-gzGzoHsz';
var APP_KEY = 'PiYkY2PmQDyaC9bTqdSp0Sil';

AV.init({
    appId: APP_ID,
    appKey: APP_KEY
});

export default AV;

export function signUp(username, password, successFn, errorFn) {
    // 新建 AVUser 对象实例
    var user = new AV.User()
    // 设置用户名
    user.setUsername(username)
    // 设置密码
    user.setPassword(password)
    // 设置邮箱
    user.signUp().then(function(loginedUser) {
        let user = getUserFromAVUser(loginedUser)
        successFn.call(null, user)
    }, function(error) {
        errorFn.call(null, error)
    })

    return undefined

}

function getUserFromAVUser(AVUser) {
    return {
        id: AVUser.id,
        ...AVUser.attributes
    }
}