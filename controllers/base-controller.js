// Resource бүрийн 6 үйлдлийг үүсгэх нийтлэг функц
function makeController({ list, fields, filter, onChange = () => {}, label = "Item" }) {
  const nextId = () => (list.length ? Math.max(...list.map(x => x.id)) + 1 : 1);
  const findOne = (req) => list.find(x => x.id === Number(req.params.id));
  const missing = (body) => fields.filter(f => body[f] === undefined || body[f] === "");
  const notFound = (res) => res.status(404).json({ message: label + " not found" });
  const badRequest = (res, m) =>
    res.status(400).json({ message: "Missing required fields: " + m.join(", ") });

  return {
    getAll(req, res) {
      res.json(filter ? list.filter(item => filter(item, req.query)) : list);
    },
    getOne(req, res) {
      const item = findOne(req);
      if (!item) return notFound(res);
      res.json(item);
    },
    create(req, res) {
      const m = missing(req.body);
      if (m.length) return badRequest(res, m);
      const item = { id: nextId() };
      fields.forEach(f => (item[f] = req.body[f]));
      list.push(item);
      onChange();
      res.status(201).json(item);
    },
    replace(req, res) {
      const item = findOne(req);
      if (!item) return notFound(res);
      const m = missing(req.body);
      if (m.length) return badRequest(res, m);
      fields.forEach(f => (item[f] = req.body[f]));
      onChange();
      res.json(item);
    },
    update(req, res) {
      const item = findOne(req);
      if (!item) return notFound(res);
      fields.forEach(f => {
        if (req.body[f] !== undefined) item[f] = req.body[f];
      });
      onChange();
      res.json(item);
    },
    remove(req, res) {
      const index = list.findIndex(x => x.id === Number(req.params.id));
      if (index === -1) return notFound(res);
      list.splice(index, 1);
      onChange();
      res.status(204).send();
    }
  };
}

module.exports = makeController;
