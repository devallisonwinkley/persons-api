export default function unknownEndPoint(request, response) {
  response.status(404).send({ error: "unknown endpoint" });
}
