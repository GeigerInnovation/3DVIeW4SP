/**
 * Component Name: AccessToken.ts
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
import { SPComponentLoader } from "@microsoft/sp-loader";
import { ISPHttpClientOptions, SPHttpClient } from "@microsoft/sp-http";
import { SharepointContextService } from "../../services/sharepoint-context.service";

const CLIENT_ID = ""; /*Enter your CLIENT_ID*/
const CLIENT_SECRET = ""; /*Enter your CLIENT_SECRET*/

const useAccessToken = () => {
  const [accessToken, setAccessToken] = React.useState(null);
  const [isFetching, setIsFetching] = React.useState(false);
  const spContextService: SharepointContextService = React.useMemo(() => SharepointContextService.getInstance(), []);
  const customHttpClient = React.useMemo(() => spContextService.getSharePointContext().httpClient, []);

  React.useEffect(() => {
    setIsFetching(true);
    (async () => {
      await SPComponentLoader.loadScript(
        "https://developer.api.autodesk.com/modelderivative/v2/viewers/7.*/viewer3D.min.js"
      ).catch(err => {
        console.error(err);
        return null;
      });

      const spOpts: ISPHttpClientOptions = {
        body: `client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}&grant_type=client_credentials&scope=viewables:read`,
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      };
      const response = await customHttpClient.post(
        "https://developer.api.autodesk.com/authentication/v1/authenticate",
        SPHttpClient.configurations.v1,
        spOpts
      );
      const responseJSON = await response.json();
      setAccessToken(responseJSON.access_token);
      setIsFetching(false);
    })();
    
    return () => {
      setIsFetching(false);
    }
  }, []);
  
  return {accessToken, isFetching};
};
export default useAccessToken;