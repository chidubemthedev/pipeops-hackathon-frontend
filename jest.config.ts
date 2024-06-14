export default {
    preset: 'ts-jest/presets/default-esm',
    testEnvironment: 'jest-environment-jsdom',
    rootDir: 'src',
    moduleNameMapper: {
        "^.+\\.svg$": "jest-svg-transformer",
        ".+\\.(css|styl|less|sass|scss|png|jpg|gif|ttf|woff|woff2)$": "identity-obj-proxy",
        "\\.(css|less|scss)$": "identity-obj-proxy",
      '^@app/(.*)$': '<rootDir>/$1',
    },
    transform: {
        '^.+\\.tsx?$': [
          'ts-jest',
          {
            diagnostics: {
              ignoreCodes: [1343]
            },
            astTransformers: {
              before: [
                {
                  path: 'node_modules/ts-jest-mock-import-meta',  // or, alternatively, 'ts-jest-mock-import-meta' directly, without node_modules.
                  options: { metaObjectReplacement: { url: 'https://www.url.com' } }
                }
              ]
            }
          }
        ]
      }
  };
  
  