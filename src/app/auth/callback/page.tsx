import { onAuthenticateUser } from '@/actions/user'
import { redirect } from 'next/navigation'

// This route reads the current Clerk session (request headers), so it must
// always be rendered on demand instead of being prerendered at build time.
export const dynamic = 'force-dynamic'

const AuthCallbackPage = async () => {
  const auth = await onAuthenticateUser()
  console.log(auth)
  if (auth.status === 200 || auth.status === 201)
    return redirect(`/dashboard/${auth.user?.workspace[0].id}`)

  if (auth.status === 403 || auth.status === 400 || auth.status === 500)
    return redirect('/auth/sign-in')
}

export default AuthCallbackPage
