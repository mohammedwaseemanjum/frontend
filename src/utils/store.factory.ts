const mapStores = new Map()

const storeFactory = (stores: Map<string, any>) => {
    return (storeKey: string, storeName: string) => {
        if (!stores.has(storeKey)) {
            stores.set(storeKey, storeName)
        }

        return stores.get(storeKey)
    }
}

const stateStores = storeFactory(mapStores)

export {
    stateStores,
    mapStores
}