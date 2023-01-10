# React, TS, Firebase - Live Chat

# Relative Paths

Install the following pakage:

```sh
npm install -D vite-tsconfig-paths@4.0.3
```

This exact version was functioning correctly on 01/10/2023, but you can try @latest.
In "_tsconfig.json_" add the following:

```
{
	"compilerOptions":{
		"jsx":"preserve",
		"baseUrl":".",
		"paths":{
			"~/*":["src/*"]
		}
	},
	"include": ["vite.config.ts", "**/*.ts", "**/*.tsx"],
	"exclude": ["node_modules"],
}
```

And on "_vite.config.ts_" you'll need to add:

```
import { defineConfig } from  'vite';
import  react  from  '@vitejs/plugin-react-swc';
import  tsconfigPaths  from  'vite-tsconfig-paths';

export  default  defineConfig({
	plugins: [react(), tsconfigPaths()],
});
```
