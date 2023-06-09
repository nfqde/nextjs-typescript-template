/* eslint-disable no-undef */
import 'cypress/react18';
import type {ReactElement} from 'react';

// ***********************************************
// This example commands.ts shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
//
// declare global {
//   namespace Cypress {
//     interface Chainable {
//       login(email: string, password: string): Chainable<void>
//       drag(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       dismiss(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       visit(originalFn: CommandOriginalFn, url: string, options: Partial<VisitOptions>): Chainable<Element>
//     }
//   }
// }

Cypress.Commands.add('getCy', value => cy.get(`[data-cy="${value}"]`));

Cypress.Commands.add('mountHook', hook => {
    const hookValues = {current: null};

    /**
     * Mock component to mount the hook.
     *
     * @returns Null.
     */
    const MockComponent = (): ReactElement => {
        hookValues.current = hook();

        return null as unknown as ReactElement;
    };

    return cy.wrap({
        MockComponent,
        values: hookValues
    });
});

/**
 * Tests if an element is of an specific type.
 *
 * @param chai The chai object.
 */
const isHtmlElement = (chai: Chai.ChaiStatic) => {
    /**
     * Asserts for an specific html tagName.
     *
     * @param tagName Options given to the command.
     */
    function assertHtmlElement(this: Chai.AssertionStatic, tagName: string) {
        this.assert(
            // eslint-disable-next-line no-underscore-dangle
            (this._obj as HTMLElement[])[0].tagName.toLowerCase() === tagName.toLowerCase(),
            `expected #{this} to be HtmlElement ${tagName.toLowerCase()}`,
            `expected #{this} to not be HtmlElement ${tagName.toLowerCase()}`,
            // eslint-disable-next-line no-invalid-this, no-underscore-dangle
            this._obj
        );
    }

    chai.Assertion.addMethod('htmlElement', assertHtmlElement);
};

/**
 * Tests if an element is of an specific type.
 *
 * @param chai The chai object.
 */
const hasDarkColor = (chai: Chai.ChaiStatic) => {
    /**
     * Asserts for an specific html tagName.
     */
    function assertRbaColor(this: Chai.AssertionStatic) {
        // eslint-disable-next-line no-underscore-dangle
        const [r, g, b] = (this._obj as string).replace('rgb(', '').replace(')', '').split(',');

        // eslint-disable-next-line @nfq/no-magic-numbers
        const luma = 0.2126 * parseInt(r, 10) + 0.7152 * parseInt(g, 10) + 0.0722 * parseInt(b, 10);

        this.assert(
            // eslint-disable-next-line @nfq/no-magic-numbers
            (luma < 131),
            'expected #{this} to be an dark color',
            'expected #{this} not to be an dark color',
            // eslint-disable-next-line no-invalid-this, no-underscore-dangle
            this._obj
        );
    }

    chai.Assertion.addMethod('dark', assertRbaColor);
};

/**
 * Tests if an element is of an specific type.
 *
 * @param chai The chai object.
 */
const hasDarkerColor = (chai: Chai.ChaiStatic) => {
    /**
     * Asserts for an specific html tagName.
     *
     * @param otherColor Options given to the command.
     */
    function assertRbaColor(this: Chai.AssertionStatic, otherColor: string) {
        // eslint-disable-next-line no-underscore-dangle
        const [r, g, b] = (this._obj as string).replace('rgb(', '').replace(')', '').split(',');
        const [or, og, ob] = otherColor.replace('rgb(', '').replace(')', '').split(',');
        // eslint-disable-next-line @nfq/no-magic-numbers
        const luma = 0.2126 * parseInt(r, 10) + 0.7152 * parseInt(g, 10) + 0.0722 * parseInt(b, 10);
        // eslint-disable-next-line @nfq/no-magic-numbers
        const otherLuma = 0.2126 * parseInt(or, 10) + 0.7152 * parseInt(og, 10) + 0.0722 * parseInt(ob, 10);

        this.assert(
            // eslint-disable-next-line @nfq/no-magic-numbers
            (luma < otherLuma),
            `expected #{this} to be an darker color as ${otherColor}`,
            `expected #{this} not to be an darker color as ${otherColor}`,
            // eslint-disable-next-line no-invalid-this, no-underscore-dangle
            this._obj
        );
    }

    chai.Assertion.addMethod('darker', assertRbaColor);
};

chai.use(isHtmlElement);
chai.use(hasDarkColor);
chai.use(hasDarkerColor);