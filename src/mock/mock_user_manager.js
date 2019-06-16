import {Users} from './data/user';
import {getResultSuccess} from './mock_response';
import Mock from "mockjs";

export default {
    bootstrap(mock) {
        let _Users = Users;

        //获取用户列表
        mock.onGet('/user/list').reply(config => {
            let {name} = config.params;
            let mockUsers = _Users.filter(user => {
                if (name && user.name.indexOf(name) == -1) return false;
                return true;
            });
            return new Promise((resolve) => {
                setTimeout(() => {
                    resolve([200, getResultSuccess({ users: mockUsers}, "")]);
                }, 1000);
            });
        });

        //获取用户列表（分页）
        mock.onGet('/user/listpage').reply(config => {
            let {page, name, pageSize} = config.params;
            let mockUsers = _Users.filter(user => {
                if (name && user.name.indexOf(name) == -1) return false;
                return true;
            });
            let total = mockUsers.length;
            mockUsers = mockUsers.filter((u, index) => index < pageSize * page && index >= pageSize * (page - 1));
            return new Promise((resolve) => {
                setTimeout(() => {
                    resolve([200, getResultSuccess({
                        total: total,
                        users: mockUsers
                    })]);
                }, 1000);
            });
        });

        //删除用户
        mock.onPost('/user/delete').reply(config => {
            let { id } = JSON.parse(config.data);
            _Users = _Users.filter(u => u.id !== id);
            return new Promise((resolve) => {
                setTimeout(() => {
                    resolve([200, getResultSuccess(null,"删除成功")]);
                }, 500);
            });
        });

        //批量删除用户
        mock.onPost('/user/batchdelete').reply(config => {
            let { ids } = JSON.parse(config.data);
            ids = ids.split(',');
            _Users = _Users.filter(u => !ids.includes(u.id));
            return new Promise((resolve) => {
                setTimeout(() => {
                    resolve([200, getResultSuccess(null,"删除成功")]);
                }, 500);
            });
        });

        //编辑用户
        mock.onPost('/user/edit').reply(config => {
            let { id, name, addr, age, birth, sex } = JSON.parse(config.data);
            _Users.some(u => {
                if (u.id === id) {
                    u.name = name;
                    u.addr = addr;
                    u.age = age;
                    u.birth = birth;
                    u.sex = sex;
                    return true;
                }
            });
            return new Promise((resolve) => {
                setTimeout(() => {
                    resolve([200, getResultSuccess(null,"编辑成功")]);
                }, 500);
            });
        });

        //新增用户
        mock.onPost('/user/add').reply(config => {
            let { name, addr, age, birth, sex } = JSON.parse(config.data);
            _Users.push({
                id: Mock.Random.guid(),
                name: name,
                addr: addr,
                age: age,
                birth: birth,
                sex: sex
            });
            return new Promise((resolve) => {
                setTimeout(() => {
                    resolve([200, getResultSuccess(null,"新增成功")]);
                }, 500);
            });
        });
    }
}