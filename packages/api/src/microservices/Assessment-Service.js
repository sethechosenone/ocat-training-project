
const { Assessment } = require(`../database/models`);

exports.submit = async (assessment) => await Assessment.create(assessment);
exports.getList = async () => await Assessment.findAll();
exports.delete = async (assessment) => await Assessment.destroy(
  {
    where: { id: assessment },
  },
);
