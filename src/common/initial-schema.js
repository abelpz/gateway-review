/**
 * A container for issues and projects
 * @typedef {Object} Space
 * @property {string} slug - Indicates the slug of the space.
 * @property {string} name - Indicates the name of the space.
 * @property {Project[]} projects - Indicates what projects belong to this space.
 */

/**
 * A container for issues and folders
 * @typedef {Object} Project
 * @property {string} slug - Indicates the slug of the project.
 * @property {string} name - Indicates the name of the project.
 * @property {Folder[]} folders - Indicates what folders belong to this project.
 */

/**
 * A container for issues
 * @typedef {Object} Folder
 * @property {string} slug - Indicates the slug of the folder.
 * @property {string} name - Indicates the name of the folder.
 */

/** 
 * An array of spaces
 * @type {Space[]}
 */
const initialSchema = [
  {
    slug: "crc",
    name: "Cycle of Resource Creation",
    projects: [
      {
        slug: "tit",
        name: "Titus",
        folders: [
          {
            slug: "step-1",
            name: "Step 1",
          },
          {
            slug: "step-2",
            name: "Step 2",
          },
          {
            slug: "step-3",
            name: "Step 3",
          },
          {
            slug: "step-4",
            name: "Step 4",
          },
          {
            slug: "step-5",
            name: "Step 5",
          },
          {
            slug: "step-6",
            name: "Step 6",
          },
          {
            slug: "step-7",
            name: "Step 7",
          },
          {
            slug: "step-8",
            name: "Step 8",
          },
        ],
      },
      {
        slug: "3jn",
        name: "3 John",
        folders: null,
      },
      {
        slug: "rut",
        name: "Ruth",
        folders: null,
      },
    ],
  },
]

export default initialSchema;
