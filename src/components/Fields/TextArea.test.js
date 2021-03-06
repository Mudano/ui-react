/* global describe, expect, it, shallow, mount */
import React from 'react';
import sinon from 'sinon';
import * as common from '../../../test/unit/commonTests';
import TextArea from './TextArea';
import Tooltip from '../Tooltip/Tooltip';
import IconRequired from '../Icon/IconRequired';

function createTextarea() {
    return shallow(<TextArea label="My Input" />);
}

describe('TextArea', () => {
    common.isConformant(TextArea, { requiredProps: { label: 'My Input' } });

    it('renders a label element', () => {
        const textArea = createTextarea();
        expect(textArea.find('label').length).to.equal(1);
    });

    it('does not render a label element if no label provided', () => {
        const textArea = shallow(<TextArea />);
        expect(textArea.find('label').length).to.equal(0);
    });

    it('does render a label element if autoHideLabel is true and value is undefined', () => {
        const textField = shallow(<TextArea label="foo" autoHideLabel />);
        expect(textField.find('label').length).to.equal(1);
    });

    it('does not render a label element if autoHideLabel is true and value is defined', () => {
        const textField = shallow(<TextArea label="foo" value="test" autoHideLabel />);
        expect(textField.find('label').length).to.equal(0);
    });

    it('renders a label element when there is value and textarea has focus', () => {
        const textArea = shallow(<TextArea label="test" value="example" autoHideLabel />);
        textArea.find('textarea').simulate('focus');
        expect(textArea.find('label').length).to.equal(1);
    });

    it('renders a label element when there is value and TextArea has mouse over', () => {
        const textArea = shallow(<TextArea label="test" value="example" autoHideLabel />);
        textArea.simulate('mouseEnter');
        expect(textArea.find('label').length).to.equal(1);
    });

    it('sets state hasFocus to true when textarea focuses', () => {
        const textArea = createTextarea();
        textArea.find('textarea').simulate('focus');
        expect(textArea.state('hasFocus')).equal(true);
    });

    it('sets state hasFocus to false when textarea blurs', () => {
        const textArea = createTextarea();
        textArea.find('textarea').simulate('blur');
        expect(textArea.state('hasFocus')).equal(false);
    });

    it('sets state hasMouseOver to true when textarea sees mouseEnter', () => {
        const textArea = createTextarea();
        textArea.simulate('mouseEnter');
        expect(textArea.state('hasMouseOver')).equal(true);
    });

    it('sets state hasMouseOver to false when textarea sees mouseLeave', () => {
        const textArea = createTextarea();
        textArea.simulate('mouseEnter');
        expect(textArea.state('hasMouseOver')).equal(true);
        textArea.simulate('mouseLeave');
        expect(textArea.state('hasMouseOver')).equal(false);
    });

    it('gives parent div focus class when textarea has focus ', () => {
        const textArea = createTextarea();
        textArea.find('textarea').simulate('focus');
        expect(textArea).to.have.className('uir-text-area--focus');
    });

    it('renders an textarea element', () => {
        const textArea = createTextarea();
        expect(textArea.find('textarea').length).to.equal(1);
    });

    it('has the correct classes', () => {
        const textArea = createTextarea();
        expect(textArea).to.have.className('uir-text-area');
        expect(textArea.find('label')).to.have.className('uir-text-area-label');
        expect(textArea.find('textarea')).to.have.className('uir-text-area-input');
    });

    it('can pass in a className prop', () => {
        const exampleClass = 'test-me';
        const textArea = shallow(<TextArea className={exampleClass} />);
        expect(textArea).to.have.className(exampleClass);
    });

    it('has a full width class if isFullWidth is passed', () => {
        const textArea = shallow(<TextArea isFullWidth />);
        expect(textArea).to.have.className('uir-text-area--full-width');
    });

    it('has fixed height class if hasFixedHeight is true', () => {
        const textArea = shallow(<TextArea hasFixedHeight />);
        expect(textArea).to.have.className('uir-text-area--fixed-height');
        expect(textArea).to.not.have.className('uir-text-area--auto-height');
    });

    it('has auto height class if hasFixedHeight is false', () => {
        const textArea = shallow(<TextArea hasFixedHeight={false} />);
        expect(textArea).to.not.have.className('uir-text-area--fixed-height');
        expect(textArea).to.have.className('uir-text-area--auto-height');
    });

    it('shows a placeholder when textarea has focus', () => {
        const examplePlaceholder = 'example placeholder';
        const textArea = shallow(<TextArea placeholder={examplePlaceholder} />);
        textArea.setState({ hasFocus: true });
        const textarea = textArea.find('textarea');
        expect(textarea.prop('placeholder')).to.equal(examplePlaceholder);
    });

    it('can take a starting value', () => {
        const exampleValue = 'my example value';
        const textArea = shallow(<TextArea value={exampleValue} />);
        expect(textArea.find('textarea').prop('value')).to.equal(exampleValue);
    });

    it('updates internal value when external prop changes', () => {
        const textField = shallow(<TextArea value="foo" />);
        expect(textField.state('value')).to.equal('foo');
        textField.setProps({ value: 'bar' });
        expect(textField.state('value')).to.equal('bar');
    });

    it('state does not change when prop value is the same', () => {
        const textField = mount(<TextArea value="foo" />);
        const instance = textField.instance();
        const mock = sinon.mock(instance);
        const expectation = mock.expects('setState');
        textField.setProps({ name: 'bar' });
        expect(expectation).to.not.be.called();
        mock.restore();
    });

    it('updates the component state when changing the textarea value', () => {
        const textArea = shallow(<TextArea />);
        const instance = textArea.instance();
        instance.inputRef = { value: 'test' };
        const setStateSpy = sinon.spy(textArea.instance(), 'setState');
        textArea.find('textarea').simulate('change');
        expect(setStateSpy).to.have.been.called();
    });

    it('does not update the component state if textarea value is undefined', () => {
        const textArea = shallow(<TextArea />);
        const instance = textArea.instance();
        instance.inputRef = { value: undefined };
        const mock = sinon.mock(instance);
        const expectation = mock.expects('setState');
        textArea.find('textarea').simulate('change');
        expect(expectation).to.not.be.called();
        mock.restore();
    });

    it('can expose the textarea ref', () => {
        mount(<TextArea
            componentRef={ref => expect(ref).to.not.be.undefined}
        />);
    });

    it('does nothing if no component ref fn is provided', () => {
        mount(<TextArea />);
    });

    it('accepts autoComplete prop', () => {
        const textArea = mount(<TextArea autoComplete="off" />);
        const input = textArea.find('textarea');

        expect(input.prop('autoComplete')).to.equal('off');
    });

    ['blur', 'change', 'focus', 'keyDown', 'keyPress', 'keyUp'].forEach((event) => {
        it(`triggers handler on textarea ${event}`, () => {
            const spy = sinon.spy();
            const textArea = shallow(<TextArea
                onBlur={spy}
                onChange={spy}
                onFocus={spy}
                onKeyDown={spy}
                onKeyPress={spy}
                onKeyUp={spy}
            />);
            const instance = textArea.instance();
            instance.inputRef = { value: 'test' };
            textArea.find('textarea').simulate(event, { key: 'x' });
            expect(spy).to.be.calledOnce();
        });

        it(`does nothing on ${event} if handler is not defined`, () => {
            const spy = sinon.spy();
            const textArea = createTextarea();
            const instance = textArea.instance();
            instance.inputRef = { value: 'test' };
            textArea.find('textarea').simulate(event);
            expect(spy).to.not.be.called();
        });
    });

    it('triggers handler on textarea enter key press', () => {
        const spy = sinon.spy();
        const textArea = shallow(<TextArea onEnterKey={spy} />);
        const instance = textArea.instance();
        instance.inputRef = { value: 'test' };
        textArea.find('textarea').simulate('keyDown', { key: 'Enter' });
        expect(spy).to.be.calledOnce();
    });

    it('allows textarea to be disabled', () => {
        const textArea = shallow(<TextArea isDisabled />);
        expect(textArea.find('textarea').prop('disabled')).to.equal(true);
    });

    it('allows textarea to be read only', () => {
        const textArea = shallow(<TextArea isReadOnly />);
        expect(textArea.find('textarea').prop('readOnly')).to.equal(true);
    });

    it('allows textarea to be marked as required', () => {
        const textArea = shallow(<TextArea isRequired />);
        expect(textArea.find('textarea').prop('required')).to.equal(true);
    });

    it('has no validation classes by default', () => {
        const textArea = shallow(<TextArea />);
        const textAreaInner = textArea.find('.uir-text-area-inner');
        expect(textArea).to.not.have.className('uir-text-area--valid');
        expect(textAreaInner).to.not.have.className('uir-text-area-inner--invalid');
    });

    it('has no validation classes if isValid is null', () => {
        const textArea = shallow(<TextArea isValid={null} />);
        const textAreaInner = textArea.find('.uir-text-area-inner');
        expect(textArea).to.not.have.className('uir-text-area--valid');
        expect(textAreaInner).to.not.have.className('uir-text-area-inner--invalid');
    });

    it('adds valid class if isValid is true', () => {
        const textArea = shallow(<TextArea isValid />);
        expect(textArea).to.have.className('uir-text-area--valid');
    });

    it('adds invalid class if isValid is false', () => {
        const textAreaInner = shallow(<TextArea isValid={false} />).find('.uir-text-area-inner');
        expect(textAreaInner).to.have.className('uir-text-area-inner--invalid');
    });

    it('wraps textarea in a tooltip if tooltipError is given and isValid is false', () => {
        const textArea = shallow(<TextArea isValid={false} tooltipError="error" />);
        expect(textArea.find(Tooltip).length).to.equal(1);
    });

    it('does not wrap textarea in a tooltip if tooltipError is given and isValid is true', () => {
        const textArea = shallow(<TextArea isValid tooltipError="error" />);
        expect(textArea.find(Tooltip).length).to.equal(0);
    });

    it('wraps textarea in a tooltip if tooltipHint is given', () => {
        const textArea = shallow(<TextArea tooltipHint="hint" />);
        expect(textArea.find(Tooltip).length).to.equal(1);
    });

    it('displays a required icon if isRequired is given', () => {
        const textArea = shallow(<TextArea label="my label" hasLabelAlways isRequired />);
        expect(textArea.find(IconRequired).length).to.equal(1);
    });

    it('shows a tooltip when hovering over required icon', () => {
        const textArea = shallow(<TextArea label="my label" hasLabelAlways isRequired />);
        textArea.find(IconRequired).simulate('hover');
        expect(textArea.find(Tooltip).length).to.equal(1);
    });

    it('adds style to wrapper if style provided', () => {
        const exampleStyle = { marginTop: '20px' };
        const textArea = shallow(<TextArea style={exampleStyle} />);
        expect(textArea.prop('style')).to.equal(exampleStyle);
    });

    it('adds --has-value when value is not null', () => {
        const textField = shallow(<TextArea value="test" />);
        expect(textField.hasClass('uir-text-area--has-value')).to.equal(true);
    });

    it('does not add --has-value when value is null', () => {
        const textField = shallow(<TextArea value={null} />);
        expect(textField.hasClass('uir-text-area--has-value')).to.equal(false);
    });

    it('adds --has-value when value is falsy but not null', () => {
        const textField = shallow(<TextArea value={0} />);
        expect(textField.hasClass('uir-text-area--has-value')).to.equal(true);
    });

    it('does not add --has-value when value is undefined', () => {
        const textField = shallow(<TextArea />);
        expect(textField.hasClass('uir-text-area--has-value')).to.not.equal(true);
    });

    it('fixes input focus when it\'s wrapped by tooltip', () => {
        const textField = mount(<TextArea isValid tooltipError="Error" />);
        textField.setState({ hasFocus: true });
        sinon.spy(textField.instance(), 'fixInputFocus');

        textField.setProps({
            isValid: false,
        });
        expect(textField.instance().fixInputFocus).to.be.called();
    });

    it('fixes input focus when it ceases to be wrapped by a tooltip', () => {
        const textField = mount(<TextArea isValid={false} tooltipError="Error" />);
        textField.setState({ hasFocus: true });
        sinon.spy(textField.instance(), 'fixInputFocus');

        textField.setProps({
            isValid: true,
        });
        expect(textField.instance().fixInputFocus).to.be.called();
    });

    it('fixInputFocus calls input ref focus', () => {
        const textField = mount(<TextArea />);
        sinon.spy(textField.instance().inputRef, 'focus');
        textField.instance().fixInputFocus();

        expect(textField.instance().inputRef.focus).to.be.called();
    });

    it('fixInputFocus sets the input selection to the last character', () => {
        const textField = mount(<TextArea />);
        textField.instance().inputRef = {
            focus: sinon.spy(),
            value: 'ab',
        };
        textField.instance().fixInputFocus();

        expect(textField.instance().inputRef.selectionStart).to.equal(2);
        expect(textField.instance().inputRef.selectionEnd).to.equal(2);
    });

    it('does not shows validation message if validationMessage is given but isValid is true', () => {
        const textArea = shallow(<TextArea isValid errorMessageType="message" validationMessage="This field is invalid" />);
        expect(textArea.find('.uir-text-area-validation-message').length).to.equal(0);
    });

    it('does not shows validation message if errorMessageType is not \'message\'', () => {
        const textArea = shallow(<TextArea isValid={false} validationMessage="This field is invalid" />);
        expect(textArea.find('.uir-text-area-validation-message').length).to.equal(0);
    });

    it('shows validation message if errorMessageType is \'message\' and the field is invalid', () => {
        const textArea = shallow(<TextArea isValid={false} errorMessageType="message" validationMessage="This field is invalid" />);
        const message = textArea.find('.uir-text-area-validation-message');
        expect(message.length).to.equal(1);
        expect(message.text()).to.equal('This field is invalid');
    });

    it('shows validation message using the tooltipError value if errorMessageType is \'message\' and validationMessage is not provided', () => {
        const textArea = shallow(<TextArea isValid={false} errorMessageType="message" tooltipError="This field is invalid" />);
        const message = textArea.find('.uir-text-area-validation-message');
        expect(message.length).to.equal(1);
        expect(message.text()).to.equal('This field is invalid');
    });

    it('Correctly passes tabIndex for textarea input', () => {
        const tabIndexValue = 3;
        const textArea = mount(<TextArea tabIndex={tabIndexValue} />);
        expect(textArea.prop('tabIndex')).to.equal(tabIndexValue);
    });
});
