import {getResultError, getResultSuccess} from './mock_response';

const LoginUsers = [
    {
        id: 1
        ,userId: 1
        ,username: 'admin'
        ,password: 'e10adc3949ba59abbe56e057f20f883e'
        ,avatar: ''
        ,name: 'mockjs'
        ,token: 'xx'
    }
];

export default {
    bootstrap: function (mock) {
        mock.onGet('/success').reply(200, getResultSuccess(null, 'success'));
        mock.onGet('/error').reply(500, getResultError(null, 'failure'));

        mock.onPost('/sys/login').reply(config => {
            let {userName, userPwd} = JSON.parse(config.data);
            return new Promise((resolve) => {
                let user = null;
                setTimeout(() => {
                        let hasUser = LoginUsers.some(u => {
                            if (u.username === userName && u.password === userPwd) {
                                user = JSON.parse(JSON.stringify(u));
                                user.password = undefined;
                                return true;
                            }
                        });

                        if (hasUser) {
                            resolve([200, getResultSuccess(user, '请求成功')]);
                        } else {
                            resolve([200, getResultError('账号或密码错误')]);
                        }
                    },
                    1000);
            });
        });

        mock.onPost('/sys/logout').reply(() => {
            return new Promise((resolve) => {
                resolve([200, getResultSuccess(null, '请求成功')]);
            })
        });
    }
};