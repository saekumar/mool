import { onAuthenticateUser } from '@/actions/user'
import { redirect } from 'next/navigation'
import React from 'react'

// Authentication reads request headers, so this page cannot be prerendered.
export const dynamic = 'force-dynamic'

type Props = {}

const DasboardPage = async (props: Props) => {
  //Authentication
  const auth = await onAuthenticateUser()
  if (auth.status === 200 || auth.status === 201)
    return redirect(`/dashboard/${auth.user?.workspace[0].id}`)

  if (auth.status === 400 || auth.status === 500 || auth.status === 404) {
    return redirect('/auth/sign-in')
  }
}

export default DasboardPage
