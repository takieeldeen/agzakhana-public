// import type { NextConfig } from "next";

// const nextConfig: NextConfig = {
//   /* config options here */
//   images: {
//     remotePatterns: [new URL("https://ukbahlwracfvnetnxlba.supabase.co/**")],
//   },
// };

// export default nextConfig;

import { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const nextConfig: NextConfig = {
  //   /* config options here */
  images: {
    remotePatterns: [new URL("https://ukbahlwracfvnetnxlba.supabase.co/**")],
  },
};

const withNextIntl = createNextIntlPlugin("./i18n/requests.ts");
export default withNextIntl(nextConfig);
