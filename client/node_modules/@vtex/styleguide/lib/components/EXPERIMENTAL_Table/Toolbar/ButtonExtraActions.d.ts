import { FC } from 'react';
import { MenuAction, Alignment } from './PopoverMenu';
import { ButtonSize } from './Button';
declare const ButtonExtraActions: FC<ButtonExtraActionsProps>;
export declare type ButtonExtraActionsProps = {
    label?: string;
    actions: Array<MenuAction>;
    alignMenu?: Alignment;
    isLoading?: boolean;
    size?: ButtonSize;
};
export default ButtonExtraActions;
