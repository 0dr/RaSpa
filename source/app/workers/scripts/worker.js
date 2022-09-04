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