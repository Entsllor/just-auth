import {appSettings} from "./core/settings";
import {createApp} from "./create-app";

export const [app] = createApp();
app.listen(appSettings.PORT);
