module.exports = (plop) => {
  plop.setGenerator('component', {
    description: 'Generate the component files',
    prompts: [
      {
        type: 'input',
        name: 'name',
        message: 'Name of Component (PascalCase)?',
      },
    ],
    actions: [
      {
        type: 'add',
        path: '../src/components/{{name}}/{{name}}.tsx',
        templateFile: 'Component.hbs',
      },
      {
        type: 'add',
        path: '../src/components/{{name}}/{{name}}.stories.tsx',
        templateFile: 'Component.stories.hbs',
      },
      {
        type: 'add',
        path: '../src/components/{{name}}/{{name}}.test.tsx',
        templateFile: 'Component.test.hbs',
      },
      {
        type: 'add',
        path: '../src/components/{{name}}/index.ts',
        template: "export * from './{{name}}'",
      },
    ],
  })
}
