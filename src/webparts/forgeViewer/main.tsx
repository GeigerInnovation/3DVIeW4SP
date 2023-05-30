/**
 * Component Name: Main.tsx
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
// import ForgeViewer from "./components/ForgeViewer";
import { DisplayMode } from "@microsoft/sp-core-library";
import { WebPartContext } from "@microsoft/sp-webpart-base";
import { ForgeViewerStore } from "./context/forge-viewer.context";
import useToggle from "./hooks/toggle";
import { SharepointContextService, SpEnvironmentType } from "./services/sharepoint-context.service";
import { ISPLists } from "./ForgeViewerWebPart";
import ForgeViewerI from "./components/ForgeViewer";

export type MainProps = {
  description?: string;
  isDarkTheme?: boolean;
  environmentMessage?: string;
  hasTeamsContext?: boolean;
  userDisplayName?: string;
  accessToken?: string;
  urnList?: ISPLists;
  displayMode?: DisplayMode;
  spfxContext?: WebPartContext;
};

/**
 * Adjust Sp canvas zone
 * @param environment 
 * @param displayMode 
 */
const adjustSharePointCanvas = (environment: SpEnvironmentType, displayMode: DisplayMode): void => {
  const canvasZone: HTMLElement = document.querySelector(".CanvasZone");
  const controlZone: HTMLElement = document.querySelector(".ControlZone");
  const canvasSection: HTMLElement = document.querySelector(".CanvasSection");
  const workbenchPageContent: HTMLElement = document.getElementById(
      "workbenchPageContent"
  );
  switch (environment) {
      case "localhost":
          workbenchPageContent.style.maxWidth = "unset";
          canvasZone.style.maxWidth = "unset";
          break;
      case "workbench":
          workbenchPageContent.style.maxWidth = "unset";
          canvasZone.style.maxWidth = "unset";
          canvasZone.style.padding = "0";
          canvasSection.style.padding = "0";
          controlZone.style.margin = "0";
          controlZone.style.padding = "0";
          document.body.style.overflow = "hidden";
          break;
      case "sharepoint":
          if (document.getElementById("spCommandBar") && displayMode !== DisplayMode.Edit)
              document.getElementById("spCommandBar").style.display = "none";
  }
};

const Main: React.FC<MainProps> = (props) => {
  const [contextInitialized, setContextInitialized] = useToggle(false);

    React.useEffect(() => {
        (async () => {
            SharepointContextService.init(props.spfxContext, props.displayMode);
            const spContextService: SharepointContextService = SharepointContextService.getInstance();
            spContextService.setupSpfx();
            adjustSharePointCanvas(spContextService.getEnvironment(), props.displayMode);
            setContextInitialized();
        })();
    }, []);

    return (
      <React.StrictMode>
          {contextInitialized &&
            <ForgeViewerStore>
                <ForgeViewerI />
            </ForgeViewerStore>
          }
      </React.StrictMode>
  );
};
export default Main;