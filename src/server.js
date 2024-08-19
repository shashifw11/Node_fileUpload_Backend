const app = require("./index");
const connect = require("./configs/db");

app.listen(2345, async () => {
    try {
        await connect();
        console.log("Listening on Port 2345");
    } catch (err) {
        console.error("Failed to connect:", err);
    }
});
