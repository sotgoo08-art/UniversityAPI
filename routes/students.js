const express = require("express");
const Student = require("../models/Student");

const router = express.Router();

/**
 * @openapi
 * /students:
 *   get:
 *     summary: Бүх оюутны жагсаалтыг MongoDB-ээс авах
 *     tags: [Students]
 *     responses:
 *       200:
 *         description: Оюутнуудын жагсаалт
 *   post:
 *     summary: Шинэ оюутан бүртгэж MongoDB-д хадгалах
 *     tags: [Students]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [name, code]
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Б. Болд"
 *               code:
 *                 type: string
 *                 example: "SW22D001"
 *               courseId:
 *                 type: string
 *                 example: "course-101"
 *               email:
 *                 type: string
 *                 example: "bold@university.edu.mn"
 *     responses:
 *       201:
 *         description: Шинэ оюутан үүсгэгдлээ
 *       400:
 *         description: name болон code шаардлагатай
 */
router.get("/", async (req, res) => {
  try {
    const students = await Student.find();
    res.json(students);
  } catch (err) {
    res.status(500).json({ message: "Өгөгдөл уншихад алдаа гарлаа", error: err.message });
  }
});

router.post("/", async (req, res) => {
  try {
    const { name, code, courseId = null, email = "" } = req.body;
    if (!name || !code) {
      return res.status(400).json({ message: "name болон code заавал шаардлагатай" });
    }
    const created = await Student.create({ name, code, courseId, email });
    res.status(201).json(created);
  } catch (err) {
    res.status(500).json({ message: "Хадгалахад алдаа гарлаа", error: err.message });
  }
});

/**
 * @openapi
 * /students/{id}:
 *   get:
 *     summary: ID-аар оюутан авах
 *     tags: [Students]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Олдсон оюутан
 *       404:
 *         description: Оюутан олдсонгүй
 *   put:
 *     summary: ID-аар оюутны мэдээлэл засах
 *     tags: [Students]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               code:
 *                 type: string
 *               courseId:
 *                 type: string
 *               email:
 *                 type: string
 *     responses:
 *       200:
 *         description: Шинэчлэгдлээ
 *       404:
 *         description: Оюутан олдсонгүй
 *   delete:
 *     summary: ID-аар оюутан устгах
 *     tags: [Students]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Устгагдлаа
 *       404:
 *         description: Оюутан олдсонгүй
 */
router.get("/:id", async (req, res) => {
  try {
    const student = await Student.findById(req.params.id);
    if (!student) return res.status(404).json({ message: "Оюутан олдсонгүй" });
    res.json(student);
  } catch (err) {
    res.status(400).json({ message: "Буруу ID формат", error: err.message });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const updated = await Student.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });
    if (!updated) return res.status(404).json({ message: "Оюутан олдсонгүй" });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ message: "Шинэчлэхэд алдаа гарлаа", error: err.message });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const deleted = await Student.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: "Оюутан олдсонгүй" });
    res.json({ message: "Оюутан устгагдлаа" });
  } catch (err) {
    res.status(400).json({ message: "Устгахад алдаа гарлаа", error: err.message });
  }
});

module.exports = router;