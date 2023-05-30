/**
 * Component Name: PropertyList.tsx
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

import {
  DetailsListLayoutMode,
  IColumn,
  IDetailsRowProps,
  IRenderFunction,
  ShimmeredDetailsList,
} from "@fluentui/react";
import * as React from "react";
import { ForgeViewerContext } from "../../context/forge-viewer.context";
import {
  usePropertyListColums,
  usePropertyListItems,
} from "../../hooks/service-hooks/usePropertyList";
import {
  SelectionMode,
} from "@fluentui/react/lib/DetailsList";
import styles from "./propertyList.module.scss";
import { defaultShimmeredDetailsListProps } from "../../utils/fluent-ui-list-helper";
import { DetailsRow } from "office-ui-fabric-react";
import * as cx from "classnames";
type PropertyListProps = {
  hasData?: boolean
}

const PropertyList: React.FC<PropertyListProps> = (props) => {
  const { state, dispatch } = React.useContext(ForgeViewerContext);
  const propertyColumns = useListColumns();
  const { propertyItems } = usePropertyListItems(
    state.currentModelPropertyListName
  );
  const listItems: unknown[] = React.useMemo(() => {
    return propertyItems?.slice() || [];
  },[state.selectedListProperties, propertyItems]);

  const selectProperty = (columnValue: string): void => {
    const properties = state.selectedListProperties?.slice() || [];
    if(properties.filter(s => s === columnValue).length > 0) {
      return dispatch({type: 'SET_SELECTED_LIST_PROPERTIES', payload: properties.filter(s => s !== columnValue)});
    }
    properties.push(columnValue);
    dispatch({type: 'SET_SELECTED_LIST_PROPERTIES', payload: properties});
  }

 const renderItemColumns = (item?: unknown, index?: number, column?: IColumn): React.ReactElement => {
  const columnValue = column?.fieldName && item[column.fieldName]
  ? item[column.fieldName]
  : '';
  return <div className={styles.listColumn} onClick={() => selectProperty(columnValue)}>
    <div className={state.selectedListProperties?.filter((s) => columnValue === s).length > 0 && styles.selected}>{columnValue}</div>
    </div>
 };

  const renderRow: IRenderFunction<IDetailsRowProps> = (rowProps) => {
    return (
      <DetailsRow
        {...rowProps}
        className={styles.listRow}
        item={rowProps.item}
        itemIndex={rowProps.itemIndex}
        onRenderItemColumn={renderItemColumns}
      />
    );
  };

  return (
    <div className={cx(styles.propertyList, state.currentModelPropertyListName &&
      state.sideBarMode === "Listen" && styles.expanded)}>
      {/* <MarqueeSelection selection={_selection}> */}
      <ShimmeredDetailsList
        shimmerLines={7}
        items={listItems || []}
        columns={propertyColumns || []}
        onRenderRow={renderRow}
        setKey="set"
        enableUpdateAnimations={true}
        layoutMode={DetailsListLayoutMode.fixedColumns}
        selectionPreservedOnEmptyClick={true}
        ariaLabelForSelectionColumn={"todo.. loc"}
        ariaLabelForSelectAllCheckbox={"todo.. loc"}
        checkButtonAriaLabel={"todo.. loc"}
        ariaLabelForShimmer={"todo.. loc"}
        ariaLabelForGrid={"todo.. loc"}
        selectionMode={SelectionMode.none}
        enableShimmer={!listItems}
        listProps={{ ...defaultShimmeredDetailsListProps }}
      />
      {/* </MarqueeSelection> */}
    </div>
  );
};

function useListColumns(): IColumn[] {
  const { state } = React.useContext(ForgeViewerContext);
  const { propertyFields: fields } = usePropertyListColums(
    state.currentModelPropertyListName
  );
  const [propertyColumns, setPropertyColumns] = React.useState<IColumn[]>();
  React.useEffect(() => {
    if (!fields) return;
    const columns: IColumn[] = fields.map((item, index) => {
      return {
        fieldName: item.internalName,
        isResizable: true,
        // isSorted: index === 0,
        // isSortedDescending: true,
        name: item.name,
        minWidth: 50,
        key: "column" + index,
        flexGrow: 1,
      };
    });
    setPropertyColumns(columns);
  }, [fields]);
  return propertyColumns;
}

export default PropertyList;
