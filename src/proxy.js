import {language as sqlLanguage} from 'monaco-editor/esm/vs/basic-languages/sql/sql';
import {language as mysqlLanguage} from 'monaco-editor/esm/vs/basic-languages/mysql/mysql';
import {language as redisLanguage} from 'monaco-editor/esm/vs/basic-languages/redis/redis';

import * as monaco from "monaco-editor";

function _registerAutoCompletionLanguage(languageSelector, language, customAutoCompletion) {
    return monaco.languages.registerCompletionItemProvider(languageSelector, {
        provideCompletionItems: (
            model,
            position,
        ) => {
            let suggestions = [];
            const {lineNumber, column} = position;
            const textBeforePointer = model.getValueInRange({
                startLineNumber: lineNumber,
                startColumn: 0,
                endLineNumber: lineNumber,
                endColumn: column,
            });
            const contents = textBeforePointer.trim().split(/\s+/);
            const lastContents = contents[contents?.length - 1]; // 获取最后一段非空字符串
            if (lastContents) {
                const configKey = ['builtinFunctions', 'keywords', 'operators'];
                configKey.forEach(key => {
                    let kind = 0;
                    switch (key) {
                        case 'builtinFunctions':
                            kind = monaco.languages.CompletionItemKind.Function;
                            break;
                        case 'keywords':
                            kind = monaco.languages.CompletionItemKind.Keyword;
                            break;
                        default:
                            kind = monaco.languages.CompletionItemKind.Operator;
                    }
                    language[key].forEach((item) => {
                        suggestions.push({
                            label: item, // 显示的提示内容;默认情况下，这也是选择完成时插入的文本。
                            insertText: item, // 选择此完成时应插入到文档中的字符串或片段
                            kind: kind, // 编辑器根据图标的种类选择图标
                        });
                    });
                });
                //自定义提示
                if(customAutoCompletion){
                    customAutoCompletion.forEach((item) => {
                        suggestions.push({
                            label: item.label, insertText: item.insertText,
                            detail: item.detail, kind: item.kind,
                        });
                    });
                }
            }
            return {
                suggestions,
            }
        }
    });
}

function registerAutoCompletionLanguage(languageSelector, customAutoCompletion) {
    switch (languageSelector) {
        case "mysql":
            return _registerAutoCompletionLanguage(languageSelector, mysqlLanguage, customAutoCompletion);
        case "redis":
            return _registerAutoCompletionLanguage(languageSelector, redisLanguage, customAutoCompletion);
        default:
            return _registerAutoCompletionLanguage(languageSelector, sqlLanguage, customAutoCompletion);
    }
}

export {registerAutoCompletionLanguage}