const path = require("path")

module.exports = {
    "roots" : [path.resolve(__dirname, "src")],
    "transform" : {
      "\\.tsx?$" : "ts-jest"
    },
    "testRegex": "/test/.*\\.(t|j)s$",
    "moduleFileExtensions": ["ts", "js"],
    "globals" : {
      "ts-jest" : {
          "diagnostics" : true,

      }
    }
}