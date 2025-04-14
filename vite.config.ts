import { fileURLToPath, URL } from "node:url";

import { defineConfig } from "vite";
import { resolve } from "path";
import vue from "@vitejs/plugin-vue";
import dts from "vite-plugin-dts";

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [
		vue(),
		dts({
			include: ["src"],
			insertTypesEntry: true,
			cleanVueFileName: true,
			staticImport: true,
			outDir: "dist",
		}),
	],
	build: {
		lib: {
			entry: resolve(__dirname, "src/index.ts"),
			name: "Vue3YandexSmartcaptcha",
			fileName: (format) => `vue3-yandex-smartcaptcha.${format}.js`,
			formats: ["es", "umd"],
		},
		rollupOptions: {
			external: ["vue"],
			output: {
				globals: {
					vue: "Vue",
				},
			},
		},
	},
	resolve: {
		alias: {
			"@": fileURLToPath(new URL("./src", import.meta.url)),
		},
	},
});
