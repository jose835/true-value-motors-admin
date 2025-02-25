import FieldInput from './FieldInput';
import SearchSelect from './SearchSelec';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { supabase } from '../api/supabase-client';
import { CategoryProps } from '../types/types';
import { showToast } from './Toast';
import DragDropFile from './DragDropFile';

type ProductFormFieldsProps = {
    selectedCategory: { label: string; value: string } | null;
    handleChangeForm: (value: string | number, name: string) => void;
    handleCategoryChange: (selectedOption: { label: string; value: string } | null) => void;
    setFiles: Dispatch<SetStateAction<File[]>>;
};

export default function ProductFormFields({
    selectedCategory,
    handleCategoryChange,
    handleChangeForm,
    setFiles
}: ProductFormFieldsProps) {
    const [category, setCategory] = useState<CategoryProps[]>([]);

    useEffect(() => {
        async function loadCategories() {
            const { data, error } = await supabase.from('category').select('*');

            if (error) {
                showToast(error.message, false);
                return;
            }

            setCategory(data ?? []);
        }

        loadCategories();
    }, []);
    return (
        <>
            <div className="bg-white rounded-lg mt-8 px-4 py-5">
                <FieldInput
                    name="Car Name"
                    onChange={(e) => handleChangeForm(e.target.value, 'name')}
                    placeholder="Ej: Hilo dental, brackets, alambre"
                    id="title"
                    className='w-full mt-2 lg:mt-0 mb-5'
                    classNameInput="h-10"
                />

                <DragDropFile setFiles={setFiles} />

                <SearchSelect
                    category={category}
                    onChange={handleCategoryChange}
                    value={selectedCategory}
                />
            </div>
        </>
    );
}
