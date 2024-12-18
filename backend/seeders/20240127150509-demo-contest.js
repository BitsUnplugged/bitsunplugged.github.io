"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "Contests",
      [
        {
          //id: 1,
          title: "Demo Contest 1",
          description: "Demo contest description",
          startDateTime: new Date("February 27, 2024 15:05"),
          duration: "1",
          status: "scheduled",
          ownerId: 2,
          difficulty: "Medium",
          editorial: JSON.stringify([
            {
              boxId: 1,
              type: "markdown",
              data: "# A. 3 Disks.",
            },
            {
              boxId: 2,
              type: "slideshow",
              images: JSON.stringify([
                { url: "/images/toh_1.png", caption: "Caption 1" },
                { url: "/images/toh_2.png", caption: "Caption 2" },
                { url: "/images/toh_3.png", caption: "Caption 3" },
                { url: "/images/toh_4.png", caption: "Caption 4" },
                { url: "/images/toh_5.png", caption: "Caption 5" },
                { url: "/images/toh_6.png", caption: "Caption 6" },
                { url: "/images/toh_7.png", caption: "Caption 7" },
                { url: "/images/toh_8.png", caption: "Caption 8" },
              ]),
            },
            {
              boxId: 3,
              type: "markdown",
              data: "# C. Drag Sort.",
            },
            {
              boxId: 4,
              type: "slideshow",
              images: JSON.stringify([
                {
                  url: "/images/editorial/drag_sort_1.png",
                  caption: "Caption 1",
                },
                {
                  url: "/images/editorial/drag_sort_2.png",
                  caption: "Caption 2",
                },
                {
                  url: "/images/editorial/drag_sort_3.png",
                  caption: "Caption 3",
                },
                {
                  url: "/images/editorial/drag_sort_4.png",
                  caption: "Caption 4",
                },
                {
                  url: "/images/editorial/drag_sort_5.png",
                  caption: "Caption 5",
                },
                {
                  url: "/images/editorial/drag_sort_6.png",
                  caption: "Caption 6",
                },
                {
                  url: "/images/editorial/drag_sort_7.png",
                  caption: "Caption 7",
                },
                {
                  url: "/images/editorial/drag_sort_8.png",
                  caption: "Caption 8",
                },
                {
                  url: "/images/editorial/drag_sort_9.png",
                  caption: "Caption 9",
                },
              ]),
            },
            {
              boxId: 5,
              type: "markdown",
              data: "# D. Rearrange.",
            },
            {
              boxId: 6,
              type: "slideshow",
              images: JSON.stringify([
                {
                  url: "/images/editorial/rearrange_1.png",
                  caption: "Caption 1",
                },
                {
                  url: "/images/editorial/rearrange_2.png",
                  caption: "Caption 2",
                },
                {
                  url: "/images/editorial/rearrange_3.png",
                  caption: "Caption 3",
                },
                {
                  url: "/images/editorial/rearrange_4.png",
                  caption: "Caption 4",
                },
                {
                  url: "/images/editorial/rearrange_5.png",
                  caption: "Caption 5",
                },
                {
                  url: "/images/editorial/rearrange_6.png",
                  caption: "Caption 6",
                },
              ]),
            },
          ]),
        },
        {
          //id: 2,
          title: "Demo Contest 2",
          description: "Demo contest description",
          startDateTime: new Date("March 3, 2024 15:00"),
          duration: "2.5",
          status: "scheduled",
          difficulty: "Hard",
          ownerId: 2,
          editorial: JSON.stringify([]),
        },
        {
          //id: 3,
          title: "Demo Contest 3",
          description: "Demo contest description",
          startDateTime: new Date("March 4, 2024 15:00"),
          duration: "0.02",
          status: "scheduled",
          ownerId: 2,
          difficulty: "Easy",
          editorial: JSON.stringify([]),
        },
        {
          //id: 4,
          title: "Demo Contest 4",
          description: "Demo contest description",
          startDateTime: new Date("March 4, 2024 15:15"),
          duration: "0.01",
          status: "scheduled",
          ownerId: 2,
          difficulty: "Medium",
          editorial: JSON.stringify([]),
        },
        {
          //id: 5,
          title: "Demo Contest 5",
          description: "Demo contest description",
          startDateTime: new Date("March 4, 2024 15:30"),
          duration: "0.01",
          status: "approved",
          ownerId: 2,
          editorial: JSON.stringify([]),
        },
        {
          //id: 6,
          title: "Demo Contest 6",
          description: "Demo contest description",
          startDateTime: new Date(),
          duration: "0.01",
          status: "edit",
          ownerId: 2,
          editorial: JSON.stringify([]),
        },
        {
          //id: 7,
          title: "Demo Contest 7",
          description: "Demo contest description",
          startDateTime: new Date(),
          duration: "0.01",
          status: "edit",
          ownerId: 2,
          editorial: JSON.stringify([]),
        },
        {
          //id: 8,
          title: "Demo Contest 8",
          description: "Demo contest description",
          startDateTime: new Date(),
          duration: "0.01",
          status: "edit",
          ownerId: 2,
          editorial: JSON.stringify([]),
        },
        {
          //id: 9,
          title: "Demo Contest 9",
          description: "Demo contest description",
          startDateTime: new Date("January 5, 2024 05:00"),
          duration: "1",
          status: "scheduled",
          ownerId: 2,
          editorial: JSON.stringify([]),
        },
        {
          //id: 10,
          title: "Demo Contest 10",
          description: "Demo contest description",
          startDateTime: new Date("January 25, 2024 02:00"),
          duration: "1",
          status: "scheduled",
          ownerId: 2,
          editorial: JSON.stringify([]),
        },
        {
          //id: 11,
          title: "Demo Contest 11",
          description: "Demo contest description",
          startDateTime: new Date("February 25, 2024 14:00"),
          duration: "1",
          status: "scheduled",
          ownerId: 2,
          editorial: JSON.stringify([]),
        },
        {
          //id: 12,
          title: "Demo Contest 12",
          description: "Demo contest description",
          startDateTime: new Date("March 4, 2024 19:00"),
          duration: "1",
          status: "scheduled",
          ownerId: 2,
          editorial: JSON.stringify([]),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Contests", null, {});
  },
};
