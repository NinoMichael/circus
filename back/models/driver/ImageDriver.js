const ImageDriverSchema = new mongoose.Schema({
    driver: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Driver', 
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

const ImageDriver = mongoose.model('ImageDriver', ImageDriverSchema);

module.exports = ImageDriver;
  