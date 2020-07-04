import knex, {QueryBuilder} from 'knex'
import Collection from '../collection'

export default (collection: Collection) => { 
    const query = collection.sql().table().query().del()

    const queryRunner = async (q: knex.QueryBuilder): Promise<Number> => await q

    const all = async () => await query
    const custom = async (callback: (q: QueryBuilder) => QueryBuilder) => await queryRunner(callback(query))
    const having = async (...value: any) => await queryRunner(query.having(value[0], value[1], value[2]))
    const havingNot = async (...value: any) => await queryRunner(query.having(value[0], value[1], value[2]))
    const where = async (value: any) => await queryRunner(query.where(value))
    const whereNot = async (value: any) => await queryRunner(query.whereNot(value))
    const whereIn = async (cols: any, values: any) => await queryRunner(query.where(cols, values))
    const whereNotIn = async (col: string, values: any) => await queryRunner(query.whereNotIn(col, values))

    return {
        all, custom, having, havingNot, query, 
        where, whereNot, whereIn, whereNotIn,
        queryRunner
    }
}