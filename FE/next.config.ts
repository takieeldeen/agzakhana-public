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
    remotePatterns: [
      {
        protocol: "https",
        hostname: "ukbahlwracfvnetnxlba.supabase.co",
        pathname: "/**",
      },

      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
        pathname: "/**",
      },
    ],
  },
};

const withNextIntl = createNextIntlPlugin("./i18n/requests.ts");
export default withNextIntl(nextConfig);
