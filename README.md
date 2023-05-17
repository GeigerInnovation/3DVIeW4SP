# 3DVIeW4SP
3D Viewer Integration Webpart for SharePoint is developed by Geiger Gruppe, for Using BIM Models integrated in SharePoint. Currently we are able to filter the model using SharePoint Lists. Further features will be added eventually. For further information please visit http://www.geigergruppe.de/sharepoint-3d-viewer.

This project is licencend under [GNU GPL v3.0](https://www.gnu.org/licenses/gpl-3.0.en.html). 

# Build instructions
`Code will be added soon!`

## Prerequisites
List of development tools and frameworks to use
- Node.js
- Gulp.js
- Yeoman
- Yeoman SharePoint generator
- React

## Community 
If you want to push changes please fork the original repo. Any pull requests enhancing this projects are very welcome. If you are not developing on your own, also bug reports are helpful. We will try to fix them as soon as possible.

## Install
### 1. Set up your SharePoint Framework develompnet environment
#### Node.js
 Install the most recent LTS version of Node.js v16

 1. Visit the official Node.js website: https://nodejs.org. 
 2. Click on the "Downloads" button on the homepage. 
 3. On the Downloads page, you will see different versions of Node.js available. Scroll down until you find the "16.x.x" release line. Click on the version number you want to install (e.g., 16.19.1). 
 4. On the version's download page, you'll find different installers for various operating systems. Choose the appropriate installer for your system. For example: 

    * For Windows, click on the Windows Installer button. 
    * For macOS, click on the macOS Installer button. 
    * For Linux, click on the Linux Binaries (x64) button. 

5. Once the installer is downloaded, run the installer executable. 

6. Follow the installation wizard's instructions. You can generally accept the default options, but you can also customize the installation if needed. 

7. After the installation completes, open a command prompt or terminal window. 

8. Verify that Node.js is installed correctly by running the following command: 
`node -v`
#### SPFx - Yeomen - Gulp

Install development toolchain prerequisites 

The SharePoint Framework development and build toolchain leverages various popular open-source tools. While most dependencies are included in each project, you need to install a few dependencies globally on your workstation. 

Hint: You can install all three of the following tools in a single line:
```
npm install gulp-cli yo @microsoft/generator-sharepoint --global
```
Or you can install them one by one:

#### Install Gulp 

Gulp is a JavaScript-based task runner used to automate repetitive tasks. The SharePoint Framework build toolchain uses Gulp tasks to build projects, create JavaScript bundles, and the resulting packages used to deploy solutions. 

Enter the following command to install the Gulp CLI: 

`npm install gulp-cli --global `

#### Install Yeoman 

Yeoman helps you kick-start new projects, and prescribes best practices and tools to help you stay productive. SharePoint client-side development tools include a Yeoman generator for creating new web parts. The generator provides common build tools, common boilerplate code, and a common playground website to host web parts for testing. 

Important 

Yeoman v4.x is required by the SPFx v1.13 forward. 

Enter the following command to install Yeoman: 

`npm install yo --global`

#### Install Yeoman SharePoint generator 

The Yeoman SharePoint web part generator helps you quickly create a SharePoint client-side solution project with the right toolchain and project structure. 

To install the SharePoint Framework Yeoman generator globally, enter the following command: 

`npm install @microsoft/generator-sharepoint –global `

#### Trusting the self-signed developer certificate 

The SharePoint Framework's local webserver, used when testing your custom solutions from your development environment, uses HTTPS by default. This is implemented using a development self-signed SSL certificate. Self-signed SSL certificates are not trusted by your developer environment. You must first configure your development environment to trust the certificate. 

A utility task is included in every SharePoint Framework project in the form of a gulp task. You can elect to do this now, or wait until you create your first project as covered in the Build your first SharePoint client-side web part (Hello World part 1) tutorial. 

Once a project has been created with the Yeoman generator for the SharePoint Framework, execute the following command from within the root folder of the project. 

`gulp trust-dev-cert`
 
Note 

This assumes you have installed all dependencies with npm install after creating the project. This step will install all gulp tasks as part of a project.  

### 2. Clone Repository

1. On the repository page, look for the green "Code" button and click on it. 
2. In the dropdown menu, ensure that "HTTPS" is selected (unless you prefer to use SSH). 
3. Copy the repository URL by clicking on the clipboard icon next to it. 
4. Navigate to the directory where you want to clone the repository using the cd command (e.g., cd Documents/Projects). 
5. Once in the desired directory, use the following command to clone the repository (replace "repository-url" with the URL you copied in Step 2): 

    ```
    git clone repository-url 
        
    For example: 

    git clone https://github.com/username/repository-name.git 
    ```

Press Enter to execute the command. 

### 3. Install dependencies

1. Navigate to folder “Forge Viewer” inside the repository 
2. Enter the command “npm install” to install the projects dependencies 
    `npm install`

### 4. Serve the Webpart

1. Navigate to folder “Forge Viewer” inside the repository
2. Enter the command “gulp serve” to serve the App
`gulp serve`
3. To display the served App in the browser you have to copy the URL from your SharePoint site tenant where you want the App to run into the serve.json file and replace the placeholder for the initialPage property.
`"initialPage": "https://localhost:5432/workbench"`
4. To receive a access token for displaying your models in the viewer you have to copy your CLIENT_ID and CLIENT_SECRET, which you get from your Autodesk account, into the quotes for ID and SECRET in the accessToken.ts component (see below).
    ```
    CLIENT_ID = "" /*Enter your Client_ID*/
    CLIENT_SECRET = "" /*Enter your Client_Secret*/
    ```



## Deployment
`Content will be added`
1. Bundle and Ship Webpart
2. Add packed solution to SharePoint

## SharePoint adjustments
`Content will be added`
1. Add necessary ShaprePoint lists 
    * Add Model list
    * Add Mapping lists (optional) 
2. Create Flow for automatic Model translation (optional)

## Change Log
Currently first time uploaded. Future Changes will be reported.

## Additional remarks
The project is based on [Microsoft SharePoint](https://www.microsoft.com/en-us/microsoft-365/sharepoint/collaboration) and [Autodesk Platform Service](https://aps.autodesk.com/). It does not include any licences, keys or tokens. It is originally developed for internal use. We do not offer any support regarding issues in your own environment. 

