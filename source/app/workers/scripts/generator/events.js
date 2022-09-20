
on('change:Jahre_nach_Start', async (info) => {
    
    var mop = 0;
    const ageThreshold = 35;
    const ageStart = 16;
    const ageSvell = ageThreshold - ageStart;
    const startMoP = 832;
    const baseMoP = 52;
    var years = parseInt(info.newValue);

    var yearsLate = (years > ageSvell) ? ((years - ageSvell)*(baseMoP/4)) : (0); 
    var yearsMid = (years < ageSvell) ? (years * (baseMoP/2)) : (ageSvell*(baseMoP/4));
    
    mop = startMoP + yearsMid + yearsLate;
    console.log([mop,ageSvell,yearsLate,yearsMid]);
    

    setAttrsAsync({"MoP_calc": mop});
});
