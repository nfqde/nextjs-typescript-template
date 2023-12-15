import React from 'react';
import styled from 'styled-components';

import {Colors as ColorsList} from '../../../../src/client/ui/utils/globalStyles';

import type {Meta, StoryObj} from '@storybook/react';

const ColorGrid = () => {
    const names = Object.keys(ColorsList).filter(key => isNaN(parseInt(key))).map(key => key);
    const values = Object.values(ColorsList).filter(value => typeof value === 'string')

    return (
        <Grid>
            {names.map((name, index) => (
                <ColorDisplay key={index}>
                    <Color $color={values[index]} />
                    <Text>{name}</Text>
                </ColorDisplay>
            ))}
        </Grid>
    );
};

const Grid = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
    grid-gap: 2rem;
    align-items: stretch;
    justify-items: center;
    padding: 1rem;
    width: 100%;
`;

const ColorDisplay = styled.div`
    display: flex;
    gap: 0.5rem;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    width: 100%;
`;

const Color = styled.div<{$color: string}>`
    aspect-ratio: 1 / 1;
    background-color: ${({$color}) => $color};
    width: 100%;
`;

const Text = styled.span`
    font-family: ${({theme}) => theme.fonts.Lato};
    font-size: 1.2rem;
`;

const meta: Meta<typeof ColorGrid> = {
    component: ColorGrid,
    title: 'Basics/Colors'
};

export default meta;

type Story = StoryObj<typeof ColorGrid>;

export const Colors: Story = {parameters: {controls: {hideNoControlsWarning: true}}};