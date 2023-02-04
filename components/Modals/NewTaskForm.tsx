import { FC } from 'react';
import useInput from '../../hooks/useInput';
import { Column, MultiInput } from '../../types';
import { ButtonPrimary } from '../Buttons/Buttons';
import { Dropdown, Input, MultiValueInput, Textarea } from '../Inputs/Inputs';
import { mutate } from 'swr';

// Validate input length - must be between 1 and 20 characters. Return tuple of boolean and error message.
const validateName = (val: string | undefined): [boolean, string] => {
    if (!val || val?.trim().length < 1) return [false, "Can't be empty"];
    if (val?.trim().length > 100) return [false, 'Name too long'];
    return [true, ''];
};

const validateColumns = (val: MultiInput[]): [boolean, string] => {
    if (val?.length === 0 || !val) return [true, ''];
    for (const item of val) {
        const [isValid, errorMessage] = validateName(item.value);
        if (!isValid) return [isValid, errorMessage];
    }
    return [true, ''];
};

const NewTaskForm: FC<{ closeModal: Function; columns?: Column[] }> = (props) => {
    const dropdownOptions = props.columns?.map((item) => item.name);
    const nameInput = useInput<string>({ validateFn: validateName });
    const descriptionInput = useInput<string>();
    const subtasksInput = useInput<MultiInput[]>({ validateFn: validateColumns });
    const columnDropdown = useInput<string>({ initialValue: dropdownOptions && dropdownOptions[0] });

    const formIsValid = nameInput.isValid && subtasksInput.isValid;

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        nameInput.setIsTouched(true);
        subtasksInput.setIsTouched(true);
        const newColumnsValue = subtasksInput.value?.map((item) => {
            const [isValid, errorMsg] = validateName(item.value);
            return { ...item, isValid, errorMsg, isTouched: true };
        });
        if (newColumnsValue) subtasksInput.customValueChangeHandler(newColumnsValue);
        if (formIsValid) {
            const formData = {
                name: nameInput.value,
                description: descriptionInput.value,
                subtasks: subtasksInput.value?.map((item) => item.value),
                column_uuid: props.columns?.find((item) => item.name === columnDropdown.value)?.uuid,
            };
            console.log(formData);
            fetch('/api/tasks', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            })
                .then((res) => res.json())
                .then(() => {
                    mutate(`/api/boards/${props.columns?.[0].board_uuid}`);
                    props.closeModal();
                });
        }
    };

    return (
        <div className="flex flex-col">
            <h2 className="mb-6 text-lg font-bold dark:text-white">Add New Task</h2>
            <form onSubmit={handleSubmit} action="submit" className="flex flex-col">
                <Input
                    onChange={nameInput.valueChangeHandler}
                    onBlur={nameInput.inputBlurHandler}
                    haserror={nameInput.hasError}
                    errorMsg={nameInput.errorMsg}
                    label="Title"
                    id="task-title"
                    placeholder="e.g. Take a coffee break"
                    className="mb-6"
                />
                <Textarea
                    onChange={descriptionInput.valueChangeHandler}
                    onBlur={descriptionInput.inputBlurHandler}
                    label="Description"
                    id="task-description"
                    placeholder="e.g. It’s always good to take a break. This 15 minute break will 
                    recharge the batteries a little."
                    className="mb-6"
                />

                <MultiValueInput
                    placeholder="e.g. To Do"
                    label="Subtasks"
                    className="mb-6"
                    values={subtasksInput.value}
                    changeHandler={subtasksInput.customValueChangeHandler}
                    validationHandler={validateName}
                    addBtnText="+ Add New Subtask"
                    fieldType="textarea"
                />
                {dropdownOptions && (
                    <Dropdown
                        setValue={columnDropdown.setValue}
                        value={columnDropdown.value}
                        id="column-select"
                        label="Status"
                        className="mb-6"
                        options={dropdownOptions}
                    />
                )}
                <ButtonPrimary>Create New Task</ButtonPrimary>
            </form>
        </div>
    );
};

export default NewTaskForm;
