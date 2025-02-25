import { useEffect, useState } from "react";
import FieldInput from "./FieldInput";
import FieldSelect from "./FieldSelec";
import Line from "./Line";
import { supabase } from "../api/supabase-client";
import { showToast } from "./Toast";
import { FuelProps } from "../types/types";
import CheckBox from "./CheckBox";

interface Props {
    handleChangeForm: (value: string | number, name: string) => void;
    fuel: string;
}

const PriceProduct = ({ handleChangeForm, fuel }: Props) => {
    const [fuels, setFuels] = useState<FuelProps[]>([]);
    useEffect(() => {
        async function loadCategories() {
            const { data, error } = await supabase.from('fuel').select('*');

            if (error) {
                showToast(error.message, false);
                return;
            }

            setFuels(data ?? []);
            handleChangeForm(data[0].id, 'fuel');
        }

        loadCategories();
    }, []);

    return (
        <div className="bg-white rounded-lg mt-8 py-5">
            <div className="mx-4">
                <h2 className={`font-semibold mb-3`}>Technical Information</h2>
                <div className="mb-5">
                    <div className="flex flex-col md:flex-row mb-5">
                        <FieldInput
                            name="Price"
                            id="price"
                            onChange={(e) => handleChangeForm(e.target.value, 'price')}
                        />
                        <FieldInput
                            name="Seats"
                            className="mt-4 md:mt-0 md:ml-2"
                            id="seats"
                            onChange={(e) => handleChangeForm(e.target.value, 'seats')}
                        />
                    </div>

                    <div className="flex items-center space-x-5">
                        <CheckBox initialValue={false} name="Manual" />
                        <CheckBox initialValue name="Air Conditioner" />
                    </div>
                </div>
            </div>

            <Line />

            <div className="flex mt-5 flex-col md:flex-row mx-3">
                <FieldInput
                    className="w-full mt-4 md:mt-0 md:ml-2"
                    name='Doors'
                    id="door"
                    onChange={(e) => handleChangeForm(e.target.value, 'doors')}
                />
                <FieldInput
                    className="w-full mt-4 md:mt-0 md:ml-2"
                    classNameInput='h-10'
                    name="Mileage"
                    id="mileage"
                    onChange={(e) => handleChangeForm(e.target.value, 'mileage')}
                />

                <FieldSelect
                    name="Fuel"
                    id="fuel"
                    className="w-full mt-4 md:mt-0 md:ml-2"
                    onChange={(value) => handleChangeForm(value, 'fuel')}
                    value={fuel}
                    options={fuels.map(({ name, id }) => ({ name, value: id }))}
                />
            </div>
        </div>
    );
};

export default PriceProduct;
