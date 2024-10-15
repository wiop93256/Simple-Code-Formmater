import prettier from "prettier";
import prettierHtmlParser from "prettier/parser-html";
import prettierJavaParser from "prettier-plugin-java";

export default async function formatCode(code) {
  return prettier.format(code, {
    parser: "java",
    plugins: [prettierHtmlParser, prettierJavaParser],
  });
}
