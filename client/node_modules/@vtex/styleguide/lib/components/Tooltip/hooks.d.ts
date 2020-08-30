import { RefObject } from 'react';
export declare type Trigger = 'click' | 'hover' | 'focus';
export declare function useRect(nodeRef: any, observe?: boolean): any;
export declare function useTooltip({ trigger, }?: {
    trigger?: Trigger;
}): [(c: React.ReactElement) => object, {
    childRef: RefObject<HTMLElement>;
    visible: boolean;
}];
