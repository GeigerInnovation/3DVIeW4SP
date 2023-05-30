/**
 * Component Name: Fluent-UI-List-Helper.ts
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

import {mergeStyleSets} from "@fluentui/react/lib/Styling";
import {IDetailsListStyles} from "@fluentui/react/lib/DetailsList";
import {IListProps} from "@fluentui/react";

/**
 * Default fluent ui details list style
 */
export const defaultListStyles = mergeStyleSets({
    wrapper: {
        position: "relative",
        maxHeight: "inherit",
        paddingLeft: "1.5rem",
    },
    detailsList: {
        overflow: "hidden",
        height: "60vh",
    },
    pane: {
        width: "100%",
    },
    sticky: {
        height: "unset",
        top: "0",
    },
});

/**
 * Default fluent ui details list grid styles
 */
export const defaultGridStyles: Partial<IDetailsListStyles> = {
    root: {
        overflow: "hidden",
        selectors: {
            "& [role=grid]": {
                display: "flex",
                flexDirection: "column",
                alignItems: "start",
            },
        },
    },
    headerWrapper: {
        flex: "0 0 auto",
    },
    contentWrapper: {
        flex: "1 1 auto",
        overflowY: "auto",
        overflowX: "hidden",
        height: "60vh",
        width: "100%",
    }
};

/**
 * Default shimmer settings for shimmered details list
 */
export const defaultShimmeredDetailsListProps: IListProps = {
    renderedWindowsAhead: 0,
    renderedWindowsBehind: 0,
};
