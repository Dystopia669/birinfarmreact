import React, { useState } from "react";
import { router } from "@inertiajs/react";

import TextInput from "@/Components/Elements/Input/TextInput";
import InputError from "@/Components/Elements/Input/InputError";
import PrimaryButton from "@/Components/PrimaryButton";
import InputLabel from "@/Components/Elements/Input/InputLabel";

const FormTambahTernak = ({ jenis, ring, errors }) => {
    const [selectedImage, setSelectedImage] = useState(null);
    const [imageUrl, setImageUrl] = useState("");

    const [formValues, setFormValues] = useState({
        nama: "",
        id_jenis: "",
        id_ring: "",
        jumlah_jantan: "",
        jumlah_betina: "",
        deskripsi: "",
        kode_ternak: "",
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("nama", formValues.nama);
        formData.append("id_jenis", formValues.id_jenis);
        formData.append("id_ring", formValues.id_ring);
        formData.append("jumlah_jantan", formValues.jumlah_jantan);
        formData.append("jumlah_betina", formValues.jumlah_betina);
        formData.append("foto", selectedImage);
        formData.append("deskripsi", formValues.deskripsi);
        formData.append("kode_ternak", formValues.kode_ternak);

        router.post("/dashboard/ternak/store", formData);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormValues((prevValues) => ({ ...prevValues, [name]: value }));
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setSelectedImage(file);
        setImageUrl(URL.createObjectURL(file));
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">

                <div className="w-full">

                    <div className="mt-4">
                        <InputLabel htmlFor="nama_produk" value="Nama Produk" />
                        <TextInput
                            type="text"
                            name="nama"
                            value={formValues.nama}
                            onChange={handleChange}
                            className="text-sm w-full p-2.5 mt-2"
                            placeholder="Masukkan nama produk"
                        />
                        {errors.nama && <InputError message={errors.nama} />}
                    </div>

                    <div className="grid gap-6 md:grid-cols-2">

                        <div className="mt-4">
                            <InputLabel htmlFor="jumlah_jantan" value="Jumlah Jantan" />
                            <TextInput
                                type="text"
                                name="jumlah_jantan"
                                value={formValues.jumlah_jantan}
                                onChange={handleChange}
                                className="text-sm w-full p-2.5 mt-2"
                            />
                            {errors.jumlah_jantan && <InputError message={errors.jumlah_jantan} />}
                        </div>

                        <div className="lg:mt-4">
                            <InputLabel htmlFor="jumlah_betina" value="Jumlah Betina" />
                            <TextInput
                                type="text"
                                name="jumlah_betina"
                                value={formValues.jumlah_betina}
                                onChange={handleChange}
                                className="text-sm w-full p-2.5 mt-2"
                            />
                            {errors.jumlah_betina && <InputError message={errors.jumlah_betina} />}
                        </div>
                    </div>

                    <div className="mt-4">
                        <InputLabel htmlFor="jenis_ternak" value="Jenis ternak" />
                        <select
                            name="id_jenis"
                            value={formValues.id_jenis}
                            onChange={handleChange}
                            className="text-sm w-full p-2.5 border-gray-300 focus:border-lime-800 focus:ring-lime-800 rounded-md shadow-sm"
                        >
                            <option value="">-- Pilih produk --</option>
                            {jenis.map((item) => (
                                <option key={item.id} value={item.id}>
                                    {item.nama}
                                </option>
                            ))}
                        </select>
                        {errors.id_jenis && <InputError message={errors.id_jenis} />}
                    </div>

                    <div className="mt-4">
                        <InputLabel htmlFor="ring" value="Kode ring" />
                        <select
                            name="id_ring"
                            value={formValues.id_ring}
                            onChange={handleChange}
                            className="text-sm w-full p-2.5 border-gray-300 focus:border-lime-800 focus:ring-lime-800 rounded-md shadow-sm"
                        >
                            <option value="">-- Pilih produk --</option>
                            {ring.map((item) => (
                                <option key={item.id} value={item.id}>
                                    {item.kode}
                                </option>
                            ))}
                        </select>
                        {errors.id_ring && <InputError message={errors.id_ring} />}
                    </div>

                    <div className="mt-4">
                        <InputLabel htmlFor="kode_ternak" value="Kode ternak" />
                        <TextInput
                            type="text"
                            name="kode_ternak"
                            value={formValues.kode_ternak}
                            onChange={handleChange}
                            className="text-sm w-full p-2.5 mt-2"
                            placeholder="Masukkan kode ternak"
                        />
                        {errors.kode_ternak && <InputError message={errors.kode_ternak} />}
                    </div>

                    <div className="mt-4">
                        <InputLabel htmlFor="deskripsi" value="Deskripsi" />
                        <textarea
                            rows="4"
                            name="deskripsi"
                            value={formValues.deskripsi}
                            onChange={handleChange}
                            className="block p-2.5 w-full text-sm mt-2 border-gray-300 focus:border-lime-800 focus:ring-lime-800 rounded-md shadow-sm"
                            placeholder="Masukkan deskripsi produk"
                        />
                        {errors.deskripsi && <InputError message={errors.deskripsi} />}
                    </div>
                </div>

                <div className="lg:mt-11 md:mt-11">
                    {imageUrl && (
                        <img
                            src={imageUrl}
                            alt="Selected"
                            className="object-cover w-full rounded-md mb-2"
                        />
                    )}
                    <TextInput
                        type="file"
                        onChange={handleImageChange}
                        className="block w-full text-xs border border-gray-300 rounded-lg cursor-pointer"
                    />
                    {errors.foto && <InputError message={errors.foto} />}
                    
                    <PrimaryButton type="submit" className="mt-3">Submit</PrimaryButton>
                </div>
            </div>
        </form>
    );
};

export default FormTambahTernak;
