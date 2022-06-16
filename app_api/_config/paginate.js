module.exports = paginate

async function paginate(Model, match = {}, page = 1, limit = 10, sort = '-createdAt') {
  if (!Model) throw 'Model to use is required';

  const query = Model.aggregate([{ $match: match }])

  const customLabels = {
    totalDocs: 'totalResults',
    limit: 'perPage',
    page: 'currentPage',
  };

  const options = { page, limit, sort, customLabels }

  return await Model.aggregatePaginate(query, options)
}