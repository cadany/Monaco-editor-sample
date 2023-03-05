import React from 'react';
import {CodeEditor} from "./CodeEditor";

export class App extends React.Component {
  render() {
    return (
        <div style={{height: "100vh", width: "100vw"}}>
            <CodeEditor />
        </div>
    );
  }
}