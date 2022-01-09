# TypeScript Node.js testbench
A bare-bones testbench for running TypeScript-written code in a browser via compiling with webpack and running in Node.

## To use
`npm ci` to install the dependencies from Node, then `npm run start` to compile the code under `src` and launch a server at `localhost:8000`. Navigate to http://localhost:8000/index.htm to load the script. You should see the text "scripts on," indicating the code in `src/index.ts` ran.

Modify `public/index.htm` to change the context of what is loaded. Editing files in `src` automatically triggers a recompilation.
