import About from '../components/about';
import Intro from '../components/intro';

export default async function HomePage() {


  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
      <Intro />
      <About/>
    </main>
  );
}
