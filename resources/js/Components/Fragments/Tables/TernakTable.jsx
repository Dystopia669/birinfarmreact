import React, { useState } from "react";
import { Link } from "@inertiajs/react";

import AlertNoFound from "@/Components/Elements/Alert/AlertNotFound";
import ConfirmDeleteModal from "../Modal/ConfirmDeleteModal";
import SearchInput from "@/Components/Elements/Input/SearchInput";

const TernakTable = ({ allTernak, ternaks }) => {
    const [searchKeyword, setSearchKeyword] = useState("");
    const [isSearching, setIsSearching] = useState(false);

    const [openModal, setOpenModal] = useState(undefined); // Initialize openModal with undefined
    const props = { openModal, setOpenModal };

    const handleSearchInputChange = (e) => {
        const value = e.target.value;
        setSearchKeyword(value);
        setIsSearching(value !== "");
    };

    const filteredItems = isSearching
        ? allTernak.filter((item) => {
            const { nama } = item;
            const normalizedKeyword = searchKeyword.toLowerCase();
            return nama.toLowerCase().includes(normalizedKeyword);
        })
        : ternaks;

    const tableHeadList = [
        'Nama Produk',
        'Kode ring',
        'Kode produk',
        'JUmlah jantan',
        'Jumlah betina',
        'Action'
    ];

    return (
        <>
            <div className="flexn">
                <div className="lg:w-1/2">
                    <SearchInput keyword={searchKeyword} onChange={handleSearchInputChange} />
                </div>
            </div>
            <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                <table className="w-full text-sm text-left text-gray-500">
                    <thead className="text-sm text-gray-700 uppercase bg-white border-b-2 border-stone-200">
                        <tr>
                            {tableHeadList.map((item) => (
                                <th key={item} scope="col" className="px-6 py-3">
                                    {item}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {filteredItems.length ? (
                            filteredItems.map((item) => (
                                <tr key={item.id} className="bg-white">
                                    <th className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                                        {item.nama}
                                    </th>
                                    <th className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                                        {item.rings.kode}
                                    </th>
                                    <th className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                                        {item.kode_ternak}
                                    </th>
                                    <th className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                                        {item.jumlah_jantan}
                                    </th>
                                    <th className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                                        {item.jumlah_betina}
                                    </th>
                                    <td className="px-6 py-4">
                                        <div className="flex space-x-1">
                                            <Link
                                                method="get"
                                                href={route('dashboard.ternak.edit')}
                                                data={{ id: item.id }}
                                                className="px-4 py-2 lg:mr-2 text-xs font-medium text-center text-white bg-sky-700 rounded-lg hover:bg-sky-800 focus:ring-4 focus:outline-none focus:ring-sky-300"
                                            >
                                                Edit
                                            </Link>
                                            <button
                                                onClick={() =>
                                                    props.setOpenModal(
                                                        `pup-up${item.id}`
                                                    )
                                                }
                                                className="px-4 py-2 text-xs font-medium text-center text-white bg-red-700 rounded-lg hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300">
                                                Hapus
                                            </button>
                                        </div>
                                        <ConfirmDeleteModal
                                            item={item}
                                            openModal={openModal}
                                            setOpenModal={setOpenModal}
                                        />
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr className="bg-white">
                                <td colSpan="4" className="text-center py-4 lg:px-36">
                                    <AlertNoFound />
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </>
    );
};

export default TernakTable;
