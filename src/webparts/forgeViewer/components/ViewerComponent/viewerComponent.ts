/**
 * Component Name: ViewerComponent.ts
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

import { SPComponentLoader } from "@microsoft/sp-loader";

let viewer;

const onDocumentLoadSuccess = (doc): void => {
  // if a viewableId was specified, load that view, otherwise the default view
  const viewables = doc.getRoot().getDefaultGeometry();
  viewer.loadDocumentNode(doc, viewables).then(() => {
    // getDbIds();
  });
};

const onDocumentLoadFailure = (viewerErrorCode, viewerErrorMsg): void => {
  console.error(
    "onDocumentLoadFailure() - errorCode:" +
      viewerErrorCode +
      "\n- errorMessage:" +
      viewerErrorMsg
  );
};

/**
 * Resizes the Viewer
 */
export const resizeViewer = () => {
  setTimeout(() => {
    viewer.resize();
  }, 250);
}

export const launchViewer = async (urn, accessToken): Promise<void> => {
  await SPComponentLoader.loadScript(
    "https://developer.api.autodesk.com/modelderivative/v2/viewers/7.*/viewer3D.min.js"
  ).then(() => {
    const options = {
      env: "AutodeskProduction",
      getAccessToken: (callback) => {
        callback(accessToken);
      },
    };
    if (viewer === undefined) {
      Autodesk.Viewing.Initializer(options, () => {
        viewer = new Autodesk.Viewing.GuiViewer3D(
          document.getElementById("forgeViewer"),
          { extensions: ["Autodesk.DocumentBrowser"] }
        );
        viewer.start();
        const documentId = "urn:" + urn;
        Autodesk.Viewing.Document.load(
          documentId,
          onDocumentLoadSuccess,
          onDocumentLoadFailure
        );
      });
    } else {
      const documentId = "urn:" + urn;
      Autodesk.Viewing.Document.load(
        documentId,
        onDocumentLoadSuccess,
        onDocumentLoadFailure
      );
    }
  });
};

export const getDbIds = (modelProperties: string[]): void => {
  let bulkDbIds: number[] = [];
  if (!modelProperties) return;
  viewer.model.getInstanceTree();
  for (const prop of modelProperties) {
    viewer.search(prop, (dbIds, err) => {
      if(err) console.error(err, 'property not found');
      else {
        bulkDbIds = bulkDbIds.concat(dbIds);
      }
    });
  }
  viewer.model.getBulkProperties(bulkDbIds, {}, function (elements) {
    viewer.isolate(bulkDbIds);
    console.log(bulkDbIds);
  });
};

export const resetModelObjectSelection = (): void => {
  viewer.isolate([]);
}
