export default function (ctx) {
  const { role } = ctx.$auth.user;

  if (role === 'student') {
    ctx.redirect('/lk')
  }
}