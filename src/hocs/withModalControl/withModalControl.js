import React from 'react';

import getDisplayName from 'hocs/getDisplayName';
import transformModalName from './transformModalName';

function withModalControl(...modalNames) {
  return function(Component) {
    class WithModalControl extends React.Component {
      state = this.getInitialState();

      getInitialState() {
        return modalNames.reduce((result, modalName) => {
          result[transformModalName(modalName)] = false;
          return result;
        }, {});
      }

      handleModalOpen = (modalName) => () => {
        this.setState({
          [transformModalName(modalName)]: true,
        });
      };

      handleModalClose = (modalName) => () => {
        this.setState({
          [transformModalName(modalName)]: false,
        });
      };

      render() {
        return (
          <Component
            {...this.props}
            modals={this.state}
            onModalOpen={this.handleModalOpen}
            onModalClose={this.handleModalClose}
          />
        );
      }
    }

    const componentName = getDisplayName(Component);
    WithModalControl.displayName = `withModalControl(${componentName})`;

    return WithModalControl;
  };
}

export default withModalControl;
