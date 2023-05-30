/**
 * Component Name: ForgeViewer.context.tsx
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
import { forgeViewerReducer, ForgeViewerReducerAction, IForgeViewerState, initialForgeViewerState } from "./forge-viewer-reducer";

export interface IForgeViewerContext {
  state: IForgeViewerState;
  dispatch?: (action: ForgeViewerReducerAction) => void;
}

const forgeViewerContext: IForgeViewerContext = {
  state: initialForgeViewerState
};

export const ForgeViewerContext: React.Context<IForgeViewerContext> = React.createContext(forgeViewerContext);

export const ForgeViewerStore = ({children}): React.ReactElement => {
  const [state, dispatch] = React.useReducer(forgeViewerReducer, initialForgeViewerState);
  
  return (
    <ForgeViewerContext.Provider value={{state, dispatch}}>
    {children}
    </ForgeViewerContext.Provider>
  );
};