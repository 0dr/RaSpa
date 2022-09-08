const raspa_abilities = {'Balancieren': {attributes: ['MuK', 'WiK']}, 'Bewaffneter Kampf': {attributes: ['MuK', 'WiK']}, 'Bogenschießen': {attributes: ['MuK', 'RaT']}, 'Fliegen': {attributes: ['MuK', 'AuD']}, 'Leichtathletik': {attributes: ['MuK', 'WiK']}, 'Messerwerfen': {attributes: ['MuK', 'RaT']}, 'Schleudern': {attributes: ['MuK', 'RaT']}, 'Schwerathletik': {attributes: ['MuK', 'RaT']}, 'Schwimmen': {attributes: ['MuK', 'AuD']}, 'Speerwerfen': {attributes: ['MuK', 'RaT']}, 'Turnen': {attributes: ['MuK', 'GeH']}, 'Unbewaffneter Kampf': {attributes: ['MuK', 'GeH']}, 'Werfen': {attributes: ['MuK', 'RaT']}, 'Artillerie': {attributes: ['RaT', 'WiK']}, 'Erste Hilfe': {attributes: ['RaT', 'WiK']}, 'Gießen': {attributes: ['RaT', 'KrT']}, 'Handgeführte Werkzeuge': {attributes: ['AuD', 'MuK']}, 'Handgeführte Maschinen': {attributes: ['AuD', 'MuK']}, 'Löten & Schweißen': {attributes: ['RaT', 'WiK']}, 'Schusswaffen': {attributes: ['MuK', 'WiK']}, 'Manuelle Maschinen': {attributes: ['RaT', 'KrT']}, 'Biologie': {attributes: ['RaT', 'KrT']}, 'Chemie': {attributes: ['RaT', 'KrT']}, 'Physik': {attributes: ['RaT', 'KrT']}, 'Psychologie': {attributes: ['KrT', 'WiK']}, 'Gedächtnis': {attributes: ['RaT', 'KrT']}, 'Geschichte': {attributes: ['RaT', 'KrT']}, 'Materialkunden': {attributes: ['RaT', 'WiK']}, 'Rechnen': {attributes: ['RaT', 'KrT']}, 'Schrift': {attributes: ['RaT', 'KrT']}, 'Selbstbeherrschung': {attributes: ['AuD', 'WiK']}, 'Sprache': {attributes: ['RaT', 'KrT']}, 'Technologie': {attributes: ['RaT', 'KrT']}, 'Wahrnehmung': {attributes: ['RaT', 'KrT']}, 'Auftreten': {attributes: ['KrT', 'WiK']}, 'Durchschauen': {attributes: ['RaT', 'KrT']}, 'Normen': {attributes: ['RaT', 'KrT']}, 'Redekunst': {attributes: ['RaT', 'KrT']}};

on('clicked:probe', (info) => {
    groupRoll(['AuD', 'GeH', 'MuK', 'RaT', 'KrT', 'WiK']);
});

on('change:probeability', async (info) => {
    console.log(info.newValue);
    //reset grouproll 
    var setObject = {roll_AuD: 0, roll_GeH: 0, roll_MuK: 0, roll_RaT: 0, roll_KrT: 0, roll_WiK: 0};
    
    for(entry of [raspa_abilities[info.newValue].attributes[0], raspa_abilities[info.newValue].attributes[1]]) {
        setObject["roll_"+entry]=1;
    }

    setAttrsAsync(setObject);

});

on('sheet:open change:repeating_ausrüstung:gewicht change:repeating_ausrüstung:istangelegt change:repeating_ausrüstung:istrucksack remove:repeating_ausrüstung add:repeating_ausrüstung', async (info) => {
    
    
    var allEntryIDs = await getSectionIDsAsync(["repeating_ausrüstung"]);
    var allEntrys = [];
    var gesamtGewicht = 0;
    for(entryID of allEntryIDs){
        allEntrys.push("repeating_ausrüstung_"+entryID+"_istangelegt");
        allEntrys.push("repeating_ausrüstung_"+entryID+"_Gewicht");
        allEntrys.push("repeating_ausrüstung_"+entryID+"_istrucksack");
    }
    console.log(allEntrys);
    var allValidEntrys = await getAttrsAsync(allEntrys);
    console.log(allValidEntrys);
        for(entryID of allEntryIDs){
            if (allValidEntrys["repeating_ausrüstung_"+entryID+"_istangelegt"] ==="on") {
                let gewicht = parseInt(allValidEntrys["repeating_ausrüstung_"+entryID+"_Gewicht"]);
                gewicht = (isNaN(gewicht)) ? 0 : gewicht;
                gesamtGewicht += (allValidEntrys["repeating_ausrüstung_"+entryID+"_istrucksack"] === "on") ? gewicht*2 : gewicht
                console.log(gewicht);
            }
        }
    console.log(gesamtGewicht);
    setAttrsAsync({"Traglast_computed": gesamtGewicht});
});


on('change:repeating_ressources:ReP_val', async (info) => {
    console.log(info);
    var calcVal = await getAttrsAsync(["ReP_used"]);
    console.log(calcVal);
    calcVal = parseInt(calcVal["ReP_used"]);
    console.log(calcVal);
    calcVal -= (info.previousValue) ? info.previousValue: 0;
    console.log(info.previousValue);
    console.log(calcVal);
    calcVal += info.newValue;
    console.log(info.newValue);
    console.log(calcVal);

    setAttrsAsync({"ReP_used": calcVal});

});


on('remove:repeating_ressources', async (info) => {
    console.log(info);
    var allEntryIDs = await getSectionIDsAsync(["repeating_ressources"]);
    var allEntrys = [];
    var gesamtWert = 0;
    for(entryID of allEntryIDs){
        allEntrys.push("repeating_ressources_"+entryID+"_ReP_val");
    }
    console.log(allEntrys);
    var allValidEntrys = await getAttrsAsync(allEntrys);
    console.log(allValidEntrys);
    for(entryID of allEntryIDs){
        gesamtWert += parseInt(allValidEntrys["repeating_ressources_"+entryID+"_ReP_val"]);
        console.log(gesamtWert);
        
    }
    console.log(gesamtWert);
    setAttrsAsync({"ReP_used": gesamtWert});

});

on('change:repeating_ressources:type change:repeating_ressources:wert', async (info) => {
    console.log("START");
    console.log(info);
    var type = "default";
    var base = 0;
    var wert = 0;
    var id = info.sourceAttribute.replace('repeating_ressources_','');

    if (!info.sourceAttribute.includes("wert")) {
        base = await getAttrsAsync(["repeating_ressources_wert"])
        base = parseInt(base["repeating_ressources_wert"]);
        console.log("GETBASE: "+ base);
        console.log(base);
    }else{
        base = parseInt(info.newValue);
        id = id.replace('_wert','');
        console.log("Base = INFO: " +base);
    }

    if (!info.sourceAttribute.includes("type")) {
        type = await getAttrsAsync(["repeating_ressources_type"]);
        type = type["repeating_ressources_type"];
        console.log("GETTYPE: "+ type);
        console.log(type);
    }else{
        type = info.newValue;
        id = id.replace('_type','');
        console.log("Type = INFO: " +type);
    }

    switch (type) {
        case "Besitz":
        case "Kontakte":
        case "Privilegien":
        case "Ruf":
            wert = base;
            break
        case "Schulden":
        case "Feinde":
            wert = Math.abs(base) * -1;
            break;
        case "Stand":
            wert = Math.pow(base,2);
            break;
    }
    
    
    var variableName = "repeating_ressources_"+id+"_ReP_val";
    var fill = {};
    fill[variableName]=wert
    console.log(wert);
    console.log(variableName);
    setAttrsAsync(fill)
});