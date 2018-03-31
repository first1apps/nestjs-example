"use strict";

// Ensure the NODE_ENV is not production. If missing then set it to develop
const envName = process.env["NODE_ENV"];
if (typeof envName !== "string" || envName.length === 0) {
    process.env["NODE_ENV"] = "develop";
}
else if (/prod|production/i.test(envName)) {
    throw Error("Do not use ./start-dev.js in a production environment. Check your NODE_ENV.")
}

if (process.env["CAPTURE_STACK_TRACE_OF_NON_ERROR"] == null) {
    if (process.env["NODE_ENV"] === "develop") {
        process.env["CAPTURE_STACK_TRACE_OF_NON_ERROR"] = true;
    }
}
