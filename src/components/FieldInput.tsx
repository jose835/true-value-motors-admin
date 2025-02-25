import { ChangeEvent } from 'react';

interface Props {
    name?: string;
    placeholder?: string;
    id: string;
    className?: string;
    classNameInput?: string;
    onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
}

const FieldInput = ({ name, placeholder, id, className, onChange, classNameInput }: Props) => {

    return (
        <div className={`${className}`}>
            {name && <label htmlFor={id} className="block mb-2 text-left text-sm font-medium text-primary">{name}</label>}
            <input
                onChange={onChange}
                id={id}
                className={`bg-gray-50 h-10 ${classNameInput} text-black outline-none border placeholder-primary border-gray-600 text-sm font-medium rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full px-2.5 py-1`}
                placeholder={placeholder}
            />
        </div>
    );
};

export default FieldInput;