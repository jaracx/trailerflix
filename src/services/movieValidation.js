function normalizeText(value = '') {
  return String(value)
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .trim();
}

function titleCasePhrase(value = '') {
  const smallWords = new Set(['a', 'an', 'and', 'as', 'at', 'but', 'by', 'de', 'del', 'la', 'las', 'los', 'of', 'on', 'or', 'the', 'to', 'y', 'o']);

  return String(value)
    .trim()
    .split(/\s+/)
    .filter(Boolean)
    .map((word, index, words) => {
      const normalized = word.toLowerCase();

      if (/^[ivxlcdm]+$/i.test(word)) {
        return word.toUpperCase();
      }

      const shouldKeepLower = smallWords.has(normalized) && index !== 0 && index !== words.length - 1;
      return shouldKeepLower ? normalized : normalized.charAt(0).toUpperCase() + normalized.slice(1);
    })
    .join(' ');
}

function validateMovieInput(input = {}, options = {}) {
  const { partial = false } = options;
  const titulo = normalizeText(input.titulo || '');
  const categoria = normalizeText(input.categoria || '');

  if (!partial && !titulo) {
    return { valid: false, message: 'El título es obligatorio' };
  }

  if (!partial && !categoria) {
    return { valid: false, message: 'La categoría es obligatoria' };
  }

  if (categoria && !['pelicula', 'serie'].includes(categoria.toLowerCase())) {
    return { valid: false, message: 'La categoría debe ser "Película" o "Serie"' };
  }

  return { valid: true };
}

function sanitizeMoviePayload(input = {}) {
  const payload = {
    titulo: input.titulo ? titleCasePhrase(input.titulo) : '',
    categoria: input.categoria ? (String(input.categoria).trim().toLowerCase() === 'serie' ? 'Serie' : 'Película') : '',
    genero: input.genero ? titleCasePhrase(input.genero) : '',
    reparto: input.reparto ? titleCasePhrase(input.reparto) : '',
    trailer: input.trailer ? String(input.trailer).trim() : ''
  };

  return Object.fromEntries(
    Object.entries(payload).filter(([, value]) => value !== '')
  );
}

module.exports = {
  normalizeText,
  titleCasePhrase,
  validateMovieInput,
  sanitizeMoviePayload
};
