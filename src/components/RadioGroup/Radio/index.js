import withHelperText from 'hocs/withHelperText';
import withInputHandlers from 'hocs/withInputHandlers';

import Radio from './Radio';

const RadioWithHandlers = withInputHandlers(Radio);

export const RadioWithHelperText = withHelperText(RadioWithHandlers);
export default RadioWithHandlers;
