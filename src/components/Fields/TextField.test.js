/* global AnimationEvent, describe, expect, it, shallow, mount */
import React from 'react';
import sinon from 'sinon';
import * as common from '../../../test/unit/commonTests';
import TextField from './TextField';
import Tooltip from '../Tooltip/Tooltip';
import TooltipBox from '../Tooltip/TooltipBox';
import { TooltipBoxStatus } from '../Tooltip/TooltipEnums';
import IconClear from '../Icon/IconClear';
import IconSearch from '../Icon/IconSearch';
import IconRequired from '../Icon/IconRequired';
import Button from '../Button/Button';

function createTextfield() {
    return shallow(<TextField label="My Input" />);
}

describe('TextField', () => {
    common.isConformant(TextField, { requiredProps: { label: 'My Input' } });

    it('renders a label element', () => {
        const textField = createTextfield();
        expect(textField.find('label').length).to.equal(1);
    });

    it('does not render a label element if no label provided', () => {
        const textField = shallow(<TextField />);
        expect(textField.find('label').length).to.equal(0);
    });

    it('does render a label element if autoHideLabel is true and value is undefined', () => {
        const textField = shallow(<TextField label="foo" autoHideLabel />);
        expect(textField.find('label').length).to.equal(1);
    });

    it('does not render a label element if autoHideLabel is true and value is defined', () => {
        const textField = shallow(<TextField label="foo" value="test" autoHideLabel />);
        expect(textField.find('label').length).to.equal(0);
    });

    it('renders a label element when there is value and input has focus', () => {
        const textField = shallow(<TextField label="test" value="example" autoHideLabel />);
        textField.find('input').simulate('focus');
        expect(textField.find('label').length).to.equal(1);
    });

    it('renders a label element when there is value and TextField has mouse over', () => {
        const textField = shallow(<TextField label="test" value="example" autoHideLabel />);
        textField.simulate('mouseEnter');
        expect(textField.find('label').length).to.equal(1);
    });

    it('sets state hasFocus to true when input focuses', () => {
        const textField = createTextfield();
        textField.find('input').simulate('focus');
        expect(textField.state('hasFocus')).equal(true);
    });

    it('sets state hasFocus to false when input blurs', () => {
        const textField = createTextfield();
        textField.find('input').simulate('blur');
        expect(textField.state('hasFocus')).equal(false);
    });

    it('sets state hasMouseOver to true when textfield sees mouseEnter', () => {
        const textField = createTextfield();
        textField.simulate('mouseEnter');
        expect(textField.state('hasMouseOver')).equal(true);
    });

    it('sets state hasMouseOver to false when textfield sees mouseLeave', () => {
        const textField = createTextfield();
        textField.simulate('mouseEnter');
        expect(textField.state('hasMouseOver')).equal(true);
        textField.simulate('mouseLeave');
        expect(textField.state('hasMouseOver')).equal(false);
    });

    it('gives parent div focus class when input has focus ', () => {
        const textField = createTextfield();
        textField.find('input').simulate('focus');
        expect(textField).to.have.className('uir-text-field--focus');
    });

    it('renders an input element', () => {
        const textField = createTextfield();
        expect(textField.find('input').length).to.equal(1);
    });

    it('has the correct classes', () => {
        const textField = createTextfield();
        expect(textField).to.have.className('uir-text-field');
        expect(textField.find('label')).to.have.className('uir-text-field-label');
        expect(textField.find('input')).to.have.className('uir-text-field-input');
    });

    it('can pass in a className prop', () => {
        const exampleClass = 'test-me';
        const textField = shallow(<TextField className={exampleClass} />);
        expect(textField).to.have.className(exampleClass);
    });

    it('has a full width class if isFullWidth is passed', () => {
        const textField = shallow(<TextField isFullWidth />);
        expect(textField).to.have.className('uir-text-field--full-width');
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

    it('updates internal value when external prop changes', () => {
        const textField = shallow(<TextField value="foo" />);
        expect(textField.state('value')).to.equal('foo');
        textField.setProps({ value: 'bar' });
        expect(textField.state('value')).to.equal('bar');
    });

    it('state does not change when prop value is the same', () => {
        const textField = mount(<TextField value="foo" />);
        const instance = textField.instance();
        const mock = sinon.mock(instance);
        const expectation = mock.expects('setState');
        textField.setProps({ name: 'bar' });
        expect(expectation).to.not.be.called();
        mock.restore();
    });

    it('updates the component state when changing the input value', () => {
        const textField = mount(<TextField />);
        const instance = textField.instance();
        instance.inputRef = { value: 'test' };
        const mock = sinon.mock(instance);
        const expectation = mock.expects('setState');
        textField.find('input').simulate('change');
        expect(expectation).to.be.called();
        mock.restore();
    });

    it('does not update the component state if input value is undefined', () => {
        const textField = mount(<TextField />);
        const instance = textField.instance();
        instance.inputRef = { value: undefined };
        const mock = sinon.mock(instance);
        const expectation = mock.expects('setState');
        textField.find('input').simulate('change');
        expect(expectation).to.not.be.called();
        mock.restore();
    });

    it('can expose the input ref', () => {
        mount(<TextField
            componentRef={ref => expect(ref).to.not.be.undefined}
        />);
    });

    it('assigns type to the default text', () => {
        const textField = createTextfield();
        expect(textField.find('input').prop('type')).to.equal('text');
    });

    it('allows type to be overridden', () => {
        const textField = shallow(<TextField label="My Input" type="email" />);
        expect(textField.find('input').prop('type')).to.equal('email');
    });

    it('allows step, man and min to be set if type is number', () => {
        const textField = shallow(<TextField label="My Input" type="number" min={1} max={21} step={3} />);
        expect(textField.find('input').prop('type')).to.equal('number');
        expect(textField.find('input').prop('min')).to.equal(1);
        expect(textField.find('input').prop('max')).to.equal(21);
        expect(textField.find('input').prop('step')).to.equal(3);
    });

    it('allows minLength and maxLength to be set', () => {
        const textField = shallow(<TextField label="My Input" type="text" minLength={5} maxLength={15} />);
        expect(textField.find('input').prop('type')).to.equal('text');
        expect(textField.find('input').prop('minLength')).to.equal(5);
        expect(textField.find('input').prop('maxLength')).to.equal(15);
    });

    ['blur', 'change', 'focus', 'keyDown', 'keyPress', 'keyUp'].forEach((event) => {
        it(`triggers handler on input ${event}`, () => {
            const spy = sinon.spy();
            const textField = shallow(<TextField
                onBlur={spy}
                onChange={spy}
                onFocus={spy}
                onKeyDown={spy}
                onKeyPress={spy}
                onKeyUp={spy}
            />);
            const instance = textField.instance();
            instance.inputRef = { value: 'test' };
            textField.find('input').simulate(event, { key: 'x' });
            expect(spy).to.be.calledOnce();
        });

        it(`does nothing on ${event} if handler is not defined`, () => {
            const spy = sinon.spy();
            const textField = createTextfield();
            const instance = textField.instance();
            instance.inputRef = { value: 'test' };
            textField.find('input').simulate(event);
            expect(spy).to.not.be.called();
        });
    });

    it('triggers handler on input enter key press', () => {
        const spy = sinon.spy();
        const textField = shallow(<TextField onEnterKey={spy} />);
        const instance = textField.instance();
        instance.inputRef = { value: 'test' };
        textField.find('input').simulate('keyDown', { key: 'Enter' });
        expect(spy).to.be.calledOnce();
    });

    it('allows input to be disabled', () => {
        const textField = shallow(<TextField isDisabled />);
        expect(textField.find('input').prop('disabled')).to.equal(true);
    });

    it('allows input to be read only', () => {
        const textField = shallow(<TextField isReadOnly />);
        expect(textField.find('input').prop('readOnly')).to.equal(true);
    });

    it('allows input to be marked as required', () => {
        const textField = shallow(<TextField isRequired />);
        expect(textField.find('input').prop('required')).to.equal(true);
    });

    it('has no validation classes by default', () => {
        const textField = shallow(<TextField />);
        expect(textField).to.not.have.className('uir-text-field--valid');
        expect(textField).to.not.have.className('uir-text-field--invalid');
    });

    it('has no validation classes if isValid is null', () => {
        const textField = shallow(<TextField isValid={null} />);
        expect(textField).to.not.have.className('uir-text-field--valid');
        expect(textField).to.not.have.className('uir-text-field--invalid');
    });

    it('adds valid class if isValid is true', () => {
        const textField = shallow(<TextField isValid />);
        expect(textField).to.have.className('uir-text-field--valid');
    });

    it('adds invalid class if isValid is false', () => {
        const textField = shallow(<TextField isValid={false} />);
        expect(textField).to.have.className('uir-text-field--invalid');
    });

    it('wraps input in a tooltip if tooltipError is given and isValid is false', () => {
        const textField = shallow(<TextField isValid={false} tooltipError="error" />);
        expect(textField.find(Tooltip).length).to.equal(1);
    });

    it('does not wrap input in a tooltip if tooltipError is given and isValid is true', () => {
        const textField = shallow(<TextField isValid tooltipError="error" />);
        expect(textField.find(Tooltip).length).to.equal(0);
    });

    it('wraps input in a tooltip if tooltipHint is given', () => {
        const textField = shallow(<TextField tooltipHint="hint" />);
        expect(textField.find(Tooltip).length).to.equal(1);
    });

    it('gives precedence to tooltipError over tooltipHint', () => {
        const textField = mount(<TextField isValid={false} tooltipHint="hint" tooltipError="error" />);
        textField.find('input').simulate('focus');
        expect(textField.find(TooltipBox).prop('status')).to.equal(TooltipBoxStatus.ERROR);
    });

    it('defines tabIndex for the TextField', () => {
        const tabIndexValue = 3;
        const textField = mount(<TextField value="an example value" tabIndex={tabIndexValue} isClearable />);
        expect(textField.prop('tabIndex')).to.equal(tabIndexValue);
    });

    it('displays a clear icon if isClearable is given and textfield has a value', () => {
        const textField = mount(<TextField value="an example value" isClearable />);
        expect(textField.find(IconClear).length).to.equal(1);
    });

    it('calls clearButtonRef when the clear icon is rendered', () => {
        const clearButtonRef = sinon.spy();
        mount(<TextField value="an example value" clearButtonRef={clearButtonRef} isClearable />);
        expect(clearButtonRef).to.be.calledOnce();
    });

    it('Defines tabIndex correctly for the clear button', () => {
        const tabIndexValue = 2;
        const textField = mount(<TextField value="an example value" clearButtonTabIndex={tabIndexValue} isClearable />);
        const button = textField.find(Button);
        expect(button.prop('tabIndex')).to.equal(tabIndexValue);
    });

    it('does not display a clear icon if isClearable is given but the textfield has no value', () => {
        const textField = shallow(<TextField isClearable />);
        expect(textField.find(IconClear).length).to.equal(0);
    });

    it('displays a required icon if isRequired is given', () => {
        const textField = shallow(<TextField label="my label" hasLabelAlways isRequired />);
        expect(textField.find(IconRequired).length).to.equal(1);
    });

    it('shows a tooltip when hovering over required icon', () => {
        const textField = shallow(<TextField label="my label" hasLabelAlways isRequired />);
        textField.find(IconRequired).simulate('hover');
        expect(textField.find(Tooltip).length).to.equal(1);
    });

    it('gives focus to input when left icon is clicked', () => {
        const textField = mount(<TextField
            icon={<IconSearch />}
            onFocus={event => expect(event).to.have.property('value')}
        />);
        textField.find(Button).simulate('click');
    });

    it('does not clear value when left icon is clicked', () => {
        const mockValue = 'test me';
        const textField = mount(<TextField icon={<IconSearch />} value={mockValue} />);
        textField.find(Button).simulate('click');
        expect(textField.state('value')).to.equal(mockValue);
    });

    it('gives focus to input when clear icon is clicked', () => {
        const textField = mount(<TextField
            isClearable
            onFocus={event => expect(event).to.have.property('value')}
            value="an example value"
        />);
        textField.find(Button).simulate('click');
    });

    it('clears value when clear icon is clicked', () => {
        const textField = mount(<TextField value="an example value" isClearable />);
        textField.find(Button).simulate('click');
        expect(textField.state('value')).to.equal('');
    });

    it('clear does not change value if input is not mounted and has no reference', () => {
        const textField = shallow(<TextField value="foo" isClearable />);
        textField.find(Button).simulate('click');
        expect(textField.state('value')).to.equal('foo');
    });

    it('input regains focus after clear icon is clicked', () => {
        const focusSpy = sinon.spy();
        const textField = mount(<TextField
            value="an example value"
            isClearable
            onFocus={focusSpy}
        />);
        textField.instance().inputRef = {
            focus: sinon.spy(),
        };
        textField.find(Button).simulate('click');
        expect(textField.instance().inputRef.focus).to.be.called();
    });

    it('displays an icon if provided', () => {
        const textField = mount(<TextField icon={<IconSearch />} />);
        expect(textField.find(IconSearch).length).to.equal(1);
    });

    it('adds style to wrapper if provided', () => {
        const exampleStyle = { marginTop: '20px' };
        const textField = shallow(<TextField style={exampleStyle} />);
        expect(textField.prop('style')).to.equal(exampleStyle);
    });

    it('adds name to input if provided', () => {
        const exampleName = 'example';
        const textField = shallow(<TextField name={exampleName} />);
        expect(textField.find('input').prop('name')).to.equal(exampleName);
    });

    it('adds --has-value when value is not null', () => {
        const textField = shallow(<TextField value="test" />);
        expect(textField.hasClass('uir-text-field--has-value')).to.equal(true);
    });

    it('does not add --has-value when value is null', () => {
        const textField = shallow(<TextField value={null} />);
        expect(textField.hasClass('uir-text-field--has-value')).to.equal(false);
    });

    it('adds --has-value when value is falsy but not null', () => {
        const textField = shallow(<TextField value={0} />);
        expect(textField.hasClass('uir-text-field--has-value')).to.equal(true);
    });

    it('does not add --has-value when value is undefined', () => {
        const textField = shallow(<TextField />);
        expect(textField.hasClass('uir-text-field--has-value')).to.not.equal(true);
    });

    it('fixes input focus when it\'s wrapped by tooltip', () => {
        const textField = mount(<TextField isValid tooltipError="Error" />);
        textField.setState({ hasFocus: true });
        sinon.spy(textField.instance(), 'fixInputFocus');

        textField.setProps({
            isValid: false,
        });
        expect(textField.instance().fixInputFocus).to.be.called();
    });

    it('fixes input focus when it ceases to be wrapped by a tooltip', () => {
        const textField = mount(<TextField isValid={false} tooltipError="Error" />);
        textField.setState({ hasFocus: true });
        sinon.spy(textField.instance(), 'fixInputFocus');

        textField.setProps({
            isValid: true,
        });
        expect(textField.instance().fixInputFocus).to.be.called();
    });

    it('fixInputFocs calls input ref focus', () => {
        const textField = mount(<TextField />);
        sinon.spy(textField.instance().inputRef, 'focus');
        textField.instance().fixInputFocus();

        expect(textField.instance().inputRef.focus).to.be.called();
    });

    it('fixInputFocs sets input the selection to the last character', () => {
        const textField = mount(<TextField />);
        textField.instance().inputRef = {
            focus: sinon.spy(),
            value: 'ab',
        };
        textField.instance().fixInputFocus();

        expect(textField.instance().inputRef.selectionStart).to.equal(2);
        expect(textField.instance().inputRef.selectionEnd).to.equal(2);
    });

    it('accepts autoComplete prop', () => {
        const textField = mount(<TextField autoComplete="off" />);
        const input = textField.find('input');

        expect(input.prop('autoComplete')).to.equal('off');
    });

    describe('prefix', () => {
        it('displays a prefix if value present', () => {
            const textField = shallow(<TextField prefix="£" value="test" />);
            expect(textField.find(Button).length).to.equal(1);
        });

        it('still display a prefix if value is zero', () => {
            const textField = shallow(<TextField prefix="£" value={0} />);
            expect(textField.find(Button).length).to.equal(1);
        });

        it('does not display a prefix if value is empty string', () => {
            const textField = shallow(<TextField prefix="£" value="" />);
            expect(textField.find(Button).length).to.equal(0);
        });

        it('displays a prefix if input has focus', () => {
            const textField = shallow(<TextField prefix="£" />);
            textField.setState({ hasFocus: true });
            expect(textField.find(Button).length).to.equal(1);
        });

        it('only displays prefix if prefix and icon are set', () => {
            const textField = mount(<TextField icon={<IconSearch />} prefix="£" value="test" />);
            expect(textField.find(Button).first().text()).to.equal('£');
        });

        it('gives focus to input when prefix is clicked', () => {
            const textField = mount(<TextField
                onFocus={event => expect(event).to.have.property('value')}
                prefix="£"
                value="test"
            />);
            textField.find(Button).simulate('click');
        });

        it('does not clear value when prefix is clicked', () => {
            const mockValue = 'test me';
            const textField = mount(<TextField prefix="£" value={mockValue} />);
            textField.find(Button).simulate('click');
            expect(textField.state('value')).to.equal(mockValue);
        });
    });

    describe('browser autofill', () => {
        it('adds --has-value class when Chrome autofill is detected using CSS animations', () => {
            const textField = mount(<TextField />);
            const inputNode = textField.find('input').getDOMNode();
            inputNode.dispatchEvent(new AnimationEvent('animationstart', { animationName: 'uirOnAutoFillStart' }));
            expect(textField).to.have.className('uir-text-field--has-value');
        });

        it('removes a previously added --has-value class when Chrome autofill removal is detected', () => {
            const textField = mount(<TextField />);
            const inputNode = textField.find('input').getDOMNode();
            inputNode.dispatchEvent(new AnimationEvent('animationstart', { animationName: 'uirOnAutoFillStart' }));
            expect(textField).to.have.className('uir-text-field--has-value');
            inputNode.dispatchEvent(new AnimationEvent('animationstart', { animationName: 'uirOnAutoFillCancel' }));
            expect(textField).not.to.have.className('uir-text-field--has-value');
        });

        it('does not add a --has-value class when an unrelated CSS animation is detected', () => {
            const textField = mount(<TextField />);
            const inputNode = textField.find('input').getDOMNode();
            inputNode.dispatchEvent(new AnimationEvent('animationstart', { animationName: 'test' }));
            expect(textField).not.to.have.className('uir-text-field--has-value');
        });
    });
});
