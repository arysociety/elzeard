import knex from 'knex'
import Collection from '../collection'
import Model from '../model'

export default (collection: Collection) => {

    const toModel = async (result: knex.Select) => !Model._isObject(result) ? null : await collection.newNode(result).populate()
    
    const toCollection = async (result: any[]) => (await collection.new(result).local().populate()).fillPrevStateStore()

    const pull = async (result: any[]) => {
        collection.local().set(result)
        await collection.local().populate()
        return collection.local().fillPrevStateStore()
    }

    return { toModel, toCollection, pull }
}