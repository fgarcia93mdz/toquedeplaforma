const tieneCampoNull = (dataAIngresar) => {
  for (const key of Object.keys(dataAIngresar)) {
    if (dataAIngresar[key] === null) {
      return true;
    }
  }
  return false;
}

module.exports = tieneCampoNull;