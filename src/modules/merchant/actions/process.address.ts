import { useState } from "react";
import { 
    getRegions, 
    getProvinces, 
    getCities, 
    getBarangays,
    type Location
} from 'ph-addresses-locations';
import { merchantForm } from "@modules/merchant/schema";

const useProcessAddressAction = () => {
    const { setValue } = merchantForm

    const regions = getRegions();

    const [provinces, setProvinces] = useState<Location[]>([])
    const [cities, setCity] = useState<Location[]>([])
    const [barangay, setBarangay] = useState<Location[]>([])

    const handleSetRegion = (region: Location) => {
        setValue('metaData.region', region.name)

        const provinces = getProvinces(region.code);
        setProvinces(provinces)
    }

    const handleSetProvince = (province: Location) => {
        setValue('metaData.province', province.name)

        const cities = getCities(province.code);
        setCity(cities)
    }

    const handleSetCity = (city: Location) => {
        setValue('metaData.city', city.name)

        const barangays = getBarangays(city.code);
        setBarangay(barangays)
    }

    const handleSetBarangay = (barangay: Location) => {
        setValue('metaData.barangay', barangay.name)
    }

    return {
        regions,
        provinces,
        cities,
        barangay,
        handleSetRegion,
        handleSetBarangay,
        handleSetCity,
        handleSetProvince
    }
}

export default useProcessAddressAction