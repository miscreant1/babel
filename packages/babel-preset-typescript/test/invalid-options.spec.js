import { transform } from "@babel/core";
import presetTypeScript from "..";

function transformTSWithOptions(source: string, options: any) {
  transform(source, {
    filename: "test.ts",
    presets: [[presetTypeScript, options]],
  });
}
describe("preset-typescript", () => {
  it("should throw when top level options are invalid", () => {
    expect(() => {
      transformTSWithOptions("", { isTsx: true });
    }).toThrowErrorMatchingSnapshot();
  });
  it("should throw when boolean options are not provided with boolean values", () => {
    expect(() => {
      transformTSWithOptions("", { isTSX: "true" });
    }).toThrowErrorMatchingSnapshot();
  });
  it("should throw when string options are not provided with string values", () => {
    expect(() => {
      transformTSWithOptions("", { jsxPragma: 0 });
    }).toThrowErrorMatchingSnapshot();
  });
  it("should throw when isTSX is true but allExtensions is unset", () => {
    expect(() => {
      transformTSWithOptions("", { isTSX: true });
    }).toThrowErrorMatchingSnapshot();
  });
  it("should throw when isTSX is true but allExtensions is false", () => {
    expect(() => {
      transformTSWithOptions("", { isTSX: true, allExtensions: false });
    }).toThrowErrorMatchingSnapshot();
  });
});
