class APIFeatures {
  constructor(query, queryString) {
    this.query = query;
    this.queryString = queryString;
  }

  filter() {
    const { page, sort, limit, fields, ...rest } = { ...this.queryString };

    //Advanced filtering
    let queryStr = JSON.stringify(rest);
    queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);

    this.query = this.query.find(JSON.parse(queryStr));
    return this;
  }

  sort() {
    if (this.queryString.sort) {
      const sortBy = this.queryString.sort.split(',').join(' ');
      this.query = this.query.sort(sortBy);
    } else {
      this.query = this.query.sort('-price');
    }
    return this;
  }

  limitFields() {
    if (this.queryString.fields) {
      const limitFields = this.queryString.fields.split(',').join(' ');
      this.query = this.query.select(limitFields);
    } else {
      this.query = this.query.select('-__v');
    }
    return this;
  }

  paginate() {
    const pageNumber = this.queryString.page * 1 || 1;
    const limitNumber = this.queryString.limit * 1 || 100;
    const skip = (pageNumber - 1) * limitNumber;

    this.query = this.query.skip(skip).limit(limitNumber);
    return this;
  }
}

module.exports = APIFeatures;
