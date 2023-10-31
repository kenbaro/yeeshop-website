/**
 * validate checker 
 * @author Thai Duy Bao.
 * @since 2023.
 */

const chkErr = (elem, rule,rtnObj) => {

    if (rtnObj.hasErr === false) {

        return;
    }

    if (rule === "required" ) {

        if (elem.target.value === "") {

            rtnObj.hasErr = true;
            rtnObj.errMsg = elem.target.title + "không được rỗng!";
        } 
    }
    return rtnObj;
}
const validate = (rules,elem) => {

    if (rules === null || rules.length === 0 ) {

        return;
    }

    let errObj = {hasErr : false,};
    let arrNm = [];
    
    if (elem !== null && elem !== undefined) {

        const name = Object.keys(rules).find((e) => e === elem.target.name);
        arrNm = rules[name].split(" ");

        errObj = arrNm.map((rule) => chkErr(elem, rule, errObj));
    }
    return errObj;
}

console.log(validate);