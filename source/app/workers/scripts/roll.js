
async function groupRoll(group_) {
    const rollHeader = "&{template:test}";
    var rollString = "";
    //var attributes = await getAttrsAsync(group_);
    var attributeRollcounts =  await getAttrsAsync(group_.map((line) => `roll_${line}`));
    for (index in group_) {
        var attrName = group_[index];
        var attrCountName = Object.keys(attributeRollcounts)[index];
        var attrCount =attributeRollcounts[attrCountName];
        if (attrCount > 0) {
            rollString += ` {{${attrName}=[[@{${attrCountName}}d8<@{${attrName}}f8-@{${attrCountName}}]]}}`;
        } 
    }
    rollString += ` {{qualität=[[0]]}}`;
    startRoll(rollHeader + rollString, (retnObject) => {
        var outcome = 0;
        for(partialRollData of Object.entries(retnObject.results)) {
            outcome += partialRollData[1].result;
        }
        finishRoll(retnObject.rollId, {"qualität": outcome});
    });
}

