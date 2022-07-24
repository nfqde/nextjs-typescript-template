/* eslint-disable max-classes-per-file, react/no-multi-comp */
import {Component} from 'react';

declare module '@nfq/feature-flags/jsx' {
    interface IFeature {
        deprecatesOn?: string;
        feature: string;
    }

    /**
     * WithFeature component.
     */
    export class WithFeature extends Component<IFeature, any> {}
    /**
     * WithoutFeature component.
     */
    export class WithoutFeature extends Component<IFeature, any> {}
}