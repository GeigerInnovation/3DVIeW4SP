/**
 * Component Name: SideBarContent.tsx
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
import { ForgeViewerContext } from "../../../context/forge-viewer.context";
import { useModels } from "../../../hooks/service-hooks/modelListService";
import { resizeViewer } from "../../ViewerComponent/viewerComponent";
import styles from "./sideBarContent.module.scss";

export const SideBarContent: React.FC<unknown> = (props) => {
  const { models } = useModels();
  const { state, dispatch } = React.useContext(ForgeViewerContext);

  React.useEffect(() => {
    if (!models) return;
    if (!state.currentModel) {
      // dispatch({ type: "SELECT_NEW_MODEL", payload: models[0] });
    }
  }, [models, state.currentModel]);

  const renderSidebarContent = (): React.ReactElement => {
    switch (state.sideBarMode) {
      case "Modell-Browser":
        return (
          <div>
            <section>
              {models?.length > 0 
                ? models.map((urn, index) => (
                    <div key={index}
                      className={styles.sidebarList}
                      onClick={() => {
                        dispatch({ type: "SELECT_NEW_MODEL", payload: urn });
                        dispatch({ type: "SET_CURRENT_MODEL_PROPERTY_LIST_NAME", payload: null });
                        dispatch({ type: "SET_SELECTED_LIST_PROPERTIES", payload: null });
                      }
                      }>
                      {urn.Name}
                    </div>
                  ))
                : "No Models loaded"}
            </section>
          </div>
        );
      case "Listen":
        return (
          <div>
            <section>
              {state.currentModel
                ? state.currentModel.PropertyLists.split("\n").map((listName, index) => (
                    <div key={index}
                      className={styles.sidebarList}
                      onClick={() => {
                        dispatch({
                          type: "SET_CURRENT_MODEL_PROPERTY_LIST_NAME",
                          payload: listName
                        })
                        resizeViewer();
                      }
                      }>
                      {listName}
                    </div>
                  ))
                : "No Model loaded"}
            </section>
          </div>
        );
      default:
        console.error("No Element selected");
        return;
    }
  };

  return (
    <div>
      <p>{renderSidebarContent()}</p>
    </div>
  );
};
