module.exports=(temp,product)=>{
    let output=temp.replace(/{%PRODUCTNAME%}/g,product.productName);
    output=output.replace(/{%IMAGE%}/g,product.image);
    output=output.replace(/{%QUANTITY%}/g,product.quantity);
    output=output.replace(/{%PRICE%}/g,product.price);
    output=output.replace(/{%FROM%}/g,product.from);
    output=output.replace(/{%VITAMIN%}/g,product.nutrients);
    output=output.replace(/{%DESCP%}/g,product.description);
    output=output.replace(/{%ID%}/g,product.id);

    if (!product.organic) {
      output = output.replace(/{%NOT_ORGANIC%}/g, "not-organic");
    } else {
      output = output.replace(/{%NOT_ORGANIC%}/g, "");
    }

        return output;
}