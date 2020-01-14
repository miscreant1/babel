import { loadOptions } from "@babel/core";
import presetTypeScript from "..";

function loadPresetWithOptions(options: any) {
  loadOptions({
    filename: "/fake/test.ts",
    presets: [[presetTypeScript, options]],
  });
}
describe("preset-typescript", () => {
  it("should throw when top level options are invalid", () => {
    expect(() => {
      loadPresetWithOptions({ isTsx: true });
    }).toThrowErrorMatchingSnapshot();
  });
  it("should throw when boolean options are not provided with boolean values", () => {
    expect(() => {
      loadPresetWithOptions({ isTSX: "true" });
    }).toThrowErrorMatchingSnapshot();
  });
  it("should throw when string options are not provided with string values", () => {
    expect(() => {
      loadPresetWithOptions({ jsxPragma: 0 });
    }).toThrowErrorMatchingSnapshot();
  });
  it("should throw when isTSX is true but allExtensions is unset", () => {
    expect(() => {
      loadPresetWithOptions({ isTSX: true });
    }).toThrowErrorMatchingSnapshot();
  });
  it("should throw when isTSX is true but allExtensions is false", () => {
    expect(() => {
      loadPresetWithOptions({ isTSX: true, allExtensions: false });
    }).toThrowErrorMatchingSnapshot();
  });
});
