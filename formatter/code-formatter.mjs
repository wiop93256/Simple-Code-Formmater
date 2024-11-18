import c_formatter from "./C/c-formatter.mjs";
import csharp_formatter from "./Csharp/csharp-formatter.mjs";
import java_formatter from "./Java/java-formatter.mjs";
import xml_formatter from "./XML/xml-formatter.mjs";
import sql_formatter from "./SQL/sql-formatter.mjs";
import web_formatter, { prettierLanguages } from "./Web/web-code-formatter.mjs";

import CustomError from "../public/CustomError.mjs";

export default async function formatCode(code, language) {
  language = language.toLowerCase();

  // Format code using prettier if language is supported
  if (prettierLanguages.includes(language)) {
    return await web_formatter(code, language);
  }
  // Formatter code based on language
  switch (language) {
    case "c":
    case "c++":
    case "cpp":
      return c_formatter(code);
    case "csharp":
    case "c#":
      return csharp_formatter(code);
    case "java":
      return java_formatter(code);
    case "xml":
      return xml_formatter(code);
    case "sql":
      return sql_formatter(code);
    default:
      // 返回获取到的语言
      throw new CustomError(
        `Language '${language}' not supported for formatting.`
      );
  }
}
