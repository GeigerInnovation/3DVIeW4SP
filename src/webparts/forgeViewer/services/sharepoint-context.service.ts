/**
 * Component Name: SharePointContext.service.ts
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

import {WebPartContext} from "@microsoft/sp-webpart-base";
import {DisplayMode, Environment, EnvironmentType} from "@microsoft/sp-core-library";
import { sp } from "@pnp/sp";

export type SpEnvironmentType =
    | "localhost"
    | "workbench"
    | "sharepoint";

export class SharepointContextService {

    /**
     * The webpart context
     * @private
     * @type {WebPartContext}
     */
    private readonly _context: WebPartContext;

    /**
     * The webpart context
     * @private
     * @type {WebPartContext}
     */
    private readonly _displayMode: DisplayMode;

    /**
     * Auth service instance
     * @private
     * @static
     */
    private static _instance: SharepointContextService | undefined;


    constructor(context: WebPartContext, displayMode: DisplayMode) {
        this._context = context;
        this._displayMode = displayMode;
    }

    /**
     * Initialize the auth service
     * @static
     * @param {WebPartContext} context - the sharepoint context
     * @param {WebPartContext} displayMode - the sharepoint display mode
     */
    public static init(context: WebPartContext, displayMode: DisplayMode): void {
        this._instance = new SharepointContextService(context, displayMode);
    }

    /**
     * Returns SharePoint context service instance
     * @static
     * @memberof AuthService
     */
    public static getInstance(): SharepointContextService {
        if (!this._instance) {
            console.error('SharePoint context was not properly initialized. Call SharepointContextService.init before you call any other method');
        }
        return this._instance;
    }

    /**
     * Returns the Webpart Context
     * @returns {WebPartContext}
     */
    public getSharePointContext(): WebPartContext {
        return this._context;
    }

    /**
     * Returns the active sharepoint site display mode
     */
    public getSharePointDisplayMode(): DisplayMode {
        return this._displayMode;
    }

    /**
     * Retrieves current environment
     */
    public getEnvironment(): SpEnvironmentType {
        switch (Environment.type) {
            case EnvironmentType.Local:
                return 'localhost';
            case EnvironmentType.SharePoint:
                return window.location.href.toLowerCase().indexOf("_layouts/15/workbench") === -1
                    ? 'sharepoint'
                    : 'workbench';
            default:
                console.error('Invalid SharePoint environment');
        }
    }

    /**
     * Returns current user from sharepoint context
     */
    public getCurrentUser(): unknown {
        return this._context.pageContext.user;
    }

    /**
     * Returns root of absolute url
     */
    public getPageRoot(): string {
        const absoluteUrlArr = this._context.pageContext.web.absoluteUrl.split('/');
        return absoluteUrlArr[0] + '//' + absoluteUrlArr[2];
    }

    /**
     * Retrieves page context absolute url
     */
    public getAbsoluteContextUrl(): string {
        return this._context.pageContext.web.absoluteUrl;
    }

    /**
     * Retrieves page context server relative url
     */
    public getRelativeContextUrl(): string {
        return this._context.pageContext.web.serverRelativeUrl;
    }

    /**
     * Initially sets up SPFx
     */
    public setupSpfx(): void {
        sp.setup({
            spfxContext: this._context as any,
        });
    }

    /**
     * Sets specific baseUrl on web for pnp sp
     * @param fullPath
     */
    public setSpecificWeb(fullPath): void {
        sp.setup({
            sp: {
                baseUrl: fullPath,
            },
        });
    }

}