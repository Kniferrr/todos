module.exports = {
  testEnvironment: "jsdom",
  preset: "ts-jest",
  transform: {
    "^.+\\.jsx?$": "babel-jest",
    "^.+\\.tsx?$": "ts-jest",
  },
  transformIgnorePatterns: ["<rootDir>/node_modules/"],
  setupFilesAfterEnv: ["<rootDir>/setupTests.js"],
  moduleNameMapper: {
    "\\.(scss|css)$": "identity-obj-proxy",
  },
};
