//Me cuenta los items duplicados en el array
export const countDuplicatesItemArray = (value, array) => {
  let count = 0;
  array.forEach((arrayValue) => {
    if (arrayValue == value) {
      count++;
    }
  });
  return count;
};

//Para saber cuantos productos unicos tengo el el carrito
export const removeArrayDuplicates = (array) => {
  return Array.from(new Set(array));
};

//Este para borrar el item del carrito

export const removeItemArray = (array, item) => {
  const index = array.indexOf(item);

  if (index > -1) {
    array.splice(index, 1);
  }
  return array;
};
