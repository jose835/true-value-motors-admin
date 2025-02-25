import { useState, useEffect, useMemo, useRef, Dispatch, SetStateAction } from "react";
import { Car, Home } from "../icons/icons";
import MenuItem from "../components/MenuItem";

interface MenuItemType {
    id: number;
    Icon: React.ComponentType;
    text: string;
    url?: string;
}

interface Props {
    setIsSidebarOpen: Dispatch<SetStateAction<boolean>>;
    isSidebarOpen: boolean;
    settingsMenu: boolean;
    setSettingsMenu: Dispatch<SetStateAction<boolean>>;
}

function Aside({ setIsSidebarOpen, isSidebarOpen }: Props) {
    const [activeMenuItem, setActiveMenuItem] = useState<number | null>(null);
    const sidebarRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (sidebarRef.current && !sidebarRef.current.contains(event.target as Node)) {
                setIsSidebarOpen(false);
            }
        }

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [setIsSidebarOpen]);

    const menuItems = useMemo<MenuItemType[]>(() => [
        { id: 1, Icon: Home, text: "Home", url: '/' },
        { id: 2, Icon: Car, text: "Cars", url: '/cars' },
    ], []);

    return (
        <>
            {isSidebarOpen && (
                <div
                    className="fixed bottom-0 left-0 right-0 z-40 bg-black bg-opacity-50 lg:hidden"
                    style={{ height: 'calc(100% - 60px)', top: '60px' }}
                    onClick={() => setIsSidebarOpen(false)}
                ></div>
            )}

            <aside
                ref={sidebarRef}
                className={`fixed  flex flex-col justify-between bottom-0 z-50 left-0 w-64 bg-whiting2 p-6 overflow-y-auto transition-transform transform ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 lg:relative lg:w-[300px] lg:z-auto`}
            >
                <div>
                    {menuItems.map(({ id, text, Icon: icon }) => (
                        <div key={id}>
                            <button className="w-full text-left" onClick={() => { setActiveMenuItem(activeMenuItem === id ? null : id) }}>
                                <MenuItem
                                    Icon={icon}
                                    text={text}
                                    className={id === activeMenuItem ? 'bg-white py-1' : ''}
                                />
                            </button>
                        </div>
                    ))}
                </div>
            </aside >
        </>
    );

}

export default Aside;