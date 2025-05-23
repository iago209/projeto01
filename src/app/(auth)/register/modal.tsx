import RegisterPage from './page'

export default function RegisterModal() {
  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center">
      <RegisterPage />
    </div>
  )
}
