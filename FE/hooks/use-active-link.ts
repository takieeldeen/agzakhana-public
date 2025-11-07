import { usePathname } from "next/navigation";

type MatchPathOptions = {
  path: string;
  end: boolean;
};

const matchPath = (options: MatchPathOptions, currrentPath: string) =>
  options.end
    ? currrentPath.endsWith(options?.path)
    : currrentPath.includes(options?.path);

export function useActiveLink(path: string, deep: boolean = true): boolean {
  const pathname = usePathname();
  const normalActive = path ? matchPath({ path, end: true }, pathname) : false;
  const deepActive = path ? matchPath({ path, end: false }, pathname) : false;

  const includesPath = pathname.indexOf(path) !== -1;
  return deep ? deepActive || includesPath : normalActive || includesPath;
}
