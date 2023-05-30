/**
 * Component Name: ForgeViewer.tsx
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
import Navbar from "./navbar/navbar";
import styles from "./ForgeViewer.module.scss";
import { SideBar } from "./sidebar/sidebar";
import { IForgeViewerProps } from "../ForgeViewerWebPart";
import { ForgeViewerContext } from "../context/forge-viewer.context";
import PropertyList from "./list/propertyList";
import useAccessToken from "../hooks/service-hooks/accessToken";
import { launchViewer } from "./ViewerComponent/viewerComponent";

const ForgeViewerI: React.FC<IForgeViewerProps> = (props) => {
  const { state } = React.useContext(ForgeViewerContext);
  const { accessToken } = useAccessToken();

  React.useEffect(() => {
    if (!state.currentModel || !accessToken) return;
    launchViewer(state.currentModel?.URN, accessToken).catch((err) => {
      console.error(err);
      return null;
    });
  }, [state.currentModel, accessToken]);

  return (
    <>
      <link
        rel="stylesheet"
        href="https://developer.api.autodesk.com/modelderivative/v2/viewers/7.*/style.min.css"
        type="text/css"
      />
      <div className={styles.App}>
        <Navbar />
        <main>
          <section className={styles.upperContent}>
            <SideBar />
            {state.currentModel && (
              <div className={styles.ForgeViewer}>
                <div id="forgeViewer" />
              </div>
            )}
            {!state.currentModel && (
              <div className={styles.ForgeViewerNoModel}>
                <div className={styles.noModelSelect}>
                  <p>by Geiger</p>
                  <p>Select a Model from the Sidebar</p>
                </div>
              </div>
            )}
          </section>
          <PropertyList />
        </main>
      </div>
    </>
  );
};

export default ForgeViewerI;
