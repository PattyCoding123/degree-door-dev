import Head from "next/head";
import HomeNavbar from "../navigation/HomeNavbar";
import Footer from "../Footer";

export interface LayoutProps {
  title: string;
  description: string;
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ title, description, children }) => {
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <HomeNavbar />
      <div
        id="content-container"
        className="min-w-screen relative flex min-h-screen
        flex-col bg-gradient-to-r from-rose-400 via-fuchsia-500 
        to-indigo-500 pb-footer-fit-small md:pb-footer-fit"
      >
        {children}
        <Footer />
      </div>
    </>
  );
};

export default Layout;
