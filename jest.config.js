module.exports = {
  testRegex: 'tests/.*\\.test\\.js$',
  moduleDirectories: ['node_modules', 'src'],
  setupFilesAfterEnv: ['./test-setup.js'],
  testEnvironment: 'node',
};
