import {
    Input as InputElem,
    Textarea as TextareaElem,
    Dropdown as DropdownElem,
    MultiValueInput as MultiValueInputElem,
} from './Inputs';
import type { Meta, StoryFn } from '@storybook/react';

export default {
    title: 'Components/Inputs',
    component: InputElem,
} as Meta<typeof InputElem>;

export const Input: StoryFn<typeof InputElem> = (args) => {
    return <InputElem label="Test input" />;
};
Input.parameters = {
    theme: 'light',
};
export const InputDark = Input.bind({});
InputDark.parameters = {
    theme: 'dark',
};

export const Textarea: StoryFn<typeof TextareaElem> = (args) => {
    const { label, ...rest } = args;
    return <TextareaElem label="Test textarea" {...rest} />;
};
Textarea.parameters = {
    theme: 'light',
};
export const TextareaDark = Textarea.bind({});
TextareaDark.parameters = {
    theme: 'dark',
};

export const TextareaSmall = Textarea.bind({});
TextareaSmall.args = {
    small: true,
};

export const Dropdown: StoryFn<typeof DropdownElem> = (args) => {
    return (
        <div id="popover-root">
            <DropdownElem label="Test dropdown" options={['Todo', 'Doing', 'Done']} />
        </div>
    );
};
Dropdown.parameters = {
    theme: 'light',
};
export const DropdownDark = Dropdown.bind({});
DropdownDark.parameters = {
    theme: 'dark',
};

export const MultiValueInput: StoryFn<typeof MultiValueInputElem> = (args) => {
    return (
        <div id="popover-root">
            <MultiValueInputElem
                label="Test multi value input"
                changeHandler={() => {}}
                addBtnText="Add"
                placeholder="Enter a value"
                validationHandler={(val) => [true, '']}
                values={args.values}
                fieldType={args.fieldType}
            />
        </div>
    );
};

MultiValueInput.args = {
    values: [{ id: '1', value: 'Test' }],
};

export const MultiValueInputSeveralValues = MultiValueInput.bind({});
MultiValueInputSeveralValues.args = {
    values: [
        { id: '1', value: 'Test' },
        { id: '2', value: '', errorMsg: "Can't be empty", isValid: false, isTouched: true },
        { id: '3', value: 'Test 2' },
    ],
};
MultiValueInputSeveralValues.parameters = {
    theme: 'light',
};

export const MultiValueInputTextarea = MultiValueInput.bind({});
MultiValueInputTextarea.args = {
    fieldType: 'textarea',
    values: [
        { id: '1', value: 'Test' },
        { id: '2', value: '', errorMsg: "Can't be empty", isValid: false, isTouched: true },
        { id: '3', value: 'Test 2' },
    ],
};
MultiValueInputTextarea.parameters = {
    theme: 'light',
};