/**
 * Component Name: ModelListService.ts
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
import { ModelListDto } from "../../dtos/modelListDto";
import { ISPList, ISPLists } from "../../ForgeViewerWebPart";
import { sp } from "@pnp/sp";
import "@pnp/sp/webs";
import "@pnp/sp/lists";
import "@pnp/sp/items";

export const useUrns = (): unknown => {
  const [urns, setUrns] = React.useState<ISPLists>(null);
  const [isFetching, setIsFetching] = React.useState(false);
  const [hasError, setHasError] = React.useState<boolean>(false);

  React.useEffect(() => {
    setIsFetching(true);
    (async() => { 
    const res: unknown = await sp.web.lists.getByTitle('Modellliste').items
    .get()
    .catch(err => {
      console.error(err);
      return null;
    });
    if(!res) { 
      setHasError(true); 
      setIsFetching(false);
      setUrns(null);
      return;
    }
    const urnValues: ISPList[] = (res as ModelListDto[]).map((item) => {
      return { Name: item.Name, Urn: item.URN };
    });
    setUrns({value: urnValues});
    setIsFetching(false);
  })();
  return () => {
    setHasError(false);
    setIsFetching(false);
  }
  }, []);
  return { urns, hasError, isFetching };
};

export const useModelById = (modelId: number): unknown => {
  const [modelById, setModelById] = React.useState<ModelListDto>();
  const [isFetching, setIsFetching] = React.useState<boolean>(false);
  const [hasError, setHasError] = React.useState<boolean>(false);

  React.useEffect(() => {
    if (!modelId) return;
    (async () => {
      setIsFetching(true);
      try {
        const res: unknown = await sp.web.lists
          .getByTitle("Modellliste")
          .items.getById(modelId);
        if (!res) setHasError(true);
        setModelById(res && res as ModelListDto);
      } catch (err) {
        console.error(err);
        setHasError(true);
        setModelById(null);
      }
      setIsFetching(false);
    })();

    return () => {
      setHasError(false);
      setIsFetching(false);
    };
  }, [modelId]);

  return {modelById, isFetching, hasError}; 
};

export const useModels = () => {
  const [models, setModels] = React.useState<ModelListDto[]>();
  const [isFetching, setIsFetching] = React.useState<boolean>(false);
  const [hasError, setHasError] = React.useState<boolean>(false);

  React.useEffect(() => {
    (async () => {
      setIsFetching(true);
        const res: unknown = await sp.web.lists
          .getByTitle("Modellliste")
          .items.get()
          .catch(err => {
            console.error(err);
            return null;
          });
        if (!res) setHasError(true);
        setModels(res && res as ModelListDto[]);
      setIsFetching(false);
    })();

    return () => {
      setHasError(false);
      setIsFetching(false);
    };
  }, []);

  return {models, isFetching, hasError}; 
};
