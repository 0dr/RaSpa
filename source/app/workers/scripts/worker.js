on('', (info) => {
  startRoll("&{template:test} {{name=Test}} {{roll1=[[1d8]]}}", (results) => {
    const total = results.results.roll1.result
    const computed = total % 4;

    finishRoll(
      results.rollId,
      {
        roll1: computed
      }
    );
  });
});


on('clicked:probe', (info) => {
    groupRoll(["AuD", "GeH", "MuK", "RaT", "KrT", "WiK"]);
});