import type { ReactNode } from "react";
import { Component } from "react";
import Image from "next/image";

interface Props {
  children?: ReactNode;
}

interface State {
  hasError: boolean;
}

// ! Class component to catch errors and display fallback UI
class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
  };

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public static getDerivedStateFromError(_: Error): State {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div
          className="min-w-screen flex min-h-screen items-center justify-center
          bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))]
        from-green-600 to-green-800 text-white"
        >
          <div className="flex flex-col items-center gap-4">
            <Image
              src="/degree_door_logo.png"
              alt="Degree Door Logo"
              width={120}
              height={120}
            />
            <h2 className="text-4xl">Oops, there was an error!</h2>
            <button
              className="text-2xl hover:text-amber-400 active:text-amber-600"
              type="button"
              onClick={() => {
                this.setState({ hasError: false });
              }}
            >
              Try reloading?
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
