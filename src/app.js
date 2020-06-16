const express = require("express");
const cors = require("cors");

const { uuid, isUuid } = require("uuidv4");
const { query } = require("express");

const app = express();

app.use(express.json());
app.use(cors());
const repositories = [];

function projectValidId(request, response, next) {
  const { id } = request.params;

  if (!isUuid(id))
    return response.status(400).json({ error: "Invalid project id" });

  return next();
}

app.use("/repositories/:id", projectValidId);

app.get("/repositories", (request, response) => {
  response.json(repositories);
});

app.post("/repositories", (request, response) => {
  const { title, url, techs } = request.body;

  const repository = {
    id: uuid(),
    title,
    url,
    techs: [techs],
    likes: 0,
  };

  repositories.push(repository);

  return response.json(repository);
});

app.put("/repositories/:id", (request, response) => {
  const { id } = request.params;
  const { title, url, techs } = request.body;

  const repositoryIndex = repositories.findIndex(
    (repository) => repository.id === id
  );

  const oldRepositoryData = repositories.find(
    (repository) => repository.id === id
  );

  if (repositoryIndex < 0)
    return response.status(400).json({ error: "Project not found" });

  const repository = {
    id,
    title,
    url,
    techs,
    likes: oldRepositoryData.likes,
  };
  repositories[repositoryIndex] = repository;

  return response.json(repository);
});

app.delete("/repositories/:id", (request, response) => {
  const { id } = request.params;
  const repositoryIndex = repositories.findIndex(
    (repository) => repository.id === id
  );

  if (repositoryIndex < 0)
    return response.status(400).json({ error: "Project not found" });

  repositories.splice(repositoryIndex, 1);

  return response.status(204);
});

app.put("/repositories/:id/like", (request, response) => {
  // TODO
  const { id } = request.params;
  const { likes } = request.body;

  const repositoryIndex = repositories.findIndex(
    (repository) => repository.id === id
  );

  const oldRepositoryData = repositories.find(
    (repository) => repository.id === id
  );

  if (repositoryIndex < 0)
    return response.status(400).json({ error: "Project not found" });

  const repository = {
    id: id,
    title: oldRepositoryData.title,
    url: oldRepositoryData.url,
    techs: oldRepositoryData.techs,
    likes: likes,
  };

  repositories[reposFitoryIndex] = repository;

  return response.json(repository);
});

module.exports = app;
