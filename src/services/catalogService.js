function normalizeText(value = '') {
  return String(value)
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .trim();
}

function paginateCatalog(items = [], page = 1, limit = 10) {
  const safePage = Math.max(1, Number(page) || 1);
  const safeLimit = Math.min(50, Math.max(1, Number(limit) || 10));
  const total = items.length;
  const totalPages = Math.max(1, Math.ceil(total / safeLimit));
  const startIndex = (safePage - 1) * safeLimit;
  const data = items.slice(startIndex, startIndex + safeLimit);

  return {
    page: safePage,
    limit: safeLimit,
    total,
    totalPages,
    data
  };
}

module.exports = {
  normalizeText,
  paginateCatalog
};
