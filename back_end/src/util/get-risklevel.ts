import { isNull } from "lodash";
import { dangerLevelDetails } from "./get-danger-level-keywords";

export async function getRiskLevel(title: string, specs: any | null, riskLevelDetails: dangerLevelDetails[] | null): Promise<number| null> {

    if (!isNull(riskLevelDetails)) {
        title = title.toLowerCase();
        for (const currentDetail of riskLevelDetails) {
                for (const dbkeyword of currentDetail.keywords) {
                    if (title.includes(dbkeyword.toLowerCase())) {
                        return currentDetail.level;
                    }
                
            }

            if (!isNull(specs)) {
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