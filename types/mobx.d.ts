// import original module declarations
import type React from 'react';

import type {IObserverOptions} from 'mobx-react-lite/dist/observer.d';
import 'mobx-react-lite';

// and extend them!
declare module 'mobx-react-lite' {
    export declare function observer<
        C extends React.ForwardRefRenderFunction<any> | React.FunctionComponent<any>,
        Options extends IObserverOptions,
        D
    >(baseComponent: C, options?: Options, defaults?: D): Options extends {
        forwardRef: true;
    }
        ? C extends React.ForwardRefRenderFunction<infer TRef, infer P>
        ? C & React.MemoExoticComponent<
            React.ForwardRefExoticComponent<React.PropsWithoutRef<P> & React.RefAttributes<TRef>>
        > : never : C & {
        defaultProps: D;
        displayName: string;
    };
}