const booleanChoice = ['yes', 'no'];

const prompt = {
  name(target) {
    return {
      type: 'input',
      name: 'name',
      message: `What is ${target} name?`,
    };
  },
  componentType() {
    return {
      type: 'list',
      name: 'componentType',
      message: 'Choose type:',
      choices: ['class', 'functional'],
    };
  },
  cssClass(target) {
    return {
      type: 'input',
      name: 'cssClass',
      message: `${target[0].toUpperCase()}${target.slice(1)} css class?`,
    };
  },
  test() {
    return {
      type: 'list',
      name: 'withTest',
      message: 'Add test file?',
      choices: booleanChoice,
    };
  },
};

const withTest = (data, type) => {
  let path
    = 'src/components/{{pascalCase name}}/{{pascalCase name}}.test.js';
  let templateFile = 'plop-templates/Component/Component.test.js.hbs';

  if (type === 'page') {
    path = 'src/pages/{{pascalCase name}}/{{pascalCase name}}.test.js';
    templateFile = 'plop-templates/Page/Page.test.js.hbs';
  }

  if (type === 'hoc') {
    path = 'src/hocs/{{camelCase name}}/{{camelCase name}}.test.js';
    templateFile = 'plop-templates/HOC/HOC.test.js.hbs';
  }

  return data.withTest === 'yes'
    ? [
      {
        path,
        templateFile,
        type: 'add',
      },
    ]
    : [];
};

const getTypeComponent = (data) => (data.componentType === 'class' ? 'class' : 'function');

module.exports = (plop) => {
  plop.setGenerator('component', {
    description: 'Create component',
    prompts: [
      prompt.componentType(),
      prompt.name('component'),
      prompt.cssClass('component'),
      prompt.test(),
    ],
    actions: (data) => [
      {
        type: 'add',
        path:
          'src/components/{{pascalCase name}}/{{pascalCase name}}.js',
        templateFile: `plop-templates/Component/${getTypeComponent(
          data,
        )}Component.js.hbs`,
      },
      {
        type: 'add',
        path:
          'src/components/{{pascalCase name}}/{{pascalCase name}}.less',
        templateFile: 'plop-templates/Component/Component.less.hbs',
      },
      {
        type: 'add',
        path: 'src/components/{{pascalCase name}}/index.js',
        templateFile: 'plop-templates/Component/index.js.hbs',
      },
      ...withTest(data),
    ],
  });

  plop.setGenerator('story', {
    description: 'Create component stories',
    prompts: [
      prompt.name('component'),
    ],
    actions: [
      {
        type: 'add',
        path:
          'src/components/{{pascalCase name}}/{{pascalCase name}}.stories.js',
        templateFile: 'plop-templates/storybook/story.js.hbs',
      },
    ],
  });

  plop.setGenerator('page', {
    description: 'Create page',
    prompts: [
      prompt.componentType(),
      prompt.name('page'),
      prompt.cssClass('page'),
      prompt.test(),
    ],
    actions: (data) => [
      {
        type: 'add',
        path: 'src/pages/{{pascalCase name}}/{{pascalCase name}}.js',
        templateFile: `plop-templates/Page/${getTypeComponent(
          data,
        )}Page.js.hbs`,
      },
      {
        type: 'add',
        path: 'src/pages/{{pascalCase name}}/{{pascalCase name}}.less',
        templateFile: 'plop-templates/Page/Page.less.hbs',
      },
      {
        type: 'add',
        path: 'src/pages/{{pascalCase name}}/index.js',
        templateFile: 'plop-templates/Page/index.js.hbs',
      },
      ...withTest(data, 'page'),
    ],
  });

  plop.setGenerator('hoc', {
    description: 'Create HOC',
    prompts: [
      prompt.componentType(),
      prompt.name('HOC'),
      {
        type: 'list',
        name: 'withStyles',
        message: 'Add styles?',
        choices: booleanChoice,
      },
      prompt.test(),
    ],
    actions: (data) => [
      {
        type: 'add',
        path: 'src/hocs/{{camelCase name}}/{{camelCase name}}.js',
        templateFile: `plop-templates/HOC/${getTypeComponent(data)}HOC.js.hbs`,
      },
      {
        type: 'add',
        path: 'src/hocs/{{camelCase name}}/index.js',
        templateFile: 'plop-templates/HOC/index.js.hbs',
      },
      ...(data.withStyles === 'yes'
        ? [
          {
            type: 'add',
            path: 'src/hocs/{{camelCase name}}/{{camelCase name}}.less',
            templateFile: 'plop-templates/HOC/HOC.less.hbs',
          },
        ]
        : []),
      ...withTest(data, 'hoc'),
    ],
  });
};
