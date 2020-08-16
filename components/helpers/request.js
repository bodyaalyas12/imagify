import Router from 'next/router';

function request({url, body, ...options}) {
    return fetch(url, {
        body: JSON.stringify(body),
        headers: {
            'Content-type': 'application/json'
        },
        ...options,
        credentials: 'include'
    })
        .then(response => {
            if (!response.ok || response.status > 400) {
                const error = new Error(response.statusText)
                error.statusCode = response.status
                throw error
            }
            return response.json()
        })
        .catch(err => {
            if (err.statusCode === 401) {
                Router.push('/login');
            }

            throw err;
        })
}

export default request;
