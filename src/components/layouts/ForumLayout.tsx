import Head from "next/head";

import { type LayoutProps } from "./Layout";
import DegreeNavbar from "../navigation/DegreeNavbar";
import Footer from "../navigation/Footer";
interface ForumLayoutProps extends LayoutProps {
  degreeId?: string;
  degreeName?: string;
  active: "overview" | "reviews" | "write";
}

/* 
  The ForumLayout component wraps a Head component which provides metadata
  for the specific forum page that uses this layout.

  Each page wrapped with this component will render a DegreeNavbar and a
  content container div that contains a Footer which will always render
  below the content.
*/
const ForumLayout: React.FC<ForumLayoutProps> = ({
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
      <DegreeNavbar
        degreeId={degreeId}
        degreeName={degreeName}
        active={active}
      />
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

export default ForumLayout;
