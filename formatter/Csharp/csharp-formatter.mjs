// 引入代码格式化库
import js_beautify from "js-beautify";
// 默认设置
let options = {
  indent_size: 4, // 使用4个空格缩进
  indent_char: " ", // 缩进时使用空格
  max_preserve_newlines: 2, // 最多保留两行空行
  preserve_newlines: true, // 保留代码中的空行
  space_in_paren: false, // 括号内不留空格，例如：function(foo)
  space_in_empty_paren: false, // 空括号内不留空格，例如：function()
  jslint_happy: false, // 不强制JSLint风格
  brace_style: "expand", // 大括号在不在同一行，例如：if()\n { \n}
  unescape_strings: false, // 不对字符串进行反转义
  break_chained_methods: false, // 不对链式调用进行换行
  e4x: false, // 不支持E4X（XML literals）
  keep_array_indentation: false, // 不保留数组中的原始缩进
  eval_code: false, // 不格式化 eval 中的代码
  end_with_newline: true, // 在文件末尾添加换行
  indent_empty_lines: false, // 不对空行进行缩进
  wrap_line_length: 120, // 行最大长度，超出后换行
  comma_first: false, // 逗号不放在行首
};
// 格式化代码
export default function formatCode(code) {
  return js_beautify(code, options);
}
