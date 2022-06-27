const Model = require('../../models/trip_reason.model');

exports.create = instanceDate => {
    const instance = new Model(instanceDate);
    return instance.save();
};

exports.findAll = () => Model.find().populate();

exports.findOne = id => Model.findById(id).populate();

exports.update = (id, updateData) => Model.findByIdAndUpdate(id, updateData, {new: true});

exports.delete = async id => {

    const doc = await Model.findByIdAndRemove(id);

    if (!doc) {
        throw new Error('Not found');
    }
    return doc.delete();
}
