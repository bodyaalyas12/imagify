import cookies from "next-cookies";
import {NextPageContext} from "next";

function redirectUnauthorizedToLogin(context: NextPageContext) {
	const {token} = cookies(context);
	if (!token) {
		context.res?.writeHead(302, {Location: '/login'});
		context.res?.end();
	}
}

export default redirectUnauthorizedToLogin;
