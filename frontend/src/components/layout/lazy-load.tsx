import { ReactNode, ComponentType, lazy, Suspense } from "react";
import Fallback from "./fallback";

/**
 * Lazy load a component with a fallback component
 * and return a component that will render the lazy loaded component
 * @param importCallback
 * @param FallbackComponent
 * @returns
 */

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function lazyLoad<_T = unknown, P = unknown>(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  importCallback: () => Promise<{ default: ComponentType<any> }>,
  FallbackComponent: ReactNode = <Fallback />
) {
  const Component = lazy(importCallback);

  return (props: P) =>
    FallbackComponent ? (
      <Suspense fallback={FallbackComponent}>
        <Component {...props} />
      </Suspense>
    ) : (
      <Component {...props} />
    );
}
