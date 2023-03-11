import Head from "next/head";
import { LayoutProps } from "./Layout";
import DegreeNavbar from "../navigation/DegreeNavbar";

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
      <div
        className="min-w-screen relative min-h-screen bg-gradient-to-r
     from-rose-400 via-fuchsia-500 to-indigo-500 pb-footer-fit-small text-white md:pb-footer-fit"
      >
        {children}
      </div>
    </>
  );
};

export default Layout;
