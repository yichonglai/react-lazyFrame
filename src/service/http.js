import axios from 'axios';
import qs from 'qs';
import history from 'router/history';

axios.interceptors.request.use(config => config, error => Promise.reject(error));

axios.interceptors.response.use(response => response, error => Promise.resolve(error.response));

const FN = {
    checkStatus(response) {
        // 这里可以和后台配合确定status值
        if (response && (response.status === 200 || response.status === 403 || response.status === 416)) {
            return response;
        }
        // 错误/异常 扶正
        return {
            data: {
                code: -404,
                msg: response.statusText,
                data: response.statusText,
            },
        };
    },
    checkCode(res, opt) {
        const code = res.data.code;
        if (code !== 200) {
            if (code === -404) {
                alert(res.data.msg);
            } else if (code === 403) {
                // 未登录 接口守卫
                alert(res.data.msg);
                setTimeout(() => {
                    history.push(`/login?redirect_uri=${encodeURIComponent(`${history.location.pathname}${history.location.search}`)}`);
                }, 500);
            } else if (!opt || !opt.noError) {
                alert(res.data.msg);
            }
        }
        return res.data;
    },
};

export default {
    post(url, data, config, opt) {
        config = config || {};
        return axios({
            method: 'post',
            url,
            data: qs.stringify(data),
            timeout: 10000,
            headers: {
                'X-Requested-With': 'XMLHttpRequest',
                'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
            },
            ...config,
        })
            .then(response => FN.checkStatus(response))
            .then(res => FN.checkCode(res, opt));
    },
    get(url, params, config, opt) {
        config = config || {};
        return axios({
            method: 'get',
            url,
            params,
            timeout: 10000,
            headers: {
                'X-Requested-With': 'XMLHttpRequest',
            },
            ...config,
        })
            .then(response => FN.checkStatus(response))
            .then(res => FN.checkCode(res, opt));
    },
    delete(url, params, config, opt) {
        config = config || {};
        return axios({
            method: 'delete',
            url,
            params,
            timeout: 10000,
            headers: {
                'X-Requested-With': 'XMLHttpRequest',
            },
            ...config,
        })
            .then(response => FN.checkStatus(response))
            .then(res => FN.checkCode(res, opt));
    },
    put(url, data, config, opt) {
        config = config || {};
        return axios({
            method: 'put',
            url,
            data: qs.stringify(data),
            timeout: 10000,
            headers: {
                'X-Requested-With': 'XMLHttpRequest',
                'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
            },
            ...config,
        })
            .then(response => FN.checkStatus(response))
            .then(res => FN.checkCode(res, opt));
    },
    patch(url, data, config, opt) {
        config = config || {};
        return axios({
            method: 'patch',
            url,
            data: qs.stringify(data),
            timeout: 10000,
            headers: {
                'X-Requested-With': 'XMLHttpRequest',
                'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
            },
            ...config,
        })
            .then(response => FN.checkStatus(response))
            .then(res => FN.checkCode(res, opt));
    },
    all(reqs) {
        return axios.all(reqs)
            .then(res => res);
    },
};

