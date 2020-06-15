import reducer from './index';

describe('app reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual({
      test: true,
    });
  });

  it('should return test error', () => {
    expect(reducer(undefined, {})).toEqual({
      test: false,
    });
  });
});
