import c_formatter from "./C/c-formatter.mjs";
import csharp_formatter from "./Csharp/csharp-formatter.mjs";
import java_formatter from "./Java/java-formatter.mjs";
import xml_formatter from "./XML/xml-formatter.mjs";
import sql_formatter from "./SQL/sql-formatter.mjs";
import web_formatter, { prettierLanguages } from "./Web/web-code-formatter.mjs";

export default async function formatCode(code, language) {
  language = language.toLowerCase();

  // Format code using prettier if language is supported
  if (prettierLanguages.includes(language)) {
    return await web_formatter(code, language);
  }
  // Formatter code based on language
  switch (language) {
    case "c":
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
      throw new CustomError("Language not supported for formatting.");
  }
}

class CustomError extends Error {
  constructor(message) {
      super(message);
      this.name = "CustomError"; // 设置自定义的错误名称
  }
}