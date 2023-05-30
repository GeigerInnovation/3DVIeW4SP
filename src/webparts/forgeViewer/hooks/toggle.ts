/**
 * Component Name: Toggle.ts
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

/**
 * Use toggle hook to simplify setting of boolean type values
 * @param initialState
 */
const useToggle = (initialState) => {
    const [isToggled, setIsToggled] = React.useState(initialState);

    const toggle = React.useCallback(
        () => setIsToggled(state => !state),
        [setIsToggled],
    );

    return [isToggled, toggle];
};

export default useToggle;