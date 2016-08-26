/**
 * Created by Biless on 2016/8/26.
 */

require("babel-core/register")(
    {
        presets: ['stage-3','es2015']
    }
);
require("babel-polyfill");
require("./app.js");