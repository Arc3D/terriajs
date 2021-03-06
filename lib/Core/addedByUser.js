import defined from "terriajs-cesium/Source/Core/defined";

const USER_ADDED_CATEGORY_NAME = "User-Added Data";

function addedByUser(catalogMember) {
  while (defined(catalogMember.parent)) {
    if (catalogMember.parent.name === USER_ADDED_CATEGORY_NAME) {
      return true;
    }
    catalogMember = catalogMember.parent;
  }
  return false;
}

export default addedByUser;
export { USER_ADDED_CATEGORY_NAME };
