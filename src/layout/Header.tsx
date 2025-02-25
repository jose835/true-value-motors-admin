import { useState } from "react";
import FieldInput from "../components/FieldInput";
import { Menu, MessageAlert, Search } from "../icons/icons";
import Button from "../components/Button";
import { COLORS } from "../constants/constants";
import DropDown from "../components/DropDown";

interface HeaderProps {
    text?: string;
    save?: boolean;
    onClick?: () => void;
    onClickSecondary?: () => void;
    onClickAside?: () => void;
}

export default function Header({ onClickAside, text, save = false, onClick, onClickSecondary }: HeaderProps) {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const imageURL = `https://ui-avatars.com/api/?name=Oskar Medina&background=${COLORS.redprimary.substring(1)}&color=fff&bold=true&&length=2`;

    return (
        <header className='[grid-area:header] flex justify-between items-center bg-primary py-2.5 px-6 w-full'>
            <div className="items-center space-x-3 hidden lg:flex lg:mr-0 mr-10">
                <img src="./images/logo-tvm.png" className="size-16" alt="Logo de la empresa True Value Motors" />
                <h1 className="text-xl text-white font-bold">True Value Motors</h1>
            </div>
            <div className="items-center justify-center size-5 lg:hidden mr-5 flex">
                <button onClick={onClickAside} className="text-white">
                    <Menu />
                </button>
            </div>

            <div
                className="h-full bg-secondary text-[#ebebeb90] lg:w-[40%] w-[70%] rounded-xl flex items-center justify-between md:px-4 px-1 border-[0.5px] border-whiting cursor-pointer relative" // Añade "relative"
            >
                {!save ? (
                    <div>
                        <div className="flex items-center w-full">
                            <Search className="size-5" />
                            <FieldInput
                                id="search"
                                classNameInput="h-10 placeholder-whiting2 text-white border-0 bg-transparent w-full"
                                placeholder="Buscar..."
                            />
                        </div>
                    </div>
                ) : (
                    <>
                        <div className="items-center md:flex hidden">
                            <MessageAlert className="size-4 text-whiting2" />
                            <h2 className="text-sm text-whiting2/80 font-medium ml-2">{text}</h2>
                        </div>

                        <div className="flex items-center md:w-auto w-full">
                            <Button
                                type="button"
                                onClick={onClickSecondary}
                                name="Descartar"
                                className="bg-[#404040] w-full text-white"
                            />
                            <Button
                                type="button"
                                name="Guardar"
                                className="bg-white text-primary w-full ml-2"
                                onClick={onClick}
                            />
                        </div>
                    </>
                )}
            </div>

            <div className="relative">
                <button onClick={() => setIsOpen(!isOpen)} className="flex rounded-full ml-4 justify-between items-center lg:px-2 lg:py-1 bg-secondary">
                    <img src={imageURL} alt="Profile" className="w-8 h-8 rounded-full" />
                    <h3 className="font-bold lg:block hidden text-sm text-white ml-3">Oskar</h3>
                </button>
                {isOpen && <DropDown />}
            </div>
        </header>
    );
}