/* eslint-disable */
// 平行结构转树形结构
/*
this.region_details = toTreeArr(res.data.data, {
            id: "cur_code",
            parentId: "parent_code",
            rootId: "-1",
            childrenKey:'children'
          },{
              value:'cur_code',
              label:'cur_name'
          });
*/
const toTreeData = (data, compareAttr, retAttr) => {
    let resData = data;
    let tree = [];

    for (let i = 0; i < resData.length; i++) {
        if (resData[i][compareAttr.parentId] === compareAttr.rootId) {
            let obj = {
                ...resData[i],
                ...returnObj(retAttr, resData[i]),
                [compareAttr.childrenKey]: []
            };

            tree.push(obj);
            resData.splice(i, 1);
            i--;
        }
    }
    run(tree);
    function run(chiArr) {
        if (resData.length !== 0) {
            for (let i = 0; i < chiArr.length; i++) {
                for (let j = 0; j < resData.length; j++) {
                    if (chiArr[i][compareAttr.id] === resData[j][compareAttr.parentId]) {
                        let obj = {
                            ...resData[j],
                            ...returnObj(retAttr, resData[j]),
                            [compareAttr.childrenKey]: []
                        };
                        chiArr[i][compareAttr.childrenKey].push(obj);
                        resData.splice(j, 1);
                        j--;
                    }
                }
                run(chiArr[i][compareAttr.childrenKey]);
            }
        }
    }
    function returnObj(sourceObj, targetObj) {
        let obj = {};
        for (let key in sourceObj) {
            obj[key] = targetObj[sourceObj[key]];
        }
        return obj;
    }
    return tree;
};

export default toTreeData;
