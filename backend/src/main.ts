import { logMiddleware } from "@middleware/logging";
import Koa from "koa";
import bodyParser from "koa-bodyparser";
import send from "koa-send";
import session from "koa-session";
import staticMiddleware from "koa-static";

const app = new Koa();

app.keys = [process.env.KOA_SESSION_KEY!];

app.use(logMiddleware);

app.use(session({ renew: true }, app));

app.use(
    bodyParser({
        enableTypes: ["json", "form"],
    })
);

app.use(staticMiddleware("static/build/", { extensions: ["html"] }));
app.use(staticMiddleware("static/", { extensions: ["html"] }));

app.use((ctx) => {
    return send(ctx, "static/build/index.html");
});

console.log("Starting server on 8080");
app.listen(8080);
