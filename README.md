# @vsllabs/webgl-js


## Installation:

To install the package, run:

Using npm:
```bash
$ npm install @vsllabs/webgl-js
```

Using yarn:
```bash
$ yarn add @vsllabs/webgl-js
```


## Table of Contents

- [Usage Example](#usage-example)
- [Documentation](#documentation)
- [Required Parameters](#required-parameters)
- [Returned Values](#returned-values)
- [Example Workflow](#example-workflow)


## Usage Example:

Below is an example of how to use the webgl-js:

index.html:

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>webgl-js</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        html,body {
            width: 100%;
            height: 100%;
        }
        /* style parent container */
        #main-container {
            width: 500px;
            height: 700px;
        }
    </style>
    </head>
    <body>
        <div id="main-container"></div>
        <button type="button" id="translate_btn">Translate</button>
    </body>
    <script type="module" src="./index.js"></script>
</html>
```

index.js

```js
import { initialize, translateTextToASL } from "@vsllabs/webgl-js";

// container ID is the parent element you want to render the webgl within.
// in our example the ID is "main-container"
initialize("API KEY", "Container ID");

const translate_btn = document.getElementById("translate_btn");
translate_btn.onclick = () => {
  translateTextToASL("Hello, how are you today?");
};
```


## Documentation

The **webgl-js** npm provides the necessary setup and functionality for integrating the VSL WebGL component. Other various properties and functions for rendering, controlling, and interacting with the WebGL component can also be imported.


### Required Parameters
 * **API_KEY**: Your unique API key for accessing the VSL WebGL services.
 * **Container ID**: The HTML parent element ID to render the webgl within.


### Imports

The following values and functions are also imported by webgl-js:

| Value         | Explanation                                    |
| :------------ | :--------------------------------------------- |
| initialize | <ul><li>The initialization function. Can be styled via the parent container.</li><li>Example: <br><pre lang="javascript"> initialize("API KEY", "Container ID"); </pre></li></ul>  |
| translateTextToASL | <ul><li>Function to trigger text translation within the Unity WebGL.</li><li>**Arguments:** Accepts a single argument (the text to translate).</li><li>**Example:** <pre lang="javascript"> translateTextToASL("Hello, world!") </pre></li></ul>  |
| isUnityLoaded | <ul><li>Indicates whether the Unity WebGL component has fully loaded. Useful for checking readiness to show loaders and before triggering translation.</li><li>**Example:** Disabling the translate button until Unity is ready.</li></ul>  |
| isTranslating | <ul><li>Represents the loading state during the translation process. Helpful for displaying loading indicators.</li><li>**Example:** <pre lang="javascript"> {isTranslating ? 'Translating...' : 'Translate'} </pre></li></ul>  |
| replay | <ul><li>Function to replay the last translated text within the Unity WebGL.</li><li>**Arguments:** No arguments required.</li></ul>  |
| changeBgColor | <ul><li>Changes the background color of the WebGL component.</li><li>**Arguments:** Accepts a single argument, a string representing a hex color value (e.g., #FFFFFF for white).</li><li>**Example:** <pre lang="javascript"> changeBgColor('#FF5733') </pre> to set the background color to a shade of orange.</li></ul>  |
| setAnimationSpeed | <ul><li>Controls the speed of animations within the WebGL environment.</li><li>**Arguments:** Accepts a single string argument, which can be one of four options: "0" (for pause), "0.5", "1" (default), or "1.5".</li><li>**Example:** <pre lang="javascript"> setAnimationSpeed("1.5") </pre> to set the animation speed to 1.5x.</li></ul>  |
| toggleCameraRotation | <ul><li>Toggles the rotation of the camera in the WebGL environment.</li><li>**Arguments:** Accepts a single boolean argument to enable (true) or disable (false > default) camera rotation.</li><li>**Example:** <pre lang="javascript"> toggleCameraRotation(true) </pre> to enable camera rotation.</li></ul>  |
| error | <ul><li>If any errors occur during loading or translation, this string provides an error message explaining the issue.</li><li>**Example:** Display error in your UI if it’s not an empty string.</li><li>**Note:** Errors are also logged in the console</li></ul>  |



### Example Workflow

 1. Initialize the webgl: Call the **initialize** function with the required parameters to initialize the WebGL component.
 2. If succeeded, The webgl component will show withing the parent element of the provided ID
 3. Translate Text: Use the translateTextToASL function to translate input text when Unity is loaded (isUnityLoaded).
 4. Replay Last Translation: Use the replay function to repeat the last translation as needed.
 5. Handle Errors: Check the error value to catch and display any issues that occur during loading or translation.


 ## License

[MIT](LICENSE)