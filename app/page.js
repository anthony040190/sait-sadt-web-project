import Image from 'next/image'
import Sidebar from './sidebar/sidebar' 
import Weather from './weather/weather'

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-950">
      <Sidebar />
      <Weather />
    </main>
  );
}
