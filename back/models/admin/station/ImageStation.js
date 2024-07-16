const ImageStationSchema = new mongoose.Schema({
    accountStation: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'AccountStation', 
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

const ImageStation = mongoose.model('ImageStation', ImageStationSchema);

module.exports = ImageStation;
  