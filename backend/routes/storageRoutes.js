const router = require("express").Router();
const authMiddleware = require("../services/tokenValidationService");
const passport = require("passport");
const fs = require("fs");
router.use(
  passport.authenticate("jwt", { failureRedirect: "/invalid", session: false })
);

const sharp = require("sharp");

router.post("/delete", (req, res) => {
  const { path } = req.body;
  // Check if path is an array or not
  console.log(req.body);
  if (Array.isArray(path)) {
    // If path is an array, loop through each path
    path.forEach((p) => {
      const filePath = `public${p}`;
      fs.unlink(filePath, (err) => {
        if (err) {
          console.error(err);
          // return res.status(500).json("File not found");
        }
      });
    });
    res.json({ message: "Files deleted successfully" });
  } else {
    const filePath = `public${path}`;
    fs.unlink(filePath, (err) => {
      if (err) {
        console.error(err);
        return res.status(500).json("File not found");
      }
      res.json({ message: "File deleted successfully" });
    });
  }
});

router.post("/upload", async (req, res) => {
  console.log(req.files);
  if (req.files === null) {
    return res.status(400).json({ msg: "No file uploaded" });
  }

  const file = req.files.file;
  // Check if file is an array or not
  if (Array.isArray(file)) {
    // If file is an array, loop through each file
    const promises = [];
    const fileNames = [];
    for (const f of file) {
      const timestamp = Date.now(); // Get current timestamp
      const randomString = Math.random().toString(36).substring(7); // Generate random string
      const fileExtension = f.name.split(".").pop();
      const uniqueFileName = `${timestamp}_${randomString}.${fileExtension}`;

      try {
        await new Promise((resolve, reject) => {
          f.mv(`public/uploads/${uniqueFileName}`, (err) => {
            if (err) {
              console.error(err);
              reject(err);
            } else {
              fileNames.push(`/uploads/${uniqueFileName}`);
              resolve();
            }
          });
        });
      } catch (err) {
        res.status(500).send(err);
        return; // Stop execution in case of error
      }
    }

    res.json({
      paths: fileNames,
    });
  } else {
    const timestamp = Date.now(); // Get current timestamp
    const fileExtension = file.name.split(".").pop();
    const randomString = Math.random().toString(36).substring(7); // Generate random string
    const uniqueFileName = `${timestamp}_${randomString}.${fileExtension}`;

    file.mv(`public/uploads/${uniqueFileName}`, (err) => {
      if (err) {
        console.error(err);
        return res.status(500).send(err);
      }
      res.json({
        path: `/uploads/${uniqueFileName}`,
      });
    });
  }
});

router.post("/upload/trimmed", async (req, res) => {
  console.log(req.files);
  if (req.files === null) {
    return res.status(400).json({ msg: "No file uploaded" });
  }

  const file = req.files.file;
  // Check if file is an array or not
  if (Array.isArray(file)) {
    // If file is an array, loop through each file
    const promises = [];
    const fileNames = [];
    for (const f of file) {
      const timestamp = Date.now(); // Get current timestamp
      const randomString = Math.random().toString(36).substring(7); // Generate random string
      const fileExtension = f.name.split(".").pop();
      const uniqueFileName = `${timestamp}_${randomString}.${fileExtension}`;

      try {
        await new Promise((resolve, reject) => {
          f.mv(`public/uploads/${uniqueFileName}`, (err) => {
            if (err) {
              console.error(err);
              reject(err);
            } else {
              fileNames.push(`/uploads/${uniqueFileName}`);
              resolve();
            }
          });
        });
      } catch (err) {
        res.status(500).send(err);
        return; // Stop execution in case of error
      }
    }

    res.json({
      paths: fileNames,
    });
  } else {
    const timestamp = Date.now(); // Get current timestamp
    const fileExtension = file.name.split(".").pop();
    const randomString = Math.random().toString(36).substring(7); // Generate random string
    const uniqueFileName = `${timestamp}_${randomString}.${fileExtension}`;

    file.mv("public/uploads/temp.png", async (err) => {
      if (err) {
        console.error(err);
        return res.status(500).send(err);
      }
      await sharp("public/uploads/temp.png")
        .png()
        .trim()
        .toFile(`public/uploads/${uniqueFileName}`);

      res.json({
        path: `/uploads/${uniqueFileName}`,
      });
      fs.unlink("public/uploads/temp.png", (err) => {
        if (err) console.error(err);
      });
    });
  }
});

module.exports = router;
