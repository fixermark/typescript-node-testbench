# TypeScript Node.js testbench
A bare-bones testbench for running TypeScript-written code in a browser via compiling with webpack and running in Node.

## To use
`npm run start` to compile the code under `src` and launch a server at `localhost:8000`. Navigate to http://localhost:8000/index.htm to load the script.

Modify `public/index.htm` to change the context of what is loaded. Edits to files in `src` automatically trigger a recompilation.
