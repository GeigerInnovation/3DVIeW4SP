/**
 * Component Name: Navbar.tsx
 * Author: Geiger Gruppe
 * License: GPLv3
 * License URI: http://www.gnu.org/licenses/gpl-3.0.html
 *
 * @package    3DVIeW4SP
 * @contact    Fabian Ritter <fabian.ritter@geigergruppe.de>
 * @copyright  Copyright (c) 2022 - 2023, Geiger Gruppe
 * @link       https://www.geigergruppe.com/de-de/sharepoint-3d-viewer
 * @license    http://www.gnu.org/licenses/gpl-3.0.html
 */

import * as React from "react";
// import { Link } from 'office-ui-fabric-react';
import { Pivot, PivotItem } from "office-ui-fabric-react";
import styles from "./navbar.module.scss";
// import useUrnList from '../../hooks/urnList';
import { ForgeViewerContext } from "../../context/forge-viewer.context";
import { IForgeViewerState } from "../../context/forge-viewer-reducer";
import { resetModelObjectSelection, resizeViewer } from "../ViewerComponent/viewerComponent";

const Navbar: React.FC = (props) => {
  const { state, dispatch } = React.useContext(ForgeViewerContext);

  const selectNavBarSite = (item): IForgeViewerState => {
    switch (item.props.itemKey) {
      case "modelBrowser":
        dispatch({ type: "SET_SIDEBAR_MODE", payload: "Modell-Browser" });
        dispatch({ type: "SET_SELECTED_LIST_PROPERTIES", payload: null});
        dispatch({ type: "SET_CURRENT_MODEL_PROPERTY_LIST_NAME", payload: null});
        resizeViewer();
        resetModelObjectSelection();
        return;
      // case 'smartFilter':
      //   dispatch({type: 'SET_SIDEBAR_MODE', payload: 'smartFilter'});
      //   return;
      case "list":
        dispatch({ type: "SET_SIDEBAR_MODE", payload: "Listen" });
        // dispatch({type: 'SET_SIDEBAR_CONTENT', payload: listData});
        return;
      default:
        console.error("No Element selected");
        return state;
    }
  };

  return (
    <div className={styles.navBar}>
      <div className={styles.elements}>
      <Pivot
        onLinkClick={selectNavBarSite}
        aria-label="Basic Pivot Example"
        styles={{ root: { display: "flex", flexDirection: "column" } }}
      >
        {/* <PivotItem>
        <img src={`data:image/png;base64,${geigerLogo}`}></img>
        </PivotItem> */}
        <PivotItem itemKey="modelBrowser" itemIcon="VisioDiagram">
          {/* <div className={styles.iconDescription}>Modelle</div> */}
        </PivotItem>
        <PivotItem itemKey="smartFilter" itemIcon="RedEye12">
        {/* <div className={styles.iconDescription}>Filter</div> */}
        </PivotItem>
        <PivotItem itemKey="list" itemIcon="Table">
        {/* <div className={styles.iconDescription}>Listen</div> */}
        </PivotItem>
        </Pivot>
        {/* <PivotItem itemKey="circle" itemIcon="ThreeQuarterCircle" />
        <PivotItem itemKey="accept" itemIcon="Accept" /> */}
      </div>
    </div>
  );
};
export default Navbar;
