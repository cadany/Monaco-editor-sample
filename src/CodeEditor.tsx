import React, {useRef, useEffect} from 'react';
import * as monaco from 'monaco-editor';
import {registerAutoCompletionLanguage} from "./proxy";
import {editor} from "monaco-editor";
import IStandaloneEditorConstructionOptions = editor.IStandaloneEditorConstructionOptions;
import ITextModel = editor.ITextModel;
import ICodeEditorViewState = editor.ICodeEditorViewState;

// 不使用MonacoWebpackPlugin时，可以通过下边的方式
// window.MonacoEnvironment = {
//     getWorker: function (_moduleId: any, label: string) {
//         // console.log(metadata.languages);
//         switch (label) {
//             case 'editorWorkerService':
//                 return new Worker(new URL('monaco-editor/esm/vs/editor/editor.worker', import.meta.url));
//             case 'css':
//             case 'less':
//             case 'scss':
//                 return new Worker(new URL('monaco-editor/esm/vs/language/css/css.worker', import.meta.url));
//             case 'handlebars':
//             case 'html':
//             case 'razor':
//                 return new Worker(
//                     new URL('monaco-editor/esm/vs/language/html/html.worker', import.meta.url),
//                 );
//             case 'json':
//                 return new Worker(
//                     new URL('monaco-editor/esm/vs/language/json/json.worker', import.meta.url),
//                 );
//             case 'javascript':
//             case 'typescript':
//                 return new Worker(
//                     new URL('monaco-editor/esm/vs/language/typescript/ts.worker', import.meta.url),
//                 );
//             default:
//                 throw new Error(`Unknown label ${label}`);
//         }
//     }
// };

//自定义提示
interface ISuggestions {
    label: string,
    kind: string,
    insertText: string,
    detail?: string,
}

// 编辑器状态
export interface IEditModelState {
    viewstate?: ICodeEditorViewState | null,
    standaloneEditorConstructionOptions?: IStandaloneEditorConstructionOptions,
    onViewStateChange?: (model: ITextModel, state: ICodeEditorViewState | null) => void
}


export const CodeEditor: React.FC<IEditModelState> = (props, context) => {
    const container = useRef<HTMLDivElement>(null);
    let editor: monaco.editor.IStandaloneCodeEditor;
    let autoCompletion: monaco.IDisposable;
    let hasDisposeEditor: boolean = true;

    //自定义提示
    let customAutoCompletion: ISuggestions[] = [{
        label: "item11",
        insertText: "item text",
        kind: "6",
        detail: "TABLE.COLLUMN"
    }];

    useEffect(() => {
        console.log("props effect");
        if (container.current) {
            if (!editor || hasDisposeEditor) {
                editor = monaco.editor.create(container.current,{...props.standaloneEditorConstructionOptions});
                editor.onDidDispose(() => hasDisposeEditor = true);
                hasDisposeEditor = false;
            }
            if (props.standaloneEditorConstructionOptions?.model) {
                editor.setModel(props.standaloneEditorConstructionOptions?.model)
                autoCompletion = registerAutoCompletionLanguage(props.standaloneEditorConstructionOptions?.model.getLanguageId(), customAutoCompletion);
                editor.focus();
                //切换成父级传进来的view状态
                if (props.viewstate) {
                    editor.restoreViewState(props.viewstate);
                    editor.setScrollPosition({
                        scrollTop: props.viewstate.viewState.scrollTop,
                        scrollLeft: props.viewstate.viewState.scrollLeft
                    });
                }
            }

            return () => {
                console.log("props dispose");
                props.onViewStateChange && editor && props.standaloneEditorConstructionOptions?.model && props.onViewStateChange(props.standaloneEditorConstructionOptions?.model, editor.saveViewState());
                autoCompletion?.dispose();   //防止自动提示重复
                editor?.dispose();
            };
        }
    }, [props]);

    return <div style={{height: "calc(100%)", width: "calc(100%)"}}>
        <div className="Editor" ref={container} style={{height: "calc(90%)", width: "calc(100%)"}}></div>
    </div>;
};