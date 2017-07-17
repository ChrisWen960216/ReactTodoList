import AV from 'leancloud-storage';

var APP_ID = 'nxNcCXbCzcmwFjcRL7ikY8Hl-gzGzoHsz';
var APP_KEY = 'PiYkY2PmQDyaC9bTqdSp0Sil';

AV.init({
    appId: APP_ID,
    appKey: APP_KEY
});

export default AV;

export function signUp(email, username, password, successFn, errorFn) {
    // 新建 AVUser 对象实例
    var user = new AV.User()
    // 设置用户名
    user.setUsername(username)
    // 设置密码
    user.setPassword(password)
    // 设置邮箱
    user.setEmail(email)
    user.signUp().then(function(loginedUser) {
        let user = getUserFromAVUser(loginedUser)
        successFn.call(null, user)
    }, function(error) {
        errorFn.call(null, error)
    })
    return undefined
}

export function signIn(username, password, successFn, errorFn) {
    AV.User.logIn(username, password).then(function(loginedUser) {
        let user = getUserFromAVUser(loginedUser)
        successFn.call(null, user)
    }, function(error) {
        errorFn.call(null, error)
    })
}

export function sendPasswordResetEmail(email, successFn, errorFn) {
    AV.User.requestPasswordReset(email).then(function(success) {
        successFn.call()
    }, function(error) {
        alert(error)
    })
}

function getUserFromAVUser(AVUser) {
    return {
        id: AVUser.id,
        ...AVUser.attributes
    }
}

export function getCurrentUser() {
    let user = AV.User.current()
    if (user) {
        return getUserFromAVUser(user)
    } else {
        return null
    }
}

export function signOut() {
    AV.User.logOut();
    return undefined;
}

export const TodoModel = {
    getByUser(user, successFn, errorFn) {
        let query = new AV.Query('Todo');
        query.find().then((response) => {
            let array = response.map((t) => {
                return {
                    id: t.id,
                    ...t.attributes
                }
            })
            successFn.call(null, array)
        }, (error) => {
            errorFn && errorFn.call(null, error)
        })
    },

    create({completed, text, deleted} ,successFn, errorFn) {
        let Todo = AV.Object.extend('Todo')
        let todo = new Todo()
        todo.set('text', text)
        todo.set('completed', completed)
        todo.set('deleted', deleted)

        let acl = new AV.ACL();
        acl.setPublicReadAccess(false);
        acl.setReadAccess(AV.User.current(), true)
        acl.setWriteAccess(AV.User.current(), true)
        todo.setACL(acl);

        todo.save().then(function(response) {
            successFn.call(null, response.id)
        }, function(error) {
            errorFn && errorFn.call(null, error)
        });
    },

    update({id, text, completed, deleted, successFn, errorFn}) {
        let todo = AV.Object.createWithoutData('Todo', id)
        text !== undefined && todo.set('text', text)
        completed !== undefined && todo.set('completed', completed)
        deleted !== undefined && todo.set('deleted', deleted)
        todo.save().then((response) => {
            successFn && successFn.call(null)
        }, (error) => errorFn && errorFn.call(null, error))
    },

    destory({todoId, successFn, errorFn}) {
        let todo = AV.Object.createWithoutData('Todo', todoId);
        todo.destory().then(function(response) {
            successFn && successFn.call(null)
        }, function(error) {
            errorFn && errorFn.call(null, error)
        })
    }
}