import { FC } from 'react';
import PropTypes from 'prop-types';
declare const propTypes: {
    /** Content of the card */
    children: PropTypes.Validator<PropTypes.ReactNodeLike>;
    /** Use the full size of the card. */
    noPadding: PropTypes.Requireable<boolean>;
    selected: PropTypes.Requireable<boolean>;
    onClick: PropTypes.Validator<(...args: any[]) => any>;
    /** Use this to group cards on the left. */
    hasGroupLeft: PropTypes.Requireable<boolean>;
    /** Use this to group cards on the right. */
    hasGroupRight: PropTypes.Requireable<boolean>;
};
declare const SelectableCard: FC<PropTypes.InferProps<typeof propTypes>>;
export default SelectableCard;
