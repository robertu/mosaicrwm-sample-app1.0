import { Button, Classes, ControlGroup, FocusStyleManager, InputGroup, Callout, Code, H4, NonIdealState } from '@blueprintjs/core';
import classNames from 'classnames';
import { KeyedCollection } from './types';
import React from 'react';

import { MosaicBranch, Mosaic, MosaicNode, MosaicWindow, MosaicZeroState } from 'mosaicrwm';

import { AppHeader } from './AppHeader';

import GreenCube from "./components/GreenCube";
import Morpheus from "./components/Morpheus";
import ExampleTabs from "./components/ExampleTabs";
import DataTable from "./components/Tables/DataTable";
import TabelaDynamicznie from "./components/Tables/TabelaDynamicznie";
import OctaHedronInStars from "./components/OctaHedronInStars";
import DraggableCubes from "./components/DraggableCubes";
import PanelStackContainer from "./components/PanelStackContainer";
import Form from "./components/Form";
import Map from "./components/Map";
import '@blueprintjs/core/lib/css/blueprint.css';
import '@blueprintjs/icons/lib/css/blueprint-icons.css';
import '@blueprintjs/table/lib/css/table.css';
import 'mosaicrwm/style.css';
import './App.less';

FocusStyleManager.onlyShowFocusOnTabs();



const ELEMENT_MAP = new KeyedCollection<React.ReactElement>();

ELEMENT_MAP.add(
  "JOSZKO",
  <div className="example-window" style={{ height: "100%" }}>
    <Callout
      icon="chat"
      intent="success"
      title="Visually important content"
      style={{ height: "100%" }}
    >
      The component is a simple wrapper around the CSS API that provides props
      for modifiers and optional title element. Any additional HTML props will
      be spread to the rendered <Code>{"<div>"}</Code> element.
    </Callout>
  </div>
);

// ELEMENT_MAP.add("Stack Panel", <PanelStackContainer />);
// ELEMENT_MAP.add("Form", <Form />);
ELEMENT_MAP.add("GreenCube 1", <GreenCube />);
ELEMENT_MAP.add("GreenCube 2", <GreenCube />);
ELEMENT_MAP.add("GreenCube 3", <GreenCube />);
// ELEMENT_MAP.add("Dynamic Table", <TabelaDynamicznie />);
// ELEMENT_MAP.add("GoogleMap", <Map />);
ELEMENT_MAP.add("Morpheus", <Morpheus />);




export interface AppState {
  lightTheme: boolean;
  mosaic: null | any;
}

export class App extends React.Component<{}, AppState> {
  seqNumber: number = 0;

  constructor(props: Readonly<{}>) {
    super(props);
    this.state = {
      lightTheme: true,
      mosaic: null,
    };
  }

  private renderTile = (name: string, path: MosaicBranch[]): JSX.Element => {
    console.log({name, path, cont: ELEMENT_MAP.contains(name)});
    return (
      <MosaicWindow<string>
        // toolbarControls={name === 'B' ? <Button minimal={true} icon="help" /> : true}
        // statusbar={name !== 'C'}
        name={name}
        // statusbarControls={
        //   <ControlGroup fill={true} vertical={false}>
        //     <InputGroup disabled={true} placeholder="Find filters..." value={'Status Bar'} />
        //   </ControlGroup>
        // }
        title={name}
        path={path}
        // tslint:disable-next-line:no-console
        onDragStart={() => console.log('MosaicWindow.onDragStart')}
        // tslint:disable-next-line:no-console
        onDragEnd={(type) => console.log('MosaicWindow.onDragEnd', type)}
      >
        {ELEMENT_MAP.contains(name) ? ELEMENT_MAP.item(name) : <H4>{name}</H4>}
      </MosaicWindow>
    );
  };

  private setMosaicRef = (mosaic: any) => {
    this.setState({ mosaic });
  };

  private nodeCreator = (nodeName: string): MosaicNode<string> => {
    ++this.seqNumber;
    const unique: string = `${nodeName}${this.seqNumber}`;
    switch (nodeName) {
      case "callout": {
        ELEMENT_MAP.add(
          unique,
          <Callout icon="chat" title="Visually important content">
            The component is a simple wrapper around the CSS API that provides
            props for modifiers and optional title element. Any additional HTML
            props will be spread to the rendered <Code>{"<div>"}</Code> element.
          </Callout>
        );
        break;
      }
      case "tabs": {
        ELEMENT_MAP.add(
          unique,
          <div className="example-window" style={{ height: "100%" }}>
            <ExampleTabs />
          </div>
        );
        break;
      }
      case "GoogleMaps": {
        ELEMENT_MAP.add(unique, <Map />);
        break;
      }
      case "Form": {
        ELEMENT_MAP.add(unique, <Form />);
        break;
      }
      case "table1": {
        ELEMENT_MAP.add(unique, <DataTable />);
        break;
      }
      case "table2": {
        ELEMENT_MAP.add(unique, <TabelaDynamicznie />);
        break;
      }
      case "OctaHedronInStars": {
        ELEMENT_MAP.add(unique, <OctaHedronInStars />);
        break;
      }
      case "GreenCube": {
        ELEMENT_MAP.add(unique, <GreenCube />);
        break;
      }
      case "Morpheus": {
        ELEMENT_MAP.add(unique, <Morpheus />);
        break;
      }
      case "DraggableCubesA": {
        ELEMENT_MAP.add(unique, <DraggableCubes count={50} />);
        break;
      }
      case "DraggableCubesB": {
        ELEMENT_MAP.add(
          unique,
          <DraggableCubes count={200} rotation={10} rescale={4} />
        );
        break;
      }
      case "PanelStackContainer": {
        ELEMENT_MAP.add(unique, <PanelStackContainer />);
        break;
      }
      default:
        ELEMENT_MAP.add(unique, (
          <NonIdealState
          icon={"application"}
          title="sample window"
          description={"Sorry, but this is dummy window."}
          action={<a href="https://blueprintjs.com/docs/#core/components/non-ideal-state">This is me</a>}
      />

        ));
    }
    this.state.mosaic.addToTopRight(unique);
    return unique;
  };

  private themeSwitch = () => {
    this.setState({
      lightTheme: !this.state.lightTheme,
    });
  };

  render() {
    return (
      <div className="react-mosaic-app">
        <AppHeader
          lightTheme={this.state.lightTheme}
          mosaic={this.state.mosaic}
          nodeCreator={this.nodeCreator}
          themeSwitch={this.themeSwitch}
        />
        <Mosaic<string>
          setRef={this.setMosaicRef}
          renderTile={this.renderTile}
          zeroStateView={<MosaicZeroState createNode={() => this.nodeCreator('dummy')} />}
          // value={this.state.currentNode}
          // onChange={this.changeCurrentNode}
          initialValue={'Morpheus'}
          // onRelease={this.onRelease}
          className={classNames('mosaic-blueprint-theme', this.state.lightTheme ? null : Classes.DARK)}
        />
      </div>
    );
  }

  // private changeCurrentNode = (currentNode: MosaicNode<string> | null) => {
  //   this.setState({ currentNode });
  // };

  // private onRelease = (currentNode: MosaicNode<string> | null) => {
  //   // tslint:disable-next-line:no-console
  //   console.log('Mosaic.onRelease():', currentNode);
  // };
}
