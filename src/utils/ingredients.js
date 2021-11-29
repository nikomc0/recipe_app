  let utils = {}

  utils.findIngredient = function(array, ingredient) {
    var value;

    array.forEach((x, index) => {
      if (x.name === ingredient) {
        value = {x, index};
      }
    });

    return value;
  }

  export default utils;