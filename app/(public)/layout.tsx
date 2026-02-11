import { Header } from "@/components/public/header"
import { Footer } from "@/components/public/footer"

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex min-h-screen flex-col bg-white relative">
      {/* Subtle Global Background Gradients */}
      <div className="fixed inset-0 pointer-events-none -z-10">
        <div className="absolute top-[10%] left-[-5%] w-[600px] h-[600px] bg-red-500/5 blur-[120px] rounded-full" />
        <div className="absolute bottom-[20%] right-[-10%] w-[800px] h-[800px] bg-blue-500/5 blur-[150px] rounded-full" />
        <div className="absolute top-[50%] left-[20%] w-[400px] h-[400px] bg-blue-600/3 blur-[100px] rounded-full" />
      </div>

      <Header />
      <main className="flex-1 relative">{children}</main>
      <Footer />
    </div>
  )
}
