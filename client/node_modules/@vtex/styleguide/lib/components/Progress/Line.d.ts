import PropTypes from 'prop-types';
import React from 'react';
export declare const ProgressLineTypes: {
    percent: PropTypes.Validator<number>;
};
export declare const ProgressLine: React.FC<PropTypes.InferProps<typeof ProgressLineTypes>>;
