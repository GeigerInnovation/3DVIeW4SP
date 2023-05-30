/**
 * Component Name: SideBar.tsx
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
import { useState } from "react";
import { SearchBox } from "@fluentui/react";
import styles from "./sidebar.module.scss";
import { ForgeViewerContext } from "../../context/forge-viewer.context";
import { SideBarContent } from "./sideBarContent/sideBarContent";
import { DefaultButton, PrimaryButton } from "office-ui-fabric-react";
import { getDbIds, resetModelObjectSelection } from "../../components/ViewerComponent/viewerComponent";

export const SideBar: React.FC = () => {
  const [searchValue, setSearchValue] = useState("");
  const { state, dispatch } = React.useContext(ForgeViewerContext);

  const handleSearch = (event): void => {
    setSearchValue(event.target.value);
  };

  const resetObjectModelSelection = (): void => {
    dispatch({type: 'SET_SELECTED_LIST_PROPERTIES', payload: []});
    resetModelObjectSelection();
  }

  const setObjectModelSelection = (): void => {
    getDbIds(state.selectedListProperties);
  }

  return (
    <aside className={styles.sidebar}>
      <div className={styles.sideBarMode}>{state.sideBarMode}
      {state.sideBarMode &&
         <p className={styles.modelName}>{state?.currentModel?.Name ? state.currentModel?.Name : 'No Model selected'}</p>
       }
      </div>
      <SearchBox
        className={styles.searchBox}
        placeholder="Suche..."
        value={searchValue}
        onChange={handleSearch}
      />
      <SideBarContent />
      {state.selectedListProperties !== null && state.currentModelPropertyListName !== null &&
      <div className={styles.selectionButton}>
        <PrimaryButton className={styles.applyButton} text="Filter" onClick={setObjectModelSelection} />
        <DefaultButton className={styles.resetButton} text="Reset" onClick={resetObjectModelSelection} />
      </div>
      }
    </aside>
  );
};
