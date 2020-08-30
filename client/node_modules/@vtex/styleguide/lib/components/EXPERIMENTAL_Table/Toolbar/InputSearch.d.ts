import { FC, FormEvent, InputHTMLAttributes } from 'react';
export declare type InputSearchProps = InputHTMLAttributes<HTMLInputElement> & {
    onSubmit: (event: FormEvent<HTMLFormElement>) => void;
};
declare const InputSearch: FC<InputSearchProps>;
export default InputSearch;
