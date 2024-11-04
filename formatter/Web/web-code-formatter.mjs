import prettier from "prettier";
import * as babelParser from "prettier/parser-babel";
import * as htmlParser from "prettier/parser-html";
import * as markdownParser from "prettier/parser-markdown";
import * as postcssParser from "prettier/parser-postcss";
import * as typescriptParser from "prettier/parser-typescript";
import * as yamlParser from "prettier/parser-yaml";
import * as graphqlParser from "prettier/plugins/graphql";
// Fix:  Couldn't find plugin for AST format "estree". Plugins must be explicitly added to the standalone bundle.
// Github: https://github.com/prettier/prettier/issues/15473
import * as esTreeParser from "prettier/plugins/estree";

export default async function web_formatter(code, codeType) {
  // Map code type aliases for prettier
  const language = mapCodeTypeAliases(codeType);
  // console.log("language",language);
  // Format code using prettier
  return prettier.format(code, {
    parser: language,
    plugins: [
      markdownParser,
      babelParser,
      htmlParser,
      typescriptParser,
      yamlParser,
      postcssParser,
      graphqlParser,
      esTreeParser,
    ]
    
  });
}

const prettierLanguages = [
  "html",
  "vue",
  "css",
  "js",
  "javascript",
  "typescript",
  "json",
  "json5",
  "ts",
  "scss",
  "less",
  "graphql",
  "markdown",
  "yaml",
];

// Map code type aliases for prettier
function mapCodeTypeAliases(codeType) {
  switch (codeType) {
    case "js":
    case "javascript":
      return "babel";
    case "ts":
    case "typescript":
      return "typescript";
    case "vue":
      return "html";
    default:
      return codeType;
  }
}

export { prettierLanguages };
