const path = require("path");

module.exports = options => ({
  name: "pnp-to-unqualified",
  resolveId: function(importee, importer) {
    if (
      !process.versions.pnp ||
      /\0/.test(importee) ||
      !importer ||
      path.isAbsolute(importee)
    ) {
      return null;
    }

    const resolved = require("pnpapi").resolveToUnqualified(
      importee,
      importer,
      options
    );

    if (!resolved) {
      return null;
    }

    return this.resolve(resolved, importer);
  },
});
