/*global cordova, module*/

function parseArguments(args) {
    var options = {};
    if (args.length === 0) {
        throw new Error('A callback must be defined');
    } else if (args.length === 1) {
        if (typeof args[0] !== "function") {
            throw new Error('A callback must be defined');
        }
        options.scope = null;
        options.done = args[0];
        options.err = undefined;
    } else if (args.length === 2) {
        if (typeof args[0] === "function") {
            options.scope = null;
            options.done = args[0];
            options.err = args[1];
        } else {
            options.scope = args[0];
            options.done = args[1];
            options.err = undefined;
        }
    } else if (args.length >= 3) {
        if (typeof args[1] !== "function") {
            throw new Error('A callback must be defined');
        }
        options.scope = args[0];
        options.done = args[1];
        options.err = args[2];
    }
    return options;
}

module.exports = {
    getToken: function () {
        var scope, done, err;
        var options = parseArguments(arguments);
        if (!window.cordova) {
            if (options.err) {
                options.err("The window.cordova API is not present.");
            }
            return;
        }
        window.cordova.exec(function (response) {
            options.done(response);
        }, function (error) {
            console.log("The getToken call failed with the error: " + err);
            if (options.err) {
                options.err(error);
            }
        }, "OauthGoogleServices", "getToken", [options.scope]);
    }
}