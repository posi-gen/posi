/* eslint import/no-webpack-loader-syntax: off */
export const initTemplate = {
  'client': {
    '.env': require('!raw-loader!./initTemplate/client/.env'),
    '.gitignore': require('!raw-loader!./initTemplate/client/.gitignore'),
    '.vscode': {
      'extensions.json': require('!raw-loader!./initTemplate/client/.vscode/extensions.json'),
      'settings.json': require('!raw-loader!./initTemplate/client/.vscode/settings.json')
    },
    'jsconfig.json': require('!raw-loader!./initTemplate/client/jsconfig.json'),
    'package.json': require('!raw-loader!./initTemplate/client/package.json'),
    'public': {
      'favicon.ico': require('!raw-loader!./initTemplate/client/public/favicon.ico'),
      'index.html': require('!raw-loader!./initTemplate/client/public/index.html'),
      'manifest.json': require('!raw-loader!./initTemplate/client/public/manifest.json')
    },
    'README.md': require('!raw-loader!./initTemplate/client/README.md'),
    'src': {
      'apollo': {
        'createApolloLink.js': require('!raw-loader!./initTemplate/client/src/apollo/createApolloLink.js'),
        'createApolloLinkState.js': require('!raw-loader!./initTemplate/client/src/apollo/createApolloLinkState.js'),
        'helpers.js': require('!raw-loader!./initTemplate/client/src/apollo/helpers.js'),
        'index.js': require('!raw-loader!./initTemplate/client/src/apollo/index.js')
      },
      'App.js': require('!raw-loader!./initTemplate/client/src/App.js'),
      'App.test.js': require('!raw-loader!./initTemplate/client/src/App.test.js'),
      'components': {
        'index.js': require('!raw-loader!./initTemplate/client/src/components/index.js'),
        'Navbar.js': require('!raw-loader!./initTemplate/client/src/components/Navbar.js'),
        'selectionField': {
          'index.js': require('!raw-loader!./initTemplate/client/src/components/selectionField/index.js')
        },
        'sign': {
          'CurrentUser.js': require('!raw-loader!./initTemplate/client/src/components/sign/CurrentUser.js'),
          'helpers.js': require('!raw-loader!./initTemplate/client/src/components/sign/helpers.js'),
          'index.js': require('!raw-loader!./initTemplate/client/src/components/sign/index.js'),
          'queries.js': require('!raw-loader!./initTemplate/client/src/components/sign/queries.js'),
          'SigninForm.js': require('!raw-loader!./initTemplate/client/src/components/sign/SigninForm.js'),
          'SignLinks.js': require('!raw-loader!./initTemplate/client/src/components/sign/SignLinks.js'),
          'SignupForm.js': require('!raw-loader!./initTemplate/client/src/components/sign/SignupForm.js')
        }
      },
      'index.js': require('!raw-loader!./initTemplate/client/src/index.js'),
      'registerServiceWorker.js': require('!raw-loader!./initTemplate/client/src/registerServiceWorker.js'),
      'styles': {
        'buttonStyle.js': require('!raw-loader!./initTemplate/client/src/styles/buttonStyle.js'),
        'globalStyles.js': require('!raw-loader!./initTemplate/client/src/styles/globalStyles.js'),
        'helpers.js': require('!raw-loader!./initTemplate/client/src/styles/helpers.js'),
        'index.js': require('!raw-loader!./initTemplate/client/src/styles/index.js'),
        'theme.js': require('!raw-loader!./initTemplate/client/src/styles/theme.js')
      },
      'ui': {
        'Box.js': require('!raw-loader!./initTemplate/client/src/ui/Box.js'),
        'Button.js': require('!raw-loader!./initTemplate/client/src/ui/Button.js'),
        'ButtonCircle.js': require('!raw-loader!./initTemplate/client/src/ui/ButtonCircle.js'),
        'ButtonOutline.js': require('!raw-loader!./initTemplate/client/src/ui/ButtonOutline.js'),
        'ButtonTransparent.js': require('!raw-loader!./initTemplate/client/src/ui/ButtonTransparent.js'),
        'Card.js': require('!raw-loader!./initTemplate/client/src/ui/Card.js'),
        'Container.js': require('!raw-loader!./initTemplate/client/src/ui/Container.js'),
        'Fixed.js': require('!raw-loader!./initTemplate/client/src/ui/Fixed.js'),
        'Flex.js': require('!raw-loader!./initTemplate/client/src/ui/Flex.js'),
        'Heading.js': require('!raw-loader!./initTemplate/client/src/ui/Heading.js'),
        'Hide.js': require('!raw-loader!./initTemplate/client/src/ui/Hide.js'),
        'index.js': require('!raw-loader!./initTemplate/client/src/ui/index.js'),
        'Input.js': require('!raw-loader!./initTemplate/client/src/ui/Input.js'),
        'Label.js': require('!raw-loader!./initTemplate/client/src/ui/Label.js'),
        'Loader.js': require('!raw-loader!./initTemplate/client/src/ui/Loader.js'),
        'NavLink.js': require('!raw-loader!./initTemplate/client/src/ui/NavLink.js'),
        'Page.js': require('!raw-loader!./initTemplate/client/src/ui/Page.js'),
        'Position.js': require('!raw-loader!./initTemplate/client/src/ui/Position.js'),
        'Select.js': require('!raw-loader!./initTemplate/client/src/ui/Select.js'),
        'Table.js': require('!raw-loader!./initTemplate/client/src/ui/Table.js'),
        'Tabs.js': require('!raw-loader!./initTemplate/client/src/ui/Tabs.js'),
        'Text.js': require('!raw-loader!./initTemplate/client/src/ui/Text.js'),
        'utils.js': require('!raw-loader!./initTemplate/client/src/ui/utils.js')
      },
      'utils': {
        'index.js': require('!raw-loader!./initTemplate/client/src/utils/index.js')
      }
    }
  },
  'postgresql': {
    'README.md': require('!raw-loader!./initTemplate/postgresql/README.md')
  },
  'server': {
    '.gitignore': require('!raw-loader!./initTemplate/server/.gitignore'),
    '.prettierrc': require('!raw-loader!./initTemplate/server/.prettierrc'),
    '.vscode': {
      'settings.json': require('!raw-loader!./initTemplate/server/.vscode/settings.json')
    },
    'creditional.json': require('!raw-loader!./initTemplate/server/creditional.json'),
    'package.json': require('!raw-loader!./initTemplate/server/package.json'),
    'server.js': require('!raw-loader!./initTemplate/server/server.js')
  }
}