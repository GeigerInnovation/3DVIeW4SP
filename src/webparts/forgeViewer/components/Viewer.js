/**
 * Component Name: Viewer.js
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

// // import TurnTableExtension from 'Extensions/CameraRotation/CameraRotation';
// // import DrawToolExtension from 'Extensions/DrawToolExtension/DrawToolExtension';
// var viewer;

// // const extensions = [
//   // TurnTable,
//   // DrawToolExtension
// // ]

// // @urn the model to show
// // @viewablesId which viewables to show
// // @accessToken access token with viewables:read scope to display the model
// export function launchViewer(urn, viewableId, accessToken) {
//   console.log('launchViewer')

//   var options = {
//     env: 'AutodeskProduction',
//     getAccessToken: callback => {
//       callback(accessToken, 3600);
//     },
//     api: 'derivativeV2' + (atob(urn.replace('_', '/')).indexOf('emea') > -1 ? '_EU' : '') // handle OSS US and EU regions
//   };

//   if (viewer === undefined) {
//     Autodesk.Viewing.Initializer(options, () => {

//       //Camera Rotation
//       // Autodesk.Viewing.theExtensionManager.registerExtension('TurnTable', TurnTableExtension);

//       // next extension
//       // Autodesk.Viewing.theExtensionManager.registerExtension('DrawToolExtension', DrawToolExtension);

//       viewer = new Autodesk.Viewing.GuiViewer3D(document.getElementById('forgeViewer'), { extensions: [ 'Autodesk.DocumentBrowser'] });
//       viewer.start();
//       var documentId = 'urn:' + urn;
//       Autodesk.Viewing.Document.load(documentId, onDocumentLoadSuccess, onDocumentLoadFailure);
//     })
//   } else {
//     var documentId = 'urn:' + urn;
//     Autodesk.Viewing.Document.load(documentId, onDocumentLoadSuccess, onDocumentLoadFailure);
//   }

//   function onDocumentLoadSuccess(doc) {
//     // if a viewableId was specified, load that view, otherwise the default view
//     var viewables = (viewableId ? doc.getRoot().findByGuid(viewableId) : doc.getRoot().getDefaultGeometry());
//     viewer.loadDocumentNode(doc, viewables).then(i => {
//     });
//   }

//   function onDocumentLoadFailure(viewerErrorCode, viewerErrorMsg) {
//     console.error('onDocumentLoadFailure() - errorCode:' + viewerErrorCode + '\n- errorMessage:' + viewerErrorMsg);
//   }
// }
