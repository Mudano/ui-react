/* global describe, expect, it, shallow, mount */
import React from 'react';
import sinon from 'sinon';
import TextField from './TextField';

function createTextfield() {
    return shallow(<TextField label="My Input" />);
}

describe('TextField', () => {
    it('renders an div wrapper element', () => {
        const textField = createTextfield();
        expect(textField).to.have.tagName('div');
    });

    it('renders an label element', () => {
        const textField = createTextfield();
        expect(textField.find('label').length).to.equal(1);
    });

    it('does not render a label element if no label provided', () => {
        const textField = shallow(<TextField />);
        expect(textField.find('label').length).to.equal(0);
    });

    it('sets state hasFocus to true when input focuses', () => {
        const textField = createTextfield();
        textField.find('input').simulate('focus');
        expect(textField.state()).to.have.property('hasFocus', true);
    });

    it('sets state hasFocus to false when input blurs', () => {
        const textField = createTextfield();
        textField.find('input').simulate('blur');
        expect(textField.state()).to.have.property('hasFocus', false);
    });

    it('gives parent div focus class when input has focus ', () => {
        const textField = createTextfield();
        textField.find('input').simulate('focus');
        expect(textField).to.have.className('uir-textfield--focus');
    });

    it('renders an input element', () => {
        const textField = createTextfield();
        expect(textField.find('input').length).to.equal(1);
    });

    it('has the correct classes', () => {
        const textField = createTextfield();
        expect(textField).to.have.className('uir-textfield');
        expect(textField.find('label')).to.have.className('uir-textfield-label');
        expect(textField.find('input')).to.have.className('uir-textfield-input');
    });

    it('can pass in a className prop', () => {
        const exampleClass = 'test-me';
        const textField = shallow(<TextField className={exampleClass} />);
        expect(textField).to.have.className(exampleClass);
    });

    it('shows a placeholder when input has focus', () => {
        const examplePlaceholder = 'example placeholder';
        const textField = shallow(<TextField placeholder={examplePlaceholder} />);
        textField.setState({ hasFocus: true });
        const input = textField.find('input');
        expect(input.prop('placeholder')).to.equal(examplePlaceholder);
    });

    it('can take a starting value', () => {
        const exampleValue = 'my example value';
        const textField = shallow(<TextField value={exampleValue} />);
        expect(textField.find('input').prop('value')).to.equal(exampleValue);
    });

    it('updates the component state when changing the input value', () => {
        const textField = mount(<TextField />);
        const instance = textField.instance();
        const mock = sinon.mock(instance);
        const expectation = mock.expects('setState');
        textField.find('input').simulate('change');
        expect(expectation).to.be.called();
        mock.restore();
    });

    it('can expose the input ref', () => {
        mount(<TextField
            componentRef={ref => expect(ref).to.not.be.undefined}
        />);
    });
});