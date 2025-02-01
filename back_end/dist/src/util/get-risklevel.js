"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRiskLevel = getRiskLevel;
const lodash_1 = require("lodash");
async function getRiskLevel(title, specs, riskLevelDetails) {
    if (!(0, lodash_1.isNull)(riskLevelDetails)) {
        title = title.toLowerCase();
        for (const currentDetail of riskLevelDetails) {
            for (const dbkeyword of currentDetail.keywords) {
                if (title.includes(dbkeyword.toLowerCase())) {
                    return currentDetail.level;
                }
            }
            if (!(0, lodash_1.isNull)(specs)) {
                for (const currSpec of specs) {
                    for (const spec of currentDetail.specs) {
                        if (spec.specsKey.toLowerCase() == currSpec.specs_key.toLowerCase()
                            && spec.specsValue.toLowerCase() == currSpec.specs_value.toLowerCase()) {
                            return currentDetail.level;
                        }
                    }
                }
            }
        }
    }
    return 0;
}
//# sourceMappingURL=get-risklevel.js.map