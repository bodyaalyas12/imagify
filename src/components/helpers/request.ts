import Router from 'next/router';

function request({
									 url,
									 body,
									 ...options
								 }: Omit<RequestInit, "body"> & { url: RequestInfo; body?: Record<string, any> }) {
	return fetch(url, {
		body: JSON.stringify(body),
		headers: {
			'Content-type': 'application/json'
		},
		...options,
		credentials: 'include'
	})
			.then(res => res.json())
			.then(response => {
				if (response.statusCode > 400) {
					const error: Error & { statusCode?: string } = new Error(response.message)
					error.statusCode = response.statusCode
					throw error
				}
				return response
			})
			.catch(err => {
				if (err.statusCode === 401) {
					Router.push('/login');
					return
				}
				throw err
			})
}

export default request;
