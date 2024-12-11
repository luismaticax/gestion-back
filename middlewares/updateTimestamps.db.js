//This middleware auto updates field updatedOn with the update operation date.now

export default function updateTimestamps(Schema) {
  Schema.pre('save', function (next) {
    if (!this.isNew) {
      this.updatedOn = Date.now()
    }
    next()
  })

  Schema.pre(['findOneAndUpdate', 'updateOne', 'updateMany'], function (next) {
    this.set({ updatedOn: Date.now() })
    next()
  })
}
