


# delete the bundle
del F:\Dev\AgentCAD\lib\frontend\bundle*
# delete node_modules
del F:\Dev\AgentCAD\node_modules\agentic-cad-ui\

# rebuild from the .ts file
cd F:\Dev\AgentCAD\local-extensions\agentic-cad-ui\
npx tsc
yarn install
cd F:\Dev\AgentCAD\

yarn install
yarn theia build --no-cache

