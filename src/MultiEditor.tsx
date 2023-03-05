import React, {useRef, useState} from "react";
import {CodeEditor, IEditModelState} from "./CodeEditor";
import {editor} from "monaco-editor";
import ICodeEditorViewState = editor.ICodeEditorViewState;
import {Button, Empty, Tabs, TabsProps} from "antd";
import * as monaco from "monaco-editor";
import ITextModel = editor.ITextModel;

type TargetKey = React.MouseEvent | React.KeyboardEvent | string;


interface IPane {
    key: string
    label: string
    children?: React.ReactNode
    modelState?: IEditModelState
}


export const MultiEditor: React.FC = () => {

    const [currentModel, setCurrentModel] = useState<IEditModelState | undefined>({viewstate: null});
    const [activeKey, setActiveKey] = useState("0");
    const [items, setItems] = useState<IPane[]>([]);
    const newTabIndex = useRef(1);
    const WorkerEmpty = () =>
        <Empty
            imageStyle={{height: 60}}
            description={
                <span>无SQL查询编辑器</span>
            }>
            <Button type="primary" onClick={add}>Create Now</Button>
        </Empty>

    const renderTabBar: TabsProps['renderTabBar'] = (props, DefaultTabBar) => (
        //TODO: 没想好UE，预留
        <DefaultTabBar {...props} />
    );

    const onChange = (newActiveKey: string) => {
        console.log("tab change to " + newActiveKey);
        //找对应的model，并让编辑器切换过去
        let idx = items.findIndex((v) => v.key === newActiveKey);
        if (idx >= 0 && items[idx].modelState) {
            // console.log("model change to " + items[idx].modelState?.standaloneEditorConstructionOptions?.model?.getValue())
            setCurrentModel(items[idx].modelState);
        }
        setActiveKey(newActiveKey);
    }

    const add = () => {
        console.log("add");
        const newActivekey = `sql-${newTabIndex.current++}`;
        const newModel: IEditModelState = {
            standaloneEditorConstructionOptions: {
                model: monaco.editor.createModel(`-- create on connection root@192.168.1.1\n-- ${new Date().toUTCString()}\n`, "mysql")
            },
            viewstate: null
        };
        setItems([...items, {key: newActivekey, label: newActivekey, modelState: newModel}]);
        //切换editor中的代码内容
        setCurrentModel(newModel);
        //切换tab面签
        setActiveKey(newActivekey);
    }

    const remove = (e: TargetKey) => {
        console.log("remove key:" + e)
    }

    const onEdit = (e: React.MouseEvent | React.KeyboardEvent | string, action: string) => {
        if (action === 'add') add();
        else remove(e);
    }

    const onViewStateChange = (model: ITextModel, state: ICodeEditorViewState | null) => {
        //把model传回来是因为activekey是异步的，父组件上没有记录当前的状态，所以不能用activekey查当前使用的model
        console.log("onViewStateChange");
        items.map((pane)=>{
            if (pane.modelState?.standaloneEditorConstructionOptions?.model?.id === model.id){
                console.log("save view state: model="+model.id+" cursor " + JSON.stringify(state?.cursorState[0].position));
                pane.modelState!.viewstate = state;
            }
        });
    }

    return (
        <div style={{height: "100vh", width: "100vw"}}>
            <Tabs
                id={"mutil_code_editor"}
                type="editable-card"
                tabBarStyle={{height: 25}}
                items={items}
                activeKey={activeKey}
                onChange={onChange}
                onEdit={onEdit}
                renderTabBar={renderTabBar}
            />
            {
                items.length > 0 ?
                    <CodeEditor {...currentModel} onViewStateChange={onViewStateChange}/> : <WorkerEmpty></WorkerEmpty>
            }

        </div>
    );

}