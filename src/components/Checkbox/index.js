import withHelperText from 'hocs/withHelperText';
import withInputHandlers from 'hocs/withInputHandlers';

import Checkbox from './Checkbox';

const CheckboxWithHandlers = withInputHandlers(Checkbox);

export const CheckboxWithHelperText = withHelperText(CheckboxWithHandlers);
export default CheckboxWithHandlers;
