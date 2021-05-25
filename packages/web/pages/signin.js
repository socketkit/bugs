import * as Sentry from "@sentry/nextjs"
import dayjs from 'dayjs'
import Form from 'components/form/form.js'

import { endpoints, client } from 'helpers/kratos.js'
import KratosPropTypes from 'helpers/types/kratos.js'

export async function getServerSideProps(ctx) {
  const { flow } = ctx.query

  const redirect = () => {
    ctx.res.statusCode = 302
    ctx.res?.setHeader('Location', endpoints.login)
    return { props: {} }
  }

  if (!flow) {
    return redirect()
  }

  try {
    const { data } = await client.getSelfServiceLoginFlow(flow)
    const isBefore = dayjs(data?.expires_at ?? undefined).isBefore(dayjs())

    if (isBefore) {
      return redirect()
    }
    return { props: { kratos: data } }
  } catch (error) {
    Sentry.captureException(error)
    return redirect()
  }
}

function SignIn({ kratos }) {
  return (
    <>
      <h2 className="text-3xl font-extrabold text-warmGray-900">Sign in</h2>
      <p className="mt-2 text-sm text-trueGray-500 max-w mb-8">
        or{' '}
        <a
          className="font-semibold text-orange-500 hover:text-orange-400"
          href={endpoints.register}>
          start your 14-day free trial
        </a>
      </p>

      <Form
        preAction={
          <div className="flex items-center justify-between mb-4">
            <div></div>
            <a
              href={endpoints.recover}
              className="font-medium text-orange-500 hover:text-orange-400 text-sm">
              Forgot your password?
            </a>
          </div>
        }
        actions={{
          primary: 'Sign in',
          secondary: null,
        }}
        kratos={kratos}
      />
    </>
  )
}

SignIn.propTypes = { kratos: KratosPropTypes }

export default SignIn
