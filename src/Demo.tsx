import React, {useState} from 'react';
import {
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    UploadOutlined,
    UserOutlined,
    VideoCameraOutlined,
} from '@ant-design/icons';
import {
    Breadcrumb,
    Button,
    Card,
    Checkbox,
    Col, Collapse,
    Divider,
    Form,
    Input, InputNumber,
    Layout,
    Menu,
    Row, Select, Space,
    Steps,
    theme,
    Typography
} from 'antd';
import "./Demo.css"
import {PlusOutlined, SettingOutlined} from '@ant-design/icons';
import {CheckboxValueType} from "antd/es/checkbox/Group";
import {Option} from "antd/es/mentions";

const {Header, Sider, Content} = Layout;
const {Panel} = Collapse;
const CheckboxGroup = Checkbox.Group;
const plainAOptions = ['5G消息（本网）', '5G消息（异网）', '阅信', '视频短信', '文本短信'];
const plainBOptions = [
    {label: '5G消息（本网）', value: '5G消息（本网）', disabled: true},
    {label: '5G消息（异网）', value: '5G消息（异网）', disabled: true},
    {label: '阅信', value: '阅信', checked: true},
    {label: '视频短信', value: '视频短信'},
    {label: '文本短信', value: '文本短信'},
];
const defaultACheckedList = ['5G消息（本网）', '5G消息（异网）'];
const defaultBCheckedList = ['5G消息（本网）', '5G消息（异网）', '阅信'];
const selectAfter = (
    <Select defaultValue="分钟" style={{width: 70}}>
        <Option value="分钟">分钟</Option>
        <Option value="秒">秒</Option>
    </Select>
);

const gridStyle: React.CSSProperties = {
    width: "100%",
    backgroundColor: "#f1f1f1",
    borderRadius: "4px",
    marginBottom: "10px",
    padding: "10px"
    // textAlign: 'center',
};

interface ConditionEditorProps {
    label: string
    isLast: boolean
}

const ConditionEditor: React.FC<ConditionEditorProps> = (props: ConditionEditorProps) => {
    return (
        <div className="space-align-container">
            <div className="space-align-block">
                <Space align="center">
                    <Form.Item>
                        <span className="mock-block">{props.label}:</span>
                        <Form.Item style={{
                            display: 'inline-block',
                            width: '150px'
                        }}>
                            <Select defaultValue={"5G消息（本网）"}>
                                <Option>5G消息（本网）</Option>
                                <Option>5G消息（异网）</Option>
                            </Select>
                        </Form.Item>
                        <span className="mock-block">在</span>
                        <Form.Item style={{
                            display: 'inline-block',
                            width: '120px'
                        }}>
                            <InputNumber defaultValue={5} addonAfter={selectAfter}/>
                        </Form.Item>
                        <span className="mock-block">后，状态为</span>
                        <Form.Item style={{
                            display: 'inline-block',
                            width: '150px'
                        }}>
                            <Select defaultValue={"状态回执"}>
                                <Option>未收到状态回执</Option>
                                <Option>回执为：成功</Option>
                                <Option>回执为：失败</Option>
                            </Select>
                        </Form.Item>
                        <Form.Item style={{
                            display: 'inline-block',
                            width: '60px'
                        }}>
                            <Select defaultValue={"0"} disabled={props.isLast}>
                                <Option value={"0"}>{props.isLast?"-":"和"}</Option>
                                <Option value={"1"}>或</Option>
                            </Select>
                        </Form.Item>
                    </Form.Item>
                </Space>
            </div>
        </div>
    );
}


const Demo: React.FC = () => {
    const [checkedList, setCheckedList] = useState<CheckboxValueType[]>(defaultACheckedList);
    const [collapsed, setCollapsed] = useState(false);
    const {
        token: {colorBgContainer},
    } = theme.useToken();

    return (
        <Layout id={"components-layout-demo-custom-trigger"}>
            <Sider trigger={null} collapsible collapsed={collapsed}>
                <div className="logo"/>
                <Menu
                    theme="dark"
                    mode="inline"
                    defaultSelectedKeys={['1']}
                    items={[
                        {
                            key: '1',
                            icon: <UserOutlined/>,
                            label: 'nav 1',
                        },
                        {
                            key: '2',
                            icon: <VideoCameraOutlined/>,
                            label: 'nav 2',
                        },
                        {
                            key: '3',
                            icon: <UploadOutlined/>,
                            label: 'nav 3',
                        },
                    ]}
                />
            </Sider>
            <Layout className="site-layout">
                <Header style={{padding: 0, background: colorBgContainer}}>
                    {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
                        className: 'trigger',
                        onClick: () => setCollapsed(!collapsed),
                    })}
                    <b>测试订阅号-1</b>
                </Header>
                <Content
                    style={{
                        margin: '24px 16px',
                        padding: 24,
                        minHeight: 280,
                        background: colorBgContainer,
                    }}
                >
                    <Breadcrumb style={{margin: '16px 0'}}>
                        <Breadcrumb.Item>发送策略</Breadcrumb.Item>
                        <Breadcrumb.Item>创建发送策略</Breadcrumb.Item>
                    </Breadcrumb>
                    <Card>
                        <Row>
                            <Col flex={"auto"}></Col>
                            <Col style={{width: "800px"}}>
                                <Form layout="vertical">
                                    <Form.Item label={"策略名称"}>
                                        <Input placeholder={"请输入策略名称，不超过40个字符"}/>
                                    </Form.Item>
                                    <Divider/>
                                    <Form.Item label={"发送步骤"}>
                                        <Card.Grid style={gridStyle}>
                                            <Steps size="small" current={0}
                                                   items={[
                                                       {
                                                           title: '选择通道',
                                                       }]}/>
                                            <Card bordered={false} style={{backgroundColor: "#f1f1f1"}}>
                                                <CheckboxGroup options={plainAOptions} value={checkedList}/>
                                            </Card>
                                        </Card.Grid>
                                        <Card.Grid style={gridStyle}>
                                            <Steps size="small" current={1} initial={1}
                                                   items={[
                                                       {
                                                           title: '选择通道',
                                                       }]}/>
                                            <Card bordered={false} style={{backgroundColor: "#f1f1f1"}}>
                                                {/*<Space direction="vertical" size="large" style={{display: 'flex'}}>*/}
                                                {/*    <Row>*/}
                                                {/*        <Col>*/}
                                                <CheckboxGroup options={plainBOptions}
                                                               value={defaultBCheckedList}/>
                                                <br/>
                                                <Collapse bordered={false} ghost={true} style={{paddingBottom:0}} defaultActiveKey={1}>
                                                    <Panel header={"设置解发条件"} key="1">
                                                        <ConditionEditor label={"条件1"} isLast={false}/>
                                                        <ConditionEditor label={"条件2"} isLast={true}/>
                                                    </Panel>
                                                </Collapse>
                                            </Card>
                                        </Card.Grid>
                                        <Button icon={<PlusOutlined/>}>添加步骤</Button>
                                    </Form.Item>
                                    <Form.Item>

                                    </Form.Item>
                                </Form>
                            </Col>
                            <Col flex={"auto"}></Col>
                        </Row>
                    </Card>
                </Content>
            </Layout>
        </Layout>
    );
};

export default Demo;