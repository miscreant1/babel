import { declare } from "@babel/helper-plugin-utils";
import transformReactJSX from "@babel/plugin-transform-react-jsx";
import transformReactDisplayName from "@babel/plugin-transform-react-display-name";
import transformReactJSXSource from "@babel/plugin-transform-react-jsx-source";
import transformReactJSXSelf from "@babel/plugin-transform-react-jsx-self";

export default declare((api, opts) => {
  api.assertVersion(7);

  const pragma = opts.pragma || "React.createElement";
  const pragmaFrag = opts.pragmaFrag || "React.Fragment";
  const throwIfNamespace =
    opts.throwIfNamespace === undefined ? true : !!opts.throwIfNamespace;
  const development = !!opts.development;
  if ("useSpread" in opts) {
    throw new Error(
      '@babel/preset-react: "useSpread" is always enabled in Babel 8, please remove it from the config.\n',
    );
  }
  if ("useBuiltIns" in opts) {
    const useBuiltInsFormatted = JSON.stringify(opts.useBuiltIns);
    throw new Error(
      `@babel/preset-react: "useBuiltIns" is removed in Babel 8, please remove it from the config.
- Babel 8 now transforms JSX spread to object spread. If you need to transpile object spread with
\`useBuiltIns: ${useBuiltInsFormatted}\`, please use the following config
{
  "plugins": [
    ["@babel/plugin-proposal-object-rest-spread", { "loose": true, "useBuiltIns": ${useBuiltInsFormatted} }]
  ],
  "presets": ["@babel/preset-react"]
}`,
    );
  }

  if (typeof development !== "boolean") {
    throw new Error(
      "@babel/preset-react 'development' option must be a boolean.",
    );
  }

  return {
    plugins: [
      [transformReactJSX, { pragma, pragmaFrag, throwIfNamespace }],
      transformReactDisplayName,

      development && transformReactJSXSource,
      development && transformReactJSXSelf,
    ].filter(Boolean),
  };
});
