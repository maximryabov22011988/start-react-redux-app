import React from 'react';

const styles = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  width: '100%',
  height: '95vh',
};

const CenterDecorator = (storyFn) => <div style={styles}>{storyFn()}</div>;

export default CenterDecorator;
