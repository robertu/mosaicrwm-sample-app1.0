import * as React from "react";

import { Button, H5, Intent, PanelStack, UL } from "@blueprintjs/core";
import "./panelStack.less";
import DataExample from "./Tables/DataTable";

// tslint:disable-next-line:max-classes-per-file
class PanelContent extends React.PureComponent {
  render() {
    console.log({panelProps: this.props});
    return (
      <div>
        <Button intent={Intent.PRIMARY} onClick={this.openNewPanel} text="Open new panel" />
        <div className="table-container">
          <DataExample />
        </div>
      </div>
    );
  }

  openNewPanel = () => {
    const panelNumber = this.props.panelNumber + 1;
    this.props.openPanel({
      component: PanelContent,
      props: { panelNumber },
      title: `Panel ${panelNumber}`
    });
  };
}

class PanelStackContainer extends React.PureComponent {
  initialPanel = {
    component: PanelContent,
    props: {
      panelNumber: 1
    },
    title: "Panel"
  };

  state = {
    currentPanelStack: [this.initialPanel]
  };

  render() {
    // const stackList = (
    //   <>
    //     <H5>Current stack</H5>
    //     <UL>
    //       {this.state.currentPanelStack.map((p, i) => (
    //         <li key={i}>{p.title}</li>
    //       ))}
    //     </UL>
    //   </>
    // );
    return (
      <PanelStack
        className="panel-container"
        initialPanel={this.state.currentPanelStack[0]}
        onOpen={this.addToPanelStack}
        onClose={this.removeFromPanelStack}
      />
    );
  }

  addToPanelStack = newPanel => {
    this.setState(state => ({ currentPanelStack: [newPanel, ...state.currentPanelStack] }));
  };

  removeFromPanelStack = _lastPanel => {
    // In this example, the last panel is always the one closed.
    // Using `this.props.closePanel()` is one way to violate this.
    this.setState(state => ({ currentPanelStack: state.currentPanelStack.slice(1) }));
  };
}

export default PanelStackContainer;
