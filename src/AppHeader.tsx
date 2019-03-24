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
              icon="applications"
              text="Dummy window"
              onClick={addToTopRight("dummy")}
            />
            <MenuItem icon="applications" text="Components">
              <MenuItem
                icon="applications"
                text="Callout component"
                onClick={addToTopRight("callout")}
              />
              <MenuItem
                icon="applications"
                text="Tabs component"
                onClick={addToTopRight("tabs")}
              />
              <MenuItem
                icon="applications"
                text="Simple Table"
                onClick={addToTopRight("table")}
              />
              <MenuItem
                icon="applications"
                text="Test Table"
                onClick={addToTopRight("test-table")}
              />
            </MenuItem>

            <MenuItem
              icon="applications"
              text="OctaHedron in Stars"
              onClick={addToTopRight("OctaHedronInStars")}
            />
            <MenuItem
              icon="applications"
              text="Morpheus"
              onClick={addToTopRight("Morpheus")}
            />
            <MenuItem
              icon="applications"
              text="GreenCube"
              onClick={addToTopRight("GreenCube")}
            />
            <MenuItem
              icon="applications"
              text="DraggableCubes A"
              onClick={addToTopRight("DraggableCubesA")}
            />
            <MenuItem
              icon="applications"
              text="DraggableCubes B"
              onClick={addToTopRight("DraggableCubesB")}
            />
            <MenuItem
              icon="applications"
              text="PanelStackContainer"
              onClick={addToTopRight("PanelStackContainer")}
            />
            <MenuItem
              icon="map"
              text="GoogleMap"
              onClick={addToTopRight("GoogleMap")}
            />
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
        <Button className={Classes.MINIMAL} icon="document" text="File" />
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
