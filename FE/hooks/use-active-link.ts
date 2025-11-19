import { usePathname } from "next/navigation";

type MatchPathOptions = {
  path: string;
  end: boolean;
};

const matchPath = (options: MatchPathOptions, currrentPath: string) =>
  options.end
    ? currrentPath.endsWith(options?.path)
    : currrentPath.includes(options?.path);

function segmentMatch(currentPath: string, basePath: string, end: boolean) {
  const currentSegments = currentPath.split("?")[0].split("/");
  const baseSegments = basePath.split("/");

  if (end) {
    // Match exact last segment
    return (
      currentSegments[currentSegments.length - 1] ===
      baseSegments[baseSegments.length - 1]
    );
  }

  // Start match (namespace)
  return currentSegments.includes(baseSegments[baseSegments.length - 1]);
}

// export function useActiveLink(path: string, deep: boolean = true): boolean {
//   const pathname = usePathname();
//   const normalActive = path ? matchPath({ path, end: true }, pathname) : false;
//   const deepActive = path ? matchPath({ path, end: false }, pathname) : false;

//   const includesPath = pathname.indexOf(path) !== -1;
//   return deep ? deepActive || includesPath : normalActive || includesPath;
// }

export function useActiveLink(path: string, deep: boolean = true): boolean {
  const pathname = usePathname();
  if (!path) return false;

  return segmentMatch(pathname, path, !deep);
}
