"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */
    await queryInterface.bulkInsert("ProblemVersions", [
      {
        problemId: 1,
        seriesId: 1,
        canvasId: 2,
        title: "Double TOH",
        statement: "Move the disks from left peg to right peg.",
        canvasData: JSON.stringify({
          numberOfMoves: 0,
          numberOfDisks: 10,
          numberOfPegs: 3,
          pegs: [[0, 10, 2, 12, 4, 14, 6, 16, 8, 18], [], []],
        }),
        editOptions: JSON.stringify({
          customDisk: { value: true, type: "switch" },
          ordered: { value: true, type: "switch" },
        }),
        previewOptions: JSON.stringify({
          moves: { value: true, type: "switch" },
          nDisks: { value: false, type: "switch" },
          customDisk: { value: false, type: "switch" },
          undo: { value: true, type: "switch" },
        }),
        checkerCode:
          "function solutionChecker(data) {\n  return data.numberOfMoves === 2 * (2 ** (data.numberOfDisks/2) - 1);\n}",
        checkerCanvas: JSON.stringify({
          numberOfMoves: 62,
          numberOfDisks: 10,
          numberOfPegs: 3,
          pegs: [[], [], [10, 0, 2, 12, 4, 14, 6, 16, 8, 18]],
        }),
        isLive: true,
        serialNo: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("ProblemVersions", null, {});
  },
};