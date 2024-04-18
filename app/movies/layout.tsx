import BasePageMenu from '../../components/base-page-menu';

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <div className='my-5'>
      <BasePageMenu />
      </div>
      {children}
    </div>
  );
}
