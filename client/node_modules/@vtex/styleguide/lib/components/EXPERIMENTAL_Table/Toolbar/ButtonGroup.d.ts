import { FC } from 'react';
import { ButtonProps } from './Button';
import { ButtonColumnsProps } from './ButtonColumns';
import { ButtonDensityProps } from './ButtonDensity';
import { ButtonExtraActionsProps } from './ButtonExtraActions';
import { ButtonNewLineProps } from './ButtonNewLine';
declare const ButtonGroup: FC & Composites;
declare type Composites = {
    Columns: FC<ButtonColumnsProps>;
    Density: FC<ButtonDensityProps>;
    Download: FC<ButtonProps>;
    Upload: FC<ButtonProps>;
    ExtraActions: FC<ButtonExtraActionsProps>;
    NewLine: FC<ButtonNewLineProps>;
};
export default ButtonGroup;
