import Link from "next/link";


export default function Intro() {
  const containerStyle: React.CSSProperties = {
    background: `url(images/intro.webp)`,
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center center',
    // backgroundAttachment: 'fixed',
    width: '100%',
    height: '100vh',
    position: 'relative'
  };

  const overlayStyle: React.CSSProperties = {
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
    position: 'absolute',
    top: 0,
    left: 0
  };

  const textStyle: React.CSSProperties = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    color: 'white',
    fontSize: '24px'
  };

  return (
    <div style={containerStyle}>
      {/* <div style={overlayStyle} className="backdrop-blur-sm bg-white/30"></div> */}
      <div style={textStyle}>
        <h1 className="mb-4 sm:text-6xl font-extrabold leading-none tracking-tight text-white-900 md:text-8xl text-4xl ">
          Uncover the world of{' '}
        </h1>
        <h1 className="mb-4 sm:text-6xl font-extrabold leading-none tracking-tight text-white-900 md:text-8xl text-4xl">
          <mark className="px-2 text-white bg-blue-600 rounded ">
            Entertainment
          </mark>
        </h1>
        <Link href="/login" className="mt-8 backdrop-blur-sm bg-white/30 hover:bg-white text-blue-600 font-bold py-2 px-4 rounded text-xl">
          🔎 Try It Now
        </Link>
      </div>
    </div>
  );
}
