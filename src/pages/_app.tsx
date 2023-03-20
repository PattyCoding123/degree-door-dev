import { type AppType } from "next/app";
import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";

import { trpc } from "../utils/trpc";

import "../styles/globals.css";
import ErrorBoundary from "../components/layouts/ErrorBoundary";

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  return (
    <ErrorBoundary>
      <SessionProvider session={session}>
        <Component {...pageProps} />
        <div id="modal-root" /> {/* For portals */}
      </SessionProvider>
    </ErrorBoundary>
  );
};

export default trpc.withTRPC(MyApp);
