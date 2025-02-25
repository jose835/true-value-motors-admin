
import { FormEvent, useRef, useState } from 'react';
import Container from '../layout/Container';
import { useNavigate } from 'react-router-dom';
import SubHeader from '../components/SubHeader';
import ProductFormFields from '../components/ProductFormFields';
import ProductStatus from '../components/ProductStatus';
import PriceProduct from '../components/PriceProduct';
import { showToast } from '../components/Toast';
import { supabase } from '../api/supabase-client';

export default function AddCars() {
    const [selectedCategory, setSelectedCategory] = useState<{ label: string; value: string } | null>(null);
    const [file, setFile] = useState<File[]>([]);

    const [formData, setFormData] = useState({
        name: '',
        price: '',
        seats: 0,
        doors: 0,
        mileage: 0,
        fuel: '',
        status: 1
    });

    const formRef = useRef<HTMLFormElement | null>(null);
    const navigation = useNavigate();

    function handleCategoryChange(selectedOption: { label: string; value: string } | null) {
        setSelectedCategory(selectedOption);
    }

    async function handleSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();

        const { data, error } = await supabase
            .from("car")
            .insert([
                {
                    name: formData.name,
                    price: Number(formData.price).toFixed(2),
                    category: selectedCategory?.value,
                    seats: Number(formData.seats),
                    door: Number(formData.doors),
                    mileage: Number(formData.mileage),
                    fuel: formData.fuel,
                },
            ])
            .select();

        if (error) {
            showToast(error.message, false);
        } else {
            saveImageToSupabase(data[0].id);
            showToast("Car created successfully", true);
            cleanForm();
        }

    }

    async function saveImageToSupabase(id: string) {
        if (file.length === 0) {
            showToast("No hay imágenes para subir", false);
            return [];
        }

        try {
            const uploadedImages: string[] = [];

            for (const image of file) {
                const filePath = `cars/${id}/${image.name}`;

                const { error } = await supabase.storage
                    .from("cars-images").upload(filePath, image);

                if (error) {
                    showToast(`Error to upload images ${image.name}: ${error.message}`, false);
                    return [];
                }

                const { data } = supabase.storage
                    .from("cars-images")
                    .getPublicUrl(filePath);

                if (data) {
                    uploadedImages.push(data.publicUrl);
                }
            }

            return uploadedImages;
        } catch (error) {
            showToast("Error to upload images", false);
            return [];
        }

    }

    function cleanForm() {
        setFormData({
            name: '',
            price: '',
            seats: 0,
            doors: 0,
            mileage: 0,
            fuel: '',
            status: 1
        });

        formRef.current?.reset();
        setSelectedCategory(null);
        setFile([]);
    }

    function handleFormSubmit() {
        if (formRef.current) {
            formRef.current.requestSubmit();
        }
    }

    function handleChangeForm(value: string | number, name: string) {
        setFormData({ ...formData, [name]: value });
    }

    return (
        <Container save={true} text='Producto sin guardar' onSaveClick={handleFormSubmit} onClickSecondary={() => navigation('/products')}>
            <>
                <section className="flex flex-col items-center h-full">
                    <div className="max-w-screen-lg mt-5 w-full mx-auto">
                        <SubHeader title='Agregar producto' />
                        <form onSubmit={handleSubmit} ref={formRef} className="flex flex-col lg:flex-row items-start">
                            <div className="flex-1 w-full lg:w-auto">
                                <ProductFormFields
                                    setFiles={setFile}
                                    handleCategoryChange={handleCategoryChange}
                                    handleChangeForm={handleChangeForm}
                                    selectedCategory={selectedCategory}
                                />

                                <PriceProduct handleChangeForm={handleChangeForm} fuel={formData.fuel} />
                            </div>

                            <div className="w-full lg:w-1/3 lg:mr-0 mr-10">
                                <ProductStatus
                                    status={formData.status}
                                    onChange={(value) => setFormData({ ...formData, status: Number(value) })}
                                />
                            </div>
                        </form>
                    </div>
                </section>
            </>
        </Container >
    );
}
