import { FC } from 'react';
import PropTypes from 'prop-types';
import './action-bar.global.css';
declare const propTypes: {
    /** The Save button props (label + Styleguide Button props) */
    save: PropTypes.Requireable<PropTypes.InferProps<any>>;
    /** The Cancel button props (label + Styleguide Button props) */
    cancel: PropTypes.Requireable<PropTypes.InferProps<any>>;
};
declare const FloatingActionBar: FC<PropTypes.InferProps<typeof propTypes>>;
export default FloatingActionBar;
