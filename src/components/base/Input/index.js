import withHelperText from 'hocs/withHelperText';
import withInputHandlers from 'hocs/withInputHandlers';

import Input from './Input';

export { Input as InputWithoutHandler }; // для storybook

const InputWithHandlers = withInputHandlers(Input);
export const InputWithHelperText = withHelperText(InputWithHandlers);

export default InputWithHandlers;
