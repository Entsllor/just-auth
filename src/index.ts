import {createApp} from "./create-app";
import {appSettings} from "./core/settings";

export const app = createApp();
app.listen(appSettings.PORT);
console.log("just-auth has started");
