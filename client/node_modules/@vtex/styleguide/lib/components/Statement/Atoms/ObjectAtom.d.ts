import React from 'react';
export declare type ObjectOption = (renderProps: RenderProps) => React.ReactElement;
declare type RenderProps = {
    error: Props['error'];
    onChange: Props['onChange'];
    value: Props['object'];
};
declare type Props = {
    /** Disabled state */
    disabled?: boolean;
    /** Statement error message */
    error?: string;
    /** Current selected object for this Statement */
    object: unknown;
    /** Object Value changed callback */
    onChange: (value: Props['object'], error?: Props['error']) => void;
    /** Possible options and respective data types, verb options */
    renderObject: ObjectOption;
};
declare const ObjectAtom: React.FC<Props>;
export default ObjectAtom;
