const describe = (description, tests) => {
  if (Array.isArray(tests)) {
    return {
      description,
      tests,
    }
  } else {
    return {
      description,
      run: tests,
    }
  }
};

export default describe;