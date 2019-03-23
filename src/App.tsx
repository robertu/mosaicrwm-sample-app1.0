import { Classes } from "@blueprintjs/core";
import classNames from "classnames";
import dropRight from "lodash/dropRight";
import React, { PureComponent } from "react";
import { Callout, Code, H5 } from "@blueprintjs/core";
import { Button, Card, Elevation } from "@blueprintjs/core";
import { FocusStyleManager } from "@blueprintjs/core";
import {
  Corner,
  createBalancedTreeFromLeaves,
  getLeaves,
  getNodeAtPath,
  getOtherDirection,
  getPathToCorner,
  Mosaic,
  MosaicDirection,
  MosaicNode,
  MosaicParent,
  MosaicWindow,
  MosaicZeroState,
  updateTree
} from "mosaicrwm";

import ExampleTabs from "./components/ExampleTabs";
import AppHeader from "./AppHeader";
import DataTable from "./components/Tables/DataTable";
import TabelaDynamicznie from "./components/Tables/TabelaDynamicznie";
import OctaHedronInStars from "./components/OctaHedronInStars";
import GreenCube from "./components/GreenCube";
import DraggableCubes from "./components/DraggableCubes";
import PanelStackContainer from "./components/PanelStackContainer";
import Form from "./components/Form";

import "@blueprintjs/core/lib/css/blueprint.css";
import "@blueprintjs/icons/lib/css/blueprint-icons.css";
import "@blueprintjs/table/lib/css/table.css";
import "@blueprintjs/core/lib/less/variables.less";

import "mosaicrwm/mosaicrwm.css";
import { KeyedCollection } from './types';

import "./App.less";

FocusStyleManager.onlyShowFocusOnTabs();

let windowCount = 0;

const ELEMENT_MAP = new KeyedCollection<React.ReactElement>();

ELEMENT_MAP.add(
  "JOSZKO",
  <div className="example-window" style={{ height: "100%" }}>
    <Callout icon="chat" intent="success" title="Visually important content" style={{ height: "100%" }}>
      The component is a simple wrapper around the CSS API that provides props for modifiers and optional title element. Any additional HTML props will be spread to the rendered{" "}
      <Code>{"<div>"}</Code> element.
    </Callout>
  </div>
);

ELEMENT_MAP.add("FISZER", <PanelStackContainer />);
ELEMENT_MAP.add("BABOK", <Form />);
ELEMENT_MAP.add("TABLE", <TabelaDynamicznie />);


export interface ExampleAppState {
  currentNode: MosaicNode<string> | null;
  light_theme: boolean;
}

class App extends PureComponent<{}, ExampleAppState> {
  state: ExampleAppState = {
    currentNode: {
      direction: "row",
      first: "JOSZKO",
      second: {
        direction: "column",
        first: "FISZER",
        second: {
          direction: "column",
          first: "TABLE",
          second: "BABOK"
        }
      },
      splitPercentage: 20
    },
    light_theme: true
  };

  onChange = (currentNode: MosaicNode<string> | null) => {
    this.setState({ currentNode });
  };

  onRelease = (currentNode: MosaicNode<string> | null) => {
    console.log("Mosaic.onRelease():", currentNode);
  };

  createNodeContent = (name: string) => {
    const created = `${name}${++windowCount}`;
    switch (name) {
      case "callout": {
        ELEMENT_MAP.add(
          created,
          <Callout icon="chat" title="Visually important content">
            The component is a simple wrapper around the CSS API that provides props for modifiers and optional title element. Any additional HTML props will be spread to the
            rendered <Code>{"<div>"}</Code> element.
          </Callout>
        );
        break;
      }
      case "tabs": {
        ELEMENT_MAP.add(
          created,
          <div className="example-window" style={{ height: "100%" }}>
            <ExampleTabs />
          </div>
        );
        break;
      }
      case "table": {
        ELEMENT_MAP.add(created, <DataTable />);
        break;
      }
      case "test-table": {
        ELEMENT_MAP.add(created, <TabelaDynamicznie />);
        break;
      }
      case "OctaHedronInStars": {
        ELEMENT_MAP.add(created, <OctaHedronInStars />);
        break;
      }
      case "GreenCube": {
        ELEMENT_MAP.add(created, <GreenCube />);
        break;
      }
      case "DraggableCubesA": {
        ELEMENT_MAP.add(created, <DraggableCubes count={50} />);
        break;
      }
      case "DraggableCubesB": {
        ELEMENT_MAP.add(created, <DraggableCubes count={200} rotation={10} rescale={4} />);
        break;
      }
      case "PanelStackContainer": {
        ELEMENT_MAP.add(created, <PanelStackContainer />);
        break;
      }
      default:
        ELEMENT_MAP.add(created, <div />);
    }
    return created;
  };

  createNode = (name: string) => () => {
    return this.createNodeContent(name);
  };

  private autoArrange = () => {
    const leaves = getLeaves(this.state.currentNode);

    this.setState({
      currentNode: createBalancedTreeFromLeaves(leaves)
    });
  };

  themeSwitch = () => {
    this.setState({
      light_theme: !this.state.light_theme
    });
  };

  addToTopRight = (name: string) => () => {
    const created = this.createNodeContent(name);
    let { currentNode } = this.state;
    if (currentNode) {
      const path = getPathToCorner(currentNode, Corner.TOP_RIGHT);
      const parent = getNodeAtPath(currentNode, dropRight(path)) as MosaicParent<string>;
      const destination = getNodeAtPath(currentNode, path) as MosaicNode<string>;
      const direction: MosaicDirection = parent ? getOtherDirection(parent.direction) : "row";

      let first;
      let second;
      if (direction === "row") {
        first = destination;
        second = created;
      } else {
        first = created;
        second = destination;
      }

      currentNode = updateTree(currentNode, [
        {
          path,
          spec: {
            $set: {
              direction,
              first,
              second
            }
          }
        }
      ]);
    } else {
      currentNode = created;
    }

    this.setState({ currentNode });
  };

  render() {
    return (
      <div className={classNames("react-mosaic-app", "mosaic-blueprint-theme", this.state.light_theme ? null : Classes.DARK)}>
        <AppHeader light_theme={this.state.light_theme} autoArrange={this.autoArrange} themeSwitch={this.themeSwitch} addToTopRight={this.addToTopRight} />
        <Mosaic<string>
          renderTile={(name, path) => (
            <MosaicWindow<string>
              additionalControls={
                name === "dummy2" ? <Button minimal={true} icon="airplane" /> : []
              }
              title={name}
              createNode={this.createNode("dummy")}
              path={path}
              onDragStart={() => console.log("MosaicWindow.onDragStart")}
              onDragEnd={(type) => console.log("MosaicWindow.onDragEnd", type)}
              renderToolbar={null}
            >
              {ELEMENT_MAP.item(name)}
            </MosaicWindow>
          )}
          zeroStateView={<MosaicZeroState createNode={this.createNode("dummy")} />}
          value={this.state.currentNode}
          onChange={this.onChange}
          onRelease={this.onRelease}
          className={classNames("mosaic-blueprint-theme", this.state.light_theme ? null : Classes.DARK)}
        />
      </div>
    );
  }
}

export default App;
