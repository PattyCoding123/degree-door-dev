import Head from "next/head";

import { type LayoutProps } from "./Layout";
import DegreeNavbar from "../navigation/DegreeNavbar";
import Footer from "../Footer";
interface ForumLayoutProps extends LayoutProps {
  degreeId?: string;
  degreeName?: string;
  active: "overview" | "reviews" | "write";
}

const Layout: React.FC<ForumLayoutProps> = ({
  title,
  description,
  children,
  degreeId,
  degreeName,
  active,
}) => {
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {degreeId && degreeName && (
        <DegreeNavbar
          degreeId={degreeId}
          degreeName={degreeName}
          active={active}
        />
      )}
      {/* Use flex and flex-col to define available space for
      main tag since we don't want to include the space taken 
      by bottom padding and footer. */}
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
