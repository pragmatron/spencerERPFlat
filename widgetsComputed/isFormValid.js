return async function (gridId) {
 
  const isValid = await new Promise(resolve => {
    this.$bus.$emit(`fbValidate-${gridId}`, (isValid) => {
      console.log('Validation result:', isValid);
      resolve(isValid);
    });
  });
  
  console.log('Returning final validation result:', isValid);
  return isValid; 
}