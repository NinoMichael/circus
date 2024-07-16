const ImageCoopSchema = new mongoose.Schema({
    accountCoop: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'AccountCoop', 
        required: true,
        },

    name: {
      type: String,
      required: true,
    },
    contentType: {
      type: String,
      required: true,
    },
    data: {
      type: Buffer,
      required: true,
    },
    size: {
      type: Number,
      required: true,
    },
    width: {
      type: Number,
      required: true,
    },
    height: {
      type: Number,
      required: true,
    },
  }, {
    timestamps: true,
  });

const ImageCoop = mongoose.model('ImageCoop', ImageCoopSchema);

module.exports = ImageCoop;
  