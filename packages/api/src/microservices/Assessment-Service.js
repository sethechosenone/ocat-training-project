/* eslint-disable sort-keys */
const { Assessment } = require(`../database/models`);

exports.submit = async (assessment) => await Assessment.create(assessment);
exports.getList = async () => await Assessment.findAll();
exports.delete = async (assessment) => await Assessment.destroy(
  {
    where: {
      instrumentType: assessment.instrumentType,
      catName: assessment.catName,
      catDateOfBirth: assessment.catDateOfBirth,
      score: assessment.score,
      riskLevel: assessment.riskLevel,
    },
  },
);
