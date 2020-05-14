module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  collectCoverage: false,
  roots: ['.'],
  modulePaths: ['.'],
  modulePathIgnorePatterns: ['./dist/'],
};
