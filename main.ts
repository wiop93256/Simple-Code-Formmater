import { Editor, MarkdownView, Notice, Plugin } from "obsidian";
import code_formatter from "./formatter/code-formatter.mjs";
import CustomError from "./public/CustomError.mjs";

export default class SimpleCodeFormatterPlugin extends Plugin {
  async onload() {
    // 将光标所在的代码块格式化
    // Format the code block where the cursor is
    this.addCommand({
      id: "simple_code_formatter",
      name: "Format current code block.",
      editorCallback: async (editor: Editor, view: MarkdownView) => {
        const codeBlockRange = await getCodeBlockRange(editor);
        if (!codeBlockRange) {
          new Notice("No code block found!");
          return;
        }
        formatCodeBlock(editor, codeBlockRange)
          .then(() => {
            new Notice("Code block formatted!");
          })
          .catch((e: any) => {
            // IF the error is a custom error, show the message in the notice
            if (e.name === "CustomError") {
              new Notice(e.message);
              return;
            }
            // Otherwise, show a generic error message and log the error to the console
            else {
              new Notice(
                "Failed to format code block! Maybe the code block contains syntax errors.\nSee the console for more information."
              );
              console.log("Simple Code Formatter Error:", e);
            }
          });
      },
    });
  }

  onunload() {}
}

// 获取代码块的范围
// Get the range of the code block
async function getCodeBlockRange(editor: Editor) {
  const cursor = editor.getCursor();
  const cursorLine = cursor.line;
  // console.log("当前光标行", cursorLine);
  const doc = editor.getValue();

  const lineCount = editor.lineCount();

  let inCodeBlock = false;

  let codeBlockStartLine = -1;
  let codeBlockEndLine = -1;

  for (let i = 0; i < lineCount; i++) {
    const lineText = editor.getLine(i);
    if (
      lineText.trim().startsWith("```") ||
      lineText.trim().startsWith("~~~")
    ) {
      inCodeBlock = !inCodeBlock;
      if (inCodeBlock) {
        codeBlockStartLine = i; // 记录代码块开始行
      } else {
        codeBlockEndLine = i; // 记录代码块结束行
        if (
          cursorLine >= codeBlockStartLine &&
          cursorLine <= codeBlockEndLine
        ) {
          return {
            start: codeBlockStartLine,
            end: codeBlockEndLine,
          };
        }
      }
    }
  }
  return null;
}

async function replaceCodeBlockContentByRange(
  editor: Editor,
  range: any,
  content: string
) {
  const { start, end } = range;

  editor.replaceRange(
    content,
    { line: start, ch: 0 },
    { line: end, ch: editor.getLine(end).length }
  );
}

async function formatCodeBlock(editor: Editor, range: any) {
  const { start, end } = range;

  // 备份代码块
  // Backup the code block
  // const backUp = editor.getRange(
  //   { line: start, ch: 0 },
  //   { line: end, ch: editor.getLine(end).length }
  // );
  const firstLine = editor.getLine(start);
  const endLine = editor.getLine(end);

  const languageMatch = editor.getLine(start).trim().match(/^\S+/);
  if (!languageMatch) {
    throw new CustomError("No language specified in the code block.");
  }
  const language = languageMatch[0].slice(3);

  const codeBlockContent = editor.getRange(
    { line: start + 1, ch: 0 },
    { line: end - 1, ch: editor.getLine(end - 1).length }
  );

  const formattedCode = await code_formatter(codeBlockContent, language).catch(
    (e) => {
      throw e;
    }
  );

  const formattedCodeBlock = `${firstLine}\n${formattedCode}\n${endLine}`;
  await replaceCodeBlockContentByRange(editor, range, formattedCodeBlock);
}
