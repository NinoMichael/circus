const ImageUserSchema = new mongoose.Schema({
    accountUser: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'AccountUser', 
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

const ImageUser = mongoose.model('ImageUser', ImageUserSchema);

module.exports = ImageUser;
  