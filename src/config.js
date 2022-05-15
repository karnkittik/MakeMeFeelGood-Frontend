export default Object.freeze({
  API:
    (import.meta.env.VITE_BACKEND || "http://localhost:8000/") + "api/message",
});
