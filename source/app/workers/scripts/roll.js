
async function groupRoll(group_) {
    const rollHeader = "&{template:default} ";
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
    startRoll(rollHeader + rollString, (results) => {finishRoll(results.rollId)});
}

// [[10d8<4f8 -10]]
// `A ${wutt}, lol`