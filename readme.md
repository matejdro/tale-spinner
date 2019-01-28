## Recommended frameworks:

* Typescript
* Koa (backend)
* React (frontend)

I suggest 3 directory structure
```
repo
|- backend
|- gm-screen
|- player-screen
```

Each project will contain its own package.json and tsconfig.json. 
All projects will use Typescript, if you use Javascript libraries, you'll need to download separate type definitions, usually by prefixing
package name with `@types/<package-name>`

### backend
* Koa (+ koa-bodyparser, koa-router)
* ws https://www.npmjs.com/package/ws

### frontend
* React
* SASS (with SASS syntax instead of SCSS syntax)
* Webpack (I suggest configuring Webpack with ts-loader, sass-loader and fork-ts-checker-webpack-plugin.
You also need separate configurations for DEV and PROD)
* have fun configuring all of Webpack... I'll help you with that once you give up
* I suggest using https://www.npmjs.com/package/react-websocket becuase it provides 'React way' of dealing with WebSocket events
