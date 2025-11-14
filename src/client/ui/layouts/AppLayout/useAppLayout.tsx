import {useRouter} from 'next/router';

/**
 * A custom hook that generates a unique layout key based on the current route path.
 * This hook is used to determine a consistent layout identifier by stripping any hash fragments from the URL path. It accesses the current route via `useRouter`
 * and splits the pathname on the hash (`#`) symbol, returning only the portion before the hash. This is useful for managing layout components or triggering re-renders
 * when navigating between routes that share the same base path but differ in hash fragments. By focusing solely on the path, this hook ensures layout stability
 * across hash-based navigations.
 *
 * @returns An object containing a `layoutKey` string derived from the current route path, excluding hash fragments.
 *
 * @example
 * ```tsx
 * const {layoutKey} = useAppLayout();
 * console.log(layoutKey); // Outputs something like "/products/details" for "/products/details#section2"
 * ```
 */
export const useAppLayout = () => {
    const router = useRouter();

    return {layoutKey: router.asPath.split('#')[0]};
};