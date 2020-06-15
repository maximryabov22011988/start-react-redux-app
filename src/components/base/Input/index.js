import withHelperText from 'hocs/withHelperText';
import withInputHandlers from 'hocs/withInputHandlers';

import Input from './Input';

const InputWithHandlers = withInputHandlers(Input);

export const InputWithHelperText = withHelperText(InputWithHandlers);
export default InputWithHandlers;
