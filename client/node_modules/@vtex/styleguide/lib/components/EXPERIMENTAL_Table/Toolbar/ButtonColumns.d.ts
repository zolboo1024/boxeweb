import { FC } from 'react';
import { Alignment } from './PopoverMenu';
import useTableVisibility from '../hooks/useTableVisibility';
declare const ButtonColumns: FC<ButtonColumnsProps>;
export declare type ButtonColumnsProps = {
    label: string;
    showAllLabel: string;
    hideAllLabel: string;
    alignMenu: Alignment;
    disabled: boolean;
    visibility: ReturnType<typeof useTableVisibility>;
};
export default ButtonColumns;
