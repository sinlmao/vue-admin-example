const target = process.env.VUE_APP_FLAG;

let envParams = {
};

let initEnvParam = {
     ENV_TITLE: "unknown"
    ,API_ROOT: ""
    ,TEST_USERNAME: ""
    ,TEST_PASSWORD: ""
    ,TEST_CAPRCHA: ""
    ,DEMO_MENU: false
    ,MOCK_LOGIN: false
    ,MOCK_DEMO_USER: false
};

if (target == 'dev') {
    //开发
    envParams = {
        ENV_TITLE: "dev"
        ,API_ROOT: ""
    }
} else if (target == 'test') {
    //测试
    envParams = {
        ENV_TITLE: "dev"
        ,API_ROOT: ""
    }
} else if (target == 'prod') {
    //线上
    envParams = {
        ENV_TITLE: "prod"
        ,API_ROOT: ""
        ,TEST_USERNAME: ""
        ,TEST_PASSWORD: ""
        ,TEST_CAPRCHA: ""
    }
} else   if (target == 'debug') {
    //本地
    envParams = {
        ENV_TITLE: "debug"
        ,API_ROOT: ""
        ,TEST_USERNAME: "admin"
        ,TEST_PASSWORD: "123456"
        ,TEST_CAPRCHA: "666666"
        ,DEMO_MENU: true
        ,MOCK_LOGIN: true
        ,MOCK_DEMO_USER: true
    };
} else if (target == 'mock') {
    //mock
        envParams = {
            ENV_TITLE: "mock"
            ,API_ROOT: ""
            ,TEST_USERNAME: "admin"
            ,TEST_PASSWORD: "123456"
            ,TEST_CAPRCHA: "666666"
            ,DEMO_MENU: true
            ,MOCK_LOGIN: true
            ,MOCK_DEMO_USER: true
        }
}

export const GlobalEnvParams = Object.assign(initEnvParam, envParams);