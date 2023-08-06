import '@core/declarations'
import _ from 'lodash'

class PaginationHelper {
  async Paginate(inputs: {
    q?: string
    model: string
    populate?: any
    startIndex?: number
    itemsPerPage?: number
    query?: any
    sort?: any
    projection?: any
  }) {
    try {
      const {
        q,
        model,
        populate = null,
        startIndex = 1,
        itemsPerPage = App.Config.ITEMS_PER_PAGE,
        query = {},
        sort = { _id: -1 },
        projection = {},
      } = inputs

      const Model = eval(
        `App.Models.${model.split('-').map(_.capitalize).join('')}`
      )

      const perPage =
        itemsPerPage > 0 ? itemsPerPage : App.Config.ITEMS_PER_PAGE

      const skipCount: number = startIndex > 0 ? (startIndex - 1) * perPage : 0
      
      // Wild card search will be handled by fuzzy-search helper
      if (q) {
        // Get wildcard search query
        const fuzzyQuery = { $text: { $search: q } }
        const fuzzyProjection = { confidence: { $meta: 'textScore' } }
        const fuzzySort = { confidence: { $meta: 'textScore' } }

        Object.assign(query, fuzzyQuery)
        Object.assign(projection, fuzzyProjection)
        Object.assign(sort, fuzzySort)
      }

      const totalItems = await Model.countDocuments(query)
      let data = []
      if (populate) {
        data = await Model.find(query, projection)
          .sort(sort)
          .skip(skipCount)
          .limit(perPage)
          .populate(populate)
          .lean()
      } else {
        data = await Model.find(query, projection)
          .sort(sort)
          .skip(skipCount)
          .limit(perPage)
          .lean()
      }

      return {
        totalItems,
        startIndex: skipCount + 1,
        itemsPerPage: perPage,
        totalPage: Math.ceil(totalItems / itemsPerPage),
        data,
      }
    } catch (error) {
      Logger.error(error)
    }

    // On Error Return Null
    return null
  }
}

// All Done
export default new PaginationHelper()