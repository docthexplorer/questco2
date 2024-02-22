import { Outlet } from "react-router-dom";
import { ErrorBoundary } from "react-error-boundary";
import ErrorFallback from "./error-fallback";
/* <ErrorBoundary FallbackComponent={ErrorFallback}>
</ErrorBoundary> */

const Layout = () => {
  return (
    <main>
      <ErrorBoundary FallbackComponent={ErrorFallback}>
        <Outlet />
      </ErrorBoundary>
    </main>
  );
};

export default Layout;
