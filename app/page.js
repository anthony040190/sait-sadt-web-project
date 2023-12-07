import Image from 'next/image'
import Sidebar from './sidebar/sidebar' 

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-950">
      <Sidebar />
    </main>
  );
}
