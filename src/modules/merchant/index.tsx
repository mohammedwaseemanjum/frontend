import InputForm from "@/components/Input/InputForm"
import DropdownForm from "@/components/Dropdown/DropdownForm";
import FileUploadForm from "@/components/FileUpload";
import useCreateAction from "@modules/merchant/actions/create.merchant";
import useProcessAddressAction from "./actions/process.address";

const Merchant = () => {
    const {
        control,
        onSubmit,
        handleSubmit
    } = useCreateAction()
    
    const {
        regions,
        provinces,
        cities,
        barangay,
        handleSetRegion,
        handleSetBarangay,
        handleSetCity,
        handleSetProvince
    } = useProcessAddressAction()

    return (
        <div className="flex justify-center mt-[100px]">
            <div className="flex flex-col gap-2 bg-white shadow-md rounded-md border border-gray-200 p-6">
                <div className="mb-6">
                    <p className="text-2xl">Merchant Information</p>
                </div>
                
                <div className="flex flex-row gap-2">
                   <FileUploadForm name={'profilePhoto'} control={control} id={'test'} label={'Profile Photo'} className={'w-[300px]! h-[60px]!'}/>
                   <FileUploadForm name={'coverPhoto'} control={control} id={'test1'} label={'Cover Photo'} className={'w-[300px]! h-[60px]!'}/>
                </div>

                <div className="flex flex-row gap-2">
                    <InputForm id="storeName" type="text" control={control} name={'metaData.store_name'} label="Store Name" labelClassName={'text-md!'} className={'w-[300px]! h-[60px]!'}/>
                    <InputForm id="addressOne" type="text" control={control} name={'metaData.address_one'} label="Address One" labelClassName={'text-md!'} className={'w-[300px]! h-[60px]!'}/>
                    <InputForm id="addressTwo" type="text" control={control} name={'metaData.address_two'} label="Address Two" labelClassName={'text-md!'} className={'w-[300px]! h-[60px]!'}/>
                </div>
                
                <div className="flex flex-row gap-2">
                    <div className="w-[300px]">
                        <DropdownForm 
                            displayName={'name'}
                            dropdowns={regions}
                            handleSelect={handleSetRegion}
                            name={'metaData.region'}
                            control={control}
                            label="Region"
                        />
                    </div>

                    <div className="w-[300px]">
                        <DropdownForm 
                            displayName={'name'}
                            dropdowns={provinces}
                            handleSelect={handleSetProvince}
                            name={'metaData.province'}
                            control={control}
                            label="Province"
                        />
                    </div>

                    <div className="w-[300px]">
                        <DropdownForm 
                            displayName={'name'}
                            dropdowns={cities}
                            handleSelect={handleSetCity}
                            name={'metaData.city'}
                            control={control}
                            label="City"
                        />
                    </div>
                </div>
                
                <div className="flex flex-row gap-2">
                    <div className="w-[300px]">
                        <DropdownForm 
                            displayName={'name'}
                            dropdowns={barangay}
                            handleSelect={handleSetBarangay}
                            name={'metaData.barangay'}
                            control={control}
                            label="Barangay"
                        />
                    </div>
                    
                    <InputForm id="zipCode" type="text" control={control} name={'metaData.zip'} label="Zip Code" labelClassName={'text-md!'} className={'w-[300px]! h-[60px]!'}/>
                    <InputForm id="storePhone" type="text" control={control} name={'metaData.store_phone'} label="Store Phone" labelClassName={'text-md!'} className={'w-[300px]! h-[60px]!'}/>
                </div>
                
                <div className="bg-blue-500 rounded-md p-3 text-center cursor-pointer w-[300px] ml-auto mt-4" onClick={onSubmit(handleSubmit)}>
                    <span className="font-bold text-white">Submit</span>
                </div>
            </div>
        </div>
    )
}

export default Merchant