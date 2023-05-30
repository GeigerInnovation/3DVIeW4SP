/**
 * Component Name: UsePropertyList.ts
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

import { useEffect, useState } from "react";
import { sp } from "@pnp/sp";
import "@pnp/sp/webs";
import "@pnp/sp/lists";
import "@pnp/sp/fields";
import { IItem } from "@pnp/sp/items";
import { IFieldInfo } from "@pnp/sp/fields";

export const usePropertyListItems = (listName: string) => {
  const [propertyItems, setPropertyItems] = useState<IItem[]>();
  const [isFetching, setIsFetching] = useState(false);
  const [hasError, setHasError] = useState<boolean>(false);

  useEffect(() => {
    if(!listName) return;
    setIsFetching(true);
    (async () => {
      const items: IItem[] = await sp.web.lists.getByTitle(listName).items.getAll()
      .catch(err => {
        console.error(err);
        return null;
      });
      if (!items) {
      setHasError(true);
      setIsFetching(false);
      setPropertyItems(null);
      return;
      }
      setPropertyItems(items);
    })();
    return () => {
      setHasError(false);
      setIsFetching(false);
    }
  }, [listName]);
  return {propertyItems, isFetching, hasError};
};


export const usePropertyListColums = (listName: string) => {
  const [propertyFields, setPropertyFields] = useState<Array<{type: string, name: string, internalName: string}>>();
  const [isFetching, setIsFetching] = useState(false);
  const [hasError, setHasError] = useState<boolean>(false);

  useEffect(() => {
    if(!listName) return;
    setIsFetching(true);
    (async () => {
      const fields: IFieldInfo[]  = await sp.web.lists.getByTitle(listName).fields
      .filter("ReadOnlyField eq false and Hidden eq false").get()
      .catch(err => {
        console.error(err);
        return null;
      });
      if (!fields) {
        setHasError(true);
        setIsFetching(false);
        setPropertyFields(null);
        return;
      }
      setPropertyFields(fields
        .filter(o => o.TypeAsString !== "Computed" && o.TypeAsString !== "Attachments")
      .map(o => ({type: o.TypeAsString, name: o.Title, internalName: o.EntityPropertyName})));
    })();
    return () => {
      setHasError(false);
      setIsFetching(false);
    }
  }, [listName]);
  return {propertyFields, isFetching, hasError}
};
