/**
 * Component Name: Mystrings.d.ts
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

declare interface IForgeViewerWebPartStrings {
  PropertyPaneDescription: string;
  BasicGroupName: string;
  DescriptionFieldLabel: string;
  AppLocalEnvironmentSharePoint: string;
  AppLocalEnvironmentTeams: string;
  AppLocalEnvironmentOffice: string;
  AppLocalEnvironmentOutlook: string;
  AppSharePointEnvironment: string;
  AppTeamsTabEnvironment: string;
  AppOfficeEnvironment: string;
  AppOutlookEnvironment: string;
}

declare module 'ForgeViewerWebPartStrings' {
  const strings: IForgeViewerWebPartStrings;
  export = strings;
}
