/**
 * Component Name: ForgeViewerReducer.ts
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

import { ModelListDto } from "../dtos/modelListDto";

/**
 * ForgeViewer reducer action
 */
export type ForgeViewerReducerAction =
  | { type: "SELECT_NEW_MODEL"; payload: ModelListDto }
  | { type: "SET_SIDEBAR_MODE"; payload: string }
  | { type: "SET_CURRENT_MODEL_PROPERTY_LIST_NAME"; payload: string}
  | { type: "SET_SELECTED_LIST_PROPERTIES"; payload: string[]};

/**
 * ForgeViewer state interface
 */
export interface IForgeViewerState {
  currentModel: ModelListDto;
  currentModelPropertyListName: string;
  sideBarMode: string;
  selectedListProperties: string[];
}

/**
 * Initialize app state
 */
export const initialForgeViewerState: IForgeViewerState = {
  currentModel: null,
  currentModelPropertyListName: null,
  sideBarMode: "Modell-Browser",
  selectedListProperties: null
};

/**
 * ForgeViewer reducer - takes and reduces global app state by given action
 * @param state
 * @param action
 * @returns
 */
export const forgeViewerReducer = (
  state: IForgeViewerState,
  action: ForgeViewerReducerAction
): IForgeViewerState => {
  switch (action?.type) {
    case "SELECT_NEW_MODEL":
      return { ...state, currentModel: action.payload };
    case "SET_SIDEBAR_MODE":
      return { ...state, sideBarMode: action.payload };
    case "SET_CURRENT_MODEL_PROPERTY_LIST_NAME":
      return { ...state, currentModelPropertyListName: action.payload };
      case "SET_SELECTED_LIST_PROPERTIES":
      return { ...state, selectedListProperties: action.payload };
    default:
      console.error("invalid action type or payload");
      return state;
  }
};
