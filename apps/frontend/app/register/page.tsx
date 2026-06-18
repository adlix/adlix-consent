import RegisterForm from './RegisterForm'

export default async function RegisterPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string; plan?: string }>
}) {
  const params = await searchParams
  return <RegisterForm error={params.error} plan={params.plan} />
}
