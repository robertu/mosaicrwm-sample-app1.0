import React, { MouseEvent } from "react";
import {
  Classes,
  Icon,
  Menu,
  MenuDivider,
  MenuItem,
  Popover,
  Position,
  Alignment,
  Button,
  Navbar,
  NavbarDivider,
  NavbarGroup,
  NavbarHeading
} from "@blueprintjs/core";

import { CustomSvg } from "./CustomSvg";
const { version } = require("../package.json");

type ThemedIconProps = {
  light_theme: boolean;
};

type ThemedHeaderProps = {
  light_theme: boolean;
  themeSwitch: () => void;
  autoArrange: () => void;
  addToTopRight: (name: string) => (event: MouseEvent) => void;
};

const CustomLogo = ({ light_theme }: ThemedIconProps) => (
  <CustomSvg width={80} height={32} light_theme={light_theme} />
);

const AppHeader = ({
  light_theme,
  themeSwitch,
  autoArrange,
  addToTopRight
}: ThemedHeaderProps) => (
  <Navbar className={light_theme ? undefined : Classes.DARK}>
    <NavbarGroup align={Alignment.LEFT}>
      <Popover
        content={
          <Menu>
            <MenuItem
              icon="grid-view"
              text="Rearrange windows"
              onClick={autoArrange}
            />
            <MenuItem
              icon="contrast"
              text={
                light_theme ? "Switch to dark theme" : "Switch to light theme"
              }
              onClick={themeSwitch}
            />
            <MenuDivider />
            <MenuItem icon="new-text-box" text="New text 2" />
            <MenuItem icon="new-object" text="New object" />
            <MenuItem icon="new-link" text="New link" />
            <MenuDivider />
            <MenuItem icon="cog" text="Settings..." />
            <MenuDivider />
            <MenuItem
              icon="cross"
              labelElement={<Icon icon="share" />}
              text="Logout"
            />
          </Menu>
        }
        position={Position.BOTTOM_LEFT}
        minimal
      >
        <Button
          className={Classes.MINIMAL}
          icon={<CustomLogo light_theme={light_theme} />}
          text={null}
        />
      </Popover>
      <NavbarDivider />
      <Popover
        content={
          <Menu>
            <MenuItem
              icon={"document"}
              text="Dummy window"
              onClick={addToTopRight("dummy")}
            />
            <MenuItem
              icon={"application"}
              text="Callout component"
              onClick={addToTopRight("callout")}
            />
            <MenuItem
              icon={"tag"}
              text="Tabs component"
              onClick={addToTopRight("tabs")}
            />
            <MenuItem
              icon={"th"}
              text="Simple Table"
              onClick={addToTopRight("table")}
            />
            <MenuItem
              icon={"th"}
              text="Test Table"
              onClick={addToTopRight("test-table")}
            />
            <MenuItem
              icon={"th"}
              text="Stack Panel"
              onClick={addToTopRight("PanelStackContainer")}
            />
            <MenuDivider />

            <MenuItem
              icon="map"
              text="GoogleMap"
              onClick={addToTopRight("GoogleMap")}
            />
            <MenuDivider />

            <MenuItem
              icon="th"
              text="Test (no menu close possible)"
              shouldDismissPopover={false}
            />
            <MenuItem
              icon="zoom-to-fit"
              text="Nucleus (disabled)"
              disabled={true}
            />
          </Menu>
        }
        minimal
        position={Position.BOTTOM_LEFT}
      >
        <Button
          className={Classes.MINIMAL}
          icon="applications"
          text="Components"
        />
      </Popover>
      <Popover
        content={
          <Menu>
            <MenuItem
              icon="application"
              text="OctaHedron in Stars"
              onClick={addToTopRight("OctaHedronInStars")}
            />
            <MenuItem
              icon={"layout-balloon"}
              text="Morpheus"
              onClick={addToTopRight("Morpheus")}
            />
            <MenuItem
              icon={"properties"}
              text="GreenCube"
              onClick={addToTopRight("GreenCube")}
            />
            <MenuItem
              icon={"gantt-chart"}
              text="DraggableCubes A"
              onClick={addToTopRight("DraggableCubesA")}
            />
            <MenuItem
              icon={"image-rotate-left"}
              text="DraggableCubes B"
              onClick={addToTopRight("DraggableCubesB")}
            />
          </Menu>
        }
        minimal
        position={Position.BOTTOM_LEFT}
      >
        <Button
          className={Classes.MINIMAL}
          icon={"polygon-filter"}
          text="WebGL"
        />
      </Popover>
      <Popover
        content={
          <Menu>
            <MenuItem icon="graph" text="Graph (not yet)" />
            <MenuItem
              icon="map"
              text="Map"
              onClick={addToTopRight("GoogleMap")}
            />
            <MenuItem icon="th" text="Table" shouldDismissPopover={false} />
            <MenuItem icon="zoom-to-fit" text="Nucleus" disabled={true} />
            <MenuDivider />
            <MenuItem icon="cog" text="Settings...">
              <MenuItem icon="add" text="Add new application" disabled={true} />
              <MenuItem icon="remove" text="Remove application" />
            </MenuItem>
          </Menu>
        }
        minimal
        position={Position.BOTTOM_LEFT}
      >
        <Button className={Classes.MINIMAL} icon="edit" text="Edit" />
      </Popover>
    </NavbarGroup>
    <NavbarGroup align={Alignment.RIGHT}>
      <NavbarHeading>Sample Mosaic based application v{version}</NavbarHeading>
      <NavbarDivider />

      <Popover
        content={
          <Menu>
            <MenuItem icon="new-text-box" text="New text" />
            <MenuItem icon="new-object" text="New object" />
            <MenuItem
              icon="contrast"
              text={
                light_theme ? "Switch to dark theme" : "Switch to light theme"
              }
              onClick={themeSwitch}
            />
            <MenuDivider />
            <MenuItem
              icon="cog"
              labelElement={<Icon icon="share" />}
              text="Settings..."
            />
          </Menu>
        }
        position={Position.BOTTOM_RIGHT}
        minimal
      >
        <Button className={Classes.MINIMAL} icon="user" text="User" />
      </Popover>
    </NavbarGroup>
  </Navbar>
);

export default AppHeader;
