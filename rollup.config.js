import { builtinModules } from "module";
import resolve from "@rollup/plugin-node-resolve";
import typescript from "rollup-plugin-typescript2";
import { terser } from "rollup-plugin-terser";
import pkg from "./package.json";

export default {
	input: "src/index.ts",
	output: [
		{
			format: "esm",
			exports: "named",
			file: pkg.module,
			sourcemap: false,
		},
		{
			format: "cjs",
			exports: "named",
			file: pkg.main,
			sourcemap: false,
			esModule: false,
		},
		{
			name: pkg["umd:name"] || pkg.name,
			format: "umd",
			exports: "named",
			file: pkg.unpkg,
			sourcemap: false,
			esModule: false,
			plugins: [terser()],
		},
	],
	external: [
		...builtinModules,
		...Object.keys(pkg.dependencies || {}),
		...Object.keys(pkg.peerDependencies || {}),
	],
	plugins: [resolve(), typescript()],
};
