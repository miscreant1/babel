import { declare } from "@babel/helper-plugin-utils";
import transformTypeScript from "@babel/plugin-transform-typescript";
import normalizeOptions from "./normalize-options";

export default declare((api, opts) => {
  api.assertVersion(7);

  const { jsxPragma, allExtensions, isTSX, allowNamespaces } = normalizeOptions(
    opts,
  );

  const pluginOptions = isTSX => ({
    jsxPragma,
    isTSX,
    allowNamespaces,
  });

  return {
    overrides: allExtensions
      ? [
          {
            plugins: [[transformTypeScript, pluginOptions(isTSX)]],
          },
        ]
      : [
          {
            // Only set 'test' if explicitly requested, since it requires that
            // Babel is being called`
            test: /\.ts$/,
            plugins: [[transformTypeScript, pluginOptions(false)]],
          },
          {
            // Only set 'test' if explicitly requested, since it requires that
            // Babel is being called`
            test: /\.tsx$/,
            plugins: [[transformTypeScript, pluginOptions(true)]],
          },
        ],
  };
});
