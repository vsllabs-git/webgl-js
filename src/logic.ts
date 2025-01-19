let API_KEY: string;
let iframeEl: HTMLIFrameElement;
let isInitialized = false;
let translatedText = "";
let cameraRotationEnabled = false;
let error = "";
let isTranslating = false;
let isUnityLoaded = false;

const fetchFunction = async (apiKey: string, text: string) => {
  const response = await fetch(
    "https://dev-api.vsllabs.com/api/v2/models/clerc/0",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": apiKey,
      },
      body: JSON.stringify({
        user_input: text,
        settings_nlp: {
          synonyms: false,
          details: false,
          ner: false,
          numbers: false,
          nmm: false,
          emotions: false,
          translation_model: {
            model_type: "SEQ2SEQ",
            model_id: "",
          },
        },
        settings_anim: { character: "terra", platform: "webgl" },
        settings_2d: {
          output_settings: {
            data_gzip: false,
            data_raw: false,
            data_stream: false,
          },
        },
        settings_3d: {
          output_settings: {
            bvh: false,
            data_gzip: false,
            data_raw: false,
            data_stream: false,
            video_3d: false,
            web_glb: false,
          },
        },
      }),
    }
  );

  return await response.json();
};

const initialize = async (api_key: string, container_id: string) => {
  API_KEY = api_key;
  if (!api_key) {
    const errTxt = "API Key is required";
    error = errTxt;
    throw new Error(errTxt);
  }

  if (!container_id) {
    const errTxt = "Container ID is required";
    error = errTxt;
    throw new Error(errTxt);
  }

  try {
    await fetchFunction(API_KEY, "Hello");
  } catch (err) {
    const errTxt = "Invalid API Key!";
    error = errTxt;
    throw new Error(errTxt);
  }

  const container = document.getElementById(container_id);

  if (!container) {
    const errTxt = `Container ID ${container_id} is not found!`;
    error = errTxt;
    throw new Error(errTxt);
  }

  iframeEl = document.createElement("iframe");
  iframeEl.src = "https://webgl-npm-vanilla.vercel.app/";
  iframeEl.style.width = "100%";
  iframeEl.style.height = "100%";
  iframeEl.style.border = "unset";

  container?.appendChild(iframeEl);

  isInitialized = true;
  error = "";
};

const translateTextToASL = async (text: string) => {
  if (isInitialized && text) {
    isTranslating = true;
    const data = await fetchFunction(API_KEY, text);
    translatedText = data?.NLP?.unity_3d_input || "";

    isTranslating = false;

    translatedText &&
      iframeEl?.contentWindow?.postMessage(
        { action: "playAnimation", text: translatedText },
        "*"
      );
  } else {
    const errTxt = !isInitialized
      ? "Webgl is not initialized!"
      : "text is required!";
    error = errTxt;
    throw new Error(errTxt);
  }
};

const toggleCameraRotation = () => {
  if (isInitialized) {
    iframeEl?.contentWindow?.postMessage(
      {
        action: "ToggleCameraRotation",
        toggleState: cameraRotationEnabled ? "false" : "true",
      },
      "*"
    );

    cameraRotationEnabled = !cameraRotationEnabled;
  } else {
    const errTxt = "Webgl is not initialized!";
    error = errTxt;
    throw new Error(errTxt);
  }
};

const setAnimationSpeed = (speed: "0.5" | "1" | "1.5") => {
  if (isInitialized && speed) {
    iframeEl?.contentWindow?.postMessage(
      {
        action: "changeSpeed",
        speed,
      },
      "*"
    );
  } else {
    const errTxt = !isInitialized
      ? "Webgl is not initialized!"
      : "speed is required!";
    error = errTxt;
    throw new Error(errTxt);
  }
};

const changeBgColor = (color: string) => {
  if (isInitialized && color) {
    iframeEl?.contentWindow?.postMessage(
      {
        action: "changeBackground",
        color,
      },
      "*"
    );
  } else {
    const errTxt = !isInitialized
      ? "Webgl is not initialized!"
      : "color is required!";
    error = errTxt;
    throw new Error(errTxt);
  }
};

const replay = () => {
  if (isInitialized && translatedText) {
    iframeEl?.contentWindow?.postMessage(
      {
        action: "playAnimation",
        text: translatedText,
      },
      "*"
    );
  } else {
    const errTxt = !isInitialized
      ? "Webgl is not initialized!"
      : "Nothing to replay!";
    error = errTxt;
    throw new Error(errTxt);
  }
};

function handleMessage(event: any) {
  if (
    event.data?.action === "loadingStatus" &&
    event.data?.status === "loaded"
  ) {
    setTimeout(() => {
      isUnityLoaded = true;
    }, 2500);
  }
}

window.addEventListener("message", handleMessage);

const removeListeners = () => {
  window.removeEventListener("message", handleMessage);
  window.removeEventListener("unload", removeListeners);
};

window.addEventListener("unload", removeListeners);

export {
  initialize,
  translateTextToASL,
  toggleCameraRotation,
  setAnimationSpeed,
  changeBgColor,
  replay,
  error,
  isTranslating,
  isUnityLoaded,
};
