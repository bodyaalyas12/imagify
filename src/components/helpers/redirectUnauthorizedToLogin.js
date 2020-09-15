import cookies from "next-cookies";

function redirectUnauthorizedToLogin(context) {
  const {token} = cookies(context);
  if (!token) {
    context.res.writeHead(302, {Location: '/login'});
    context.res.end();
  }
}

export default redirectUnauthorizedToLogin;
