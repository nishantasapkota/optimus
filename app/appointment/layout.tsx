import { Header } from "@/components/public/header"
import { Footer } from "@/components/public/footer"

export default function AppointmentLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="relative flex min-h-screen flex-col bg-white">
      <div className="pointer-events-none fixed inset-0 -z-10">
        <div className="absolute left-[-5%] top-[10%] h-[600px] w-[600px] rounded-full bg-red-500/5 blur-[120px]" />
        <div className="absolute bottom-[20%] right-[-10%] h-[800px] w-[800px] rounded-full bg-blue-500/5 blur-[150px]" />
        <div className="absolute left-[20%] top-[50%] h-[400px] w-[400px] rounded-full bg-blue-600/3 blur-[100px]" />
      </div>

      <Header />
      <main className="relative flex-1">{children}</main>
      <Footer />
    </div>
  )
}
