/* global describe, expect, it, shallow, mount */
import React from 'react';
import sinon from 'sinon';
import DateField from './DateField';
import * as common from '../../../test/unit/commonTests';

function createMockDate() {
    const mockDate = new Date();
    mockDate.setDate(1);
    mockDate.setMonth(0);
    mockDate.setYear(2018);
    return mockDate;
}

describe('DateField', () => {
    common.isConformant(DateField);

    it('can set an initial date value', () => {
        const dateField = mount(<DateField value={createMockDate()} />);
        expect(dateField.find('input').prop('value')).to.equal('01 Jan 2018');
    });

    it('can change the value via props', () => {
        const mockDate = createMockDate();
        const dateField = mount(<DateField value={mockDate} />);
        mockDate.setDate(20);
        dateField.setProps({ value: mockDate });
        expect(dateField.find('input').prop('value')).to.equal('20 Jan 2018');
    });

    it('does call setState if value prop is changed', () => {
        const dateField = mount(<DateField />);
        const instance = dateField.instance();
        sinon.spy(instance, 'setState');
        dateField.setProps({ value: createMockDate() });
        expect(instance.setState).to.be.calledOnce();
    });

    it('does not call setState if props (excl value) are changed', () => {
        const dateField = mount(<DateField />);
        const instance = dateField.instance();
        sinon.spy(instance, 'setState');
        dateField.setProps({ class: 'foo-bar-class' });
        expect(instance.setState).to.not.be.called();
    });

    it('will show date picker on focus', () => {
        const dateField = mount(<DateField value={createMockDate()} />);
        dateField.find('input').simulate('focus');
        expect(dateField.state('showDatePicker')).to.be.true();
    });

    it('will hide date picker on blur', () => {
        const dateField = mount(<DateField value={createMockDate()} />);
        dateField.find('input').simulate('focus');
        expect(dateField.state('showDatePicker')).to.be.true();
        dateField.find('input').simulate('blur');
        expect(dateField.state('showDatePicker')).to.be.false();
    });

    it('sets selectedDate when DateInlinePicker changes', () => {
        const mockDate = createMockDate();
        const dateField = shallow(<DateField />);
        dateField.instance().handleDatePickerChange([mockDate]);
        expect(dateField.state('selectedDate').toString()).to.equal(mockDate.toString());
    });
});
