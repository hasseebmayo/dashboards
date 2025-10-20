import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	/* config options here */
	experimental: {
		reactCompiler: true,
	},
	devIndicators: {
		position: "bottom-right",
	},
	// typedRoutes: true  // Temporarily disabled
};

export default nextConfig;
