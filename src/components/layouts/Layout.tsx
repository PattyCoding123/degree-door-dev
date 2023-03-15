import Head from "next/head";
import HomeNavbar from "../navigation/HomeNavbar";
import Footer from "../navigation/Footer";

export interface LayoutProps {
  title: string;
  description: string;
  children: React.ReactNode;
}

/* 
  The Layout component wraps a Head component which provides metadata
  for the specific page that uses this layout.

  Each page wrapped with this component will render a HomeNavber and a
  content container div that contains a Footer which will always render
  below
*/
const Layout: React.FC<LayoutProps> = ({ title, description, children }) => {
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <HomeNavbar />
      {/* Use flex and flex-col to define available space for
      main tag since we don't want to include the space taken 
      by bottom padding and footer. */}
      <div
        id="content-container"
        className="min-w-screen relative flex min-h-screen
        flex-col bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))]
      from-green-500 to-green-700 pb-footer-fit-small md:pb-footer-fit"
      >
        {children}
        <Footer />
      </div>
    </>
  );
};

export default Layout;
