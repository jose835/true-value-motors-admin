import FieldSelect from './FieldSelec';

type ProductStatusSelectProps = {
    status: number;
    onChange: (value: string) => void;
};

export default function ProductStatus({ status, onChange }: ProductStatusSelectProps) {
    return (
        <>
            <div className="bg-white rounded-lg mt-8 w-full px-3 py-5 lg:ml-8">
                <h2 className="font-semibold text-[15px] mb-3">Estado</h2>
                <FieldSelect
                    name=""
                    id="status"
                    options={[
                        { name: 'Disponible', value: 1 },
                        { name: 'Vendido', value: 0 },
                    ]}
                    value={status}
                    onChange={(value) => onChange(value.toString())}
                />
            </div>
        </>
    );
}
